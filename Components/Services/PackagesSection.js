"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
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

      // Combined title and description animation
      if (titleRef.current && descriptionRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            refreshPriority: 1,
            id: "packages-header-animation"
          },
        });

        // Animate title first, then description with slight delay
        headerTl
          .from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
            force3D: true,
            immediateRender: false
          })
          .from(descriptionRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
            force3D: true,
            immediateRender: false
          }, 0.2);

        if (headerTl.scrollTrigger) {
          scrollTriggers.push(headerTl.scrollTrigger);
        }
      }

      // Images stagger animation
      if (imagesRef.current.length > 0) {
        const imagesTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".packages-images-grid",
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            refreshPriority: 3,
            id: "packages-images-stagger"
          },
        });

        imagesRef.current.forEach((image, index) => {
          if (image) {
            // Set initial state - hidden for animation with performance optimization
            gsap.set(image, {
              y: 50,
              opacity: 0,
              force3D: true,
              immediateRender: true,
              willChange: "transform, opacity"
            });

            // Animate images in with stagger
            imagesTl.to(
              image,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0,
                ease: "power3.out",
                overwrite: "auto",
                force3D: true,
                immediateRender: false
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
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16 mb-16 md:mb-24">
        {/* Title */}
        <div ref={titleRef} className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-black leading-tight">
            Our Packages and
            <br />
            Bundles
          </h2>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="lg:w-1/2 lg:-mt-2 xl:-mt-1">
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
            className="relative aspect-[4/3] bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-2xl md:rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
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
                <h3 className="text-white font-semibold text-lg mb-2">
                  Mobile Development
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Native & Cross-Platform Apps for iOS and Android
                </p>
                <Link 
                  href="/services/product-design"
                  className="inline-flex items-center bg-white/30 hover:bg-white/40 backdrop-blur-sm text-white text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Web Application Showcase */}
          <div
            ref={(el) => (imagesRef.current[1] = el)}
            className="relative aspect-[4/3] bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
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
                <h3 className="text-gray-900 font-semibold text-lg mb-2">
                  Web Development
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Modern Web Applications & Progressive Web Apps
                </p>
                <Link 
                  href="/services/product-design"
                  className="inline-flex items-center bg-gray-900/80 hover:bg-gray-900 backdrop-blur-sm text-white text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Full Width Image */}
        <div
          ref={(el) => (imagesRef.current[2] = el)}
          className="relative aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl md:rounded-3xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Image
            src="/group5.png"
            alt="Full-Stack Development Solutions Showcase"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-white font-semibold text-xl md:text-2xl mb-2">
                Full-Stack Solutions
              </h3>
              <p className="text-white/90 text-base md:text-lg mb-4">
                Complete digital ecosystems across all platforms and devices
              </p>
              <Link 
                href="/services/full-stack-development"
                className="inline-flex items-center bg-white/30 hover:bg-white/40 backdrop-blur-sm text-white text-sm md:text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
