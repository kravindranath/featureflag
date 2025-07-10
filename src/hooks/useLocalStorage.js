import { useState, useEffect } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

/**
 * React hook to sync a state value with localStorage
 */
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() =>
    getLocalStorageItem(key, defaultValue)
  );

  useEffect(() => {
    setLocalStorageItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
