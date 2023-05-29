import {useMutation} from 'react-query';
import {signup} from '../api/api';
import {useForm} from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type MutationData = {
  email: string;
  password: string;
};

export const useSignup = () => {
  const form = useForm<FormData>();

  const mutation = useMutation((data: MutationData) =>
    signup(data.email, data.password),
  );

  const onSubmit = form.handleSubmit((data: MutationData) => {
    const {email, password} = data;

    mutation.mutate({email: email, password: password});
  });

  return {form, onSubmit, mutation};
};

export const useSignin = () => {
  const form = useForm<FormData>();

  const mutation = useMutation(
    (data: MutationData) => signup(data.email, data.password),
    {
      onSuccess: result => {
        console.log('success result', result);
      },
    },
  );

  const onSubmit = form.handleSubmit((data: MutationData) => {
    const {email, password} = data;

    mutation.mutate({email: email, password: password});
  });

  return {form, onSubmit};
};
