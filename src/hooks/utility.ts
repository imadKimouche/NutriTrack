import {useEffect, useState} from 'react';

export function useDebounce<T>(
  value: T,
  delay?: number,
): {debouncedValue: T; setDebouncedValue: React.Dispatch<React.SetStateAction<T>>} {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return {debouncedValue, setDebouncedValue};
}
