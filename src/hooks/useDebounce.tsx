import { useEffect, useState } from "react";
import { isEqual } from "lodash";

export const useDebounce = <T,>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue((prevValue: T) =>
        // 깊은 비교를 통해 value 업데이트
        isEqual(prevValue, value) ? prevValue : value
      );
    }, delay || 300);

    // debounce가 unmount 되면 clearTimeout을 통해 set 실행 방지.
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [value]);

  return debouncedValue;
};
