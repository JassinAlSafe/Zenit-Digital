import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createHash } from "crypto";

/**
 * API Route for serving videos with proper HTTP caching headers
 * Handles both versioned files and dynamic videos with appropriate cache strategies
 */

// Video caching configurations
const CACHE_STRATEGIES = {
  // Long-term caching for versioned videos
  versioned: {
    "Cache-Control": "public, max-age=31536000, immutable", // 1 year
    Expires: new Date(Date.now() + 31536000 * 1000).toUTCString(),
  },
  // Short-term caching for dynamic content
  dynamic: {
    "Cache-Control": "public, max-age=3600", // 1 hour
    Expires: new Date(Date.now() + 3600 * 1000).toUTCString(),
  },
  // No caching for frequently updated videos
  nocache: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
};

/**
 * Generate ETag for file
 * @param {string} filePath - Path to the file
 * @param {Buffer} fileBuffer - File buffer
 * @returns {string} - Generated ETag
 */
function generateETag(filePath, fileBuffer) {
  const hash = createHash("md5");
  hash.update(fileBuffer);
  hash.update(filePath);
  return `"${hash.digest("hex")}"`;
}

/**
 * Get file modified date
 * @param {string} filePath - Path to the file
 * @returns {string} - Last modified date string
 */
async function getFileModifiedDate(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime.toUTCString();
  } catch (error) {
    return new Date().toUTCString();
  }
}

/**
 * Determine cache strategy based on request parameters
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {string} - Cache strategy key
 */
function getCacheStrategy(searchParams) {
  // If version parameter exists, use long-term caching
  if (searchParams.has("v")) {
    return "versioned";
  }

  // If cache=no-store parameter, use no-cache
  if (searchParams.get("cache") === "no-store") {
    return "nocache";
  }

  // If timestamp or random parameters exist, use dynamic caching
  if (
    searchParams.has("t") ||
    searchParams.has("r") ||
    searchParams.has("sid")
  ) {
    return "dynamic";
  }

  // Default to dynamic caching
  return "dynamic";
}

export async function GET(request, { params }) {
  try {
    const { path: videoPath } = params;
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Reconstruct the file path
    const fileName = Array.isArray(videoPath) ? videoPath.join("/") : videoPath;
    const filePath = path.join(process.cwd(), "public", fileName);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      return new NextResponse("Video not found", { status: 404 });
    }

    // Read file
    const fileBuffer = await fs.readFile(filePath);

    // Generate ETag and get last modified date
    const etag = generateETag(filePath, fileBuffer);
    const lastModified = await getFileModifiedDate(filePath);

    // Check if client has cached version
    const ifNoneMatch = request.headers.get("if-none-match");
    const ifModifiedSince = request.headers.get("if-modified-since");

    if (ifNoneMatch === etag || ifModifiedSince === lastModified) {
      return new NextResponse(null, { status: 304 });
    }

    // Determine cache strategy
    const cacheStrategy = getCacheStrategy(searchParams);
    const cacheHeaders = CACHE_STRATEGIES[cacheStrategy];

    // Set response headers
    const headers = {
      "Content-Type": "video/mp4",
      "Content-Length": fileBuffer.length.toString(),
      ETag: etag,
      "Last-Modified": lastModified,
      "Accept-Ranges": "bytes",
      ...cacheHeaders,
    };

    // Handle range requests for video streaming
    const range = request.headers.get("range");
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileBuffer.length - 1;
      const chunksize = end - start + 1;

      const chunk = fileBuffer.slice(start, end + 1);

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          ...headers,
          "Content-Range": `bytes ${start}-${end}/${fileBuffer.length}`,
          "Content-Length": chunksize.toString(),
        },
      });
    }

    // Return full file
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error serving video:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
