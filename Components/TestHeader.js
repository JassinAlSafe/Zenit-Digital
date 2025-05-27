import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { getVersionedVideoUrl } from "../utils/videoCache";
import { testingUtils, deviceDetection } from "../utils/deviceUtils";

const TestHeader = ({ onAnimationStart }) => {
  // Create refs for the video containers (not the video elements themselves)
  const mobileVideoContainerRef = useRef(null);
  const desktopVideoContainerRef = useRef(null);

  useEffect(() => {
    // Windows-specific airplane video debugging
    if (typeof window !== "undefined" && deviceDetection.isWindows()) {
      console.log("🖥️ Windows detected - running airplane video diagnostics");
      const airplaneVideoSrc = getVersionedVideoUrl("airplane.mp4");
      console.log("Airplane video source:", airplaneVideoSrc);

      // Test video file accessibility
      testingUtils.testVideoFileAccess([airplaneVideoSrc]).then(() => {
        // Test video element creation
        testingUtils
          .testVideoElementCreation(airplaneVideoSrc)
          .then((result) => {
            if (!result.success) {
              console.error(
                "❌ Airplane video failed to load on Windows:",
                result.error
              );
            } else {
              console.log("✅ Airplane video loaded successfully on Windows");
            }
          });
      });

      // Run comprehensive Windows video diagnostics
      testingUtils.runWindowsVideoDiagnostics(airplaneVideoSrc);
    }

    // Mac-specific airplane video debugging
    if (typeof window !== "undefined" && deviceDetection.isMacOS()) {
      console.log("🍎 Mac detected - running airplane video diagnostics");
      const airplaneVideoSrc = getVersionedVideoUrl("airplane.mp4");
      const airplaneVideoWebmSrc = getVersionedVideoUrl("airplane.webm");
      console.log("Airplane MP4 source:", airplaneVideoSrc);
      console.log("Airplane WebM source:", airplaneVideoWebmSrc);

      // Log full URLs for direct testing
      const baseUrl = window.location.origin;
      console.log("🔗 Direct test URLs:");
      console.log("MP4:", `${baseUrl}${airplaneVideoSrc}`);
      console.log("WebM:", `${baseUrl}${airplaneVideoWebmSrc}`);

      // Test video file accessibility on Mac
      testingUtils.testVideoFileAccess([airplaneVideoSrc]).then(() => {
        testingUtils
          .testVideoElementCreation(airplaneVideoSrc)
          .then((result) => {
            if (!result.success) {
              console.error(
                "❌ Airplane video failed to load on Mac:",
                result.error
              );
            } else {
              console.log("✅ Airplane video loaded successfully on Mac");
            }
          });
      });
    }

    // Debug video container visibility
    setTimeout(() => {
      console.log("🔍 Debugging video container visibility:");
      if (mobileVideoContainerRef.current) {
        const mobileStyles = window.getComputedStyle(
          mobileVideoContainerRef.current
        );
        console.log("📱 Mobile container opacity:", mobileStyles.opacity);
        console.log("📱 Mobile container visibility:", mobileStyles.visibility);
        console.log("📱 Mobile container display:", mobileStyles.display);
      }
      if (desktopVideoContainerRef.current) {
        const desktopStyles = window.getComputedStyle(
          desktopVideoContainerRef.current
        );
        console.log("🖥️ Desktop container opacity:", desktopStyles.opacity);
        console.log(
          "🖥️ Desktop container visibility:",
          desktopStyles.visibility
        );
        console.log("🖥️ Desktop container display:", desktopStyles.display);
      }
    }, 3000);

    // Ensure video containers exist before setting up animations
    if (!mobileVideoContainerRef.current || !desktopVideoContainerRef.current) {
      console.error("❌ Video container refs not found");
      return;
    }

    // Hide everything initially
    gsap.set(".subtext, .cta-button", { autoAlpha: 0 });
    gsap.set(
      [mobileVideoContainerRef.current, desktopVideoContainerRef.current],
      {
        autoAlpha: 0,
        scale: 0.9,
        x: 30,
      }
    );

    // Number of words in the title
    const words = document.querySelectorAll(".word");
    const wordCount = words.length;

    if (wordCount === 0) {
      console.error("❌ No word elements found for animation");
      return;
    }

    console.log(`🎬 Setting up animations for ${wordCount} words`);

    // Create a single timeline for all animations
    const tl = gsap.timeline({
      onStart: () => {
        console.log("🎬 Animation timeline started");
        // Notify parent component that animation has started
        if (onAnimationStart && typeof onAnimationStart === "function") {
          onAnimationStart();
        }
      },
      onComplete: () => {
        console.log("🎉 Animation timeline completed");
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
        // Add animations for paragraph and button
        tl.to(
          [".subtext", ".cta-button"],
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

        // Add airplane animation after paragraph and button
        tl.to(
          [mobileVideoContainerRef.current, desktopVideoContainerRef.current],
          {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            duration: 0.9,
            ease: "power2.out",
            onComplete: () => {
              console.log("✈️ Video containers are now visible");
            },
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
        <div
          ref={mobileVideoContainerRef}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-sm block md:hidden z-0"
        >
          <video
            className="w-full h-auto object-contain opacity-70"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadStart={() =>
              console.log("📱 Mobile airplane video load started")
            }
            onLoadedMetadata={() =>
              console.log("📱 Mobile airplane video metadata loaded")
            }
            onCanPlay={() => console.log("📱 Mobile airplane video can play")}
            onError={(e) => {
              console.error("❌ Mobile airplane video error:", e);
              console.error("Video element:", e.target);
              console.error("Error code:", e.target.error?.code);
              console.error("Error message:", e.target.error?.message);
            }}
            onLoadedData={() =>
              console.log("📱 Mobile airplane video data loaded")
            }
            onPlay={() =>
              console.log("📱 Mobile airplane video started playing")
            }
          >
            <source
              src={getVersionedVideoUrl("airplane.mp4")}
              type="video/mp4; codecs='avc1.42E01E'"
            />
            <source
              src={getVersionedVideoUrl("airplane.webm")}
              type="video/webm; codecs='vp9'"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video for medium and large screens */}
        <div
          ref={desktopVideoContainerRef}
          className="absolute right-16 top-1/2 transform -translate-y-1/2 w-1/3 max-w-md hidden md:block z-0 pointer-events-none"
        >
          <video
            className="w-full h-auto object-contain opacity-60"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadStart={() =>
              console.log("🖥️ Desktop airplane video load started")
            }
            onLoadedMetadata={() =>
              console.log("🖥️ Desktop airplane video metadata loaded")
            }
            onCanPlay={() => console.log("🖥️ Desktop airplane video can play")}
            onError={(e) => {
              console.error("❌ Desktop airplane video error:", e);
              console.error("Video element:", e.target);
              console.error("Error code:", e.target.error?.code);
              console.error("Error message:", e.target.error?.message);

              // Windows-specific troubleshooting
              if (deviceDetection.isWindows()) {
                console.log("🔧 Windows troubleshooting:");
                console.log("1. Checking video source URL:", e.target.src);
                console.log(
                  "2. Checking if file exists at:",
                  getVersionedVideoUrl("airplane.mp4")
                );
                console.log(
                  "3. Browser info:",
                  deviceDetection.getBrowserInfo()
                );

                // Try alternative loading method
                setTimeout(() => {
                  console.log("🔄 Attempting to reload video...");
                  e.target.load();
                }, 1000);
              }
            }}
            onLoadedData={() =>
              console.log("🖥️ Desktop airplane video data loaded")
            }
            onPlay={() =>
              console.log("🖥️ Desktop airplane video started playing")
            }
          >
            <source
              src={getVersionedVideoUrl("airplane.mp4")}
              type="video/mp4; codecs='avc1.42E01E'"
            />
            <source
              src={getVersionedVideoUrl("airplane.webm")}
              type="video/webm; codecs='vp9'"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default TestHeader;
