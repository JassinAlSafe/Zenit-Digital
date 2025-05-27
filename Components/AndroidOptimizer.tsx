"use client";

import { useEffect } from "react";

export function AndroidOptimizer() {
  useEffect(() => {
    // Detect Android device
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isOldAndroid = /Android [1-4]/i.test(navigator.userAgent);
    const isLowMemory =
      (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

    if (isAndroid) {
      // Add Android class to body for CSS targeting
      document.body.classList.add("android-device");

      // Add color-scheme meta tag to prevent Samsung browsers from applying dark mode
      // Check if the meta tag already exists to avoid duplicates
      if (!document.querySelector('meta[name="color-scheme"]')) {
        const colorSchemeMetaTag = document.createElement("meta");
        colorSchemeMetaTag.name = "color-scheme";
        colorSchemeMetaTag.content = "light only";
        document.head.appendChild(colorSchemeMetaTag);
      }

      if (isOldAndroid) {
        document.body.classList.add("old-android");
      }

      if (isLowMemory) {
        document.body.classList.add("low-memory");
      }

      // Prevent zoom on input focus (Android specific issue)
      const preventZoom = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute(
              "content",
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            );

            // Restore viewport after blur
            target.addEventListener(
              "blur",
              () => {
                viewport.setAttribute(
                  "content",
                  "width=device-width, initial-scale=1.0"
                );
              },
              { once: true }
            );
          }
        }
      };

      document.addEventListener("focusin", preventZoom);

      // Android performance optimizations
      if (isOldAndroid || isLowMemory) {
        // Disable expensive animations on low-end devices
        const style = document.createElement("style");
        style.textContent = `
          .old-android *,
          .low-memory * {
            animation-duration: 0.01ms !important;
            animation-delay: 0.01ms !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0.01ms !important;
          }
          
          .old-android .animated-text,
          .low-memory .animated-text {
            animation: none !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Fix Android viewport height issues
      const fixViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };

      fixViewportHeight();
      window.addEventListener("resize", fixViewportHeight);
      window.addEventListener("orientationchange", () => {
        setTimeout(fixViewportHeight, 100);
      });

      return () => {
        document.removeEventListener("focusin", preventZoom);
        window.removeEventListener("resize", fixViewportHeight);
        document.body.classList.remove(
          "android-device",
          "old-android",
          "low-memory"
        );

        // Remove the color-scheme meta tag when component unmounts
        const existingColorSchemeTag = document.querySelector(
          'meta[name="color-scheme"]'
        );
        if (existingColorSchemeTag) {
          existingColorSchemeTag.remove();
        }
      };
    }
  }, []);

  return null;
}
