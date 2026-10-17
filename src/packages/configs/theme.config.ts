import { envPublicConfig } from "../env/public.env";

const THEME_STORAGE_KEY = `${envPublicConfig.APP_NAME}-theme`;

export const themeConfig = {
  storageKey: THEME_STORAGE_KEY,
  defaultTheme: "system",
  enableSystem: true,
  disableTransitionOnChange: true,
} as const;
