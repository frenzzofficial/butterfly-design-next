import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";

/**
 * Writes public/robots.txt and public/sitemap.xml before dev and build.
 *
 * Next's robots.ts / sitemap.ts route handlers cannot be combined with
 * `output: "export"` while `cacheComponents` is on, so these two files are
 * generated instead. They are plain static files, which every host can serve.
 *
 * To add pages to the sitemap, list their paths in ROUTES below.
 */

// Public routes included in the sitemap.
const ROUTES = ["/"];

// Load .env files the same way `next build` does, so NEXT_PUBLIC_SITE_URL
// resolves to the same value here and in the app.
loadEnvConfig(process.cwd(), false);

const PUBLIC_DIR = path.join(process.cwd(), "public");

const DEFAULT_SITE_URL = "http://localhost:3000";

const resolveSiteUrl = (): string => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

  try {
    return new URL(raw).toString().replace(/\/+$/, "");
  } catch {
    throw new Error(`[seo] NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}"`);
  }
};

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const run = async () => {
  const origin = resolveSiteUrl();

  const urls = ROUTES.map((route) => {
    const loc = route === "/" ? `${origin}/` : `${origin}${route}`;
    const priority = route === "/" ? "1.0" : "0.7";

    return [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      "    <changefreq>monthly</changefreq>",
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  });

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  const robots = [
    "User-Agent: *",
    "Allow: /",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");

  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap, "utf8");
  await writeFile(path.join(PUBLIC_DIR, "robots.txt"), robots, "utf8");

  console.log(`[seo] Wrote robots.txt and sitemap.xml for ${origin}`);
};

run().catch((error: unknown) => {
  console.error("[seo] Failed to write SEO files:", error);

  process.exit(1);
});
