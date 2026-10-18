import type { Metadata } from "next";
import { metadata } from "@/packages/configs/seo.config";

const seo: Metadata = {
  ...metadata,
};

export default seo;

/**
 * Per-page metadata: the site-wide defaults with the page's own title,
 * description and keywords layered on top.
 *
 * @public
 */
export function getSeo(
  title: string,
  description: string,
  keywords: string[],
): Metadata {
  return {
    ...seo,
    title,
    description,
    keywords,
  };
}
