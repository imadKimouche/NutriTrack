import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

type DashboardState = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedMealType: MealType;
  setSelectedMealType: (type: MealType) => void;
};

const TODAY = new Date();
export const useDashboardStore = create<DashboardState>()(
  devtools(
    set => ({
      selectedDate: TODAY,
      setSelectedDate: (date: Date) => set(() => ({selectedDate: date})),
      selectedMealType: 'breakfast',
      setSelectedMealType: (type: MealType) => set(() => ({selectedMealType: type})),
    }),
    {
      name: 'dashboard-storage',
    },
  ),
);
