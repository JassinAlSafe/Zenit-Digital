"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import FlipText from "./FlipText";

const CallToActionSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-gray-50 text-gray-800 py-20 relative min-h-[60vh]">
      <div className="container mx-auto px-8 max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24 mb-20">
          {/* Column 1: Menu - Takes 2 columns (half the width) */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-8 text-black border-b border-gray-800 pb-3">
              Menu
            </h3>
            <ul className="space-y-4">
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Home
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Services
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Works
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  About
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Testimonials
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Contact
                </FlipText>
              </li>
            </ul>
          </div>

          {/* Column 2: Socials with green dot indicator - Takes 1 column */}
          <div className="relative">
            {/* Green dot indicator - positioned more precisely */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            </div>

            <h3 className="text-lg font-medium mb-8 text-black border-b border-gray-800 pb-3">
              Socials
            </h3>
            <ul className="space-y-4">
              <li>
                <FlipText
                  href="https://www.linkedin.com/company/zenit-digital-studios"
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  LinkedIn
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  YouTube
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Instagram
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Bento
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Github
                </FlipText>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources - Takes 1 column */}
          <div>
            <h3 className="text-lg font-medium mb-8 text-black border-b border-gray-800 pb-3">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Pillarstack
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Figma Templates
                </FlipText>
              </li>
              <li>
                <FlipText
                  className="text-gray-600 hover:text-black transition-colors cursor-pointer text-base font-normal leading-relaxed"
                  animationType="slide"
                  duration={0.3}
                >
                  Monthly Newsletter
                </FlipText>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright and Time */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-16 border-t border-gray-200">
          <div>
            <p className="text-3xl font-bold text-black mb-2">
              © 2024 Zenit Digital
            </p>
            <p className="text-gray-600 text-base font-normal">
              All rights reserved.
            </p>
          </div>
          <div className="mt-8 md:mt-0 text-right">
            <p className="text-gray-500 text-xs tracking-wider mb-2 uppercase font-medium">
              LOCAL TIME
            </p>
            <p className="text-black font-mono text-lg font-medium">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
              , SWE
            </p>
          </div>
        </div>

        {/* Back to top button - positioned like in the reference */}
        <div className="absolute bottom-6 right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="group relative w-14 h-14 bg-custom-green hover:bg-custom-green/90 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 ease-out hover:scale-90"
          >
            {/* First arrow - slides up on hover */}
            <span className="absolute flex transition-all duration-500 ease-in-out group-hover:-translate-y-20">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </span>

            {/* Second arrow - slides in from bottom on hover */}
            <span className="absolute flex translate-y-20 transition-all duration-500 ease-in-out group-hover:translate-y-0">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default CallToActionSection;
