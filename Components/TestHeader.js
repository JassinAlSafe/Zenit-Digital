import React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const TestHeader = ({ onAnimationStart }) => {
  // Create refs for the video elements
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  
  // State to store the video source
  const [videoSrc, setVideoSrc] = useState("");
  
  // State to detect Windows for platform-specific adjustments
  const [isWindows, setIsWindows] = useState(false);

  // Function to detect Safari browser
  const isSafari = () => {
    if (typeof window === "undefined") return false;
    const userAgent = window.navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    return isSafariBrowser;
  };

  // Function to detect Windows
  const detectWindows = () => {
    if (typeof window === "undefined") return false;
    return window.navigator.platform.toLowerCase().includes('win');
  };

  useEffect(() => {
    // Set video source based on browser
    const videoFormat = isSafari() ? "/airplane.mov" : "/airplane.webm";
    setVideoSrc(videoFormat);
    
    // Detect Windows for platform-specific styling
    setIsWindows(detectWindows());
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

  // Platform-specific class adjustments
  const getPlatformClasses = () => {
    if (isWindows) {
      return {
        // Windows-specific adjustments - slightly smaller text and adjusted spacing
        title: "text-5xl 2xl:text-[11rem] xs:text-3xl lg:text-8xl md:text-5xl font-medium lg:font-medium lg:leading-none leading-none mb-4 text-custom-blue",
        subtitle: "subtext text-base xs:text-sm lg:text-lg lg:font-light mb-6 text-custom-blue max-w-lg mx-auto",
        container: "container mx-auto px-3 py-12 md:py-20 relative",
        section: "relative h-screen w-full flex items-center justify-center overflow-hidden",
        wrapper: "w-full overflow-hidden xs:mt-1 mt-10 md:mt-8 lg:mt-8",
        videoDesktop: "absolute right-0 mt-32 2xl:mt-52 top-20 w-1/2 h-full hidden md:block",
        videoDesktopInner: "w-full h-auto object-contain 2xl:scale-110"
      };
    } else {
      // macOS classes (original)
      return {
        title: "text-6xl 2xl:text-[13rem] xs:text-[45px] lg:text-9xl md:text-6xl font-medium lg:font-medium lg:leading-none leading-none mb-6 text-custom-blue",
        subtitle: "subtext text-lg xs:text-sm lg:text-xl lg:font-light mb-8 text-custom-blue max-w-xl mx-auto",
        container: "container mx-auto px-4 py-16 md:py-24 relative",
        section: "relative h-screen w-full flex items-center justify-center",
        wrapper: "w-full overflow-hidden xs:mt-2 mt-10 md:mt-10 lg:mt-10",
        videoDesktop: "absolute right-0 mt-36 2xl:mt-60 top-24 w-1/2 h-full hidden md:block",
        videoDesktopInner: "w-full h-auto object-contain 2xl:scale-125"
      };
    }
  };

  const classes = getPlatformClasses();

  return (
    <section
      className={classes.section}
      data-bg="white"
      data-text="var(--custom-blue)"
      data-button-bg="var(--custom-blue)"
      data-button-text="white"
      data-navbar-text="var(--custom-blue)"
      id="/"
      style={{
        // CSS-based platform detection as backup
        fontSize: isWindows ? '0.95em' : '1em',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className="flex flex-col items-center text-center">
            <div className="w-full 2xl:w-full lg:w-3/4 z-10">
              <h1 className={classes.title}>
                <span className="word">We</span>{" "}
                <span className="word">turn</span>{" "}
                <br />
                <span className="word italic">dreams</span>{" "}
                <span className="word">into</span>{" "}
                <br />
                <span className="word">Digital</span>{" "}
                <span className="word">Reality</span>
              </h1>
              <p className={classes.subtitle}>
                Looking to build your next big idea? We craft custom software to
                help startups and businesses grow with style and speed.
              </p>

              <Link href="/booking">
                <MagneticButton className="cta-button bg-custom-blue text-custom-pink hover:bg-[#2C2C75] font-medium py-3 px-6 rounded-full inline-flex items-center">
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
                </MagneticButton>
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
                  maxHeight: isWindows ? '60vh' : '70vh' // Adjust video height for Windows
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
            <div className={classes.videoDesktop}>
              <div className="relative w-full h-full flex items-center justify-end">
                <video
                  ref={desktopVideoRef}
                  className={classes.videoDesktopInner}
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                    maxHeight: isWindows ? '75vh' : '85vh' // Constrain video height on Windows
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