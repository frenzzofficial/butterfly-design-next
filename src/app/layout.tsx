import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import appConfig from "@/packages/configs/app.config";
import {
  DESIGN_PRESET_NAMES,
  DESIGN_PRESET_STORAGE_KEY,
} from "@/packages/configs/design-preset.config";
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

// Restores the visitor's saved design preset before first paint, so a returning
// visitor never sees the default preset flash. It only runs for valid names.
const restorePresetScript = `try{var p=localStorage.getItem(${JSON.stringify(
  DESIGN_PRESET_STORAGE_KEY,
)});if(${JSON.stringify(DESIGN_PRESET_NAMES)}.indexOf(p)>-1){document.documentElement.setAttribute("data-theme",p)}}catch(e){}`;

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
      data-theme={appConfig.site.designPreset}
      className={`${getThemeFontClassName(appConfig.site.designPreset)} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="restore-design-preset" strategy="beforeInteractive">
          {restorePresetScript}
        </Script>
        <AppClientLayout
          defaultPreset={appConfig.site.designPreset}
          themeStorageKey={appConfig.theme.storageKey}
          defaultTheme={appConfig.theme.defaultTheme}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppClientLayout>
      </body>
    </html>
  );
}
