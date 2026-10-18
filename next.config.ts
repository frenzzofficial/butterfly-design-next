import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

// `bun run build:export` sets STATIC_EXPORT=true. It writes a plain static site
// to ./out that any static host (GitHub Pages, Netlify, S3, ...) can serve.
// A normal `bun run build` keeps the full Next.js server runtime.
const isStaticExport = process.env.STATIC_EXPORT === "true";

// Set NEXT_PUBLIC_BASE_PATH when the site is served from a sub-path, for
// example "/butterfly-design-next" on a GitHub Pages project site. The value is
// inlined at build time, so it must be present when you build.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || undefined;

const nextConfig: NextConfig = {
  reactCompiler: true,
  basePath,
  // Resolved once at build time, so components never read the clock while
  // prerendering (which Cache Components forbids).
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  ...(isStaticExport
    ? {
        // Next does not support Cache Components (PPR) with `output: "export"`,
        // so both flags stay off for the static build.
        output: "export",
        // Serve /about as /about/index.html, which every static host understands.
        trailingSlash: true,
        // The default image optimizer needs a server.
        images: { unoptimized: true },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  nextConfig,
);
