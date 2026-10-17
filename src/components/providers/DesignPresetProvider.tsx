"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import appConfig from "@/packages/configs/app.config";
import {
  DESIGN_PRESETS,
  type DesignPresetName,
} from "@/packages/configs/design-preset.config";

const STORAGE_KEY = "design-preset";

type DesignPresetContextValue = {
  /** The active design preset name, matching a data-theme attribute. */
  currentPreset: DesignPresetName;

  /** Set a specific design preset. */
  setPreset: (preset: DesignPresetName) => void;

  /** Advance to the next registered design preset. */
  cyclePreset: () => void;

  /** Registered design presets for rendering selection controls. */
  presets: typeof DESIGN_PRESETS;
};

const DesignPresetContext = createContext<DesignPresetContextValue | null>(
  null,
);

const isValidPreset = (value: string | null): value is DesignPresetName =>
  value !== null && DESIGN_PRESETS.some((preset) => preset.name === value);

export const DesignPresetProvider = ({ children }: { children: ReactNode }) => {
  // Keep the initial value consistent with layout.tsx to avoid hydration mismatches.
  const DEFAULT_PRESET = appConfig.site.designPreset as DesignPresetName;

  const [currentPreset, setCurrentPreset] =
    useState<DesignPresetName>(DEFAULT_PRESET);

  // Restore the saved preference after mounting.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (isValidPreset(stored)) {
      setCurrentPreset(stored);
    }
  }, []);

  // Apply the active preset to the document and persist the preference.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentPreset);
    window.localStorage.setItem(STORAGE_KEY, currentPreset);
  }, [currentPreset]);

  const setPreset = (preset: DesignPresetName) => {
    setCurrentPreset(preset);
  };

  const cyclePreset = () => {
    const currentIndex = DESIGN_PRESETS.findIndex(
      (preset) => preset.name === currentPreset,
    );

    const nextIndex = (currentIndex + 1) % DESIGN_PRESETS.length;

    setCurrentPreset(DESIGN_PRESETS[nextIndex].name);
  };

  return (
    <DesignPresetContext.Provider
      value={{
        currentPreset,
        setPreset,
        cyclePreset,
        presets: DESIGN_PRESETS,
      }}
    >
      {children}
    </DesignPresetContext.Provider>
  );
};

export const useDesignPreset = (): DesignPresetContextValue => {
  const context = useContext(DesignPresetContext);

  if (!context) {
    throw new Error(
      "useDesignPreset must be used within a <DesignPresetProvider>.",
    );
  }

  return context;
};
