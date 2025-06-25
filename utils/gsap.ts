import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once globally
let isGSAPInitialized = false;

export const initializeGSAP = () => {
  if (!isGSAPInitialized && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set global GSAP defaults
    gsap.defaults({
      ease: "power3.out",
      duration: 1,
    });
    
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none none",
      start: "top 80%",
    });
    
    isGSAPInitialized = true;
  }
};

// Animation constants used throughout the app
export const ANIMATION_CONFIG = {
  durations: {
    fast: 0.3,
    normal: 1,
    slow: 1.2,
    letterStagger: 0.04,
  },
  ease: {
    power1: "power1.out",
    power2: "power2.out", 
    power3: "power3.out",
    power4: "power4.out",
    elastic: "elastic.out(1, 0.3)",
    linear: "linear",
  },
  offsets: {
    letterReveal: 160,
    smallReveal: 60,
  },
  scrollTrigger: {
    start: "top 80%",
    centerStart: "top center",
    centerEnd: "bottom center",
  },
} as const;

// Utility function for proper GSAP cleanup
export const cleanupGSAP = (
  triggers: ScrollTrigger[] = [],
  tweens: gsap.core.Tween[] = []
) => {
  triggers.forEach(trigger => trigger?.kill());
  tweens.forEach(tween => tween?.kill());
};

// Export for direct use
export { gsap, ScrollTrigger };