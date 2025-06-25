"use client";

import { useEffect } from "react";
import { initializeGSAP } from "../utils/gsap";

export default function GsapInitializer() {
  useEffect(() => {
    // Initialize GSAP with centralized configuration
    initializeGSAP();
  }, []);

  return null;
}
