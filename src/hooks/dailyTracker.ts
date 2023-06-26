import {useState} from 'react';

const TODAY = new Date();

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export function useCurrentMealData() {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(TODAY.getTime());
  const [currentMealType, setCurrentMealType] = useState<MealType>('breakfast');

  return {
    currentSelectedDate,
    setCurrentSelectedDate,
    stringFormattedDate: `${TODAY.getDate()}-${TODAY.getMonth()}-${TODAY.getFullYear()}`,
    currentMealType,
    setCurrentMealType,
  };
}
