"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "../Components/AboutSection";
import StackedCardsContainer from "../Components/SectionsContainer";
import Test from "../Components/test";
import Footer from "../Components/Footer";
import TextScroll from "../Components/TextScroll";
import Cookiebot from "../Components/Cookiebot";

import TestHeader from "../Components/TestHeader";
// import Home from "../Components/Home";
import Image from "next/image";
import DebugPanel from "../Components/DebugPanel";

export default function Page() {
  // Enhanced loading state management
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const [componentsReady, setComponentsReady] = useState(false);
  const [forceRefreshTime, setForceRefreshTime] = useState(Date.now());
  const pageContentRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountCheckRef = useRef<NodeJS.Timeout | null>(null);

  // This function will be called by TestHeader when its animations start
  const handleContentAnimationStart = () => {
    console.log("✅ Content animation started - marking as ready");
    setContentReady(true);
  };

  // Force refresh function for problematic loads
  const forceFullRefresh = () => {
    console.log("🔄 Force refreshing page...");
    // Clear all timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    if (mountCheckRef.current) clearTimeout(mountCheckRef.current);

    // Hard refresh
    window.location.reload();
  };

  // Check if essential components are properly mounted with their content
  const checkComponentsReady = () => {
    console.log("🔍 Checking if components are ready...");

    // Check for essential elements with more specific selectors
    const heroSection = document.querySelector(".hero-section");
    const heroTitle = document.querySelector(".hero-section h1");
    const wordSpans = document.querySelectorAll(".word");
    const aboutSection = document.querySelector("#about");
    const aboutText = document.querySelector(".about-text");

    console.log("Hero section found:", !!heroSection);
    console.log("Hero title found:", !!heroTitle);
    console.log("Word spans found:", wordSpans.length);
    console.log("About section found:", !!aboutSection);
    console.log("About text found:", !!aboutText);

    if (
      heroSection &&
      heroTitle &&
      wordSpans.length >= 6 &&
      aboutSection &&
      aboutText
    ) {
      console.log("✅ All essential components are ready");
      setComponentsReady(true);
      return true;
    } else {
      console.warn("❌ Some essential components are missing");
      console.log("Missing components check:");
      console.log("- Hero section:", !heroSection);
      console.log("- Hero title:", !heroTitle);
      console.log("- Word spans (expected 6+):", wordSpans.length < 6);
      console.log("- About section:", !aboutSection);
      console.log("- About text:", !aboutText);
      return false;
    }
  };

  // Add this useEffect to handle page refresh on back navigation
  useEffect(() => {
    // Store the current path in sessionStorage when the component mounts
    const currentPath = window.location.pathname;

    // Store current path for reference
    sessionStorage.setItem("previousPath", currentPath);

    // Listen for popstate events (back/forward navigation)
    const handlePopState = () => {
      // Only reload if we're on the home page and coming back from somewhere else
      if (window.location.pathname === "/") {
        timeoutRef.current = setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Clean up event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Listen for GSAP ready event
  useEffect(() => {
    const handleGsapReady = () => {
      console.log("✅ GSAP is ready");
      setGsapReady(true);
    };

    // Check if GSAP is already ready
    if (
      typeof window !== "undefined" &&
      (window as any).gsap &&
      (window as any).ScrollTrigger
    ) {
      console.log("✅ GSAP already available");
      setGsapReady(true);
    } else {
      // Listen for the GSAP ready event
      window.addEventListener("gsapReady", handleGsapReady);
    }

    return () => {
      window.removeEventListener("gsapReady", handleGsapReady);
    };
  }, []);

  // Main loading effect with comprehensive fallbacks
  useEffect(() => {
    if (!gsapReady) {
      console.log("⏳ Waiting for GSAP to be ready...");
      return;
    }

    console.log("🚀 GSAP is ready, setting up page logic...");

    // Register GSAP plugins inside useEffect to ensure it only runs client-side
    gsap.registerPlugin(ScrollTrigger);

    // Setup scroll triggers
    const setupScrollTriggers = () => {
      const sections = document.querySelectorAll(
        "section:not(.selected-works-section):not(.services-section)"
      );

      const scrollTriggers: ScrollTrigger[] = [];

      sections.forEach((section, index) => {
        const bgColor = section.getAttribute("data-bg") || "white";
        const textColor = section.getAttribute("data-text") || "black";

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            document.body.style.backgroundColor = bgColor;
            document.body.style.color = textColor;
          },
          onLeaveBack: () => {
            const prevSection = sections[index - 1];
            const prevBgColor = prevSection?.getAttribute("data-bg") || "white";
            const prevTextColor =
              prevSection?.getAttribute("data-text") || "black";

            document.body.style.backgroundColor = prevBgColor;
            document.body.style.color = prevTextColor;
          },
        });

        scrollTriggers.push(trigger);
      });

      return scrollTriggers;
    };

    // Create a function to hide the loading screen
    const hideLoadingScreen = () => {
      console.log("🎬 Hiding loading screen...");
      const exitTl = gsap.timeline({
        onComplete: () => {
          // Set loading to false once animation completes to remove from DOM
          setLoading(false);
          console.log("✅ Loading screen hidden, content now visible");
        },
      });

      exitTl
        .to(".loading-screen", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(".loading-screen", {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
        });
    };

    // Setup scroll triggers
    const scrollTriggers = setupScrollTriggers();

    // Check components periodically until they're ready
    const startComponentCheck = () => {
      mountCheckRef.current = setInterval(() => {
        if (checkComponentsReady()) {
          if (mountCheckRef.current) {
            clearInterval(mountCheckRef.current);
            console.log("🛑 Stopped component checking - all components ready");
          }
        }
      }, 500);

      // Stop checking after 10 seconds
      setTimeout(() => {
        if (mountCheckRef.current) {
          clearInterval(mountCheckRef.current);
          console.warn("⚠️ Stopped checking for components after 10 seconds");
        }
      }, 10000);
    };

    // Start checking components immediately
    setTimeout(startComponentCheck, 100);

    // Improved loading timeout system
    // Primary timeout - wait for content to be ready
    timeoutRef.current = setTimeout(() => {
      if (!contentReady) {
        console.warn(
          "⚠️ Content not ready after 8 seconds, checking if page should be refreshed"
        );

        // Final component check
        if (!checkComponentsReady()) {
          console.error("❌ Essential components missing, forcing refresh");
          forceFullRefresh();
          return;
        }

        console.log(
          "✅ Essential components found, proceeding with fallback loading"
        );
        hideLoadingScreen();
      }
    }, 8000);

    // Emergency fallback timeout
    fallbackTimeoutRef.current = setTimeout(() => {
      if (loading) {
        console.warn("🚨 Emergency fallback triggered after 12 seconds");
        hideLoadingScreen();
      } else {
        console.log(
          "✅ Emergency fallback not needed - content already loaded"
        );
      }
    }, 12000);

    // Event listener for document load complete
    const handleLoad = () => {
      console.log(
        "📄 Document load event triggered, readyState:",
        document.readyState
      );

      // Make sure all resources are loaded
      if (document.readyState === "complete") {
        setTimeout(() => {
          if (!contentReady && checkComponentsReady()) {
            console.log(
              "📄 Force hiding loading screen after document complete"
            );
            hideLoadingScreen();
          }
        }, 2000);
      }
    };

    // Listen for various loading events
    window.addEventListener("load", handleLoad);

    // Also listen for DOMContentLoaded as backup
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        console.log("📄 DOMContentLoaded triggered");
        setTimeout(() => {
          checkComponentsReady();
        }, 1000);
      });
    } else {
      // DOM is already loaded, check components
      setTimeout(() => {
        checkComponentsReady();
      }, 500);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("load", handleLoad);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
      if (mountCheckRef.current) clearInterval(mountCheckRef.current);

      // Kill all ScrollTriggers we created
      scrollTriggers.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
    };
  }, [gsapReady, contentReady, loading, forceRefreshTime, componentsReady]);

  // When both GSAP and components are ready, and content animation starts, hide loading screen
  useEffect(() => {
    if (contentReady && loading && gsapReady && componentsReady) {
      console.log("🎉 All systems ready, hiding loading screen");

      // Clear any pending timeouts since we're ready
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
      if (mountCheckRef.current) clearInterval(mountCheckRef.current);

      const exitTl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          console.log("✅ Content successfully loaded and visible");
        },
      });

      exitTl
        .to([".loading-screen", ".loading-content", ".loading-logo"], {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(".loading-screen", {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
        });
    }
  }, [contentReady, loading, gsapReady, componentsReady]);

  // Log current state for debugging (only when states change)
  useEffect(() => {
    // Only log if there's a meaningful state change
    if (!loading && contentReady && gsapReady && componentsReady) {
      console.log("🎉 All systems operational!");
    } else {
      console.log("🔍 Current state:", {
        loading,
        contentReady,
        gsapReady,
        componentsReady,
        timestamp: new Date().toISOString(),
      });
    }
  }, [loading, contentReady, gsapReady, componentsReady]);

  return (
    <main>
      {/* Loading Screen with favicon2.png */}
      {loading && (
        <div
          ref={loadingScreenRef}
          className="loading-screen fixed top-0 left-0 w-full h-full bg-[#161616] z-50 flex flex-col items-center justify-center"
        >
          <Image
            src="/favicon2.png"
            alt="Zenit Digital Logo"
            width={40}
            height={40}
            className="loading-logo mb-4"
            priority
            style={{ width: "auto", height: "32px" }}
          />

          {/* Loading progress indicator */}
          <div className="mt-4 text-white text-sm">
            {!gsapReady && "Loading GSAP..."}
            {gsapReady && !componentsReady && "Loading components..."}
            {gsapReady &&
              componentsReady &&
              !contentReady &&
              "Starting animations..."}
            {gsapReady && componentsReady && contentReady && "Ready!"}
          </div>

          {/* Emergency refresh button (shows after 10 seconds) */}
          <button
            onClick={forceFullRefresh}
            className="mt-8 px-4 py-2 bg-white text-black rounded opacity-0 hover:opacity-100 transition-opacity"
            style={{
              animation: "fadeIn 1s ease-in-out 10s forwards",
            }}
          >
            Force Refresh
          </button>
        </div>
      )}

      <div ref={pageContentRef} className={loading ? "invisible" : "visible"}>
        <Cookiebot />
        {/* <HeaderLogo /> */}
        <TestHeader onAnimationStart={handleContentAnimationStart} />
        <AboutSection />

        {/* Replace individual sections with the stacked container */}
        <StackedCardsContainer />

        <TextScroll />
        {/* <Testimonials /> */}
        <Test />
        {/* <Page2/> */}
        <Footer />
      </div>

      {/* Debug Panel for development */}
      <DebugPanel
        loading={loading}
        contentReady={contentReady}
        gsapReady={gsapReady}
        componentsReady={componentsReady}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.7;
          }
        }
      `}</style>
    </main>
  );
}
