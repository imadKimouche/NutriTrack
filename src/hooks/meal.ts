import {useEffect} from 'react';
import {useQuery} from 'react-query';
import {fetchMealsContaining} from '../config/firebase';

export function useSearchMeals(searchValue: string) {
  const {data, isLoading, isError, refetch} = useQuery(['searchMeals', searchValue], () => fetchMealsContaining(searchValue));
  let searchResult: string[] = [];

  console.log('meals', data);
  if (data) {
    searchResult = data.map(docItem => docItem + '');
  }

  useEffect(() => {
    refetch();
  }, [searchValue, refetch]);

  return {data: searchResult, isLoading, isError};
}
