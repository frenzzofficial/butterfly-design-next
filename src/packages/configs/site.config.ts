import appConfig from "@/packages/configs/app.config";

// Every piece of text shown on the site lives here, so it can be edited in one
// place now and swapped for a language module later.
export const siteConfig = {
  brand: "Butterfly Design Next",

  nav: [
    { label: "Features", href: "/#features" },
    { label: "Presets", href: "/#presets" },
  ],

  hero: {
    badge: "Next.js 16 · React 19 · Tailwind CSS 4",
    title: "A polished Next.js starter, ready to ship",
    description: appConfig.site.description,
    primaryCta: {
      label: "Get the template",
      href: appConfig.repository.repositoryUrl,
    },
    secondaryCta: { label: "Explore features", href: "/#features" },
  },

  features: {
    title: "Everything a launch needs",
    description:
      "Sensible defaults for the parts of a project you would otherwise rebuild every time.",
    items: [
      {
        title: "Themeable by design",
        description:
          "Light and dark modes plus switchable design presets, all driven by CSS variables.",
      },
      {
        title: "Typed configuration",
        description:
          "Environment variables are validated with Zod and exposed through one typed config.",
      },
      {
        title: "Modern stack",
        description:
          "App Router, React Compiler, Tailwind CSS v4 and TypeScript in strict mode.",
      },
      {
        title: "Static export ready",
        description:
          "Build to a plain static folder and host it on GitHub Pages or any static host.",
      },
      {
        title: "Quality gates",
        description:
          "Biome, commitlint, Husky, knip and size-limit keep the codebase clean as it grows.",
      },
      {
        title: "SEO built in",
        description:
          "Metadata, Open Graph, robots.txt and sitemap.xml are wired up from a single config.",
      },
    ],
  },

  presets: {
    title: "Pick a look",
    description:
      "Every preset ships with a light and a dark palette. Choose one here or from the header.",
  },

  footer: {
    tagline: "Built with Next.js, React and Tailwind CSS.",
  },

  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has moved.",
    cta: "Back to home",
  },
} as const;
