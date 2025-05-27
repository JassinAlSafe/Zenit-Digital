import {
  getVideoUrl,
  getVideoURL,
  getDynamicVideoURL,
  getOptimalStrategy,
  VIDEO_VERSIONS,
} from "./videoCache";

/**
 * VideoManager Class
 * Advanced video management with caching, progressive loading, and optimization
 */
class VideoManager {
  constructor(options = {}) {
    this.videoCache = new Map();
    this.loadingPromises = new Map();
    this.currentVersion = options.version || "1.0";
    this.defaultStrategy = options.strategy || getOptimalStrategy();
    this.enableLogging =
      options.enableLogging || process.env.NODE_ENV === "development";

    // Progressive loading options
    this.preloadStrategy = options.preloadStrategy || "metadata"; // 'none', 'metadata', 'auto'
    this.formats = options.formats || ["webm", "mp4"]; // Preferred formats order

    this.log("🎬 VideoManager initialized", {
      version: this.currentVersion,
      strategy: this.defaultStrategy,
    });
  }

  /**
   * Load video with caching and progressive loading
   * @param {string} videoId - Video identifier
   * @param {HTMLVideoElement} element - Video element to load into
   * @param {Object} options - Loading options
   */
  async loadVideo(videoId, element, options = {}) {
    const {
      strategy = this.defaultStrategy,
      forceRefresh = false,
      formats = this.formats,
      poster,
      preload = this.preloadStrategy,
    } = options;

    const cacheKey = `${videoId}-${this.currentVersion}-${strategy}`;

    // Return existing promise if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    // Use cached URL if available and not forcing refresh
    if (!forceRefresh && this.videoCache.has(cacheKey)) {
      const cachedData = this.videoCache.get(cacheKey);
      this.applyVideoSources(element, cachedData, { poster, preload });
      this.log("📁 Using cached video", { videoId, cacheKey });
      return Promise.resolve(cachedData);
    }

    // Create loading promise
    const loadingPromise = this.generateVideoSources(videoId, strategy, formats)
      .then((videoData) => {
        this.videoCache.set(cacheKey, videoData);
        this.applyVideoSources(element, videoData, { poster, preload });
        this.log("✅ Video loaded successfully", { videoId, strategy });
        return videoData;
      })
      .catch((error) => {
        this.log("❌ Video loading failed", { videoId, error });
        throw error;
      })
      .finally(() => {
        this.loadingPromises.delete(cacheKey);
      });

    this.loadingPromises.set(cacheKey, loadingPromise);
    return loadingPromise;
  }

  /**
   * Generate video sources with different formats and cache strategies
   * @param {string} videoId - Video identifier
   * @param {string} strategy - Cache strategy
   * @param {Array} formats - Video formats to generate
   */
  async generateVideoSources(videoId, strategy, formats) {
    const sources = [];

    for (const format of formats) {
      const filename = `${videoId}.${format}`;
      const mimeType = `video/${format}`;

      let videoUrl;

      // Use API route for dynamic strategies
      if (["dynamic", "aggressive", "timestamp"].includes(strategy)) {
        const apiBasePath = `/api/videos/${filename}`;

        switch (strategy) {
          case "aggressive":
            videoUrl = getDynamicVideoURL(apiBasePath, {
              useTimestamp: true,
              useRandomId: true,
              useSessionId: true,
              customParams: {
                cache: "no-store",
                pragma: "no-cache",
                format,
              },
            });
            break;
          case "dynamic":
            videoUrl = getDynamicVideoURL(apiBasePath, {
              useTimestamp: true,
              useRandomId: true,
              customParams: { cache: "no-store", format },
            });
            break;
          case "timestamp":
            videoUrl = getVideoURL(apiBasePath);
            break;
        }
      } else {
        // Use direct file access for version/hash strategies
        videoUrl = getVideoUrl(filename, strategy);
      }

      sources.push({
        src: videoUrl,
        type: mimeType,
        format,
        strategy,
      });
    }

    return {
      sources,
      videoId,
      strategy,
      timestamp: Date.now(),
    };
  }

  /**
   * Apply video sources to element with progressive loading
   * @param {HTMLVideoElement} element - Video element
   * @param {Object} videoData - Video source data
   * @param {Object} options - Application options
   */
  applyVideoSources(element, videoData, options = {}) {
    const { poster, preload = "metadata" } = options;

    // Clear existing sources
    element.innerHTML = "";

    // Set video attributes
    element.preload = preload;
    if (poster) {
      element.poster = poster;
    }

    // Add video sources
    videoData.sources.forEach((sourceData) => {
      const source = document.createElement("source");
      source.src = sourceData.src;
      source.type = sourceData.type;
      source.setAttribute("data-format", sourceData.format);
      source.setAttribute("data-strategy", sourceData.strategy);
      element.appendChild(source);
    });

    // Add fallback text
    const fallback = document.createTextNode(
      "Your browser doesn't support video playback."
    );
    element.appendChild(fallback);

    // Force reload
    element.load();
  }

  /**
   * Preload video for better performance
   * @param {string} videoId - Video identifier
   * @param {Object} options - Preload options
   */
  async preloadVideo(videoId, options = {}) {
    const cacheKey = `${videoId}-${this.currentVersion}-${
      options.strategy || this.defaultStrategy
    }`;

    if (this.videoCache.has(cacheKey)) {
      return this.videoCache.get(cacheKey);
    }

    return this.generateVideoSources(
      videoId,
      options.strategy || this.defaultStrategy,
      options.formats || this.formats
    ).then((videoData) => {
      this.videoCache.set(cacheKey, videoData);
      this.log("📦 Video preloaded", { videoId });
      return videoData;
    });
  }

  /**
   * Batch preload multiple videos
   * @param {Array} videoIds - Array of video identifiers
   * @param {Object} options - Preload options
   */
  async preloadVideos(videoIds, options = {}) {
    const preloadPromises = videoIds.map((videoId) =>
      this.preloadVideo(videoId, options).catch((error) => {
        this.log("⚠️ Preload failed for video", { videoId, error });
        return null;
      })
    );

    const results = await Promise.allSettled(preloadPromises);
    const successful = results.filter(
      (result) => result.status === "fulfilled" && result.value
    ).length;

    this.log("📦 Batch preload completed", {
      total: videoIds.length,
      successful,
      failed: videoIds.length - successful,
    });

    return results;
  }

  /**
   * Update video version and clear cache
   * @param {string} newVersion - New version string
   */
  updateVersion(newVersion) {
    this.currentVersion = newVersion;
    this.clearCache();
    this.log("🔄 Version updated", { newVersion });
  }

  /**
   * Clear video cache
   */
  clearCache() {
    const cacheSize = this.videoCache.size;
    this.videoCache.clear();
    this.loadingPromises.clear();
    this.log("🗑️ Cache cleared", { previousSize: cacheSize });
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      cacheSize: this.videoCache.size,
      loadingPromises: this.loadingPromises.size,
      currentVersion: this.currentVersion,
      strategy: this.defaultStrategy,
    };
  }

  /**
   * Refresh all videos currently loaded
   * @param {string} strategy - Optional new strategy to use
   */
  async refreshAllVideos(strategy) {
    const videos = document.querySelectorAll("video[data-video-id]");
    const refreshPromises = [];

    videos.forEach((video) => {
      const videoId = video.getAttribute("data-video-id");
      if (videoId) {
        refreshPromises.push(
          this.loadVideo(videoId, video, {
            strategy: strategy || this.defaultStrategy,
            forceRefresh: true,
          })
        );
      }
    });

    const results = await Promise.allSettled(refreshPromises);
    this.log("🔄 Refreshed all videos", { count: results.length });
    return results;
  }

  /**
   * Create optimized video element with progressive loading
   * @param {string} videoId - Video identifier
   * @param {Object} options - Video options
   */
  createOptimizedVideoElement(videoId, options = {}) {
    const {
      width,
      height,
      controls = true,
      autoplay = false,
      muted = true,
      loop = false,
      playsInline = true,
      className = "",
      poster,
      preload = "metadata",
    } = options;

    const video = document.createElement("video");

    // Set attributes
    video.setAttribute("data-video-id", videoId);
    video.controls = controls;
    video.autoplay = autoplay;
    video.muted = muted;
    video.loop = loop;
    video.playsInline = playsInline;
    video.preload = preload;

    if (width) video.width = width;
    if (height) video.height = height;
    if (className) video.className = className;
    if (poster) video.poster = poster;

    // Load video sources
    this.loadVideo(videoId, video, options);

    return video;
  }

  /**
   * Logging helper
   * @param {string} message - Log message
   * @param {Object} data - Additional data
   */
  log(message, data = {}) {
    if (this.enableLogging) {
      console.log(`[VideoManager] ${message}`, data);
    }
  }
}

// Create singleton instance
export const videoManager = new VideoManager();

// Export class for custom instances
export default VideoManager;
