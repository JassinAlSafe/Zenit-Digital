"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import zenitLogo from "./../assets/Frame.svg"; // Adjust the path if needed

export function Loading({ onLoaded }) {  // Change to named export
  const logoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoaded) onLoaded(); // Only call onLoaded if it exists
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    // Set initial state
    gsap.set(logo, {
      opacity: 0.5,
      scale: 1,
      transformOrigin: "center center"
    });

    // Create pulsing animation with complete GSAP syntax
    gsap.to(logo, {
      opacity: 1,
      scale: 1.1,
      duration: 0.8,
      delay: 0,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
      overwrite: "auto",
      force3D: true,
      immediateRender: false,
      onStart: () => {
        // Animation started
      },
      onRepeat: () => {
        // Each pulse cycle
      }
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(logo);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <img
        ref={logoRef}
        src={zenitLogo.src}
        alt="Zenit Digital Logo"
        className="w-32 h-32"
      />
    </div>
  );
}
