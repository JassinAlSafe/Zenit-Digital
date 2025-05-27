import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import CachedVideo from "./CachedVideo";

const TestHeader = ({ onAnimationStart }) => {
  // Create refs for the video elements
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  useEffect(() => {
    // Hide everything initially
    gsap.set(".subtext, .cta-button", { autoAlpha: 0 });
    gsap.set([mobileVideoRef.current, desktopVideoRef.current], {
      autoAlpha: 0,
      scale: 0.9,
      x: 30,
    });

    // Number of words in the title
    const words = document.querySelectorAll(".word");
    const wordCount = words.length;

    // Create a single timeline for all animations
    const tl = gsap.timeline({
      onStart: () => {
        // Notify parent component that animation has started
        if (onAnimationStart && typeof onAnimationStart === "function") {
          onAnimationStart();
        }
      },
    });

    // Animate title words one by one - slowed down
    words.forEach((word, index) => {
      tl.fromTo(
        word,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
        index * 0.2
      );

      // After the last word animation starts, immediately queue up the next elements
      if (index === wordCount - 1) {
        // Add animations for paragraph and button at the same time, immediately after the last word starts
        tl.to(
          [".subtext", ".cta-button"],
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

        // Add airplane animation after paragraph and button have finished
        tl.to(
          [mobileVideoRef.current, desktopVideoRef.current],
          {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            delay: -0.4,
            duration: 0.9,
            ease: "power2.out",
          },
          "+=0.1"
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [onAnimationStart]);

  return (
    <section
      className="hero-section relative h-screen w-full flex items-center justify-center"
      data-bg="white"
      data-text="var(--custom-blue)"
      data-button-bg="var(--custom-blue)"
      data-button-text="white"
      data-navbar-text="var(--custom-blue)"
      id="/"
    >
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[11rem] font-medium leading-normal mb-8 text-custom-blue">
              <span className="word">We</span>{" "}
              <span className="word">turn</span>
              <br />
              <span className="word">dreams</span>{" "}
              <span className="word">into</span>
              <br />
              <span className="word">Digital</span>{" "}
              <span className="word">Reality</span>
            </h1>

            {/* Subtitle */}
            <p
              className="subtext text-base md:text-lg lg:text-xl font-normal mb-8 text-custom-blue max-w-2xl mx-auto leading-relaxed"
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              Looking to build your next big idea? We craft custom software to
              help startups and businesses grow with style and speed.
            </p>

            {/* CTA Button */}
            <Link href="/booking">
              <button className="cta-button bg-[#1B1B3B] text-[#A494F3] hover:bg-[#2C2C75] font-medium py-3 px-6 rounded-full inline-flex items-center transition-all duration-300 text-base">
                Contact Us
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
              </button>
            </Link>
          </div>
        </div>

        {/* Video for small screens (below md breakpoint) */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-sm block md:hidden z-0">
          <CachedVideo
            ref={mobileVideoRef}
            src="airplane.mp4"
            className="w-full h-auto object-contain opacity-70"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
            }}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Video for medium and large screens */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 w-1/3 max-w-md hidden md:block z-0 pointer-events-none">
          <CachedVideo
            ref={desktopVideoRef}
            src="airplane.mp4"
            className="w-full h-auto object-contain opacity-60"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
            }}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default TestHeader;
