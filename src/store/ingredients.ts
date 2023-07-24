import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {Ingredient} from '../hooks/meal';

type MealSearchState = {
  addedIngredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredient: Ingredient) => void;
  clearAddedIngredients: () => void;
};

export const useSearchMealStore = create<MealSearchState>()(
  devtools(
    set => ({
      addedIngredients: [],
      addIngredient: (ingredient: Ingredient) => {
        set(state => {
          if (state.addedIngredients.find(ing => ing.code === ingredient.code)) {
            return state;
          }
          return {addedIngredients: [...state.addedIngredients, ingredient]};
        });
      },
      removeIngredient: (ingredient: Ingredient) => {
        set(state => ({
          addedIngredients: state.addedIngredients.filter(item => item.code !== ingredient.code),
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
