import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getFitnessData, setFitnessData, setUserBMR, setUserTDEE} from '../api/fitnessData';
import {UserFitnessData} from '../store/onboarding';
import {useAuth} from './auth';

export const useUserFitnessData = () => {
  const {user} = useAuth();
  const {data, isLoading, error, isError, isSuccess} = useQuery(['userFitnessData', user?.uid!], () =>
    getFitnessData(user?.uid!),
  );
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: storeUFDIsLoading,
    isError: storeUFDIsError,
    mutateAsync: storeUFDAsync,
  } = useMutation((userData: Partial<UserFitnessData>) => setFitnessData(user?.uid, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('userFitnessData');
    },
    onError: error => {
      console.log('useUserFitnessData::mutate error', error);
    },
  });
  return {
    fitnessData: data,
    storeUserFitnessData: mutate,
    storeUFDAsync,
    isLoading,
    error,
    isSuccess,
    isError,
    storeUFDIsLoading,
    storeUFDIsError,
  };
};

export const useUserBMR = () => {
  const {user} = useAuth();
  const {mutate} = useMutation((bmr: number) => setUserBMR(user?.uid!, bmr));
  return {
    storeUserBMR: mutate,
  };
};

export const useUserTDEE = () => {
  const {user} = useAuth();
  const queryClient = useQueryClient();
  const {mutate} = useMutation((tdee: number) => setUserTDEE(user?.uid!, tdee), {
    onSuccess: () => {
      queryClient.invalidateQueries('userFitnessData');
    },
    onError: error => {
      console.log('useUserTDEE::mutate error', error);
    },
  });
  return {
    storeUserTDEE: mutate,
  };
};
