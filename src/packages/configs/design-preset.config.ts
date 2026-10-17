import fontsConfig from "./fonts.config";

/**
 * Shape returned by every next/font loader (Geist, Oxanium, Inika, ...).
 * We only care about the pieces we actually consume.
 */
type FontLoader = {
  variable: string;
  className: string;
};

export type DesignPreset = {
  /**
   * MUST exactly match:
   * - The CSS filename in the corresponding preset directory.
   * - The [data-theme="<name>"] selector defined inside that file.
   */
  name: string;
  label: string;
  category: "custom" | "color";
  description: string;
  fonts: readonly FontLoader[];
  /** CSS file path, retained for reference and tooling. */
  src: string;
};

// REGISTER YOUR DESIGN PRESETS HERE
export const DESIGN_PRESETS = [
  {
    name: "cosmic-night",
    label: "Cosmic Night",
    category: "custom",
    description: "A cosmic dark design with a deep, atmospheric aesthetic.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/custom-themes/cosmic-night.css",
  },
  {
    name: "cyantrix-theme",
    label: "Cyantrix",
    category: "custom",
    description: "A cyan and teal design with a modern tech aesthetic.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/custom-themes/cyantrix-theme.css",
  },
  {
    name: "amber-theme",
    label: "Amber",
    category: "color",
    description: "A warm, soft amber color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/amber-theme.css",
  },
  {
    name: "emerald-theme",
    label: "Emerald",
    category: "color",
    description: "A fresh, soft emerald color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/emerald-theme.css",
  },
  {
    name: "mono-theme",
    label: "Mono",
    category: "color",
    description: "A clean monochromatic color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/mono-theme.css",
  },
  {
    name: "rose-theme",
    label: "Rose",
    category: "color",
    description: "A soft rose color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/rose-theme.css",
  },
  {
    name: "sky-theme",
    label: "Sky",
    category: "color",
    description: "A light, airy sky-blue color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/sky-theme.css",
  },
  {
    name: "slate-theme",
    label: "Slate",
    category: "color",
    description: "A balanced slate color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/slate-theme.css",
  },
  {
    name: "stone-theme",
    label: "Stone",
    category: "color",
    description: "A warm, neutral stone color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/stone-theme.css",
  },
  {
    name: "teal-theme",
    label: "Teal",
    category: "color",
    description: "A calm teal color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/teal-theme.css",
  },
  {
    name: "violet-theme",
    label: "Violet",
    category: "color",
    description: "A soft violet color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/violet-theme.css",
  },
  {
    name: "zinc-theme",
    label: "Zinc",
    category: "color",
    description: "A subtle zinc color preset.",
    fonts: [fontsConfig.sans, fontsConfig.serif, fontsConfig.mono],
    src: "@/styles/themes/color-themes/zinc-theme.css",
  },
] as const satisfies readonly DesignPreset[];

/**
 * Registered design preset names.
 */
export const DESIGN_PRESET_NAMES = DESIGN_PRESETS.map((preset) => preset.name);

export type DesignPresetName = (typeof DESIGN_PRESETS)[number]["name"];

/**
 * Fonts mounted on <html> regardless of the active design preset.
 * These are intended for personal and brand typography, such as
 * className="font-brilliant" on a hero heading.
 */
export const BRAND_FONTS: readonly FontLoader[] = [fontsConfig.custom];

/**
 * Returns a registered design preset by name.
 */
export const getDesignPreset = (name: DesignPresetName): DesignPreset => {
  const preset = DESIGN_PRESETS.find((preset) => preset.name === name);

  if (!preset) {
    throw new Error(
      `Unknown design preset "${name}".Register it in packages / configs / styles.config.ts first.`,
    );
  }

  return preset;
};
