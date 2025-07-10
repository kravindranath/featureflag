// Controlled by Team A or config system
const flags = {
  showContact: false,
};

export const isFeatureEnabled = (flag) => flags[flag] ?? false;
