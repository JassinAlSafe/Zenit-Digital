"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const PackagesSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const scrollTriggers = [];

      // Title animation
      if (titleRef.current) {
        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        titleTl.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        if (titleTl.scrollTrigger) {
          scrollTriggers.push(titleTl.scrollTrigger);
        }
      }

      // Description animation
      if (descriptionRef.current) {
        const descTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        descTl.from(descriptionRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });

        if (descTl.scrollTrigger) {
          scrollTriggers.push(descTl.scrollTrigger);
        }
      }

      // Images stagger animation
      if (imagesRef.current.length > 0) {
        const imagesTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".packages-images-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        imagesRef.current.forEach((image, index) => {
          if (image) {
            imagesTl.from(
              image,
              {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              index * 0.2
            );
          }
        });

        if (imagesTl.scrollTrigger) {
          scrollTriggers.push(imagesTl.scrollTrigger);
        }
      }

      return () => {
        scrollTriggers.forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="packages-section px-4 md:px-8 max-w-7xl mx-auto py-24 md:py-32 bg-white"
    >
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-24">
        {/* Title */}
        <div ref={titleRef} className="flex items-start">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-black leading-tight">
            Our Packages and
            <br />
            Bundles
          </h2>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="flex items-center">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
            These packages are made tailored to your startup needs from
            sketching an idea to realising the MVP
          </p>
        </div>
      </div>

      {/* Images Grid */}
      <div className="packages-images-grid">
        {/* Top Row - Two Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Mobile App Showcase */}
          <div
            ref={(el) => (imagesRef.current[0] = el)}
            className="relative aspect-[4/3] bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <Image
              src="/frame-3.png"
              alt="Mobile App Development Showcase"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold text-lg mb-1">
                  Mobile Development
                </h3>
                <p className="text-white/90 text-sm">
                  Native & Cross-Platform Apps
                </p>
              </div>
            </div>
          </div>

          {/* Web Application Showcase */}
          <div
            ref={(el) => (imagesRef.current[1] = el)}
            className="relative aspect-[4/3] bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
            <Image
              src="/group78-2.png"
              alt="Web Application Development Showcase"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-gray-900 font-semibold text-lg mb-1">
                  Web Development
                </h3>
                <p className="text-gray-700 text-sm">Modern Web Applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Full Width Image */}
        <div
          ref={(el) => (imagesRef.current[2] = el)}
          className="relative aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Image
            src="/group5.png"
            alt="Full-Stack Development Solutions Showcase"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-white font-semibold text-xl md:text-2xl mb-2">
                Full-Stack Solutions
              </h3>
              <p className="text-white/90 text-base md:text-lg">
                Complete digital ecosystems across all platforms and devices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
