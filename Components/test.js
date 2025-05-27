import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { getVersionedVideoUrl } from "../utils/videoCache";

function Test() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set up Intersection Observer to detect when video is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If video is in view
            if (entry.isIntersecting) {
              // Play the video
              const videoElement = entry.target.querySelector("video");
              if (videoElement) {
                videoElement.play().catch((e) => {
                  console.log("Auto-play was prevented:", e);
                  // Many browsers require user interaction before playing videos with sound
                });
              }
            } else {
              // Optionally pause when out of view
              const videoElement = entry.target.querySelector("video");
              if (videoElement) {
                videoElement.pause();
              }
            }
          });
        },
        { threshold: 0.1 }
      ); // Trigger when at least 10% of the video is visible

      // Start observing the video element
      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      // Clean up observer on unmount
      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }
  }, []);

  // Handle video load errors
  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    console.log("Video source:", e.target.src);
    console.log("Error code:", e.target.error?.code);
    console.log("Error message:", e.target.error?.message);
  };

  const handleVideoLoadStart = () => {
    console.log("Video loading started");
  };

  const handleVideoCanPlay = () => {
    console.log("Video can play");
  };

  return (
    <section
      className="min-h-screen flex flex-col"
      data-bg="white"
      data-text="var(--custom-green)"
      data-button-bg="var(--custom-green)"
      data-button-text="var(--custom-lightGreen)"
      data-nav-text="var(--custom-lightGreen)"
    >
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 px-6 sm:px-10 lg:px-16 pt-8 lg:pt-12 gap-8 bg-white">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-7xl font-medium mb-4 sm:mb-6 text-custom-green 2xl:text-8xl">
            Want to <span className="text-custom-lightGreen">Grow</span> your
            digital presence? We&apos;re here to make it happen!
          </h1>
          <p className="text-custom-green lg:text-lg 2xl:text-2xl  mt-2 sm:mt-4">
            Book a free 45-minute consultation and discover <br /> how we can
            help you elevate your digital presence!
          </p>
          <div className="mt-4 sm:mt-6">
            <Link href="/booking">
              <button className="bg-custom-green text-custom-lightGreen hover:bg-[#135050] px-6 sm:px-8 py-3 rounded-lg font-bold flex items-center">
                Let&apos;s Talk
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div
          ref={videoRef}
          className="w-full lg:w-1/2 relative flex items-center justify-center rounded-md bg-custom-green overflow-hidden mb-10"
        >
          <video
            className="w-full h-auto max-w-full sm:max-w-md lg:max-w-lg 2xl:scale-125"
            muted
            loop
            playsInline
            src={getVersionedVideoUrl("flower.mp4")}
            onError={handleVideoError}
            onLoadStart={handleVideoLoadStart}
            onCanPlay={handleVideoCanPlay}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

export default Test;
