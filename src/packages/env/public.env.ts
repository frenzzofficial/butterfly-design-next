import { z } from "zod";
import { DESIGN_PRESET_NAMES } from "@/packages/configs/design-preset.config";
import { parseEnv } from "@/packages/utils/parse-env";

// Public Environment Schema
const parsedEnvSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z
    .string()
    .trim()
    .min(1)
    .default("butterfly-design-next"),

  NEXT_PUBLIC_APP_VERSION: z.string().trim().min(1).default("1.0.0"),

  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .trim()
    .min(1)
    .default(
      "Butterfly Design Next is a minimalist Next.js starter built for speed and polish. It ships with a reusable, themeable UI kit, a clean project structure, and TypeScript-first conventions, so you can go from idea to launch without rebuilding the basics.",
    ),

  // Site
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),

  NEXT_PUBLIC_SITE_TITLE: z
    .string()
    .trim()
    .min(1)
    .default("Top 1% next.js starter template for your frontend development"),

  // Sub-path the site is served from, e.g. "/butterfly-design-next" on GitHub
  // Pages project sites. Leave empty for a custom domain or the site root.
  NEXT_PUBLIC_BASE_PATH: z
    .string()
    .trim()
    .regex(
      /^(\/[^/\s]+)*$/,
      'NEXT_PUBLIC_BASE_PATH must be empty or start with "/" and not end with "/"',
    )
    .default(""),

  NEXT_PUBLIC_LOGO_URL: z.string().trim().min(1).default("/logo.png"),

  NEXT_PUBLIC_OG_IMAGE_URL: z.string().trim().optional(),

  // Preset
  NEXT_PUBLIC_ACTIVE_DESIGN_PRESET: z
    .enum(DESIGN_PRESET_NAMES)
    .default("cyantrix-theme"),

  // Theme
  NEXT_PUBLIC_ACTIVE_THEME: z
    .enum(["system", "light", "dark"])
    .default("system"),

  // Google Search Console verification token (omitted from <head> when unset)
  NEXT_PUBLIC_GOOGLE_VERIFICATION: z.string().trim().min(1).optional(),
});

// Validated Public Environment
const parsedEnv = parseEnv(parsedEnvSchema, "public");

// Public Application Config
export const envPublicConfig = Object.freeze({
  // App
  APP_NAME: parsedEnv.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedEnv.NEXT_PUBLIC_APP_VERSION,
  APP_DESCRIPTION: parsedEnv.NEXT_PUBLIC_APP_DESCRIPTION,

  // Site
  SITE_URL: parsedEnv.NEXT_PUBLIC_SITE_URL,
  BASE_PATH: parsedEnv.NEXT_PUBLIC_BASE_PATH,
  SITE_TITLE: parsedEnv.NEXT_PUBLIC_SITE_TITLE,
  LOGO_URL: parsedEnv.NEXT_PUBLIC_LOGO_URL,
  OG_IMAGE_URL: parsedEnv.NEXT_PUBLIC_OG_IMAGE_URL,

  // Preset & Theme
  ACTIVE_DESIGN_PRESET: parsedEnv.NEXT_PUBLIC_ACTIVE_DESIGN_PRESET,
  ACTIVE_THEME: parsedEnv.NEXT_PUBLIC_ACTIVE_THEME,

  // Google Verification
  GOOGLE_VERIFICATION: parsedEnv.NEXT_PUBLIC_GOOGLE_VERIFICATION,
});

/** @public */
export type EnvPublicConfig = typeof envPublicConfig;
