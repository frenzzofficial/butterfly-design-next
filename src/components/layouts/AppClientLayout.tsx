"use client";

import type { ReactNode } from "react";
import { DesignPresetProvider } from "@/components/providers/DesignPresetProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import type { DesignPresetName } from "@/packages/configs/design-preset.config";

interface AppClientLayoutProps {
  children: ReactNode;
  defaultPreset: DesignPresetName;
  themeStorageKey: string;
  defaultTheme: string;
}

/**
 * Client-side providers for the whole app. Header, footer and pages are passed
 * in as children, so they stay Server Components.
 */
const AppClientLayout = ({
  children,
  defaultPreset,
  themeStorageKey,
  defaultTheme,
}: AppClientLayoutProps) => {
  return (
    <ThemeProvider storageKey={themeStorageKey} defaultTheme={defaultTheme}>
      <DesignPresetProvider defaultPreset={defaultPreset}>
        {children}
      </DesignPresetProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
