"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initializeGSAP, resetGSAPForNavigation } from "../utils/gsap";
import AboutSection from "../Components/AboutSection";
import StackedCardsContainer from "../Components/SectionsContainer";
import PackagesSection from "../Components/Services/PackagesSection";
import Test from "../Components/test";
import Footer from "../Components/Footer";
import TextScroll from "../Components/TextScroll";
import Cookiebot from "../Components/Cookiebot";

import TestHeader from "../Components/TestHeader";
import Strategy from "../Components/Strategy";
import { useLoadingState } from "../hooks/useLoadingState";
// import Home from "../Components/Home";
import Image from "next/image";

export default function Page() {
  const {
    isLoading,
    isContentReady,
    isHidden,
    startContentAnimation,
    hideLoadingScreen,
    resetLoadingState
  } = useLoadingState();
  
  const pageContentRef = useRef(null);
  const loadingScreenRef = useRef(null);

  // Handle navigation and GSAP reset without full page reload
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      const previousPath = sessionStorage.getItem("previousPath") || "/";

      // If navigating to home page from another page
      if (currentPath === "/" && previousPath !== "/") {
        // Reset ScrollTrigger and GSAP animations
        setTimeout(() => {
          // Use our comprehensive GSAP reset utility
          resetGSAPForNavigation();

          // Reset loading state to restart entrance animations
          resetLoadingState();
        }, 100);
      }

      // Update previous path for next navigation
      sessionStorage.setItem("previousPath", currentPath);
    };

    // Store initial path
    sessionStorage.setItem("previousPath", window.location.pathname);

    // Listen for navigation events
    window.addEventListener("popstate", handleRouteChange);

    // Also listen for Next.js route changes (for client-side navigation)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && window.location.pathname === '/') {
        handleRouteChange();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resetLoadingState]);

  // Handle hash-based navigation (e.g., /#work, /#services)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashNavigation = () => {
      // Only handle hash navigation after content is ready and loading is complete
      if (!isLoading && isHidden) {
        const hash = window.location.hash;
        if (hash) {
          const targetId = hash.substring(1); // Remove the '#'
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            // Small delay to ensure all animations and layout are complete
            setTimeout(() => {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }, 500);
          }
        }
      }
    };

    // Handle hash navigation on initial load
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, [isLoading, isHidden]);

  useEffect(() => {
    // Initialize GSAP with global configuration and plugins
    initializeGSAP();

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Initial loading animation - smooth logo entrance
      const loadingTl = gsap.timeline();
      
      // Set initial states for GPU-accelerated animations
      gsap.set(".loading-logo", { 
        scale: 0.6, 
        opacity: 0, 
        rotation: -10,
        transformOrigin: "center center"
      });
      
      gsap.set(".loading-progress", { 
        opacity: 0, 
        y: 20 
      });
      
      // Smooth logo entrance animation
      loadingTl
        .to(".loading-logo", {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          delay: 0,
          ease: "elastic.out(1, 0.6)",
          overwrite: "auto",
          force3D: true,
          immediateRender: false,
          onStart: () => {
            // Logo animation started
          },
          onComplete: () => {
            // Logo entrance complete
          }
        })
        .to(".loading-progress", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0,
          ease: "power2.out",
          overwrite: "auto",
          force3D: true,
          immediateRender: false,
          onComplete: () => {
            // Progress animation complete
          }
        }, "-=0.4")
        .to(".loading-progress-bar", {
          x: "0%",
          duration: 2,
          delay: 0,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 0,
          yoyo: true,
          overwrite: "auto",
          force3D: true,
          immediateRender: false
        }, "-=0.2")
        .to(".loading-logo", {
          scale: 1.05,
          duration: 0.3,
          delay: 0,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0,
          overwrite: "auto",
          force3D: true,
          immediateRender: false
        }, "-=1.5");
    });

    // Note: hideLoadingScreenWithAnimation is now defined outside useEffect

    // Note: ScrollTrigger color management has been consolidated into Navbar.js
    // for better performance and to avoid conflicts between multiple systems.
    // Body background colors are now handled by the unified ScrollTrigger in Navbar.js
    
    const scrollTriggers: ScrollTrigger[] = [];

    // Event listener for document load complete (fallback)
    const handleLoad = () => {
      // Make sure all resources are loaded
      if (document.readyState === "complete") {
        // If content isn't ready yet (TestHeader animation hasn't completed),
        // we'll still hide loading screen after a maximum wait time (6 seconds)
        if (!isContentReady) {
          setTimeout(() => {
            if (!isContentReady) {
              hideLoadingScreenWithAnimation();
            }
          }, 6000);
        }
      }
    };

    window.addEventListener("load", handleLoad);

    // Cleanup function
    return () => {
      window.removeEventListener("load", handleLoad);
      // Kill all ScrollTriggers we created
      scrollTriggers.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
      // Clean up GSAP context
      ctx.revert();
    };
  }, [isContentReady, hideLoadingScreen]);

  // Define hideLoadingScreenWithAnimation function
  const hideLoadingScreenWithAnimation = () => {
    const exitTl = gsap.timeline({
      onComplete: () => {
        hideLoadingScreen();
      },
    });

    // Smooth, sequenced exit animation
    exitTl
      .to(".loading-progress-bar", {
        x: "100%",
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to([".loading-progress", ".loading-logo"], {
        scale: 0.8,
        opacity: 0.7,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.1,
      }, "-=0.1")
      .to(".loading-screen", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.2")
      .to(".loading-screen", {
        y: "-100%",
        duration: 1,
        ease: "power3.inOut",
      }, "-=0.3");
  };

  // When contentReady changes to true, hide the loading screen
  useEffect(() => {
    if (isContentReady && isLoading) {
      hideLoadingScreenWithAnimation();
    }
  }, [isContentReady, isLoading, hideLoadingScreen]);

  return (
    <main>
      {/* Loading Screen with base64 encoded SVG for immediate display */}
      {isLoading && (
        <div
          ref={loadingScreenRef}
          className="loading-screen fixed top-0 left-0 w-full h-full bg-[#161616] z-50 flex flex-col items-center justify-center"
        >
          {/* 
            This img tag uses a base64-encoded SVG that's embedded directly in the HTML
            This guarantees it will display immediately without any external requests
          */}
          <Image
            src="/favicon2.png"
            alt="Frame Logo"
            width="40"
            height="40"
            className="loading-logo"
            priority
            style={{ width: "auto", height: "32px" }}
          />
          
          {/* Subtle loading indicator */}
          <div className="loading-progress mt-8 w-24 h-[1px] bg-gray-700 relative overflow-hidden">
            <div className="loading-progress-bar absolute top-0 left-0 h-full w-full bg-white transform -translate-x-full"></div>
          </div>
        </div>
      )}

      <div ref={pageContentRef} className={isLoading ? "invisible" : "visible"}>
        <Cookiebot />
        {/* <HeaderLogo /> */}
        <TestHeader onAnimationStart={startContentAnimation} />
        <AboutSection />

        {/* Replace individual sections with the stacked container */}
        <StackedCardsContainer />

        {/* Packages and Bundles Section */}
        <section
          className="bg-white"
          data-bg="white"
          data-text="black"
          data-button-bg="var(--custom-blue)"
          data-button-text="white"
          data-navbar-text="black"
        >
          <PackagesSection />
        </section>

        <TextScroll />
        {/* <Testimonials /> */}
        {/* <Test /> */}
        <Strategy/>
        <Footer />
      </div>
    </main>
  );
}
