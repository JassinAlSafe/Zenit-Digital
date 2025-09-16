"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
  // State to detect Windows for platform-specific adjustments
  const [isWindows, setIsWindows] = useState(false);

  // Function to detect Windows
  const detectWindows = () => {
    if (typeof window === "undefined") return false;
    return window.navigator.platform.toLowerCase().includes('win');
  };

  useEffect(() => {
    // Detect Windows for platform-specific styling
    setIsWindows(detectWindows());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Register ScrollTrigger plugin inside useEffect per best practices
      gsap.registerPlugin(ScrollTrigger);

      const aboutText = document.querySelector(".about-text");
      const section = document.querySelector(".about-section");
      const scrollIndicator = document.querySelector(".scroll-indicator");
      const circle = document.querySelector(
        ".scroll-indicator circle:nth-child(2)"
      );

      // Wrap each letter in a span with performance optimizations
      const textContent = aboutText.textContent;
      aboutText.innerHTML = textContent
        .split("")
        .map((letter) => `<span class="letter" style="will-change: color; transform: translateZ(0);">${letter}</span>`)
        .join("");

      const letters = document.querySelectorAll(".letter");
      const totalLetters = letters.length;

      const maxOffset = 220; // Full progress for indicator

      // Store ScrollTriggers for cleanup
      const scrollTriggers = [];

      // **GSAP Animation with integrated indicator**
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          markers: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          id: "about-text-progress",
          onUpdate: (self) => {
            // Cache progress calculation
            const highlightIndex = Math.floor(self.progress * totalLetters);

            // Batch DOM updates using requestAnimationFrame for better performance
            if (self._lastHighlightIndex !== highlightIndex) {
              // Only update letters that need to change
              const start = Math.min(self._lastHighlightIndex || 0, highlightIndex);
              const end = Math.max(self._lastHighlightIndex || 0, highlightIndex);

              for (let i = start; i <= end; i++) {
                if (letters[i]) {
                  letters[i].style.color = i <= highlightIndex ? "var(--custom-pink)" : "#13496C";
                }
              }

              // Update circle progress only when text changes
              const syncedProgress = highlightIndex / totalLetters;
              circle.style.strokeDashoffset = maxOffset - syncedProgress * maxOffset;

              self._lastHighlightIndex = highlightIndex;
            }
          },
          onStart: () => {
            // Show indicator when animation starts
            scrollIndicator.classList.add("opacity-100");
          },
          onComplete: () => {
            // Hide indicator when animation completes
            scrollIndicator.classList.remove("opacity-100");
          },
          onRefresh: () => {
            // ScrollTrigger refreshed
          }
        },
      });

      // Cleanup function per CLAUDE.md best practices
      return () => {
        // Kill timeline
        timeline.kill();
        // Kill ScrollTriggers
        scrollTriggers.forEach(trigger => trigger.kill());
      };
    }
  }, []);

  // Get platform-specific text classes
  const getTextClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing - reduced to prevent overflow
      return "about-text 2xl:text-[8.5rem] px-12  text-4xl text-[#13496C] md:text-7xl lg:text-7xl font-normal text-left";
    } else {
      // macOS classes (original)
      return "about-text 2xl:text-[10rem] text-5xl text-[#13496C] md:text-8xl lg:text-8xl font-normal text-left";
    }
  };

  return (
    <>
      {/* Scroll Indicator */}
      <div
        // Add this ID for navigation
        className="scroll-indicator fixed bottom-5 right-5  w-16 h-16 flex justify-center items-center z-10 opacity-0 transition-opacity duration-300 "
      >
        <svg className="rotate-[-90deg]" width="64" height="64">
          <circle
            className="stroke-custom-blue"
            cx="32"
            cy="32"
            r="28"
            strokeWidth="4"
            fill="none"
          />
          <circle
            className="stroke-custom-pink"
            cx="32"
            cy="32"
            r="28"
            strokeWidth="4"
            fill="none"
            strokeDasharray="188"
            strokeDashoffset="188"
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
          />
        </svg>
      </div>

      <section
        id="about"
        className="about-section h-screen flex items-center justify-center "
        data-bg="var(--custom-blue)"
        data-text="#13496C"
        data-button-bg="var(--custom-pink)"
        data-button-text="var(--custom-blue)"
        data-navbar-text="var(--custom-pink)"
      >
        <div className="container 2xl:max-w-[90%] mx-auto px-4 2xl:px-0 text-center text-[#13496C]">
          <h2 className={getTextClasses()}>
            We create elevating digital solutions that empower startups through
            innovative software and purposeful design.
          </h2>
        </div>
      </section>
    </>
  );
};

export default AboutSection;