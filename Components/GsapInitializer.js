"use client";

import { useEffect } from "react";

export default function GsapInitializer() {
  useEffect(() => {
    // GSAP components will register plugins individually per best practices
    // This component can handle global GSAP configurations if needed
    if (typeof window !== "undefined") {
      // Set any global GSAP configurations here if needed
      console.log("GSAP environment ready");
    }
  }, []);

  return null;
}
