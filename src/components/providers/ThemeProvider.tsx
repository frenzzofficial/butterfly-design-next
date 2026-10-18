"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;

  /** localStorage key that remembers the visitor's light/dark choice. */
  storageKey: string;

  /** "system", "light" or "dark". */
  defaultTheme: string;
}

/**
 * Light/dark mode. The values come from layout.tsx as props so the env config
 * stays out of the client bundle.
 */
export default function ThemeProvider({
  children,
  storageKey,
  defaultTheme,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      storageKey={storageKey}
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
