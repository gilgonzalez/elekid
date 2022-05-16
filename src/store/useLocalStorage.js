import { useState } from 'react';

const PREFIX = "_elekid_";

export function useLocalStorage(key, valorInicial) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : valorInicial;
    } catch (error) {
      return valorInicial;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}