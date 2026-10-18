import type { Metadata } from "next";
import appConfig from "@/packages/configs/app.config";
import { openGraph } from "@/packages/seo/openGraph";
import { twitter } from "@/packages/seo/twitter";

const keywords = [
  "nextjs",
  "react",
  "typescript",
  "tailwindcss",
  "starter-template",
  "ui-kit",
  "design-system",
  "dark-mode",
  "themes",
];

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.site.url),

  title: {
    default: appConfig.site.title,
    template: appConfig.site.titleTemplate,
  },

  description: appConfig.site.description,

  keywords,

  authors: [
    {
      name: appConfig.author.name,
      url: appConfig.site.url,
    },
  ],

  creator: appConfig.author.name,

  openGraph,

  twitter,

  // Only emit the verification tag when a token is configured.
  verification: appConfig.verification.google
    ? { google: appConfig.verification.google }
    : undefined,
};
