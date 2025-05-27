/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  async headers() {
    return [
      {
        // Apply to all routes - disable caching for HTML/pages
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=0, no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      {
        // For Next.js static assets
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache static assets (images, fonts, etc.)
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      {
        // Cache font files
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache favicon and other assets in public root
        source: "/:path*.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      // Cache static videos with version parameters for 1 year
      {
        source: "/:path*.(mp4|webm|ogg|avi)",
        has: [
          {
            type: "query",
            key: "v",
          },
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 31536000 * 1000).toUTCString(),
          },
        ],
      },
      // Short cache for videos with timestamp parameters
      {
        source: "/:path*.(mp4|webm|ogg|avi)",
        has: [
          {
            type: "query",
            key: "t",
          },
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 3600 * 1000).toUTCString(),
          },
        ],
      },
      // No cache for videos with no-cache parameters
      {
        source: "/:path*.(mp4|webm|ogg|avi)",
        has: [
          {
            type: "query",
            key: "cache",
            value: "no-store",
          },
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      // Enable CORS for video files - base rule for all videos
      {
        source: "/:path*.(mp4|webm|ogg|avi)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
        ],
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add any custom webpack rules for video files if needed
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|avi)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/videos/",
          outputPath: "static/videos/",
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
  experimental: {
    // Enable if you want to use app directory features
    // appDir: true,
  },
};

module.exports = nextConfig;
