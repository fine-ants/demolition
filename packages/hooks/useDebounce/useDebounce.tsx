import { useEffect, useState } from "react";

/**
 * A custom hook that debounces a value.
 *
 * @param {any} value
 * @param {number} delay - in milliseconds (default 250ms).
 */
export default function useDebounce<T>(value: T, delay: number = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
