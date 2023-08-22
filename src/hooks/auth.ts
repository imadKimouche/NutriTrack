import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useMutation, useQueryClient} from 'react-query';
import {useForm} from 'react-hook-form';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ActivityLevel, FitnessGoal, useOnBoardingStore, UserFitnessData} from '../store/onboarding';
import {setFitnessData} from '../api/fitnessData';
import {calculateBMR} from '../utils';
import {storeUser} from '../api/user';

GoogleSignin.configure({
  webClientId: '1086106979278-hodb961ig9e20k0uet43mka4stf0nlrd.apps.googleusercontent.com',
});

type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SigninFormData = Omit<SignupFormData, 'confirmPassword'>;

type MutationData = {
  email: string;
  password: string;
};

export function signOut() {
  return auth().signOut();
}

export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = auth().onAuthStateChanged(async fireUser => {
      if (fireUser) {
        setUser(fireUser);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  minimal: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extreme: 1.9,
};

const CALORIES_MODIFIERS: Record<FitnessGoal, number> = {
  gain: 200,
  lose: -200,
  maintain: 0,
  recomposition: -100,
};

const AUTH_ERR_MSGS = {
  'auth/email-already-in-use': 'Email is already in use',
  'auth/invalid-email': 'Invalid email address',
  'auth/weak-password': 'Password is too weak',
  'auth/wrong-password': 'Password is incorrect',
  'auth/user-not-found': 'User not found',
};

async function signUpUser(email: string, password: string) {
  return await auth().createUserWithEmailAndPassword(email, password);
}

export function useSignup() {
  const form = useForm<SignupFormData>();
  const userFitnessData: UserFitnessData = useOnBoardingStore(state => ({
    fitnessGoal: state.fitnessGoal,
    activityLevel: state.activityLevel,
    age: state.age,
    gender: state.gender,
    height: state.height,
    weight: state.weight,
    allergies: state.allergies,
  }));

  if (
    userFitnessData &&
    userFitnessData.gender &&
    userFitnessData.age &&
    userFitnessData.fitnessGoal &&
    userFitnessData.activityLevel
  ) {
    const bmr = calculateBMR(userFitnessData.gender, userFitnessData.age, userFitnessData.height, userFitnessData.weight);
    const tdee = bmr * ACTIVITY_MULTIPLIERS[userFitnessData.activityLevel] + CALORIES_MODIFIERS[userFitnessData.fitnessGoal];
    userFitnessData.tdee = tdee;
  }

  const mutation = useMutation<FirebaseAuthTypes.UserCredential, FirebaseAuthTypes.NativeFirebaseAuthError, MutationData>(
    (data: MutationData) => signUpUser(data.email, data.password),
    {
      onSuccess: async userCredential => {
        const {user} = userCredential;
        await storeUser(user);
        await setFitnessData(user.uid, userFitnessData);
      },
      onError: err => {
        console.log('signUp():', err);
      },
    },
  );

  const onSubmit = form.handleSubmit((data: MutationData) => {
    const {email, password} = data;
    mutation.mutate({email, password});
  });

  mutation.error?.code && form.setError('password', {message: AUTH_ERR_MSGS[mutation.error.code as keyof typeof AUTH_ERR_MSGS]});

  return {form, onSubmit, mutation};
}

export const useSignin = () => {
  const form = useForm<SigninFormData>();

  const mutation = useMutation<FirebaseAuthTypes.UserCredential, FirebaseAuthTypes.NativeFirebaseAuthError, MutationData>(
    (data: MutationData) => auth().signInWithEmailAndPassword(data.email, data.password),
  );

  const queryClient = useQueryClient();
  const onSubmit = form.handleSubmit((data: MutationData) => {
    const {email, password} = data;

    mutation.mutate(
      {email: email, password: password},
      {
        onSuccess: () => {
          queryClient.invalidateQueries('userDailyMeals');
        },
      },
    );
  });

  mutation.error?.code && form.setError('password', {message: AUTH_ERR_MSGS[mutation.error.code as keyof typeof AUTH_ERR_MSGS]});

  return {form, onSubmit, mutation};
};

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

export const useSignInWithGoogle = () => {
  const {isLoading, isError, error, mutate} = useMutation<
    FirebaseAuthTypes.UserCredential,
    FirebaseAuthTypes.NativeFirebaseAuthError
  >(signInWithGoogle);

  return {signInWithGoogle: mutate, isLoading, isError, error};
};
