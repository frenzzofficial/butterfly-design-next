import type { Metadata } from "next";
import appConfig from "@/packages/configs/app.config";

type OpenGraphMetadata = NonNullable<Metadata["openGraph"]>;

const { site } = appConfig;

// A dedicated 1200x630 image is best; without one the square logo is used.
const image = site.ogImage
  ? { url: site.ogImage, width: 1200, height: 630, alt: site.title }
  : { url: site.logo, width: 1024, height: 1024, alt: site.title };

export const openGraph: OpenGraphMetadata = {
  type: "website",
  siteName: site.title,
  title: site.title,
  description: site.description,
  url: site.url,
  images: [image],
};
