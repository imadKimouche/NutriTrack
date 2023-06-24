import {useQuery} from 'react-query';

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

export function useSearchOFFMeal(searchValue: string, pageSize: number = 10, region: string = 'fr') {
  const BASE_URL = `https://${region}.openfoodfacts.org/cgi/search.pl`;

  async function fetchOFFMeal(searchMeal: string) {
    if (searchMeal.trim().length === 0) {
      return null;
    }

    const response = await fetch(`${BASE_URL}?search_terms=${searchValue}&page_size=${pageSize}&json=true`);

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
      return parsedData;
    }
    return null;
  }

  const {data, isLoading, isError, error} = useQuery(['searchOFFMeals', searchValue], () => fetchOFFMeal(searchValue));
  return {data, isLoading, isError, error};
}
