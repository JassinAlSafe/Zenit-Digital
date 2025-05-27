import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getVersionedVideoUrl } from "../utils/videoCache";
import { testingUtils, deviceDetection } from "../utils/deviceUtils";

function Test() {
  const videoRef = useRef(null);
  const [videoDebugInfo, setVideoDebugInfo] = useState({});
  const [isDebugging, setIsDebugging] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Run Windows diagnostics if on Windows
      if (deviceDetection.isWindows()) {
        console.log("🖥️ Windows detected - running video diagnostics");
        const videoSrc = getVersionedVideoUrl("flower.mp4");
        testingUtils.runWindowsVideoDiagnostics(videoSrc);
      }

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

  // Enhanced video debugging
  const runVideoDebug = async () => {
    setIsDebugging(true);
    const videoSrc = getVersionedVideoUrl("flower.mp4");
    const browserInfo = deviceDetection.getBrowserInfo();

    console.log("🔍 Running comprehensive video debug...");
    console.log("Video source:", videoSrc);
    console.log("Browser info:", browserInfo);

    try {
      // Test video file accessibility
      await testingUtils.testVideoFileAccess([videoSrc]);

      // Test video element creation
      const result = await testingUtils.testVideoElementCreation(videoSrc);

      setVideoDebugInfo({
        videoSrc,
        browserInfo,
        videoLoadResult: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Debug failed:", error);
      setVideoDebugInfo({
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }

    setIsDebugging(false);
  };

  // Handle video load errors
  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    console.log("Video source:", e.target.src);
    console.log("Error code:", e.target.error?.code);
    console.log("Error message:", e.target.error?.message);
    console.log("Network state:", e.target.networkState);
    console.log("Ready state:", e.target.readyState);

    // Try to get more detailed error info
    if (e.target.error) {
      const errorCodes = {
        1: "MEDIA_ERR_ABORTED - Media aborted",
        2: "MEDIA_ERR_NETWORK - Network error",
        3: "MEDIA_ERR_DECODE - Decode error",
        4: "MEDIA_ERR_SRC_NOT_SUPPORTED - Source not supported",
      };
      console.log(
        "Error details:",
        errorCodes[e.target.error.code] || "Unknown error"
      );
    }
  };

  const handleVideoLoadStart = () => {
    console.log("Video loading started");
  };

  const handleVideoCanPlay = () => {
    console.log("Video can play");
  };

  const handleVideoLoadedMetadata = () => {
    console.log("Video metadata loaded");
    if (videoRef.current?.querySelector("video")) {
      const video = videoRef.current.querySelector("video");
      console.log(
        "Video dimensions:",
        video.videoWidth,
        "x",
        video.videoHeight
      );
      console.log("Video duration:", video.duration);
    }
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
      {/* Debug Panel - Only show in development or when debugging */}
      {(process.env.NODE_ENV === "development" ||
        Object.keys(videoDebugInfo).length > 0) && (
        <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-md text-sm">
          <h3 className="font-bold mb-2">Video Debug Panel</h3>
          <button
            onClick={runVideoDebug}
            disabled={isDebugging}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded mb-2 disabled:opacity-50"
          >
            {isDebugging ? "Debugging..." : "Run Video Debug"}
          </button>

          {Object.keys(videoDebugInfo).length > 0 && (
            <div className="mt-2 space-y-1">
              <div>Platform: {videoDebugInfo.browserInfo?.platform}</div>
              <div>Browser: {videoDebugInfo.browserInfo?.name}</div>
              <div>
                Supports WebM:{" "}
                {videoDebugInfo.browserInfo?.supportsWebM ? "✅" : "❌"}
              </div>
              <div>
                Supports MP4:{" "}
                {videoDebugInfo.browserInfo?.supportsMP4 ? "✅" : "❌"}
              </div>
              <div>Video Source: {videoDebugInfo.videoSrc}</div>
              {videoDebugInfo.videoLoadResult && (
                <div>
                  Load Test:{" "}
                  {videoDebugInfo.videoLoadResult.success
                    ? "✅ Success"
                    : "❌ Failed"}
                </div>
              )}
              {videoDebugInfo.error && (
                <div className="text-red-400">
                  Error: {videoDebugInfo.error}
                </div>
              )}
            </div>
          )}
        </div>
      )}

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

        {/* Right Section - Video Container */}
        <div
          ref={videoRef}
          className="w-full lg:w-1/2 relative flex items-center justify-center rounded-md bg-custom-green overflow-hidden mb-10"
        >
          <video
            className="w-full h-auto max-w-full sm:max-w-md lg:max-w-lg 2xl:scale-125"
            muted
            loop
            playsInline
            preload="metadata"
            src={getVersionedVideoUrl("flower.mp4")}
            onError={handleVideoError}
            onLoadStart={handleVideoLoadStart}
            onCanPlay={handleVideoCanPlay}
            onLoadedMetadata={handleVideoLoadedMetadata}
            style={{
              background: "transparent", // Remove black background to see what's happening
              minHeight: "200px", // Ensure minimum height for visibility
            }}
          >
            <source src={getVersionedVideoUrl("flower.mp4")} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fallback message */}
          <div className="absolute inset-0 flex items-center justify-center text-custom-lightGreen text-center p-4">
            <div>
              <p className="text-lg font-medium mb-2">Video Content</p>
              <p className="text-sm opacity-75">
                Loading multimedia content...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Test;
