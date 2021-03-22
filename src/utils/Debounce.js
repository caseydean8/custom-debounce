import { useState, useEffect } from "react";

const UseDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => clearTimeout(handler);
    },
    // Call effect only if value or delay changes
    [value, delay]
  );
  return debouncedValue;
};

export default UseDebounce;
