/**
 * Video Cache Busting Utilities
 * Provides multiple strategies for preventing video caching issues
 */

// Video version configuration
const VIDEO_VERSIONS = {
  "airplane.mp4": "1.2.3",
  "globe.mp4": "1.1.0",
  "flower.mp4": "1.0.5",
  "baloon.mp4": "1.0.2",
};

// Hash-based file mapping (for production)
const VIDEO_HASHES = {
  "airplane.mp4": "airplane-abc123.mp4",
  "globe.mp4": "globe-def456.mp4",
  "flower.mp4": "flower-ghi789.mp4",
  "baloon.mp4": "baloon-jkl012.mp4",
};

/**
 * Dynamic URL Generation with Timestamps
 * Use JavaScript to generate timestamped URLs for cache busting
 * @param {string} baseUrl - Original video URL
 * @returns {string} - URL with timestamp parameter
 */
export const getVideoURL = (baseUrl) => {
  const timestamp = Date.now();
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}t=${timestamp}`;
};

/**
 * Advanced dynamic URL generation with multiple parameters
 * @param {string} baseUrl - Original video URL
 * @param {Object} options - Configuration options
 * @returns {string} - URL with cache busting parameters
 */
export const getDynamicVideoURL = (baseUrl, options = {}) => {
  const {
    useTimestamp = true,
    useRandomId = false,
    useSessionId = false,
    customParams = {},
  } = options;

  let url = baseUrl;
  const params = new URLSearchParams();

  if (useTimestamp) {
    params.append("t", Date.now().toString());
  }

  if (useRandomId) {
    params.append("r", Math.random().toString(36).substring(2, 15));
  }

  if (useSessionId && typeof window !== "undefined") {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem("video-session-id");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + Date.now();
      sessionStorage.setItem("video-session-id", sessionId);
    }
    params.append("sid", sessionId);
  }

  // Add custom parameters
  Object.entries(customParams).forEach(([key, value]) => {
    params.append(key, value);
  });

  const paramString = params.toString();
  if (paramString) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}${paramString}`;
  }

  return url;
};

/**
 * Get video URL with cache busting strategy
 * @param {string} filename - Original video filename
 * @param {string} strategy - 'version' | 'hash' | 'timestamp' | 'dynamic' | 'aggressive'
 * @returns {string} - Video URL with cache busting applied
 */
export const getVideoUrl = (filename, strategy = "version") => {
  const basePath = filename.startsWith("/") ? filename : `/${filename}`;

  switch (strategy) {
    case "hash":
      // Use hash-based filename if available
      const hashFilename = VIDEO_HASHES[filename.replace("/", "")];
      return hashFilename ? `/${hashFilename}` : basePath;

    case "timestamp":
      // Use current timestamp for development/testing
      return getVideoURL(basePath);

    case "dynamic":
      // Use advanced dynamic URL generation
      return getDynamicVideoURL(basePath, {
        useTimestamp: true,
        useRandomId: true,
        customParams: { cache: "no-store" },
      });

    case "aggressive":
      // Most aggressive cache busting for problematic videos
      return getDynamicVideoURL(basePath, {
        useTimestamp: true,
        useRandomId: true,
        useSessionId: true,
        customParams: {
          cache: "no-store",
          pragma: "no-cache",
          v: VIDEO_VERSIONS[filename.replace("/", "")] || "1.0.0",
        },
      });

    case "version":
    default:
      // Use version parameter
      const version = VIDEO_VERSIONS[filename.replace("/", "")];
      return version ? `${basePath}?v=${version}` : basePath;
  }
};

/**
 * Get multiple source URLs for video element
 * Useful for providing fallbacks
 * @param {string} filename - Original video filename
 * @returns {Array} - Array of source objects with different cache strategies
 */
export const getVideoSources = (filename) => {
  return [
    {
      src: getVideoUrl(filename, "version"),
      type: "video/mp4",
      strategy: "version",
    },
    {
      src: getVideoUrl(filename, "hash"),
      type: "video/mp4",
      strategy: "hash",
    },
  ];
};

/**
 * Update video version (useful for development)
 * @param {string} filename - Video filename to update
 * @param {string} newVersion - New version string
 */
export const updateVideoVersion = (filename, newVersion) => {
  VIDEO_VERSIONS[filename.replace("/", "")] = newVersion;
};

/**
 * Get current video version
 * @param {string} filename - Video filename
 * @returns {string} - Current version or 'unknown'
 */
export const getVideoVersion = (filename) => {
  return VIDEO_VERSIONS[filename.replace("/", "")] || "unknown";
};

/**
 * Development helper to force refresh all videos
 * @returns {void}
 */
export const refreshAllVideos = () => {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    const currentSrc = video.src;
    const filename = currentSrc.split("/").pop().split("?")[0];
    video.src = getVideoUrl(filename, "timestamp");
    video.load(); // Force reload
  });
};

// Environment-based strategy selection
export const getOptimalStrategy = () => {
  if (typeof window === "undefined") return "version";

  // Use hash in production, version in development
  const isProd = process.env.NODE_ENV === "production";
  return isProd ? "hash" : "version";
};

export default {
  getVideoUrl,
  getVideoURL,
  getDynamicVideoURL,
  getVideoSources,
  updateVideoVersion,
  getVideoVersion,
  refreshAllVideos,
  getOptimalStrategy,
};
