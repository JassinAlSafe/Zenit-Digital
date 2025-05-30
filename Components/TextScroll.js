"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TextScroll = () => {
  const sectionRef = useRef(null);
  const topTextContainerRef = useRef(null);
  const middleTextContainerRef = useRef(null);
  const bottomTextContainerRef = useRef(null);

  useEffect(() => {
    // Function to create scrolling text effect
    const createScrollingEffect = (container, direction) => {
      if (!container) return;

      // Get container width
      const containerWidth = container.querySelector("div").offsetWidth;

      // Create the animation with a single tween for the entire container
      gsap.fromTo(
        container,
        { x: direction === "left" ? 0 : -containerWidth },
        {
          x: direction === "left" ? -containerWidth : 0,
          duration: 60,
          ease: "linear",
          repeat: -1,
          onRepeat: function () {
            // Reset position to create seamless loop
            gsap.set(this.targets()[0], {
              x: direction === "left" ? 0 : -containerWidth,
            });
          },
        }
      );
    };

    // Make sure all refs are available
    if (
      topTextContainerRef.current &&
      middleTextContainerRef.current &&
      bottomTextContainerRef.current
    ) {
      // Add a small delay to ensure the component has fully rendered and widths are calculated correctly
      setTimeout(() => {
        createScrollingEffect(topTextContainerRef.current, "left");
        createScrollingEffect(middleTextContainerRef.current, "right");
        createScrollingEffect(bottomTextContainerRef.current, "left");
      }, 100);
    }

    // Restart animations when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Clear existing animations
        gsap.killTweensOf([
          topTextContainerRef.current,
          middleTextContainerRef.current,
          bottomTextContainerRef.current,
        ]);

        // Restart animations
        createScrollingEffect(topTextContainerRef.current, "left");
        createScrollingEffect(middleTextContainerRef.current, "right");
        createScrollingEffect(bottomTextContainerRef.current, "left");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gsap.killTweensOf([
        topTextContainerRef.current,
        middleTextContainerRef.current,
        bottomTextContainerRef.current,
      ]);
    };
  }, []);

  // Text content for each row
  const topText =
    "Product Roadmap — User Experience — Design Systems — Branding — Prototyping";
  const middleText =
    "AI & Automation — Cloud Architecture — Data Analysis — React Native — iOS & Android";
  const bottomText =
    "Web Apps — Testing & Validation — Accessibility — Business Development — Research & Strategy";

  return (
    <div
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-col justify-center items-center bg-white"
    >
      <div className="flex flex-col space-y-4 w-full">
        {/* Top Text */}
        <div className="relative overflow-hidden w-full">
          <div ref={topTextContainerRef} className="inline-flex">
            <div className="flex-shrink-0 whitespace-nowrap text-center text-custom-green font-medium uppercase text-[12vw] sm:text-[6vw] tracking-wide">
              {topText} —
            </div>
            <div className="flex-shrink-0 whitespace-nowrap text-center text-custom-green font-medium uppercase text-[12vw] sm:text-[6vw] tracking-wide">
              {topText} —
            </div>
          </div>
        </div>

        {/* Middle Text */}
        <div className="relative overflow-hidden w-full">
          <div ref={middleTextContainerRef} className="inline-flex">
            <div className="flex-shrink-0 whitespace-nowrap text-center text-custom-lightGreen-accessible font-medium uppercase text-[12vw] sm:text-[6vw] tracking-wide">
              {middleText} —
            </div>
            <div className="flex-shrink-0 whitespace-nowrap text-center text-custom-lightGreen-accessible font-medium uppercase text-[12vw] sm:text-[6vw] tracking-wide">
              {middleText} —
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="relative overflow-hidden w-full">
          <div ref={bottomTextContainerRef} className="inline-flex">
            <div className="flex-shrink-0 whitespace-nowrap text-center text-custom-green font-medium uppercase text-[12vw] sm:text-[6vw] tracking-wide">
              {bottomText} —
            </div>
            <div className="flex-shrink-0 whitespace-nowrap text-center text-custom-green font-medium uppercase text-[12vw] sm:text-[6vw] tracking-wide">
              {bottomText} —
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextScroll;
