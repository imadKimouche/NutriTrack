import {useMutation} from 'react-query';
import {setUserBMR} from '../api/dietData';
import {useAuth} from './auth';

export const useUserBMR = () => {
  const {user} = useAuth();
  const {mutate} = useMutation((bmr: number) => setUserBMR(user?.uid!, bmr));
  return {
    storeUserBMR: mutate,
  };
};
