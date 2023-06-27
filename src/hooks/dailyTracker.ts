import {useEffect, useState} from 'react';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export function useCurrentMealData() {
  const [currentSelectedDate, setCurrentSelectedDate] = useState<number>(0);
  const [currentMealType, setCurrentMealType] = useState<MealType>('breakfast');
  const [stringFormattedDate, setStringFormattedDate] = useState('');

  useEffect(() => {
    const TODAY = new Date();
    setCurrentSelectedDate(TODAY.getTime());
    setStringFormattedDate(formatDate(TODAY));
  }, []);

  useEffect(() => {
    const selectedDate = new Date(currentSelectedDate);
    setStringFormattedDate(formatDate(selectedDate));
  }, [currentSelectedDate]);

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return {
    currentSelectedDate,
    setCurrentSelectedDate,
    stringFormattedDate,
    currentMealType,
    setCurrentMealType,
  };
}
