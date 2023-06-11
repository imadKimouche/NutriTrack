import {useMutation, useQuery, useQueryClient} from 'react-query';
import {fetchUserData, pushUserData} from '../config/firebase';
import {useAuth} from './auth';

export type UserData = {
  goal: string;
  height: string;
  weight: string;
  allergies: string[];
};

export const useUserData = () => {
  const {user} = useAuth();
  const {data, isLoading, error} = useQuery(['userData', user?.uid!], () => fetchUserData(user?.uid!));
  let userData: UserData | undefined;

  if (data !== undefined) {
    userData = {
      goal: data.goal,
      height: data.height,
      weight: data.weight,
      allergies: data.allergies,
    };
  }
  return {data: userData, isLoading, error};
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
