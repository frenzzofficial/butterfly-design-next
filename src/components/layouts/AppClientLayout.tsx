"use client";

import { DesignPresetProvider } from "../providers/DesignPresetProvider";
import ThemeProvider from "../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}
const AppClientLayout = ({ children }: AppClientLayoutProps) => {
  return (
    <ThemeProvider>
      <DesignPresetProvider>
        <Header />
        <main className="main screen-height">{children}</main>
        <Footer />
      </DesignPresetProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
