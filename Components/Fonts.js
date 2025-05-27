"use client";

import { useEffect } from "react";

export function Fonts() {
  useEffect(() => {
    // Preload critical fonts immediately
    const preloadFonts = ["/fonts/GeistVF.woff", "/fonts/GeistMonoVF.woff"];

    preloadFonts.forEach((fontUrl) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = "font/woff";
      link.href = fontUrl;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });

    // This will create a <style> tag in the document <head> with the font definitions
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'GeistVF';
        src: url('/fonts/GeistVF.woff') format('woff');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'GeistMonoVF';
        src: url('/fonts/GeistMonoVF.woff') format('woff');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
      }

      /* Remove Google Fonts import to prevent conflicts with Next.js Google Fonts API */
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up preload links
      preloadFonts.forEach((fontUrl) => {
        const preloadLink = document.querySelector(`link[href="${fontUrl}"]`);
        if (preloadLink) {
          document.head.removeChild(preloadLink);
        }
      });

      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
}
