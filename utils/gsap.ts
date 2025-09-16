import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimationConfig, GSAPCleanupOptions } from "../types/components";

// Global GSAP configuration - call once in your app
export const configureGSAP = () => {
  if (typeof window !== "undefined") {
    // Configure GSAP's non-tween-related settings
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
      trialWarn: false,
      units: { left: "%", top: "%", rotation: "rad" }
    });

    // Set GSAP's global tween defaults
    gsap.defaults({
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });
  }
};

// GSAP setup utility - should be called in each component's useEffect
export const setupGSAP = () => {
  if (typeof window !== "undefined") {
    // Register plugins in each component (per GSAP best practices)
    gsap.registerPlugin(ScrollTrigger);
  }
};

// Animation constants used throughout the app
export const ANIMATION_CONFIG: AnimationConfig = {
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

// Utility function for proper GSAP cleanup (per React best practices)
export const cleanupGSAP = (options: GSAPCleanupOptions = {}) => {
  const { triggers = [], tweens = [] } = options;
  // Kill ScrollTriggers first
  triggers.forEach(trigger => trigger?.kill());
  // Then kill tweens
  tweens.forEach(tween => tween?.kill());
};

// Helper to create ScrollTrigger with automatic cleanup tracking
export const createScrollTrigger = (config: ScrollTrigger.Vars, triggersArray: ScrollTrigger[]) => {
  const trigger = ScrollTrigger.create(config);
  triggersArray.push(trigger);
  return trigger;
};

// Register custom GSAP effects for reuse
export const registerCustomEffects = () => {
  if (typeof window !== "undefined") {
    // Custom fade effect with stagger
    gsap.registerEffect({
      name: "fadeReveal",
      effect: (targets: any, config: any) => {
        return gsap.to(targets, {
          opacity: config.opacity || 1,
          y: 0,
          duration: config.duration || 1,
          stagger: config.stagger || 0.1,
          ease: config.ease || "power2.out",
          overwrite: "auto",
          force3D: true
        });
      },
      defaults: { duration: 1, opacity: 1, stagger: 0.1 },
      extendTimeline: true
    });

    // Custom magnetic effect
    gsap.registerEffect({
      name: "magneticHover",
      effect: (targets: any, config: any) => {
        return gsap.to(targets, {
          x: config.x || 0,
          y: config.y || 0,
          scale: config.scale || 1.1,
          duration: config.duration || 0.4,
          ease: config.ease || "power2.out",
          overwrite: "auto",
          force3D: true
        });
      },
      defaults: { duration: 0.4, scale: 1.1 },
      extendTimeline: true
    });
  }
};

// Master GSAP initialization - call once in your app root
export const initializeGSAP = () => {
  if (typeof window !== "undefined") {
    configureGSAP();
    registerCustomEffects();
    setupGSAP();
  }
};

// Export for direct use
export { gsap, ScrollTrigger };