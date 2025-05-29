import React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const TestHeader = ({ onAnimationStart }) => {
  // Create refs for the video elements
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  
  // State to store the video source
  const [videoSrc, setVideoSrc] = useState("");

  // Function to detect Safari browser
  const isSafari = () => {
    if (typeof window === "undefined") return false;
    const userAgent = window.navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    return isSafariBrowser;
  };

  useEffect(() => {
    // Set video source based on browser
    const videoFormat = isSafari() ? "/airplane.mov" : "/airplane.webm";
    setVideoSrc(videoFormat);
  }, []);

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
      className="relative h-screen w-full flex items-center justify-center"
      data-bg="white"
      data-text="var(--custom-blue)"
      data-button-bg="var(--custom-blue)"
      data-button-text="white"
      data-navbar-text="var(--custom-blue)"
      id="/"
    >
      <div className="w-full overflow-hidden xs:mt-2 mt-10 md:mt-10 lg:mt-10">
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-full 2xl:w-full lg:w-3/4 z-10">
              <h1 className="text-6xl 2xl:text-[13rem] xs:text-4xl lg:text-9xl md:text-6xl font-medium  lg:font-medium   lg:leading-none leading-none mb-6 text-custom-blue">
                <span className="word">We</span>{" "}
                <span className="word">turn</span>{" "}
                <br />
                <span className="word italic ">dreams</span>{" "}
                <span className="word">into</span>{" "}
                <br />
                <span className="word">Digital</span>{" "}
                <span className="word">Reality</span>
              </h1>
              <p className="subtext text-lg xs:text-sm lg:text-xl lg:font-light mb-8 text-custom-blue max-w-xl mx-auto">
                Looking to build your next big idea? We craft custom software to
                help startups and businesses grow with style and speed.
              </p>

              <Link href="/booking">
                <button className="cta-button bg-custom-blue text-custom-pink hover:bg-[#2C2C75] font-medium py-3 px-6 rounded-full inline-flex items-center">
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

            {/* Video for small screens (below md breakpoint) */}
            <div className="w-full block md:hidden">
              <video
                ref={mobileVideoRef}
                className="w-full h-auto object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                }}
                autoPlay
                muted
                loop
                playsInline
                src={videoSrc}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video for medium and large screens */}
            <div className="absolute right-0 mt-36 2xl:mt-60 top-24 w-1/2 h-full hidden md:block">
              <div className="relative w-full h-full flex items-center justify-end">
                <video
                  ref={desktopVideoRef}
                  className="w-full h-auto object-contain 2xl:scale-125"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={videoSrc}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestHeader;