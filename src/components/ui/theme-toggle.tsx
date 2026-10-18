"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const MODES = ["light", "dark", "system"] as const;
type Mode = (typeof MODES)[number];

const isMode = (value: string | undefined): value is Mode =>
  MODES.some((mode) => mode === value);

const icons: Record<Mode, React.ReactNode> = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2m-7.07-14.93 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
    </>
  ),
  dark: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  system: (
    <>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
};

/** Cycles light, dark and system. Renders a neutral state until mounted. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current: Mode = mounted && isMode(theme) ? theme : "system";
  const next = MODES[(MODES.indexOf(current) + 1) % MODES.length];

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      title={`Theme: ${current}`}
      onClick={() => setTheme(next)}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[current]}
      </svg>
      <span className="hidden capitalize sm:inline">{current}</span>
    </Button>
  );
}
