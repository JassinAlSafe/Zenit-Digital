"use client";
import React, { useState, useEffect } from "react";

const DebugPanel = ({ loading, contentReady, gsapReady, componentsReady }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    // Only show debug panel in development
    if (process.env.NODE_ENV === "development") {
      // Show debug panel after 3 seconds if content isn't ready
      const timer = setTimeout(() => {
        if (loading || !contentReady) {
          setIsVisible(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loading, contentReady]);

  useEffect(() => {
    // Update debug info every second
    const interval = setInterval(() => {
      const heroSection = document.querySelector(".hero-section");
      const heroTitle = document.querySelector(".hero-section h1");
      const wordSpans = document.querySelectorAll(".word");
      const aboutSection = document.querySelector("#about");
      const aboutText = document.querySelector(".about-text");

      setDebugInfo({
        heroSection: !!heroSection,
        heroTitle: !!heroTitle,
        wordSpansCount: wordSpans.length,
        aboutSection: !!aboutSection,
        aboutText: !!aboutText,
        gsapAvailable: !!window.gsap,
        scrollTriggerAvailable: !!window.ScrollTrigger,
        documentReady: document.readyState,
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs z-[60] max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Debug Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-300"
        >
          ×
        </button>
      </div>

      <div className="space-y-1">
        <div className={`${loading ? "text-red-400" : "text-green-400"}`}>
          Loading: {loading ? "True" : "False"}
        </div>
        <div className={`${contentReady ? "text-green-400" : "text-red-400"}`}>
          Content Ready: {contentReady ? "True" : "False"}
        </div>
        <div className={`${gsapReady ? "text-green-400" : "text-red-400"}`}>
          GSAP Ready: {gsapReady ? "True" : "False"}
        </div>
        <div
          className={`${componentsReady ? "text-green-400" : "text-red-400"}`}
        >
          Components Ready: {componentsReady ? "True" : "False"}
        </div>

        <hr className="border-gray-600 my-2" />

        <div className="text-gray-300">Components:</div>
        <div
          className={`${
            debugInfo.heroSection ? "text-green-400" : "text-red-400"
          }`}
        >
          Hero Section: {debugInfo.heroSection ? "✓" : "✗"}
        </div>
        <div
          className={`${
            debugInfo.heroTitle ? "text-green-400" : "text-red-400"
          }`}
        >
          Hero Title: {debugInfo.heroTitle ? "✓" : "✗"}
        </div>
        <div
          className={`${
            debugInfo.wordSpansCount >= 6 ? "text-green-400" : "text-red-400"
          }`}
        >
          Word Spans: {debugInfo.wordSpansCount}/6
        </div>
        <div
          className={`${
            debugInfo.aboutSection ? "text-green-400" : "text-red-400"
          }`}
        >
          About Section: {debugInfo.aboutSection ? "✓" : "✗"}
        </div>
        <div
          className={`${
            debugInfo.aboutText ? "text-green-400" : "text-red-400"
          }`}
        >
          About Text: {debugInfo.aboutText ? "✓" : "✗"}
        </div>

        <hr className="border-gray-600 my-2" />

        <div className="text-gray-300">System:</div>
        <div
          className={`${
            debugInfo.gsapAvailable ? "text-green-400" : "text-red-400"
          }`}
        >
          GSAP: {debugInfo.gsapAvailable ? "✓" : "✗"}
        </div>
        <div
          className={`${
            debugInfo.scrollTriggerAvailable ? "text-green-400" : "text-red-400"
          }`}
        >
          ScrollTrigger: {debugInfo.scrollTriggerAvailable ? "✓" : "✗"}
        </div>
        <div>Document: {debugInfo.documentReady}</div>
        <div className="text-gray-400 text-xs">
          Updated: {debugInfo.timestamp}
        </div>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
      >
        Force Refresh
      </button>
    </div>
  );
};

export default DebugPanel;
