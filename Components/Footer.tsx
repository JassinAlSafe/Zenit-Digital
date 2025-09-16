"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import { useOS } from "../utils/OsProvider"; // Import the OS hook

const Footer: React.FC = () => {
  // Create refs to store our animation instances
  const footerScrollTriggers = useRef<ScrollTrigger[]>([]);
  const footerTweens = useRef<gsap.core.Tween[]>([]);
  
  const { isWindows, isDetected } = useOS(); // Use the OS hook
  
  // Set video source (keep it simple for now)
  const videoSrc = "/globe.mov";


  useEffect(() => {
    // Ensure this runs only on client side
    if (typeof window === "undefined") return;

    // Need to register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Wait for everything to be rendered
    const initAnimation = () => {
      // Clear any previous animations we created
      cleanup();

      const section = document.querySelector(".make-it-happen-section");
      const footerTitleLetters = document.querySelectorAll(
        ".footer-title-letter"
      ); // Renamed class

      if (!section || footerTitleLetters.length === 0) return;

      // Create a GSAP context to scope our animations
      const ctx = gsap.context(() => {
        // Set initial state
        gsap.set(footerTitleLetters, { y: 160, opacity: 1 });

        // Create a single animation for all letters with stagger
        const letterTween = gsap.to(footerTitleLetters, {
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.04, // Use GSAP's built-in stagger
          paused: true, // Start paused so ScrollTrigger can control it
        });

        // Store the single tween reference
        footerTweens.current.push(letterTween);

        // Create a single ScrollTrigger for all letters
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => letterTween.play(),
          once: true,
          id: "footer-letters", // Single ID for all letters
        });

        // Store the single trigger reference
        footerScrollTriggers.current.push(trigger);
      });

      // Store the context to clean it up later
      return ctx;
    };

    // Helper function to clean up animations
    const cleanup = () => {
      // Kill only our specific ScrollTrigger instances
      footerScrollTriggers.current.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
      footerScrollTriggers.current = [];

      // Kill only our specific tweens
      footerTweens.current.forEach((tween) => {
        if (tween) tween.kill();
      });
      footerTweens.current = [];
    };

    // Initialize animations
    let ctx = initAnimation();

    // Debounced resize handler to prevent multiple triggers
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Clean up before re-initializing
        cleanup();
        if (ctx) ctx.revert();
        // Re-initialize animations
        ctx = initAnimation();
      }, 250); // Wait 250ms after resize ends
    };

    // Add resize listener with debouncing
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      cleanup();
      if (ctx) ctx.revert(); // Clean up the GSAP context
    };
  }, []);

  // Get platform-specific title classes
  const getTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing - reduced to prevent overflow
      return "text-5xl md:text-7xl lg:text-8xl 2xl:text-[8.5rem] font-bold mb-12 text-center text-custom-blue leading-tight";
    } else {
      // macOS classes (original)
      return "text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold mb-12 text-center text-custom-blue leading-tight";
    }
  };

  // Get platform-specific subtitle classes
  const getSubtitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-sm 2xl:text-lg text-custom-green";
    } else {
      // macOS classes (original)
      return "text-sm 2xl:text-xl text-custom-green";
    }
  };

  // Get platform-specific inquiry title classes
  const getInquiryTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-sm 2xl:text-lg mb-1";
    } else {
      // macOS classes (original)
      return "text-sm 2xl:text-xl mb-1";
    }
  };

  // Get platform-specific inquiry text classes
  const getInquiryTextClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-sm flex items-center justify-en 2xl:text-base";
    } else {
      // macOS classes (original)
      return "text-sm flex items-center justify-en 2xl:text-lg";
    }
  };

  // Wait for OS detection before rendering to prevent hydration mismatch
  if (!isDetected) {
    return (
      <>
        {/* "Let's Make It Happen" Section with default styling */}
        <section
          className="make-it-happen-section py-10 bg-custom-pink"
          data-bg="white"
          data-text="black"
          data-button-bg="var(--custom-blue)"
          data-button-text="var(--custom-pink)"
          data-nav-text="var(--custom-blue)"
        >
          <div className="flex flex-col justify-center items-center min-h-screen bg-custom-pink py-20 relative mx-auto max-w-7xl rounded-sm">
            <p className="text-white mb-4 font-medium">- Change starts here -</p>

            <h1 className="text-6xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold mb-12 text-center text-custom-blue leading-tight">
              <div className="overflow-hidden">
                {Array.from("LET'S MAKE").map((letter, index) => (
                  <span
                    key={`make-${index}`}
                    className="footer-title-letter inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden">
                {Array.from("IT HAPPEN").map((letter, index) => (
                  <span
                    key={`happen-${index}`}
                    className="footer-title-letter inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </div>
            </h1>

            <Link href="/booking">
              <MagneticButton
                className="bg-custom-blue hover:bg-custom-blue/100 text-white rounded-full px-7 py-5 text-lg transition-colors flex items-center relative z-30"
                magneticStrength={0.5}
              >
                BOOK A CALL
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </MagneticButton>
            </Link>

            {/* Working Globally Section - with default styling */}
            <div className="absolute bottom-8 left-8 flex justify-end items-center">
              <div className="w-12 h-12 border bg-custom-blue border-custom-pink rounded-full flex items-center justify-center mr-4 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src={videoSrc}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div>
                <p className="text-sm 2xl:text-xl text-custom-green">
                  Working Globally
                </p>
                <p className="text-sm font-normal text-white">Based in Sweden</p>
              </div>
            </div>

            {/* For Further Inquiries with default styling */}
            <div className="absolute bottom-8 right-8 text-right hidden md:block">
              <h4 className="text-sm 2xl:text-xl mb-1">FOR FURTHER INQUIRIES</h4>
              <p className="text-sm flex items-center justify-en 2xl:text-lg">
                <span className="mr-1">→</span> hello@zenitdigital.se
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* "Let's Make It Happen" Section */}
      <section
        className="make-it-happen-section py-10 bg-custom-pink"
        data-bg="var(--custom-pink)"
        data-text="var(--custom-blue)"
        data-button-bg="var(--custom-blue)"
        data-button-text="white"
        data-navbar-text="var(--custom-blue)"
      >
        <div className="flex flex-col justify-center items-center min-h-screen bg-custom-pink py-20 relative mx-auto max-w-7xl rounded-sm">
          <p className="text-white mb-4 font-medium">- Change starts here -</p>

          <h1 className={getTitleClasses()}>
            <div className="overflow-hidden">
              {Array.from("LET'S MAKE").map((letter, index) => (
                <span
                  key={`make-${index}`}
                  className="footer-title-letter inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
            <div className="overflow-hidden">
              {Array.from("IT HAPPEN").map((letter, index) => (
                <span
                  key={`happen-${index}`}
                  className="footer-title-letter inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
          </h1>

          <Link href="/booking">
            <MagneticButton
              className="bg-custom-blue hover:bg-custom-dark-blue text-white rounded-full px-7 py-5 text-lg transition-colors flex items-center relative z-30"
              magneticStrength={0.5}
            >
              BOOK A CALL
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </MagneticButton>
          </Link>

          {/* Working Globally Section - with MP4 video replacing the globe emoji */}
          <div className="absolute bottom-8 left-8 flex justify-end items-center">
            <div className="w-12 h-12 border bg-custom-blue border-white rounded-full flex items-center justify-center mr-4 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={videoSrc}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <p className={getSubtitleClasses()}>
                Working Globally
              </p>
              <p className="text-sm font-normal text-white">Based in Sweden</p>
            </div>
          </div>

          {/* For Further Inquiries */}
          <div className="absolute bottom-8 right-8 text-right hidden md:block">
            <h4 className={getInquiryTitleClasses()}>FOR FURTHER INQUIRIES</h4>
            <p className={getInquiryTextClasses()}>
              <span className="mr-1">→</span> hello@zenitdigital.se
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      {/* <footer className="bg-white text-custom-green font-semibold py-16">
        <div className="container mx-auto px-6"> */}
      {/* Main Footer Content */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"> */}
      {/* Column 1: Menu */}
      {/* <div>
              <h3 className="text-xl font-medium mb-6">Menu</h3>
              <ul className="space-y-3"> */}
      {/* <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Works</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
              </ul>
            </div> */}

      {/* Column 2: Socials */}
      {/* <div>
              <h3 className="text-xl font-medium mb-6">Socials</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-gray-300 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Bento</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Github</a></li>
              </ul>
            </div> */}

      {/* Column 3: Resources */}
      {/* <div>
              <h3 className="text-xl font-medium mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Pillarstack</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Figma Templates</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Monthly Newsletter</a></li>
              </ul>
            </div>
          </div> */}

      {/* Copyright */}
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <p className="text-sm">© 2024 Zenit Digital Studios</p>
              <p className="text-sm">All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm">LOCAL TIME</p>
              <p className="text-sm text-gray-400">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false})}, MEL</p>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default Footer;