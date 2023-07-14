import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getFitnessData, setFitnessData} from '../api/fitnessData';
import {UserFitnessData} from '../store/onboarding';
import {useAuth} from './auth';

export const useUserFitnessData = () => {
  const {user} = useAuth();
  // const user = {
  //   email: 'imad.kim@gmail.com',
  //   uid: 'Wt08dVT3rUPePPkc38lc7QqGAJF2',
  // };
  const {data, isLoading, error, isError, isSuccess} = useQuery(['userFitnessData', user?.uid!], () =>
    getFitnessData(user?.uid!),
  );
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: storeUFDIsLoading,
    isError: storeUFDIsError,
    mutateAsync: storeUFDAsync,
  } = useMutation((userData: UserFitnessData) => setFitnessData(user?.uid!, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('userFitnessData');
    },
    onError: error => {
      console.log('useUserFitnessData::mutate error', error);
    },
  });
  return {
    userFitnessData: data,
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
