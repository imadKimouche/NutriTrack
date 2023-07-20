import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useMutation, useQueryClient} from 'react-query';
import {useForm} from 'react-hook-form';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log('sign in with google', error);
  }
};

// export const useSignInWithGoogle = () => {
//   const {isLoading, isError, error, mutate} = useMutation<
//     FirebaseAuthTypes.UserCredential,
//     FirebaseAuthTypes.NativeFirebaseAuthError
//   >(signInWithGoogle, {
//     onSuccess: (userCredentials: FirebaseAuthTypes.UserCredential) => {
//       console.log('google user cred', userCredentials?.user);
//     },
//     onError: (fbError: FirebaseAuthTypes.NativeFirebaseAuthError) => {
//       console.log('useSignUpWithGoogle(): ', fbError.code, fbError.message);
//     },
//   });
//
//   return {signInWithGoogle: mutate, isLoading, isError, error};
// };
