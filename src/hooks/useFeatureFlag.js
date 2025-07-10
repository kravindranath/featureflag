import { useState, useEffect } from "react";
import { isFeatureEnabled } from "../config/featureFlags";

export default function useFeatureFlag(flagName) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // You can replace this with async fetch logic later
    setEnabled(isFeatureEnabled(flagName));
  }, [flagName]);

  return enabled;
}
