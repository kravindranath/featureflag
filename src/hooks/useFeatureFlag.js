import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "../utils/localStorage";
import { flags as defaultFlags } from "../config/featureFlags";

export default function useFeatureFlag(flagName) {
  const location = useLocation();
  const [enabled, setEnabled] = useState(() => {
    // Load initial value from localStorage or default
    const stored = getLocalStorageItem(flagName);
    return stored !== null ? stored : defaultFlags[flagName] ?? false;
  });

  // One-time initialization of all default flags (if not already set)
  useEffect(() => {
    for (const key in defaultFlags) {
      if (
        Object.prototype.hasOwnProperty.call(defaultFlags, key) &&
        getLocalStorageItem(key) === null
      ) {
        setLocalStorageItem(key, defaultFlags[key]);
      }
    }
  }, []);

  // Handle URL param override: ?feature=flagName&toggle=on|off
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const feature = params.get("feature");
    const toggle = params.get("toggle");

    if (feature === flagName && (toggle === "on" || toggle === "off")) {
      const newState = toggle === "on";
      setLocalStorageItem(flagName, newState);
      setEnabled(newState);
    }
  }, [flagName, location.search]);

  return enabled;
}
