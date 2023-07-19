import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useMutation, useQueryClient} from 'react-query';
import {useForm} from 'react-hook-form';

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
    const unsubscribeFromAuthStateChanged = auth().onAuthStateChanged(fireUser => {
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

export function useSignup() {
  const form = useForm<SignupFormData>();
  const mutation = useMutation<FirebaseAuthTypes.UserCredential, FirebaseAuthTypes.NativeFirebaseAuthError, MutationData>(
    (data: MutationData) => auth().createUserWithEmailAndPassword(data.email, data.password),
  );

  const queryClient = useQueryClient();
  const onSubmit = form.handleSubmit((data: MutationData) => {
    const {email, password} = data;
    mutation.mutate(
      {email, password},
      {
        onSuccess: () => {
          queryClient.invalidateQueries('userDailyMeals');
        },
      },
    );
  });

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

  return {form, onSubmit, mutation};
};

export const useSignUpWithGoogle = () => {
  const signUpWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };
  const {isLoading, isError, error, mutate} = useMutation<UserCredential, FirebaseError>(signUpWithGoogle, {
    onSuccess: (userCredentials: UserCredential) => {
      console.log('google user cred', userCredentials?.user);
    },
    onError: (fbError: FirebaseError) => {
      console.log('useSignUpWithGoogle(): ', fbError.code, fbError.message);
    },
  });

  return {signupUsingGoogle: mutate, isLoading, isError, error};
};
