import { useState, useEffect } from 'react'

export const  useDebounce = (value: string, delay = 800) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => clearTimeout(id);
    }, [value, delay]);

  return debouncedValue;
}

// Wait until user stops typing for X ms, then update