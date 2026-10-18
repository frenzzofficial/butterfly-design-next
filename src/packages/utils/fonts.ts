import {
  type DesignPresetName,
  getDesignPreset,
} from "@/packages/configs/design-preset.config";
import fontsConfig from "@/packages/configs/fonts.config";

/**
 * Shape returned by every next/font loader (Oxanium, Inika, ...).
 * Only the pieces we consume are described.
 */
type FontLoader = {
  variable: string;
  className: string;
};

/** Fonts every preset uses unless it is listed in PRESET_FONTS below. */
const DEFAULT_PRESET_FONTS: readonly FontLoader[] = [
  fontsConfig.sans,
  fontsConfig.serif,
  fontsConfig.mono,
];

/**
 * Per-preset font overrides. A preset not listed here uses
 * DEFAULT_PRESET_FONTS. Lives in this server-only file so font loaders never
 * reach the browser bundle through the preset list.
 *
 * Example:  "cosmic-night": [fontsConfig.mono],
 */
const PRESET_FONTS: Partial<Record<DesignPresetName, readonly FontLoader[]>> =
  {};

/**
 * Fonts mounted on <html> regardless of the active design preset.
 * These are intended for personal and brand typography, such as
 * className="font-brand" on a hero heading.
 */
const BRAND_FONTS: readonly FontLoader[] = [fontsConfig.custom];

/**
 * Returns the className string that mounts every next/font variable on <html>:
 * the fonts of the active design preset plus the theme-independent brand fonts.
 *
 * Those classes define --font-oxanium, --font-inika, ..., which globals.css
 * maps onto Tailwind's font-sans / font-serif / font-mono / font-brand.
 *
 * Theme CSS is imported once in globals.css. Every preset's palette ships in
 * the bundle and only the matching `data-theme` attribute activates it, so this
 * function never imports CSS itself.
 */
export const getThemeFontClassName = (themeName: DesignPresetName): string => {
  // getDesignPreset throws for an unregistered name, so a typo fails the build.
  getDesignPreset(themeName);
  const fonts = PRESET_FONTS[themeName] ?? DEFAULT_PRESET_FONTS;

  return [...fonts, ...BRAND_FONTS].map((font) => font.variable).join(" ");
};
