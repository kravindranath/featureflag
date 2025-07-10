import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

export default function useFeatureFlag(flagName) {
  const [enabled, setEnabled] = useLocalStorage(flagName, false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const feature = params.get("feature");
    const toggle = params.get("toggle");

    if (feature === flagName && (toggle === "on" || toggle === "off")) {
      setEnabled(toggle === "on");
    }
  }, [flagName, location.search, setEnabled]);

  return enabled;
}
