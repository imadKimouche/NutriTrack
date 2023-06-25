import {useEffect, useState} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';

export type Unit = 'g' | 'ml' | 'tsp' | 'tbsp' | 'cup' | 'floz' | 'pint' | 'quart' | 'l' | 'kg' | 'lb' | 'oz' | 'piece';

export type Meal = {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbs: number;
  quantity: number;
  unit?: Unit;
  allergens: string;
  image: string;
};

const REGION = 'fr';
const BASE_URL = `https://${REGION}.openfoodfacts.org/cgi/search.pl`;
const PAGE_SIZE = 5;

async function fetchOFFMeal(searchText: string, pageNumber: number) {
  if (searchText.trim().length === 0) {
    return null;
  }

  const response = await fetch(`${BASE_URL}?search_terms=${searchText}&page_size=${PAGE_SIZE}&page=${pageNumber}&json=true`);

  if (!response.ok) {
    console.log('fetchOFFMeal(): failed to fetch meals');
    return null;
  }
  const data = await response.json();
  if (data !== undefined && 'products' in data && Array.isArray(data.products)) {
    const parsedData: Meal[] = data.products.map((searchItem: any) => {
      return {
        id: searchItem.id,
        name: searchItem.product_name,
        calories: searchItem.nutriments['energy-kcal_100g'],
        proteins: searchItem.nutriments.proteins_100g,
        fat: searchItem.nutriments.fat_100g,
        carbs: searchItem.nutriments.carbohydrates_100g,
        quantity: searchItem.quantity,
        allergens: searchItem.allergens,
        image: searchItem.image_url,
      } as Meal;
    });
    return {meals: parsedData, page: data.page, pageCount: data.page_count, count: data.count} as {
      meals: Meal[];
      page: number;
      pageCount: number;
      count: number;
    };
  }
  return null;
}

export function useSearchOFFMeal(searchValue: string) {
  const [page, setPage] = useState(1);
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(['searchOFFMeals', searchValue], ({pageParam = 1}) => fetchOFFMeal(searchValue, pageParam), {
    getNextPageParam: queryResult => {
      if (queryResult && 'page' in queryResult) {
        if (queryResult.page < queryResult.pageCount) {
          return queryResult.page + 1;
        }
      }
      return undefined;
    },
  });

  let data;
  if (searchData && 'pages' in searchData && Array.isArray(searchData.pages)) {
    data = searchData?.pages.flatMap(pageData => (pageData ? pageData.meals : []));
  }

  return {
    data,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
    isFetching,
    fetchNextPage,
    page,
    setPage,
    hasNextPage,
  };
}
