import { useState, useEffect } from 'react'

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
      return initialValue;
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage value:", error);
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage