"use client";

import Script from "next/script";
import "./globals.css";
import { CursorProvider } from "../utils/CursorContext";
import ClientCursorWrapper from "../Components/ClientCursorWrapper";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NavbarWrapper from "../Components/NavbarWrapper";

// Metadata needs to be in a separate file for Next.js App Router
// Create a separate file called metadata.ts with this content:
/*
export const metadata: Metadata = {
  title: "Zenit Digital",
  description: "Landing page for Zenit Digital",
  icons: {
    icon: "/favicon.svg", // This should be in `public/`
  },
};
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Track navigation paths in sessionStorage
    const previousPath = sessionStorage.getItem("previousPath");
    const currentPath = pathname;

    // Check if we're coming back from a specific path like booking
    if (
      previousPath &&
      previousPath.includes("/booking") &&
      currentPath === "/"
    ) {
      // If coming back from booking page to home, reload
      window.location.reload();
    }

    // Store current path for next navigation
    sessionStorage.setItem("previousPath", currentPath);
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <Script
          id="cookiebot"
          strategy="afterInteractive"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="74ed7c8b-7181-40f8-9019-c8770f9209f8"
          data-blockingmode="auto"
        />
        {process.env.NODE_ENV === "production" && (
          <Script
            id="usercentrics-cmp"
            strategy="afterInteractive"
            src="https://web.cmp.usercentrics.eu/ui/loader.js"
            data-settings-id="2zT-81iaBdXcEU"
          />
        )}
      </head>
      <body>
        <CursorProvider>
          <NavbarWrapper />
          {children}
          <ClientCursorWrapper />
        </CursorProvider>
      </body>
    </html>
  );
}
