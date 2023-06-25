import {useState} from 'react';

const TODAY = new Date(1687612900379);

export function useCurrentSelectedDate() {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(TODAY.getTime());

  return {
    currentSelectedDate,
    setCurrentSelectedDate,
    stringFormattedDate: `${TODAY.getDay()}-${TODAY.getMonth()}-${TODAY.getFullYear()}`,
  };
}
