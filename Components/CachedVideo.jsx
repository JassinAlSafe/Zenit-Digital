import React, { useEffect, useRef, useState } from "react";
import {
  getVideoUrl,
  getVideoURL,
  getDynamicVideoURL,
  getOptimalStrategy,
  refreshAllVideos,
} from "../utils/videoCache";

/**
 * CachedVideo Component
 * A video component with built-in cache busting capabilities
 */
const CachedVideo = ({
  src,
  strategy,
  className = "",
  style = {},
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  controls = false,
  onLoadedData,
  onError,
  fallbackStrategy = "timestamp",
  ...props
}) => {
  const videoRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Determine the cache busting strategy to use
  const cacheStrategy = strategy || getOptimalStrategy();

  // Generate the video URL immediately to avoid empty src
  // Use API route for better caching control
  const generateVideoSrc = (filename, strategy) => {
    if (!filename) return null;

    // Use API route for serving videos with proper headers
    const apiBasePath = `/api/videos/${filename.replace(/^\//, "")}`;

    switch (strategy) {
      case "aggressive":
        return getDynamicVideoURL(apiBasePath, {
          useTimestamp: true,
          useRandomId: true,
          useSessionId: true,
          customParams: {
            cache: "no-store",
            pragma: "no-cache",
          },
        });
      case "dynamic":
        return getDynamicVideoURL(apiBasePath, {
          useTimestamp: true,
          useRandomId: true,
          customParams: { cache: "no-store" },
        });
      case "timestamp":
        return getVideoURL(apiBasePath);
      default:
        // For version and hash strategies, still use direct file access
        return getVideoUrl(src, strategy);
    }
  };

  const currentSrc = generateVideoSrc(src, cacheStrategy);

  useEffect(() => {
    if (src && loadError && retryCount > 0) {
      // Only update src if we're retrying due to an error
      setLoadError(false);
    }
  }, [src, cacheStrategy, loadError, retryCount]);

  // Handle video load errors with retry mechanism
  const handleVideoError = (e) => {
    console.warn(`Video load error for ${src}:`, e);
    setLoadError(true);

    if (retryCount < maxRetries) {
      console.log(
        `Retrying video load (${
          retryCount + 1
        }/${maxRetries}) with fallback strategy...`
      );

      // Try with different strategy on retry
      const fallbackUrl = getVideoUrl(src, fallbackStrategy);
      setRetryCount((prev) => prev + 1);

      // Update the video src directly and reload
      if (videoRef.current) {
        videoRef.current.src = fallbackUrl;
        videoRef.current.load();
      }
    } else {
      console.error(`Failed to load video ${src} after ${maxRetries} retries`);
      if (onError) onError(e);
    }
  };

  // Handle successful video load
  const handleVideoLoad = (e) => {
    setLoadError(false);
    if (onLoadedData) onLoadedData(e);
  };

  // Force refresh function for debugging
  const forceRefresh = () => {
    const timestampUrl = generateVideoSrc(src, "aggressive");
    if (videoRef.current) {
      videoRef.current.src = timestampUrl;
      videoRef.current.load();
    }
  };

  return (
    <div className="cached-video-container relative">
      <video
        ref={videoRef}
        src={currentSrc}
        className={className}
        style={style}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        {...props}
      >
        Your browser does not support the video tag.
      </video>

      {/* Debug overlay in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 hover:opacity-100 transition-opacity">
          <div>Strategy: {cacheStrategy}</div>
          <div>Retries: {retryCount}</div>
          {loadError && <div className="text-red-400">Error</div>}
          <button
            onClick={forceRefresh}
            className="bg-blue-500 px-1 mt-1 rounded text-xs"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * CachedVideoSource Component
 * For use with multiple source elements in a video tag
 */
export const CachedVideoSource = ({ src, type = "video/mp4", strategy }) => {
  const cacheStrategy = strategy || getOptimalStrategy();
  const videoUrl = getVideoUrl(src, cacheStrategy);

  return <source src={videoUrl} type={type} />;
};

/**
 * MultiSourceVideo Component
 * Video component with multiple source fallbacks
 */
export const MultiSourceVideo = ({
  sources = [],
  className = "",
  style = {},
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  controls = false,
  ...props
}) => {
  const videoRef = useRef(null);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      {...props}
    >
      {sources.map((source, index) => (
        <CachedVideoSource
          key={index}
          src={source.src}
          type={source.type || "video/mp4"}
          strategy={source.strategy}
        />
      ))}
      Your browser does not support the video tag.
    </video>
  );
};

export default CachedVideo;
