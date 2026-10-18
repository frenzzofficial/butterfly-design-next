"use client";

import { useDesignPreset } from "@/components/providers/DesignPresetProvider";
import type { DesignPresetName } from "@/packages/configs/design-preset.config";

/** Compact <select> for choosing the active design preset. */
export function PresetSwitcher() {
  const { currentPreset, setPreset, presets } = useDesignPreset();

  return (
    <select
      aria-label="Design preset"
      value={currentPreset}
      onChange={(event) => setPreset(event.target.value as DesignPresetName)}
      className="h-8 rounded-md border border-border bg-background px-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {(["custom", "color"] as const).map((category) => (
        <optgroup
          key={category}
          label={category === "custom" ? "Custom" : "Colors"}
        >
          {presets
            .filter((preset) => preset.category === category)
            .map((preset) => (
              <option key={preset.name} value={preset.name}>
                {preset.label}
              </option>
            ))}
        </optgroup>
      ))}
    </select>
  );
}
