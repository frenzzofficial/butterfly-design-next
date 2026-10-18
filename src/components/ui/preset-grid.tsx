"use client";

import { useDesignPreset } from "@/components/providers/DesignPresetProvider";
import { cn } from "@/packages/utils/cn";

/**
 * One button per registered preset. Each swatch carries its own data-theme, so
 * it previews that preset's palette regardless of the active one.
 */
export function PresetGrid() {
  const { currentPreset, setPreset, presets } = useDesignPreset();

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {presets.map((preset) => {
        const active = preset.name === currentPreset;

        return (
          <li key={preset.name}>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => setPreset(preset.name)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active && "border-primary ring-2 ring-primary/40",
              )}
            >
              <span
                data-theme={preset.name}
                aria-hidden="true"
                className="flex shrink-0 overflow-hidden rounded-full border border-border"
              >
                <span className="size-6 bg-primary" />
                <span className="size-6 bg-secondary" />
                <span className="size-6 bg-accent" />
              </span>
              <span className="min-w-0 text-sm font-medium">
                {preset.label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
