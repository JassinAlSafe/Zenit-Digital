#!/usr/bin/env node

/**
 * Video Version Management Script
 * Helps update video versions for cache busting
 *
 * Usage:
 * node scripts/updateVideoVersions.js --version 1.2.4 --video airplane.mp4
 * node scripts/updateVideoVersions.js --increment-all
 * node scripts/updateVideoVersions.js --list
 */

const fs = require("fs");
const path = require("path");

const UTILS_PATH = path.join(__dirname, "../utils/videoCache.js");

// Parse command line arguments
const args = process.argv.slice(2);
const getArgValue = (argName) => {
  const index = args.findIndex((arg) => arg === argName);
  return index !== -1 && index + 1 < args.length ? args[index + 1] : null;
};

const hasFlag = (flagName) => args.includes(flagName);

// Read current video cache file
const readVideoCacheFile = () => {
  try {
    return fs.readFileSync(UTILS_PATH, "utf8");
  } catch (error) {
    console.error("Error reading videoCache.js:", error.message);
    process.exit(1);
  }
};

// Write updated video cache file
const writeVideoCacheFile = (content) => {
  try {
    fs.writeFileSync(UTILS_PATH, content, "utf8");
    console.log("✅ Video cache file updated successfully");
  } catch (error) {
    console.error("Error writing videoCache.js:", error.message);
    process.exit(1);
  }
};

// Extract video versions from file content
const extractVideoVersions = (content) => {
  const versionMatch = content.match(/const VIDEO_VERSIONS = \{([^}]*)\}/s);
  if (!versionMatch) {
    console.error("Could not find VIDEO_VERSIONS in file");
    process.exit(1);
  }

  const versionsString = versionMatch[1];
  const versions = {};

  // Parse versions using regex
  const versionRegex = /['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/g;
  let match;

  while ((match = versionRegex.exec(versionsString)) !== null) {
    versions[match[1]] = match[2];
  }

  return versions;
};

// Update versions in file content
const updateVersionsInContent = (content, newVersions) => {
  const versionEntries = Object.entries(newVersions)
    .map(([video, version]) => `  '${video}': '${version}'`)
    .join(",\n");

  const newVersionsBlock = `const VIDEO_VERSIONS = {\n${versionEntries}\n};`;

  return content.replace(/const VIDEO_VERSIONS = \{[^}]*\}/s, newVersionsBlock);
};

// Increment version number
const incrementVersion = (version) => {
  const parts = version.split(".");
  const patch = parseInt(parts[2] || "0") + 1;
  return `${parts[0] || "1"}.${parts[1] || "0"}.${patch}`;
};

// List current versions
const listVersions = () => {
  const content = readVideoCacheFile();
  const versions = extractVideoVersions(content);

  console.log("\n📹 Current Video Versions:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  Object.entries(versions).forEach(([video, version]) => {
    console.log(`${video.padEnd(20)} v${version}`);
  });

  console.log("\n💡 Usage examples:");
  console.log(
    "  Update specific video: node scripts/updateVideoVersions.js --video airplane.mp4 --version 1.2.4"
  );
  console.log(
    "  Increment all versions: node scripts/updateVideoVersions.js --increment-all"
  );
  console.log("  List versions: node scripts/updateVideoVersions.js --list");
};

// Update specific video version
const updateVideoVersion = (videoName, newVersion) => {
  const content = readVideoCacheFile();
  const versions = extractVideoVersions(content);

  if (!versions[videoName]) {
    console.error(`❌ Video "${videoName}" not found in VIDEO_VERSIONS`);
    console.log("Available videos:", Object.keys(versions).join(", "));
    process.exit(1);
  }

  const oldVersion = versions[videoName];
  versions[videoName] = newVersion;

  const updatedContent = updateVersionsInContent(content, versions);
  writeVideoCacheFile(updatedContent);

  console.log(`✅ Updated ${videoName}: v${oldVersion} → v${newVersion}`);
};

// Increment all video versions
const incrementAllVersions = () => {
  const content = readVideoCacheFile();
  const versions = extractVideoVersions(content);

  const updatedVersions = {};
  const changes = [];

  Object.entries(versions).forEach(([video, version]) => {
    const newVersion = incrementVersion(version);
    updatedVersions[video] = newVersion;
    changes.push(`${video}: v${version} → v${newVersion}`);
  });

  const updatedContent = updateVersionsInContent(content, updatedVersions);
  writeVideoCacheFile(updatedContent);

  console.log("✅ Incremented all video versions:");
  changes.forEach((change) => console.log(`  ${change}`));
};

// Add new video
const addVideo = (videoName, version = "1.0.0") => {
  const content = readVideoCacheFile();
  const versions = extractVideoVersions(content);

  if (versions[videoName]) {
    console.error(
      `❌ Video "${videoName}" already exists with version v${versions[videoName]}`
    );
    process.exit(1);
  }

  versions[videoName] = version;
  const updatedContent = updateVersionsInContent(content, versions);
  writeVideoCacheFile(updatedContent);

  console.log(`✅ Added new video: ${videoName} v${version}`);
};

// Generate hash filenames
const generateHashFilenames = () => {
  const content = readVideoCacheFile();
  const versions = extractVideoVersions(content);

  console.log("\n🔧 Suggested hash filenames for production:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  Object.keys(versions).forEach((video) => {
    const hash = Math.random().toString(36).substring(2, 8);
    const baseName = video.replace(".mp4", "");
    const hashFilename = `${baseName}-${hash}.mp4`;
    console.log(`${video} → ${hashFilename}`);
  });

  console.log("\n💡 Copy these to the VIDEO_HASHES object in videoCache.js");
};

// Main execution
const main = () => {
  const video = getArgValue("--video");
  const version = getArgValue("--version");

  if (hasFlag("--help") || hasFlag("-h")) {
    console.log(`
📹 Video Version Management Tool

USAGE:
  node scripts/updateVideoVersions.js [options]

OPTIONS:
  --list                   List all current video versions
  --video <name>          Specify video filename (e.g., airplane.mp4)
  --version <version>     Specify new version (e.g., 1.2.3)
  --increment-all         Increment patch version for all videos
  --add <name>            Add new video with default version 1.0.0
  --generate-hashes       Generate hash filenames for production
  --help, -h              Show this help message

EXAMPLES:
  node scripts/updateVideoVersions.js --list
  node scripts/updateVideoVersions.js --video airplane.mp4 --version 1.2.4
  node scripts/updateVideoVersions.js --increment-all
  node scripts/updateVideoVersions.js --add newvideo.mp4
  node scripts/updateVideoVersions.js --generate-hashes
`);
    return;
  }

  if (hasFlag("--list")) {
    listVersions();
  } else if (hasFlag("--increment-all")) {
    incrementAllVersions();
  } else if (video && version) {
    updateVideoVersion(video, version);
  } else if (hasFlag("--add") && video) {
    addVideo(video, version || "1.0.0");
  } else if (hasFlag("--generate-hashes")) {
    generateHashFilenames();
  } else {
    console.error("❌ Invalid arguments. Use --help for usage information.");
    process.exit(1);
  }
};

// Run the script
main();
