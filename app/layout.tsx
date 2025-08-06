import Script from "next/script";
import "./globals.css";
import { CursorProvider } from "../utils/CursorContext";
import ClientCursorWrapper from "../Components/ClientCursorWrapper";
import NavbarWrapper from "../Components/NavbarWrapper";
import { Fonts } from "../Components/Fonts";
import EnvironmentInfo from "../Components/EnvironmentInfo";
import GsapInitializer from "../Components/GsapInitializer";
import { FontProvider } from "../Components/FontProvider";
import NavigationHandler from "../Components/NavigationHandler";
import BrowserCompatInit from "../Components/BrowserCompatInit";
import { metadata, viewport } from "./metadata";

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
        <FontProvider>
          <BrowserCompatInit />
          <NavigationHandler />
          <Fonts />
          <EnvironmentInfo />
          <GsapInitializer />
          <CursorProvider>
            <NavbarWrapper />
            {children}
            <ClientCursorWrapper />
          </CursorProvider>
        </FontProvider>
      </body>
    </html>
  );
}
