import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getFitnessData, setFitnessData} from '../api/fitnessData';
import {useOnBoardingStore, UserFitnessData} from '../store/onboarding';
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
  } = useMutation((userData: UserFitnessData) => setFitnessData(user?.uid!, userData), {
    onSuccess: (_, variables, __) => {
      queryClient.invalidateQueries('userFitnessData');
      // setFitnessGoal(variables.fitnessGoal);
      // setActivityLevel(variables.activityLevel);
      // setAge(variables.age);
      // setHeight(variables.height);
      // setWeight(variables.weight);
      // setGender(variables.gender);
      // setAllergies(variables.allergies);
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
