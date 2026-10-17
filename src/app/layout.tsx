import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import appConfig from "@/packages/configs/app.config";
import seo from "@/packages/seo";
import { getThemeFontClassName } from "@/packages/utils/fonts";

export const metadata: Metadata = seo;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${getThemeFontClassName(appConfig.site.designPreset)} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
