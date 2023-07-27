import {useEffect, useState} from 'react';
import {ResultSet} from 'react-native-sqlite-storage';
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from 'react-query';
import {deleteUserMeal, fetchUserDailyMeals, pushUserMeal, updateUserDailyMacros} from '../api/dietData';
import {searchIngredient, searchRecipe} from '../database/handler';
import {SearchRecipe} from '../screens/Recipes/RecipesResultsScreen';
import {useDashboardStore} from '../store/dashboard';

export type Meal = {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbs: number;
  portion: number;
  per100unit: string;
  unit: string;
  allergens: string;
  images: {url?: string; thumbUrl?: string};
};

function cleanProduct(product: any): Meal {
  let quantity = product.quantity as string;
  let unit = '';
  let portion = 100;
  if (quantity) {
    quantity = quantity.replace(/ /g, '');
    let match = quantity.match(/\d+(\.|\,)?\d*[a-zA-Z]*/i);
    if (match && match.length > 0) {
      let numberMatches = match[0].match(/\d+(\.|\,)?\d*/);
      if (numberMatches && numberMatches.length > 0) {
        portion = myParseFloat(numberMatches[0]);
      }
      unit = match[0].replace(/\d+(\.|\,)?\d*/g, '');
    }
  }
  let per100unit = unit.trim();
  if (liquidUnits.find(un => un.text.toLocaleLowerCase() === unit.toLocaleLowerCase())) {
    per100unit = 'ml';
    portion = portion * liquidUnits.find(un => un.text.toLocaleLowerCase() === unit.toLocaleLowerCase())!.product;
    unit = 'ml';
  } else if (gramsUnits.find(un => un.text.toLocaleLowerCase() === unit.toLocaleLowerCase())) {
    per100unit = 'g';
    portion = portion * gramsUnits.find(un => un.text.toLocaleLowerCase() === unit.toLocaleLowerCase())!.product;
    unit = 'g';
  }
  return {
    id: product._id,
    unit: unit,
    per100unit: per100unit,
    portion: portion,
    images: {
      url: product.image_url,
      thumbUrl: product.image_thumb_url,
    },
    name: product.product_name,
    calories: myParseFloat(product.nutriments['energy-kcal_100g']),
    carbs: myParseFloat(product.nutriments.carbohydrates_100g),
    fat: myParseFloat(product.nutriments.fat_100g),
    proteins: myParseFloat(product.nutriments.proteins_100g),
    allergens: product.allergens,
  };
}

function myParseFloat(text: string) {
  let number = parseFloat(text);
  if (isNaN(number)) {
    return 0;
  } else {
    return number;
  }
}

let gramsUnits = [
  {
    text: 'mg',
    product: 0.001,
  },
  {
    text: 'g',
    product: 1,
  },
  {
    text: 'oz',
    product: 28.3495,
  },
  {
    text: 'kg',
    product: 1000,
  },
];
let liquidUnits = [
  {text: 'l', product: 1000},
  {text: 'ml', product: 1},
  {text: 'cl', product: 10},
  {text: 'liter', product: 1000},
  {text: 'litre', product: 1000},
  {text: 'floz', product: 29.5735296875},
];

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
    const parsedData: Meal[] = data.products.map((product: any) => {
      return cleanProduct(product);
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

async function fetchOFFMealBC(barcode: string) {
  if (barcode.trim().length === 0) {
    return null;
  }

  const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);

  if (!response.ok) {
    console.log('fetchOFFMealBC(): failed to fetch meal');
    return null;
  }
  const data = await response.json();
  if (data !== undefined && 'product' in data) {
    const meal = cleanProduct(data.product);
    return meal;
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

export function useSearchOFFMealBC(barcode: string) {
  const {data, isLoading, error, isError, refetch} = useQuery(['searchOFFMealBC', barcode], () => fetchOFFMealBC(barcode));

  useEffect(() => {
    refetch();
  }, [barcode, refetch]);

  return {data, isLoading, error, isError};
}

export function usePostMeal(meal: Meal) {
  const currentSelectedDate = useDashboardStore(state => state.selectedDate);
  const currentMealType = useDashboardStore(state => state.selectedMealType);

  // const {user} = useAuth();
  const user = {
    email: 'imad.kim@gmail.com',
    uid: 'Wt08dVT3rUPePPkc38lc7QqGAJF2',
  };

  const queryClient = useQueryClient();
  const {isLoading, error, mutate, mutateAsync} = useMutation(
    ({portion, unit}: {portion: number; unit: string}) =>
      pushUserMeal(user.uid, currentSelectedDate, currentMealType, meal, portion, unit),
    {
      onSuccess: async () => {
        await updateUserDailyMacros(user.uid, currentSelectedDate, meal.calories, meal.proteins, meal.carbs, meal.fat);
        queryClient.invalidateQueries('userDailyMeals');
      },
    },
  );
  return {
    saveUserMeal: mutate,
    saveUserMealAsync: mutateAsync,
    isLoading,
    error,
  };
}

export function useUserDailyMeals(date: string) {
  // const {user} = useAuth();
  const user = {
    email: 'imad.kim@gmail.com',
    uid: 'Wt08dVT3rUPePPkc38lc7QqGAJF2',
  };

  const {data, isLoading, error, isError} = useQuery(['userDailyMeals', user, date], () => fetchUserDailyMeals(user.uid, date));
  return {data, isLoading, error, isError};
}

export function useDeleteDailyMeal() {
  const currentSelectedDate = useDashboardStore(state => state.selectedDate);
  const currentMealType = useDashboardStore(state => state.selectedMealType);

  // const {user} = useAuth();
  const user = {
    email: 'imad.kim@gmail.com',
    uid: 'Wt08dVT3rUPePPkc38lc7QqGAJF2',
  };

  const queryClient = useQueryClient();
  const {isLoading, isError, error, mutate} = useMutation(
    (mealId: number) => deleteUserMeal(user.uid, currentSelectedDate, currentMealType, mealId),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('userDailyMeals');
      },
    },
  );
  return {
    deleteDailyMeal: mutate,
    isLoading,
    isError,
    error,
  };
}

export type Ingredient = {
  code: number;
  name: string;
};

function parseRawIngredients(raw: ResultSet | [] | undefined): Ingredient[] {
  if (!raw || Array.isArray(raw)) {
    return [];
  }
  const parsedData = [];
  const len = raw.rows.length;
  for (let i = 0; i < len; i++) {
    let row = raw.rows.item(i);
    parsedData.push({code: row.alim_code, name: row.nom_fr});
  }
  return parsedData;
}

export function useSearchIngredient(text?: string) {
  const {data, isLoading, error, isError, refetch} = useQuery(['searchIngredient', text], () => searchIngredient(text), {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [text, refetch]);

  return {data: parseRawIngredients(data), isLoading, error, isError};
}

function parseRawRecipes(raw: ResultSet | [] | undefined): SearchRecipe[] {
  if (!raw || Array.isArray(raw)) {
    return [];
  }
  const parsedData: SearchRecipe[] = [];
  const len = raw.rows.length;
  for (let i = 0; i < len; i++) {
    let row = raw.rows.item(i);
    parsedData.push({
      id: row.id,
      name: row.name,
      photo: row.photo,
      quantity: row.quantity,
      time: row.time,
      matching_ingredients_count: row.matching_ingredients_count,
    });
  }
  return parsedData;
}

export function useSearchRecipe(ingredients: Ingredient[]) {
  const {data, isLoading, error, isError, refetch} = useQuery(['searchRecipe', ingredients], () => searchRecipe(ingredients), {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [ingredients, refetch]);

  return {data: parseRawRecipes(data), isLoading, error, isError};
}
