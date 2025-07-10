// Controlled by Team A or config system
export const flags = {
  showContact: false,
  showFlags: false,
};

export const isFeatureEnabled = (flag) => flags[flag] ?? false;
