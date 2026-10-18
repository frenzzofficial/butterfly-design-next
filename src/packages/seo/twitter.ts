import type { Metadata } from "next";
import appConfig from "@/packages/configs/app.config";

type TwitterMetadata = NonNullable<Metadata["twitter"]>;

const { site, social } = appConfig;

export const twitter: TwitterMetadata = {
  // The large card needs a wide image, so fall back to the compact card when
  // only the square logo is available.
  card: site.ogImage ? social.twitter.cardType : "summary",
  title: site.title,
  description: site.description,
  images: [site.ogImage ?? site.logo],
};
