import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import { flags as defaultFlags } from "../config/featureFlags";

export default function useFeatureFlags() {
  const [flagsState, setFlagsState] = useState({});

  useEffect(() => {
    const state = {};
    for (const key in defaultFlags) {
      const value = getLocalStorageItem(key);
      state[key] = value !== null ? value : defaultFlags[key];
    }
    setFlagsState(state);
  }, []);

  const setFlag = (flagName, value) => {
    setLocalStorageItem(flagName, value);
    setFlagsState((prev) => ({ ...prev, [flagName]: value }));
  };

  return { flags: flagsState, setFlag };
}
