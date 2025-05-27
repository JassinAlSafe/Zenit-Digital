import React, { useEffect, useRef, useState } from "react";
import { getVideoURL, getDynamicVideoURL } from "../utils/videoCache";

/**
 * DynamicVideo Component
 * Demonstrates dynamic URL generation for cache busting
 * Uses JavaScript to generate timestamped URLs as mentioned in your examples
 */
const DynamicVideo = ({
  src,
  className = "",
  style = {},
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  controls = false,
  refreshInterval = null, // Auto-refresh interval in ms
  cacheStrategy = "timestamp", // 'timestamp', 'dynamic', 'aggressive'
  onLoadedData,
  onError,
  ...props
}) => {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("");
  const intervalRef = useRef(null);

  // Generate video URL based on strategy
  const generateUrl = (baseUrl, strategy = "timestamp") => {
    if (!baseUrl) return "";

    switch (strategy) {
      case "timestamp":
        return getVideoURL(baseUrl);

      case "dynamic":
        return getDynamicVideoURL(baseUrl, {
          useTimestamp: true,
          useRandomId: true,
          customParams: { cache: "no-store" },
        });

      case "aggressive":
        return getDynamicVideoURL(baseUrl, {
          useTimestamp: true,
          useRandomId: true,
          useSessionId: true,
          customParams: {
            cache: "no-store",
            pragma: "no-cache",
            expires: "0",
          },
        });

      default:
        return baseUrl;
    }
  };

  // Update video URL
  const updateVideoUrl = () => {
    const newUrl = generateUrl(src, cacheStrategy);
    setVideoUrl(newUrl);

    // Log the URL for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`🎥 Dynamic video URL generated: ${newUrl}`);
    }
  };

  // Initialize video URL
  useEffect(() => {
    updateVideoUrl();
  }, [src, cacheStrategy]);

  // Set up auto-refresh interval if specified
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        updateVideoUrl();

        // Reload video if it's the same element
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refreshInterval]);

  // Handle video load
  const handleLoadedData = (e) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ Video loaded successfully: ${src}`);
    }
    if (onLoadedData) onLoadedData(e);
  };

  // Handle video error
  const handleError = (e) => {
    console.error(`❌ Video load error: ${src}`, e);

    // Try regenerating URL on error
    setTimeout(() => {
      updateVideoUrl();
      if (videoRef.current) {
        videoRef.current.load();
      }
    }, 1000);

    if (onError) onError(e);
  };

  // Manual refresh function
  const refreshVideo = () => {
    updateVideoUrl();
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <div className="dynamic-video-container relative">
      <video
        ref={videoRef}
        src={videoUrl}
        className={className}
        style={style}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        onLoadedData={handleLoadedData}
        onError={handleError}
        {...props}
      >
        Your browser does not support the video tag.
      </video>

      {/* Development debug panel */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 opacity-0 hover:opacity-100 transition-opacity max-w-xs">
          <div className="mb-1">
            <strong>Dynamic Video Debug</strong>
          </div>
          <div className="mb-1">Strategy: {cacheStrategy}</div>
          <div className="mb-1 break-all">URL: {videoUrl}</div>
          {refreshInterval && (
            <div className="mb-1">Auto-refresh: {refreshInterval}ms</div>
          )}
          <button
            onClick={refreshVideo}
            className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-xs mt-1"
          >
            Force Refresh
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Example usage function showing how to use dynamic video URLs
 * This demonstrates the exact approach from your examples
 */
export const updateVideoElementDynamically = (videoSelector) => {
  // This is the exact function from your example
  function getVideoURL(baseUrl) {
    const timestamp = Date.now();
    return `${baseUrl}?t=${timestamp}`;
  }

  // Usage example
  const videoElement = document.querySelector(videoSelector);
  if (videoElement) {
    const currentSrc = videoElement.src.split("?")[0]; // Remove existing params
    videoElement.src = getVideoURL(currentSrc);
    videoElement.load(); // Force reload
  }
};

/**
 * Utility to update all video elements on the page
 */
export const refreshAllVideoElements = () => {
  const videos = document.querySelectorAll("video[src]");
  videos.forEach((video) => {
    const baseSrc = video.src.split("?")[0];
    video.src = getVideoURL(baseSrc);
    video.load();
  });
};

export default DynamicVideo;
