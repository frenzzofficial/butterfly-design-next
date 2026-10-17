import { envAppConfig } from "../env/app.env";
import { envClientConfig } from "../env/client.env";
import { envPublicConfig } from "../env/public.env";
import { envSocialConfig } from "../env/social.env";
import { themeConfig } from "./theme.config";

const apiBaseUrl = `${envClientConfig.clientOrigin}/${envClientConfig.clientPrefix}`;

const appConfig = {
  // Application
  app: {
    version: envPublicConfig.APP_VERSION,
    environment: envAppConfig.NODE_ENV,
    locale: "en",
    timezone: "UTC",
  },

  // Website
  site: {
    name: envPublicConfig.APP_NAME,
    title: envPublicConfig.SITE_TITLE,
    description: envPublicConfig.APP_DESCRIPTION,
    url: envPublicConfig.SITE_URL,
    logo: envPublicConfig.LOGO_URL,
    ogImage: envPublicConfig.OG_IMAGE_URL,
    theme: envPublicConfig.ACTIVE_THEME,
    designPreset: envPublicConfig.ACTIVE_DESIGN_PRESET,
    titleTemplate: "%s | Next Template",
  },

  // Author
  author: {
    name: envSocialConfig.AUTHOR_NAME,
    handle: envSocialConfig.AUTHOR_HANDLE,
    email: envSocialConfig.AUTHOR_EMAIL,
  },

  // Social Profiles
  social: {
    twitter: {
      name: "Twitter",
      handle: envSocialConfig.TWITTER,
      cardType: "summary_large_image",
      icon: "",
    },

    linkedin: {
      name: "LinkedIn",
      handle: envSocialConfig.LINKEDIN,
      cardType: "summary_large_image",
      icon: "",
    },

    github: {
      name: "GitHub",
      handle: envSocialConfig.GITHUB,
      cardType: "summary_large_image",
      icon: "",
    },
  },

  // Repository / Git
  repository: {
    repositoryName: envSocialConfig.CURRENT_REPOSITORY,
    repositoryUrl: `https://github.com/${envSocialConfig.AUTHOR_HANDLE}/${envSocialConfig.CURRENT_REPOSITORY}/`,
    imageUrl: `https://raw.githubusercontent.com/${envSocialConfig.AUTHOR_HANDLE}/${envSocialConfig.CURRENT_REPOSITORY}/refs/heads/main/public/`,
  },

  // Search Engine Verification
  verification: {
    google: envPublicConfig.GOOGLE_VERIFICATION,
  },

  // Application Logging
  logging: {
    enabled: envAppConfig.NODE_ENV !== "production",
    stackTrace: envAppConfig.NODE_ENV !== "production",
  },

  // HTTP Headers
  headers: {
    requestId: "X-Request-Id",
    traceId: "X-Trace-Id",
    poweredBy: "X-Powered-By",
  },

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },

  // Responsive Breakpoints
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },

  // Theme
  theme: themeConfig,

  // Animation / Motion
  motion: {
    duration: {
      instant: 100,
      fast: 150,
      base: 250,
      slow: 400,
    },
  },

  // Application Routes
  routes: {
    // Primary Pages
    home: "/",
    about: "/about",
    notFound: "/404",

    // SEO
    seo: {
      robots: "/robots.txt",
      sitemap: "/sitemap.xml",
    },

    // Services
    services: {
      webDevelopment: "/web-development",
      backend: "/backend-development",
      performanceSeo: "/performance-seo",
      authenticationSecurity: "/authentication-security",
    },

    // Legal Company
    legal: {
      contact: "/contact",
      privacy: "/privacy",
      terms: "/terms",
    },

    // System / SEO Assets
    system: {
      favicon: "/favicon.ico",
      logo: "/logo.png",
      robots: "/robots.txt",
      sitemap: "/sitemap.xml",
    },

    auth: {
      signIn: "/auth/signin",
      signUp: "/auth/signup",
      profile: "/profile",
    },
  },

  // API
  api: {
    baseUrl: apiBaseUrl,
  },
} as const;

export default appConfig;
