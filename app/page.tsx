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
import { useLoadingState } from "../hooks/useLoadingState";
// import Home from "../Components/Home";
import Image from "next/image";

export default function Page() {
  const { 
    isLoading, 
    isContentReady, 
    isHidden, 
    startContentAnimation, 
    hideLoadingScreen 
  } = useLoadingState();
  
  const pageContentRef = useRef(null);
  const loadingScreenRef = useRef(null);

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
        const timer = setTimeout(() => {
          window.location.reload();
        }, 100);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Clean up event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    // Register GSAP plugins inside useEffect to ensure it only runs client-side
    gsap.registerPlugin(ScrollTrigger);

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
          ease: "elastic.out(1, 0.6)",
        })
        .to(".loading-progress", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        .to(".loading-progress-bar", {
          x: "0%",
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        }, "-=0.2")
        .to(".loading-logo", {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        }, "-=1.5");
    });

    // Create a function to hide the loading screen with smooth sequence
    const hideLoadingScreenWithAnimation = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          hideLoadingScreen();
          ctx.revert(); // Clean up GSAP context
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
        }, "-=0.2") // Start 0.2s before previous animation ends
        .to(".loading-screen", {
          y: "-100%",
          duration: 1,
          ease: "power3.inOut",
        }, "-=0.3"); // Overlap with opacity fade
    };

    // Setup scroll triggers
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
  }, [isContentReady]);

  // When contentReady changes to true, hide the loading screen
  useEffect(() => {
    if (isContentReady && isLoading) {
      hideLoadingScreenWithAnimation();
    }
  }, [isContentReady, isLoading]);

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

        <TextScroll />
        {/* <Testimonials /> */}
        <Test />
        {/* <Page2/> */}
        <Footer />
      </div>
    </main>
  );
}
