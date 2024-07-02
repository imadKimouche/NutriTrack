import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {Ingredient} from '../hooks/meal';

type MealSearchState = {
  addedIngredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (id: number) => void;
  clearAddedIngredients: () => void;
};

export const useSearchMealStore = create<MealSearchState>()(
  devtools(
    set => ({
      addedIngredients: [],
      addIngredient: (ingredient: Ingredient) => {
        set(state => {
          if (state.addedIngredients.find(ing => ing.id === ingredient.id)) {
            return state;
          }
          return {addedIngredients: [...state.addedIngredients, ingredient]};
        });
      },
      removeIngredient: (id: number) => {
        set(state => ({
          addedIngredients: state.addedIngredients.filter(item => item.id !== id),
        }));
      },
      clearAddedIngredients: () => {
        set({addedIngredients: []});
      },
    }),
    {
      name: 'meal-search-storage',
    },
  ),
);
