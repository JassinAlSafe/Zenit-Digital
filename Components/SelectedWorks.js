"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Group5Image from "../assets/Group5.png";
import Group78Image from "../assets/Group78-2.png";

gsap.registerPlugin(ScrollTrigger);

const SelectedWorks = () => {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleLetters = document.querySelectorAll(".title-letter");

      // Detect iPad for specific optimizations
      const isIPad =
        /iPad/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      // Initialize currentImage to 1 on component mount
      setCurrentImage(1);

      // iPad-specific ScrollTrigger configuration
      if (isIPad) {
        ScrollTrigger.config({
          force3D: true,
          nullTargetWarn: false,
          ignoreMobileResize: true,
        });
      }

      // Title animation with iPad optimizations
      if (titleLetters.length > 0) {
        gsap.set(titleLetters, { y: 160 });
        gsap.to(titleLetters, {
          y: 0,
          duration: isIPad ? 0.8 : 1, // Slightly faster on iPad
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".selected-works-section",
            start: isIPad ? "top 85%" : "top 80%", // Different trigger point for iPad
            toggleActions: "play none none none",
            refreshPriority: isIPad ? 1 : 0, // Higher priority refresh on iPad
          },
        });
      }

      // Update current image based on scroll position with iPad optimizations
      projects.forEach((project, index) => {
        const projectElement = document.querySelectorAll(".scroll-item")[index];
        if (projectElement) {
          ScrollTrigger.create({
            trigger: projectElement,
            start: isIPad ? "top 70%" : "top center", // Better trigger point for iPad
            end: isIPad ? "bottom 30%" : "bottom center",
            onEnter: () => setCurrentImage(index + 1),
            onEnterBack: () => setCurrentImage(index + 1),
            refreshPriority: isIPad ? 1 : 0,
            // iPad-specific optimizations
            ...(isIPad && {
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }),
          });
        }
      });

      // Ensure first project is active on initial load for iPad
      if (isIPad) {
        ScrollTrigger.addEventListener("refresh", () => {
          // Check if we're at the top and set to first image
          if (window.scrollY < 100) {
            setCurrentImage(1);
          }
        });

        // Set initial image on load
        setTimeout(() => {
          if (window.scrollY < 100) {
            setCurrentImage(1);
          }
        }, 100);
      }

      // iPad-specific refresh after orientation change
      if (isIPad) {
        const handleOrientationChange = () => {
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 200);
        };

        window.addEventListener("orientationchange", handleOrientationChange);

        return () => {
          window.removeEventListener(
            "orientationchange",
            handleOrientationChange
          );
        };
      }
    }
  }, []);

  const projects = [
    {
      id: 1,
      image: Group5Image,
      title: "Xtream E-sport Arena",
      description: "Gaming arena",
      links: ["Design", "Web Development"],
    },
    {
      id: 2,
      image: Group78Image,
      title: "ShelfWise",
      description: "Augmented Reality Experience",
      links: ["Design", "Fullstack Development"],
    },
    {
      id: 3,
      image:
        "https://cdn.sanity.io/images/u1e81n72/production/5addc75bef476305d7ee2f1c8238a15685203c28-1200x1600.jpg/Hololens.jpg?q=95&fit=clip&auto=format&w=1439",
      title: "Future Tech Showcase",
      description: "Technology Expo",
      links: ["UI/UX", "Prototyping"],
    },
  ];

  return (
    <section
      id="work"
      className="selected-works-section opacity-100 pt-40"
      data-bg="var(--custom-blue)"
      data-text="var(--custom-pink)"
      data-button-bg="var(--custom-pink)"
      data-button-text="var(--custom-blue)"
      data-nav-text="var(--custom-pink)"
    >
      {/* Title Section */}
      <div className="title-container relative left-4 md:left-8 lg:left-8 2xl:left-20 z-10">
        <div className="overflow-hidden inline-block">
          <h1 className="text-7xl 2xl:text-[10rem] md:text-9xl lg:text-9xl xs:text-6xl font-bold text-custom-pink">
            {Array.from("SELECTED WORKS").map((letter, index) => (
              <span key={index} className="title-letter inline-block">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="scroll-container flex flex-col md:flex-row mt-40">
        {/* Left Fixed Text - Hidden on mobile, optimized for iPad */}
        <div className="text-section w-full md:w-1/2 sticky top-0 h-screen hidden md:flex items-center ipad-portrait:hidden ipad-landscape:flex">
          <div className="text-content px-8 ipad-landscape:px-6">
            <div className="text-super-large 2xl:text-[30rem] ipad-landscape:text-[20rem] ipad-portrait:text-[15rem] font-normal text-custom-pink">
              {String(currentImage).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Right Scrolling Images with Details - Full width on mobile, optimized for iPad */}
        <div className="image-section w-full md:w-1/2 ipad-portrait:w-full">
          <div className="images space-y-20 px-8 md:px-6 lg:px-6 md:pr-16 pb-20 ipad-portrait:px-6 ipad-landscape:px-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="scroll-item space-y-6 border-custom-pink pb-8"
              >
                {/* Image */}
                {typeof project.image === "string" ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={1600}
                    unoptimized
                    className="w-full h-auto rounded-md"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-md"
                    priority
                  />
                )}

                {/* Title and Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                  <div>
                    <h2 className="text-md md:text-xl lg:text-xl font-light text-custom-pink">
                      {project.description}
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-medium text-custom-pink">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    {project.links.map((link, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-custom-pink text-custom-pink rounded-3xl bg-transparent hover:bg-custom-pink hover:text-custom-blue transition text-sm sm:text-base"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
