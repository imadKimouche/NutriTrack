import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {Meal} from '../hooks/meal';

type MealSearchHistoryState = {
  history: Meal[];
  add: (meal: Meal) => void;
  remove: (mealId: number) => void;
  clear: () => void;
};

// TODO: implement circualr history with a MAX_LEN
export const useMealSearchHistory = create<MealSearchHistoryState>()(
  devtools(
    set => ({
      history: [],
      add: (meal: Meal) =>
        set(state => {
          if (state.history.find(item => item.id === meal.id)) {
            return state;
          }
          return {history: [...state.history, meal]};
        }),
      remove: (mealId: number) =>
        set(state => ({
          history: state.history.filter(meal => meal.id !== mealId),
        })),
      clear: () => set(() => ({history: []})),
    }),
    {
      name: 'meal-search-history-storage',
    },
  ),
);
