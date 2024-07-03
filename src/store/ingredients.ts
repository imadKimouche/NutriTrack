import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {Ingredient} from '../hooks/meal';

type MealSearchState = {
  ingredients: Ingredient[];
  add: (ingredient: Ingredient) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useSearchMealStore = create<MealSearchState>()(
  devtools(
    set => ({
      ingredients: [],
      add: (ingredient: Ingredient) => {
        set(state => {
          if (state.ingredients.find(ing => ing.id === ingredient.id)) {
            return state;
          }
          return {ingredients: [...state.ingredients, ingredient]};
        });
      },
      remove: (id: number) => {
        set(state => ({
          ingredients: state.ingredients.filter(item => item.id !== id),
        }));
      },
      clear: () => {
        set({ingredients: []});
      },
    }),
    {
      name: 'meal-search-storage',
    },
  ),
);
