import { z } from "zod";
import { parseEnv } from "@/packages/utils/parse-env";

// Social Environment Schema
const parsedEnvSchema = z.object({
  // Social
  NEXT_PUBLIC_TWITTER: z
    .string()
    .trim()
    .default("https://twitter.com/frenzzofficial"),

  NEXT_PUBLIC_GITHUB: z
    .string()
    .trim()
    .default("https://github.com/frenzzofficial"),

  NEXT_PUBLIC_LINKEDIN: z
    .string()
    .trim()
    .default("https://www.linkedin.com/company/frenzz/"),

  // Author
  NEXT_PUBLIC_AUTHOR_NAME: z.string().trim().min(1).default("frenzzofficial"),

  NEXT_PUBLIC_AUTHOR_HANDLE: z.string().trim().min(1).default("frenzzofficial"),

  NEXT_PUBLIC_AUTHOR_EMAIL: z.email().default("contact@frenzz.in"),

  NEXT_PUBLIC_CURRENT_REPOSITORY: z
    .string()
    .trim()
    .min(1)
    .default("butterfly-design-next"),
});

// Validated Social Environment
const parsedEnv = parseEnv(parsedEnvSchema, "social");

// Social Application Config
export const envSocialConfig = Object.freeze({
  // Social
  TWITTER: parsedEnv.NEXT_PUBLIC_TWITTER,
  LINKEDIN: parsedEnv.NEXT_PUBLIC_LINKEDIN,
  GITHUB: parsedEnv.NEXT_PUBLIC_GITHUB,

  // Author
  AUTHOR_NAME: parsedEnv.NEXT_PUBLIC_AUTHOR_NAME,
  AUTHOR_HANDLE: parsedEnv.NEXT_PUBLIC_AUTHOR_HANDLE,
  AUTHOR_EMAIL: parsedEnv.NEXT_PUBLIC_AUTHOR_EMAIL,

  // repository

  CURRENT_REPOSITORY: parsedEnv.NEXT_PUBLIC_CURRENT_REPOSITORY,
});

/** @public */
export type EnvSocialConfig = typeof envSocialConfig;
