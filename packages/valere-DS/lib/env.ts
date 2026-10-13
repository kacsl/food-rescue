const appName = process.env.NEXT_PUBLIC_APP_NAME;

export const env = {
  appName: appName && appName.length > 0 ? appName : "Valere Evolve",
};
