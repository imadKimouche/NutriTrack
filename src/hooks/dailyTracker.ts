import {useEffect, useState} from 'react';
import {dateToString} from '../utils';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export function useCurrentMealData() {
  const [currentMealType, setCurrentMealType] = useState<MealType>('breakfast');
  const [currentSelectedDate, setCurrentSelectedDate] = useState('');

  // TOFIX: this effect causes multipes rerenders, fix somehow ??
  useEffect(() => {
    const TODAY = new Date();
    setCurrentSelectedDate(dateToString(TODAY));
  }, []);

  return {
    currentSelectedDate,
    setCurrentSelectedDate,
    currentMealType,
    setCurrentMealType,
  };
}
