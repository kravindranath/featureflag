import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import { flags as defaultFlags } from "../config/featureFlags";

export default function useFeatureFlag(flagName, defaultValue = false) {
  const [enabled, setEnabled] = useLocalStorage(flagName, defaultValue);
  const location = useLocation();

  // 🔁 One-time initialization of all default flags
  useEffect(() => {
    for (const key in defaultFlags) {
      if (Object.prototype.hasOwnProperty.call(defaultFlags, key)) {
        setLocalStorageItem(key, defaultFlags[key]);
      }
    }
  }, []);

  useEffect(() => {
    const allFlags = getLocalStorageItem("featureFlags") || {};
    setEnabled(allFlags[flagName] ?? false);
  }, [flagName, setEnabled]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // 🔹 1. Single flag override (?feature=flagName&toggle=on/off)
    const feature = params.get("feature");
    const toggle = params.get("toggle");

    if (feature === flagName && (toggle === "on" || toggle === "off")) {
      const state = toggle === "on";
      setEnabled(state);
      setLocalStorageItem(flagName, state);
    }
  }, [flagName, location.search, defaultValue, setEnabled]);

  return enabled;
}
