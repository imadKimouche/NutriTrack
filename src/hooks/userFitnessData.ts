import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getFitnessData, setFitnessData} from '../api/fitnessData';
import {UserFitnessData} from '../store/onboarding';
import {useAuth} from './auth';

export const useUserFitnessData = () => {
  const {user} = useAuth();
  const {data, isLoading, error, isError} = useQuery(['userData', user?.uid!], () => getFitnessData(user?.uid!));
  const queryClient = useQueryClient();
  const {mutate} = useMutation((userData: UserFitnessData) => setFitnessData(user?.uid!, userData), {
    onSuccess: () => {
      queryClient.invalidateQueries('userData');
    },
  });
  return {userFitnessData: data, storeUserFitnessData: mutate, isLoading, error, isError};
};
