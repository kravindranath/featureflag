import React from "react";
import useFeatureFlags from "../../hooks/useFeatureFlags";
import { flags as allFlags } from "../../config/featureFlags";
import "./FeatureFlagSidebar.css";

export default function FeatureFlagSidebar() {
  const { flags, setFlag } = useFeatureFlags();

  const showSidebar = flags.showFlags;
  if (!showSidebar) return null;

  const handleClose = () => {
    setFlag("showFlags", false);
  };

  return (
    <aside className="flag-sidebar">
      <div className="flag-sidebar-header">
        <h3>Feature Flags</h3>
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
      </div>
      <ul className="flag-list">
        {Object.keys(allFlags).map((flag) => (
          <li key={flag} className="flag-item">
            <span>{flag}</span>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name={flag}
                  checked={flags[flag] === true}
                  onChange={() => setFlag(flag, true)}
                />
                On
              </label>
              <label>
                <input
                  type="radio"
                  name={flag}
                  checked={flags[flag] === false}
                  onChange={() => setFlag(flag, false)}
                />
                Off
              </label>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
