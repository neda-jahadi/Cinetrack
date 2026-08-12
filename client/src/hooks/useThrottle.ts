import { useState, useEffect, useRef } from 'react';

export const useThrottle = (value: number, delay = 800) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (lastExecuted.current === null) {
      lastExecuted.current = now;
    }

    const remaining = delay - (now - lastExecuted.current);

    const handler = setTimeout(
      () => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      },
      Math.max(remaining, 0),
    );

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
};
