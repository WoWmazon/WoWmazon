import { useEffect, useState } from "react";
import { isEqual } from "lodash";

export const useDebounce = <T,>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue((prevValue: T) =>
        isEqual(prevValue, value) ? prevValue : value
      );
    }, delay || 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [value]);

  return debouncedValue;
};
