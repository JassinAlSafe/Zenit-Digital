import React, { useEffect, useRef, useState, useCallback } from "react";
import { videoManager } from "../utils/VideoManager";

/**
 * OptimizedVideo Component
 * Advanced video component with progressive loading, multiple formats, and caching
 */
const OptimizedVideo = ({
  videoId,
  width = 800,
  height = 450,
  poster,
  className = "",
  style = {},
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  preload = "metadata",
  strategy,
  formats = ["webm", "mp4"],
  onLoadStart,
  onLoadedData,
  onError,
  onCanPlay,
  enableIntersectionObserver = false,
  intersectionThreshold = 0.1,
  ...props
}) => {
  const videoRef = useRef(null);
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [isInView, setIsInView] = useState(!enableIntersectionObserver);

  // Load video when component mounts or when in view
  const loadVideo = useCallback(async () => {
    if (!videoRef.current || !videoId || hasLoaded) return;

    setIsLoading(true);
    setLoadError(null);

    try {
      if (onLoadStart) onLoadStart();

      await videoManager.loadVideo(videoId, videoRef.current, {
        strategy,
        formats,
        poster,
        preload,
      });

      setHasLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load video:", error);
      setLoadError(error);
      setIsLoading(false);
      if (onError) onError(error);
    }
  }, [
    videoId,
    strategy,
    formats,
    poster,
    preload,
    hasLoaded,
    onLoadStart,
    onError,
  ]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!enableIntersectionObserver || !videoRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: intersectionThreshold }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enableIntersectionObserver, intersectionThreshold]);

  // Load video when in view
  useEffect(() => {
    if (isInView) {
      loadVideo();
    }
  }, [isInView, loadVideo]);

  // Video event handlers
  const handleLoadedData = (e) => {
    setIsLoading(false);
    if (onLoadedData) onLoadedData(e);
  };

  const handleCanPlay = (e) => {
    if (onCanPlay) onCanPlay(e);
  };

  const handleError = (e) => {
    setLoadError(new Error("Video playback error"));
    setIsLoading(false);
    if (onError) onError(e);
  };

  // Force refresh video
  const refreshVideo = useCallback(() => {
    setHasLoaded(false);
    setIsLoading(true);
    setLoadError(null);
    loadVideo();
  }, [loadVideo]);

  return (
    <div
      className={`optimized-video-container relative ${className}`}
      style={style}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <span className="text-sm text-gray-600">Loading video...</span>
          </div>
        </div>
      )}

      {/* Error display */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded border border-red-200">
          <div className="text-center p-4">
            <div className="text-red-600 mb-2">Failed to load video</div>
            <button
              onClick={refreshVideo}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        data-video-id={videoId}
        width={width}
        height={height}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        onError={handleError}
        className={`w-full h-auto ${isLoading ? "invisible" : "visible"}`}
        {...props}
      >
        {/* Fallback text - will be replaced by VideoManager */}
        Your browser doesn't support video playback.
      </video>

      {/* Development debug panel */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-0 right-0 bg-black bg-opacity-80 text-white text-xs p-2 opacity-0 hover:opacity-100 transition-opacity max-w-xs">
          <div className="mb-1">
            <strong>OptimizedVideo Debug</strong>
          </div>
          <div className="mb-1">Video ID: {videoId}</div>
          <div className="mb-1">Strategy: {strategy || "auto"}</div>
          <div className="mb-1">Formats: {formats.join(", ")}</div>
          <div className="mb-1">
            Status: {isLoading ? "Loading" : hasLoaded ? "Loaded" : "Waiting"}
          </div>
          <div className="mb-1">In View: {isInView ? "Yes" : "No"}</div>
          {loadError && <div className="mb-1 text-red-400">Error</div>}
          <button
            onClick={refreshVideo}
            className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-xs mt-1"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * VideoGrid Component
 * Optimized component for displaying multiple videos with progressive loading
 */
export const VideoGrid = ({
  videos = [],
  strategy,
  className = "",
  itemClassName = "",
  enableLazyLoading = true,
  ...videoProps
}) => {
  const gridRef = useRef(null);

  // Preload videos when grid comes into view
  useEffect(() => {
    if (!enableLazyLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Preload first few videos when grid is visible
            const videoIds = videos.slice(0, 3).map((v) => v.videoId || v);
            videoManager.preloadVideos(videoIds, { strategy });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, [videos, strategy, enableLazyLoading]);

  return (
    <div ref={gridRef} className={`video-grid ${className}`}>
      {videos.map((video, index) => {
        const videoConfig =
          typeof video === "string" ? { videoId: video } : video;

        return (
          <OptimizedVideo
            key={videoConfig.videoId || index}
            strategy={strategy}
            enableIntersectionObserver={enableLazyLoading}
            className={itemClassName}
            {...videoProps}
            {...videoConfig}
          />
        );
      })}
    </div>
  );
};

/**
 * VideoPlaylist Component
 * Sequential video player with automatic loading
 */
export const VideoPlaylist = ({
  playlist = [],
  currentIndex = 0,
  onVideoChange,
  strategy,
  ...videoProps
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const videoRef = useRef(null);

  const currentVideo = playlist[activeIndex];

  // Preload next video
  useEffect(() => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < playlist.length) {
      const nextVideoId =
        typeof playlist[nextIndex] === "string"
          ? playlist[nextIndex]
          : playlist[nextIndex].videoId;

      videoManager.preloadVideo(nextVideoId, { strategy });
    }
  }, [activeIndex, playlist, strategy]);

  const handleVideoEnd = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < playlist.length) {
      setActiveIndex(nextIndex);
      if (onVideoChange) onVideoChange(nextIndex);
    }
  };

  const goToVideo = (index) => {
    setActiveIndex(index);
    if (onVideoChange) onVideoChange(index);
  };

  if (!currentVideo) return null;

  return (
    <div className="video-playlist">
      <OptimizedVideo
        ref={videoRef}
        {...(typeof currentVideo === "string"
          ? { videoId: currentVideo }
          : currentVideo)}
        strategy={strategy}
        onEnded={handleVideoEnd}
        {...videoProps}
      />

      {/* Playlist controls */}
      <div className="playlist-controls mt-4 flex gap-2 flex-wrap">
        {playlist.map((video, index) => {
          const title =
            typeof video === "string" ? video : video.title || video.videoId;

          return (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`px-3 py-1 rounded text-sm ${
                index === activeIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptimizedVideo;
