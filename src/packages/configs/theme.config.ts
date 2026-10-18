import { envPublicConfig } from "@/packages/env/public.env";

const THEME_STORAGE_KEY = `${envPublicConfig.APP_NAME}-theme`;

export const themeConfig = {
  storageKey: THEME_STORAGE_KEY,
  defaultTheme: envPublicConfig.ACTIVE_THEME,
  enableSystem: true,
  disableTransitionOnChange: true,
} as const;
