import { Cousine, Inika, Oxanium } from "next/font/google";
import localFont from "next/font/local";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap",
});

const inika = Inika({
  variable: "--font-inika",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const cousine = Cousine({
  variable: "--font-cousine",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

/**
 * Personal/brand font, not tied to a preset. It is mounted on <html> for every
 * page (see BRAND_FONTS in design-preset.config.ts) and exposed as the
 * `font-brand` utility through globals.css.
 *
 * The file is src/assets/fonts/custom.ttf. To use another font, change `src`
 * below (georgia.ttf and brilliant-performer.otf ship in the same folder).
 *
 * The three Google fonts expose --font-oxanium, --font-inika and
 * --font-cousine. globals.css maps them onto Tailwind's font-sans, font-serif
 * and font-mono, so swapping a font means editing this file and that mapping.
 */

const CustomFont = localFont({
  src: "../../assets/fonts/custom.ttf",
  variable: "--font-custom",
  weight: "400",
  style: "normal",
  display: "swap",
});

export default {
  sans: oxanium,
  serif: inika,
  mono: cousine,
  custom: CustomFont,
};
