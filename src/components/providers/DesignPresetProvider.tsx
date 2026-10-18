"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  DESIGN_PRESET_STORAGE_KEY,
  DESIGN_PRESETS,
  type DesignPresetName,
} from "@/packages/configs/design-preset.config";

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

/** Applies a preset to <html> and remembers it for the next visit. */
const applyPreset = (preset: DesignPresetName) => {
  document.documentElement.setAttribute("data-theme", preset);

  try {
    window.localStorage.setItem(DESIGN_PRESET_STORAGE_KEY, preset);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The preset
    // still applies for this visit.
  }
};

type DesignPresetProviderProps = {
  children: ReactNode;

  /**
   * Preset rendered on the server. layout.tsx passes it in, which keeps the
   * (Zod-based) env config out of the client bundle and the first render
   * identical to the server HTML.
   */
  defaultPreset: DesignPresetName;
};

export const DesignPresetProvider = ({
  children,
  defaultPreset,
}: DesignPresetProviderProps) => {
  const [currentPreset, setCurrentPreset] =
    useState<DesignPresetName>(defaultPreset);

  // Sync state with the saved preference after mounting. The matching
  // data-theme attribute is already set by the inline script in layout.tsx, so
  // nothing is written back here and the default never flashes over it.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(DESIGN_PRESET_STORAGE_KEY);

      if (isValidPreset(stored)) {
        setCurrentPreset(stored);
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // Storage unavailable: keep the default preset.
    }
  }, []);

  const setPreset = (preset: DesignPresetName) => {
    setCurrentPreset(preset);
    applyPreset(preset);
  };

  const cyclePreset = () => {
    const currentIndex = DESIGN_PRESETS.findIndex(
      (preset) => preset.name === currentPreset,
    );

    setPreset(DESIGN_PRESETS[(currentIndex + 1) % DESIGN_PRESETS.length].name);
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
