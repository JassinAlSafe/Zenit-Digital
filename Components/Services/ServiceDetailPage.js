"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AbstractShapes from "./AbstractShapes";

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServiceDetailPage({ service }) {
  const router = useRouter();
  const containerRef = useRef(null);
  const featuresRef = useRef([]);
  const caseStudiesRef = useRef([]);

  // Professional GSAP integration with useGSAP hook
  const { contextSafe } = useGSAP(() => {
    // Hero entrance animation
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Check if elements exist before animating
    const heroTitle = document.querySelector(".service-hero-title");
    const heroSubtitle = document.querySelector(".service-hero-subtitle"); 
    const heroMeta = document.querySelector(".service-hero-meta");
    const heroCta = document.querySelector(".service-hero-cta");

    if (heroTitle) {
      tl.from(heroTitle, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }

    if (heroSubtitle) {
      tl.from(heroSubtitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
    }

    if (heroMeta) {
      tl.from(heroMeta, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");
    }

    if (heroCta) {
      tl.from(heroCta, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");
    }

    // ScrollTrigger animations for content sections
    const sections = [
      { selector: ".service-overview", start: "top 80%" },
      { selector: ".service-features", start: "top 80%" },
      { selector: ".service-technologies", start: "top 85%" },
      { selector: ".service-case-studies", start: "top 80%" },
      { selector: ".service-cta", start: "top 85%" }
    ];

    sections.forEach(({ selector, start }) => {
      const element = document.querySelector(selector);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start,
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.from(element, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out"
            });
          }
        });
      }
    });

    // Features stagger animation  
    if (featuresRef.current && featuresRef.current.length > 0) {
      const featuresSection = document.querySelector(".service-features");
      if (featuresSection) {
        ScrollTrigger.create({
          trigger: featuresSection,
          start: "top 70%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.from(featuresRef.current, {
              x: -30,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1
            });
          }
        });
      }
    }

    // Case studies stagger animation
    if (caseStudiesRef.current && caseStudiesRef.current.length > 0) {
      const caseStudiesSection = document.querySelector(".service-case-studies");
      if (caseStudiesSection) {
        ScrollTrigger.create({
          trigger: caseStudiesSection,
          start: "top 70%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.from(caseStudiesRef.current, {
              y: 40,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.2
            });
          }
        });
      }
    }

  }, { scope: containerRef, dependencies: [service.slug] }); // Re-run when service changes

  // Context-safe event handlers for potential animations
  const handleBackToServices = contextSafe(() => {
    router.push('/services');
  });

  const handleGetQuote = contextSafe(() => {
    router.push("/booking");
  });

  // Validate service data
  if (!service) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Service Not Found</h1>
          <button
            onClick={() => router.push('/services')}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      key={service.slug}
      ref={containerRef} 
      className="min-h-screen bg-gray-900 text-white"
      data-bg="var(--custom-dark)"
      data-text="white"
      data-button-bg="var(--custom-pink)"
      data-button-text="var(--custom-blue)"
      data-navbar-text="white"
    >
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <button
            onClick={handleBackToServices}
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="service-hero-title">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6">
                <span className="text-2xl mr-3">{service.icon}</span>
                <span className="text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Premium Service
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                {service.title}
              </h1>
            </div>
            
            <p className="service-hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="service-hero-meta flex flex-col sm:flex-row gap-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Starting from</p>
                  <p className="text-2xl font-bold text-white">{service.startingPrice}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Timeline</p>
                  <p className="text-xl font-semibold text-white">{service.estimatedTimeframe}</p>
                </div>
              </div>
            </div>

            <div className="service-hero-cta">
              <button
                onClick={handleGetQuote}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Custom Quote
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Abstract shape showcase */}
          <div className="relative h-96 lg:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
            <div className="relative h-full scale-150">
              <AbstractShapes shapeType={service.shape} />
            </div>
          </div>
        </div>
      </div>

      {/* Service Overview */}
      <div className="service-overview px-4 md:px-8 max-w-7xl mx-auto pb-24">
          <div className="bg-gray-800/50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">Service Overview</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              {service.detailedDescription?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-6">
                  {paragraph}
                </p>
              )) || (
                <p className="text-gray-300 leading-relaxed">
                  Comprehensive service details will be provided during consultation.
                </p>
              )}
            </div>
          </div>
        </div>

      {/* Features */}
      <div className="service-features px-4 md:px-8 max-w-7xl mx-auto pb-24">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">What&apos;s Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.features?.map((feature, index) => (
            <div
              key={index}
              ref={el => featuresRef.current[index] = el}
              className="bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature}</h3>
              <p className="text-gray-400">Comprehensive solution delivered with attention to detail and best practices.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      {service.technologies && service.technologies.length > 0 && (
        <div className="service-technologies px-4 md:px-8 max-w-7xl mx-auto pb-24">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">Technologies We Use</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {service.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gray-800 text-white rounded-2xl font-medium hover:bg-blue-600 transition-colors duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Case Studies */}
      {service.caseStudies && service.caseStudies.length > 0 && (
        <div className="service-case-studies px-4 md:px-8 max-w-7xl mx-auto pb-24">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">Recent Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.caseStudies.map((caseStudy, index) => (
              <div
                key={index}
                ref={el => caseStudiesRef.current[index] = el}
                className="bg-gradient-to-br from-gray-800/50 to-gray-800/30 rounded-2xl p-8 hover:from-gray-800/70 hover:to-gray-800/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{caseStudy.title || caseStudy}</h3>
                <p className="text-gray-400 mb-4">
                  {caseStudy.description || "Successful implementation showcasing our expertise and delivering measurable results for our clients."}
                </p>
                {caseStudy.client && (
                  <p className="text-blue-400 text-sm mb-2">Client: {caseStudy.client}</p>
                )}
                {caseStudy.industry && (
                  <p className="text-gray-500 text-sm mb-4">Industry: {caseStudy.industry}</p>
                )}
                <div className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                  View Case Study →
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
        <div className="service-cta px-4 md:px-8 max-w-7xl mx-auto pb-24">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create a custom solution that drives real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetQuote}
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Get Custom Quote
              </button>
              <button
                onClick={handleBackToServices}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-colors duration-300"
              >
                View Other Services
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}