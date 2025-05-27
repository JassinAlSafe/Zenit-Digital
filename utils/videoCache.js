/**
 * Video Cache Busting Utilities - BEST PRACTICE IMPLEMENTATION
 * Primary Strategy: Versioned URLs + Proper HTTP Headers
 * Fallback Strategies: Dynamic URLs, Timestamps, Hash-based naming
 */

// Video version configuration - PRIMARY CACHE STRATEGY
const VIDEO_VERSIONS = {
  "airplane.mp4": "1.2.3",
  "globe.mp4": "1.1.0",
  "flower.mp4": "1.0.5",
  "baloon.mp4": "1.0.2",
};

// Hash-based file mapping (for production CDN)
const VIDEO_HASHES = {
  "airplane.mp4": "airplane-abc123.mp4",
  "globe.mp4": "globe-def456.mp4",
  "flower.mp4": "flower-ghi789.mp4",
  "baloon.mp4": "baloon-jkl012.mp4",
};

/**
 * BEST PRACTICE: Get video URL with versioned parameter
 * This is the most reliable method for cache busting
 * @param {string} filename - Original video filename
 * @param {string} version - Optional version override
 * @returns {string} - Versioned video URL
 */
export const getVersionedVideoUrl = (filename, version = null) => {
  const basePath = filename.startsWith("/") ? filename : `/${filename}`;
  const videoVersion =
    version || VIDEO_VERSIONS[filename.replace("/", "")] || "1.0.0";
  return `${basePath}?v=${videoVersion}`;
};

/**
 * Dynamic URL Generation with Timestamps (FALLBACK STRATEGY)
 * Use when versioning isn't sufficient
 */
export const getVideoURL = (baseUrl) => {
  const timestamp = Date.now();
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}t=${timestamp}`;
};

/**
 * Advanced dynamic URL generation (EMERGENCY FALLBACK)
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
    let sessionId = sessionStorage.getItem("video-session-id");
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + Date.now();
      sessionStorage.setItem("video-session-id", sessionId);
    }
    params.append("sid", sessionId);
  }

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
 * SMART VIDEO URL RESOLVER - Chooses best strategy automatically
 * Priority: 1. Versioned URLs, 2. Hash-based, 3. Dynamic fallback
 * @param {string} filename - Original video filename
 * @param {string} strategy - Force specific strategy or 'auto'
 * @returns {string} - Optimized video URL
 */
export const getVideoUrl = (filename, strategy = "auto") => {
  const basePath = filename.startsWith("/") ? filename : `/${filename}`;
  const cleanFilename = filename.replace("/", "");

  // Auto-detect best strategy
  if (strategy === "auto") {
    // Use versioned URLs if version exists (BEST PRACTICE)
    if (VIDEO_VERSIONS[cleanFilename]) {
      return getVersionedVideoUrl(filename);
    }
    // Fall back to hash-based in production
    if (process.env.NODE_ENV === "production" && VIDEO_HASHES[cleanFilename]) {
      return `/${VIDEO_HASHES[cleanFilename]}`;
    }
    // Development fallback
    return getVersionedVideoUrl(filename, "dev");
  }

  // Manual strategy selection
  switch (strategy) {
    case "version":
      return getVersionedVideoUrl(filename);

    case "hash":
      const hashFilename = VIDEO_HASHES[cleanFilename];
      return hashFilename ? `/${hashFilename}` : getVersionedVideoUrl(filename);

    case "timestamp":
      return getVideoURL(basePath);

    case "dynamic":
      return getDynamicVideoURL(basePath, {
        useTimestamp: true,
        useRandomId: true,
        customParams: { cache: "no-store" },
      });

    case "aggressive":
      return getDynamicVideoURL(basePath, {
        useTimestamp: true,
        useRandomId: true,
        useSessionId: true,
        customParams: {
          cache: "no-store",
          pragma: "no-cache",
          v: VIDEO_VERSIONS[cleanFilename] || "1.0.0",
        },
      });

    default:
      return getVersionedVideoUrl(filename);
  }
};

/**
 * Update video version - BEST PRACTICE for cache invalidation
 * @param {string} filename - Video filename to update
 * @param {string} newVersion - New version string (semantic versioning recommended)
 */
export const updateVideoVersion = (filename, newVersion) => {
  const cleanFilename = filename.replace("/", "");
  VIDEO_VERSIONS[cleanFilename] = newVersion;

  if (process.env.NODE_ENV === "development") {
    console.log(`📹 Updated ${cleanFilename} to version ${newVersion}`);
  }
};

/**
 * Bulk update video versions
 * @param {Object} versionMap - Object mapping filenames to versions
 */
export const updateVideoVersions = (versionMap) => {
  Object.entries(versionMap).forEach(([filename, version]) => {
    updateVideoVersion(filename, version);
  });
};

/**
 * Get current video version
 */
export const getVideoVersion = (filename) => {
  return VIDEO_VERSIONS[filename.replace("/", "")] || "1.0.0";
};

/**
 * Environment-based strategy selection
 * BEST PRACTICE: Use versioned URLs in all environments
 */
export const getOptimalStrategy = () => {
  if (typeof window === "undefined") return "version";

  // Always prefer versioned URLs (best practice)
  return "version";
};

/**
 * Generate multiple video sources for progressive enhancement
 * @param {string} filename - Base video filename (without extension)
 * @param {Array} formats - Video formats to generate ['webm', 'mp4']
 * @param {string} strategy - Cache strategy to use
 */
export const getMultiFormatVideoSources = (
  filename,
  formats = ["webm", "mp4"],
  strategy = "auto"
) => {
  return formats.map((format) => ({
    src: getVideoUrl(`${filename}.${format}`, strategy),
    type: `video/${format}`,
    format,
    strategy: strategy === "auto" ? getOptimalStrategy() : strategy,
  }));
};

/**
 * Preload video for performance optimization
 * @param {string} videoUrl - Video URL to preload
 * @param {string} preloadType - 'none', 'metadata', 'auto'
 */
export const preloadVideo = (videoUrl, preloadType = "metadata") => {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "video";
  link.href = videoUrl;
  if (preloadType !== "auto") {
    link.setAttribute("data-preload", preloadType);
  }
  document.head.appendChild(link);
};

/**
 * Force refresh all videos (development helper)
 */
export const refreshAllVideos = () => {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    const currentSrc = video.src;
    const filename = currentSrc.split("/").pop().split("?")[0];
    // Use timestamp strategy for immediate refresh
    video.src = getVideoUrl(filename, "timestamp");
    video.load();
  });
};

// Export configuration for inspection
export const getVideoConfig = () => ({
  versions: { ...VIDEO_VERSIONS },
  hashes: { ...VIDEO_HASHES },
  optimalStrategy: getOptimalStrategy(),
  environment: process.env.NODE_ENV,
});

export default {
  // BEST PRACTICE methods (recommended)
  getVersionedVideoUrl,
  getVideoUrl,
  updateVideoVersion,
  updateVideoVersions,
  getMultiFormatVideoSources,

  // Utility methods
  getVideoVersion,
  getOptimalStrategy,
  preloadVideo,

  // Fallback methods (when needed)
  getVideoURL,
  getDynamicVideoURL,
  refreshAllVideos,

  // Configuration
  getVideoConfig,
};
