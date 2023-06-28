import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {dateToString} from '../utils';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

type DashboardState = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedMealType: MealType;
  setSelectedMealType: (type: MealType) => void;
};

const TODAY = new Date();
export const useDashboardStore = create<DashboardState>()(
  devtools(
    set => ({
      selectedDate: dateToString(TODAY),
      setSelectedDate: (date: string) => set(() => ({selectedDate: date})),
      selectedMealType: 'breakfast',
      setSelectedMealType: (type: MealType) => set(() => ({selectedMealType: type})),
    }),
    {
      name: 'dashboard-storage',
    },
  ),
);
