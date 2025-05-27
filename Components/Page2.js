"use client";
import React, { useEffect, useRef, useState } from "react";
import { getVersionedVideoUrl } from "../utils/videoCache";

const Page2 = () => {
  const topSectionRef = useRef(null);
  const revealSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!topSectionRef.current || !revealSectionRef.current) return;

      // Get viewport height
      const viewportHeight = window.innerHeight;

      // Calculate when the reveal section enters viewport
      const revealRect = revealSectionRef.current.getBoundingClientRect();

      // This determines when the animation starts and ends
      // Start when reveal section is at bottom of viewport, end when it's at top
      const start = viewportHeight - 100; // Start slightly before section enters viewport
      const end = 200; // End when section is near top of viewport

      // Calculate progress based on section position
      let progress = 0;
      if (revealRect.top < start) {
        progress = 1 - (revealRect.top - end) / (start - end);
        progress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate styles based on scroll progress
  const getTopSectionStyle = () => {
    // Transform the top section when scrolling
    return {
      borderRadius: `0 0 ${30 * scrollProgress}px ${30 * scrollProgress}px`,
      transform: `translateY(-${100 * scrollProgress}px)`,
      transition:
        "transform 0.05s ease-out, border-radius 0.05s ease-out, box-shadow 0.05s ease-out",
    };
  };

  // Create a "peek" effect where we only see the reveal section after the lift starts
  const getRevealSectionStyle = () => {
    return {
      clipPath: `inset(${100 - scrollProgress * 100}% 0 0 0)`, // Clip from top, reveal as we scroll
      transition: "clip-path 0.05s ease-out",
    };
  };

  return (
    <div className="relative">
      {/* Main green section that lifts up */}
      <section
        ref={topSectionRef}
        className="min-h-screen flex flex-col relative z-10 bg-custom-green will-change-transform"
        data-bg="var(--custom-green)"
        data-text="white"
        data-button-bg="var(--custom-lightGreen)"
        data-button-text="var(--custom-green)"
        data-nav-text="var(--custom-lightGreen)"
        style={getTopSectionStyle()}
      >
        {/* Main Content */}
        <div className="flex flex-1 px-16 pt-12">
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-7xl font-medium mb-6">
              Need to <span className="text-custom-lightGreen">Grow</span> your
              digital presence? We are here to help you!
            </h1>
            <p className="text-custom-lightGreen text-lg mt-4">
              Book a free 45 min consultation
            </p>
            <div className="mt-6">
              <button className="bg-custom-lightGreen text-custom-green px-8 py-3 rounded-lg font-bold flex items-center">
                Lets Talk
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-1/2 relative flex items-center justify-center">
            <video
              className="absolute right-0 w-full h-auto max-w-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src={getVersionedVideoUrl("flower.webm")}
                type="video/webm; codecs='vp9'"
              />
              <source
                src={getVersionedVideoUrl("flower.mp4")}
                type="video/mp4; codecs='avc1.42E01E'"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Reveal sections (footer and "Let's Make It Happen") */}
      <div
        ref={revealSectionRef}
        className="relative z-0 bg-custom-green will-change-transform"
        style={getRevealSectionStyle()}
      >
        {/* "Let's Make It Happen" Section */}
        <section
          className="py-10 bg-custom-lightGreen"
          data-bg="var(--custom-green)"
          data-text="black"
          data-button-bg="var(--custom-green)"
          data-button-text="var(--custom-green)"
          data-nav-text="var(--custom-green)"
        >
          <div className="flex flex-col justify-center items-center min-h-screen bg-custom-lightGreen py-20 relative mx-auto max-w-7xl rounded-sm">
            <p className="text-white mb-4">- Change starts here -</p>

            <h1 className="text-6xl md:text-8xl font-bold mb-12 text-center text-custom-green">
              Let&apos;s Make
              <br />
              It Happen
            </h1>

            <button className="bg-custom-green hover:bg-zinc-600 text-white rounded-full px-7 py-5 text-lg transition-colors flex items-center">
              BOOK A CALL <span className="ml-1">↗</span>
            </button>

            {/* For Further Inquiries */}
            <div className="absolute bottom-8 right-8 text-right">
              <h4 className="text-sm mb-1">FOR FURTHER INQUIRIES</h4>
              <p className="text-sm flex items-center justify-end">
                <span className="mr-1">→</span> hello@zenitdigital.com
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-white text-custom-green font-semibold py-16">
          <div className="container mx-auto px-6">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Column 1: Menu */}
              <div>
                <h3 className="text-xl font-medium mb-6">Menu</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Socials */}
              <div>
                <h3 className="text-xl font-medium mb-6">Socials</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Bento
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Resources */}
              <div>
                <h3 className="text-xl font-medium mb-6">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Pillarstack
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Figma Templates
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Monthly Newsletter
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div>
                <p className="text-sm">© 2024 Zenit Digital Studios</p>
                <p className="text-sm">All rights reserved.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-sm">LOCAL TIME</p>
                <p className="text-sm text-gray-400">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                  , MEL
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Page2;
