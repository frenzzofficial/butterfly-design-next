import appConfig from "@/packages/configs/app.config";

/**
 * Prefixes a root-relative public asset path with the configured base path.
 *
 * `next/link` adds the base path for you, but plain asset URLs (an unoptimized
 * <Image>, <link> tags, manifest entries) are left untouched. This matters when
 * the site lives under a sub-path, such as GitHub Pages project sites.
 *
 *   assetPath("/logo.png") // "/butterfly-design-next/logo.png"
 */
export const assetPath = (path: string): string => {
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path)) return path;
  return `${appConfig.site.basePath}${path.startsWith("/") ? path : `/${path}`}`;
};
