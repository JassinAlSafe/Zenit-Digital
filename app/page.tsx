"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "../components/AboutSection";
import StackedCardsContainer from "../components/SectionsContainer";
import Test from "../components/test";
import Footer from "../components/Footer";
import TextScroll from "../components/TextScroll";
import Cookiebot from "../Components/Cookiebot";
import Faq from "../components/Faq";
import TestHeader from "../components/TestHeader";
import PackagesAndBundles from "../components/PackagesAndBundles";
// import Home from "../components/Home";
import Image from "next/image";
import loadiungLogo from "../assets/Frame.svg";
import { useRouter } from "next/navigation";

export default function Page() {
  // Add loading state
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const pageContentRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const router = useRouter();

  // This function will be called by TestHeader when its animations start
  const handleContentAnimationStart = () => {
    setContentReady(true);
  };

  // Add this useEffect to handle page refresh on back navigation
  useEffect(() => {
    // Store the current path in sessionStorage when the component mounts
    const currentPath = window.location.pathname;
    const previousPath = sessionStorage.getItem('previousPath');
    
    // If we've navigated back from a different path (e.g., booking), refresh the page
    if (previousPath && previousPath !== currentPath) {
      sessionStorage.setItem('previousPath', currentPath);
      window.location.reload();
    } else {
      sessionStorage.setItem('previousPath', currentPath);
    }

    // Listen for popstate events (back/forward navigation)
    const handlePopState = () => {
      // When user navigates back, reload the page
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);

    // Clean up event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    // Register GSAP plugins inside useEffect to ensure it only runs client-side
    gsap.registerPlugin(ScrollTrigger);

    // Initial loading animation - simplified to just show the logo
    const tl = gsap.timeline();
    
    // Create a function to hide the loading screen
    const hideLoadingScreen = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          // Set loading to false once animation completes to remove from DOM
          setLoading(false);
        },
      });
      
      exitTl.to(".loading-screen", {
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
    const sections = document.querySelectorAll(
      "section:not(.selected-works-section):not(.services-section)"
    );

    sections.forEach((section, index) => {
      const bgColor = section.getAttribute("data-bg") || "white";
      const textColor = section.getAttribute("data-text") || "black";

      ScrollTrigger.create({
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
    });

    // Event listener for document load complete (fallback)
    const handleLoad = () => {
      // Make sure all resources are loaded
      if (document.readyState === 'complete') {
        // If content isn't ready yet (TestHeader animation hasn't started),
        // we'll still hide loading screen after a maximum wait time (4 seconds)
        if (!contentReady) {
          const timer = setTimeout(() => {
            if (!contentReady) {
              hideLoadingScreen();
            }
          }, 4000);
          return () => clearTimeout(timer);
        }
      }
    };

    window.addEventListener('load', handleLoad);

    // Watch for contentReady state to change
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // When contentReady changes to true, hide the loading screen
  useEffect(() => {
    if (contentReady && loading) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
        },
      });
      
      exitTl.to([".loading-screen", ".loading-content", ".loading-logo"], {
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
  }, [contentReady, loading]);

  return (
    <main>
      {/* Loading Screen with base64 encoded SVG for immediate display */}
      {loading && (
        <div ref={loadingScreenRef} className="loading-screen fixed top-0 left-0 w-full h-full bg-[#161616] z-50 flex items-center justify-center">
          {/* 
            This img tag uses a base64-encoded SVG that's embedded directly in the HTML
            This guarantees it will display immediately without any external requests
          */}
          <Image 
            src={loadiungLogo}
            alt="Frame Logo" 
            width="40" 
            height="40"
            className="loading-logo" 
          />
        </div>
      )}

      <div ref={pageContentRef} className={loading ? "invisible" : "visible"}>
        <Cookiebot />
        {/* <HeaderLogo /> */}
        <TestHeader onAnimationStart={handleContentAnimationStart} />
        <AboutSection />

        {/* Replace individual sections with the stacked container */}
        <StackedCardsContainer />
{/* 
        {/* <TextScroll /> */}
        {/* <Testimonials /> */}
        <PackagesAndBundles/>
        <Test />
        {/* <Faq/> */}
        <Footer /> 
      </div>
    </main>
  );
}