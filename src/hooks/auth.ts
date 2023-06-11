import {useEffect, useState} from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fireSignOut,
  User,
  UserCredential,
} from 'firebase/auth';
import {useMutation} from 'react-query';
import {useForm} from 'react-hook-form';
import app from '../config/firebase';
import {FirebaseError} from 'firebase/app';

const auth = getAuth();

console.log(app);

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
  return fireSignOut(auth);
}

export function useAuth() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, fireUser => {
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
  const mutation = useMutation<UserCredential, FirebaseError, MutationData>((data: MutationData) =>
    createUserWithEmailAndPassword(auth, data.email, data.password),
  );

  const onSubmit = form.handleSubmit((data: MutationData) => {
    const {email, password} = data;
    mutation.mutate({email, password});
  });

  return {form, onSubmit, mutation};
}

export const useSignin = () => {
  const form = useForm<SigninFormData>();

  const mutation = useMutation((data: MutationData) => signInWithEmailAndPassword(auth, data.email, data.password), {
    onSuccess: result => {
      console.log('user logged in', result.user.uid);
    },
  });

  const onSubmit = form.handleSubmit((data: MutationData) => {
    const {email, password} = data;

    mutation.mutate({email: email, password: password});
  });

  return {form, onSubmit, mutation};
};
