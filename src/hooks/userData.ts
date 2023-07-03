import {useMutation, useQuery, useQueryClient} from 'react-query';
import {fetchUserData, pushUserBMR, pushUserData} from '../config/firebase';
import {useAuth} from './auth';

export type UserData = {
  goal: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  allergies: string[];
};

export const useUserData = () => {
  const {user} = useAuth();
  // const user = {
  //   email: 'imad.kim@gmail.com',
  //   uid: 'Wt08dVT3rUPePPkc38lc7QqGAJF2',
  // };
  const {data, isLoading, error, isError} = useQuery(['userData', user?.uid!], () => fetchUserData(user?.uid!));
  let userData: UserData | undefined;

  if (data) {
    const parsedData = data.data();
    if (parsedData) {
      userData = {
        goal: parsedData.goal,
        age: parsedData.age,
        gender: parsedData.gender,
        height: parsedData.height,
        weight: parsedData.weight,
        allergies: parsedData.allergies,
      };
    }
  }

  return {data: userData, isLoading, error, isError};
};

export const useSaveUserData = () => {
  const {user} = useAuth();
  const queryClient = useQueryClient();
  const {isLoading, error, mutate} = useMutation((data: UserData) => pushUserData(user?.uid!, data), {
    onSuccess: () => {
      // Invalidate and refetch userData
      queryClient.invalidateQueries('userData');
    },
  });
  return {
    saveUserData: mutate,
    isLoading,
    error,
  };
};

export const useSaveUserBMR = () => {
  const {user} = useAuth();
  // const queryClient = useQueryClient();
  const {isLoading, error, mutate} = useMutation((bmr: number) => pushUserBMR(user?.uid!, bmr), {
    onSuccess: () => {
      // Invalidate and refetch userData
    },
  });
  return {
    saveUserBMR: mutate,
    isLoading,
    error,
  };
};
