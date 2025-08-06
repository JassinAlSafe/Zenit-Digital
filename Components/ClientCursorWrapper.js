"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the CustomCursor component with no SSR
// This is necessary because it uses browser APIs that aren't available during server-side rendering
const CustomCursor = dynamic(() => import("./CustomCursor"), {
  ssr: false,
  loading: () => null, // Prevent any loading state from appearing
});

export default function ClientCursorWrapper() {
  const [isClient, setIsClient] = useState(false);

  // Only render the cursor after client-side hydration to prevent flickering
  useEffect(() => {
    // Check if we're on a touch device
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    // Only enable cursor on non-touch devices
    if (!isTouchDevice) {
      setIsClient(true);
    }
  }, []);

  // Only render the cursor if:
  // 1. We're in a client environment
  // 2. Not on a touch device
  // 3. The mouse has moved at least once

  // Only render the cursor if we're in a client environment and not on touch device
  return isClient ? <CustomCursor /> : null;
}
