import {useMutation, useQueryClient} from 'react-query';
import {setUserBMR, setUserTDEE} from '../api/dietData';
import {useAuth} from './auth';

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
