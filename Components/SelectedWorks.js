"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Group5Image from "../assets/Group5.png";
import Group78Image from "../assets/Group78-2.png";
import Framer3Image from "../assets/Frame 3.png";

gsap.registerPlugin(ScrollTrigger);

const SelectedWorks = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleLetters = document.querySelectorAll(".title-letter");

      // IMPORTANT: Remove all GSAP setup for the section itself
      // This will now be handled by the parent container

      // Title animation only
      if (titleLetters.length > 0) {
        gsap.set(titleLetters, { y: 160 });
        gsap.to(titleLetters, {
          y: 0,
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".selected-works-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Update current image based on scroll position
      projects.forEach((project, index) => {
        const projectElement = document.querySelectorAll(".scroll-item")[index];
        if (projectElement) {
          ScrollTrigger.create({
            trigger: projectElement,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentImage(index + 1),
            onEnterBack: () => setCurrentImage(index + 1),
          });
        }
      });
    }
  }, []);

  const projects = [
    {
      id: 1,
      image: Group5Image,
      title: "Xtream E-sport Arena",
      description: "Gaming arena",
      links: ["Design", "Web Development"],
      route: "/work/xtream-esport-arena",
    },
    {
      id: 2,
      image: Group78Image,
      title: "ShelfWise",
      description: "Inventory Management System",
      links: ["Design", "Fullstack Development"],
      route: "/work/shelfwise",
    },
    {
      id: 3,
      image: Framer3Image,
      title: "SWEDISH DATA CENTER",
      description: "",
      links: ["Design", "Webnode"],
      route: "/work/swedish-data-center",
    },
  ];

  const handleProjectClick = (route) => {
    router.push(route);
  };

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
        {/* Left Fixed Text - Hidden on mobile */}
        <div className="text-section w-full md:w-1/2 sticky top-0 h-screen hidden md:flex items-center">
          <div className="text-content px-8">
            <div className="text-super-large 2xl:text-[30rem] font-normal text-custom-pink">
              {String(currentImage).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Right Scrolling Images with Details - Full width on mobile */}
        <div className="image-section w-full md:w-1/2">
          <div className="images space-y-20 px-8 md:px-6 lg:px-6 md:pr-16 pb-20">
            {projects.map((project) => (
              <div
                key={project.id}
                className="scroll-item space-y-6 border-custom-pink pb-8 cursor-pointer transition-transform hover:scale-[1.02] duration-300"
                onClick={() => handleProjectClick(project.route)}
              >
                {/* Image */}
                {typeof project.image === "string" ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={1600}
                    unoptimized
                    className="w-full h-auto rounded-md transition-opacity hover:opacity-90"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-md transition-opacity hover:opacity-90"
                    priority
                  />
                )}

                {/* Title and Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                  <div>
                    <h2 className="text-md md:text-xl lg:text-xl font-light text-custom-pink transition-colors hover:text-opacity-80">
                      {project.description}
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-medium text-custom-pink transition-colors hover:text-opacity-80">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    {project.links.map((link, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-custom-pink text-custom-pink rounded-3xl bg-transparent hover:bg-custom-pink hover:text-custom-blue transition text-sm sm:text-base"
                        onClick={(e) => e.stopPropagation()}
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
