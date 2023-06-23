import {useEffect} from 'react';
import {useQuery} from 'react-query';

export type Meal = {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbs: number;
  quantity: number;
  unit: string; // gram, ounce, cup, litre ...etc
  allergens: string[];
  image: string;
};

const base_url = 'https://fr.openfoodfacts.org';
async function fetchOFFMeal(searchMeal: string) {
  if (searchMeal.trim().length === 0) {
    return null;
  }
  const searchQuery = `${base_url}/cgi/search.pl?search_terms=${searchMeal}&search_simple=1&action=process&page_size=3&json=1&tagtype_0=countries&tag_contains_0=contains&tag_0=france`;
  const response = await fetch(searchQuery);
  console.log('response status', response.status); // DEBUG

  const data = await response.json();
  if (data && 'products' in data && Array.isArray(data.products)) {
    // console.log('size', data.products.length);
    // console.log('data in fetch', data.products[0]); // DEBUG
    const parsedData: Meal[] = data.map((searchItem: any) => {
      return {
        id: searchItem.id,
        name: '',
        calories: searchItem.nutriments['energy-kcal_100g'],
        proteins: searchItem.nutriments.proteins_100g,
        fat: searchItem.nutriments.fat_100g,
        carbs: searchItem.nutriments.carbohydrates_100g,
        quantity: 0,
        unit: 'gram',
        allergens: searchItem.allergens,
        image: searchItem.image_small_url,
      };
    });
    return parsedData;
  }

  return null;
}

export function useSearchOFFMeal(searchValue: string) {
  const {data, isLoading, isError, error} = useQuery(['searchOFFMeals', searchValue], () => fetchOFFMeal(searchValue));
  return {data, isLoading, isError, error};
}
