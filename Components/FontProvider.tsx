"use client";

import { Inter, Fira_Code } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  variable: "--font-fira-code",
});

export function FontProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply font classes to document body with fallbacks
    const currentClasses = document.body.className;
    document.body.className = `${inter.className} ${currentClasses}`;

    // Create CSS variables for the fonts
    document.documentElement.style.setProperty(
      "--font-inter",
      inter.style.fontFamily
    );
    document.documentElement.style.setProperty(
      "--font-fira-code",
      firaCode.style.fontFamily
    );

    // Add cross-platform font rendering optimizations
    document.documentElement.style.setProperty(
      "--font-feature-settings",
      '"kern" 1, "liga" 1, "calt" 1'
    );
  }, []);

  return (
    <div className={`${inter.variable} ${firaCode.variable}`}>{children}</div>
  );
}
