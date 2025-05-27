"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Framer3Image from "../../../assets/Frame 3.png";

gsap.registerPlugin(ScrollTrigger);

const SwedishDataCenterPage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Animate elements on scroll
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".fade-in",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hero title animation
      const titleLetters = document.querySelectorAll(".hero-letter");
      if (titleLetters.length > 0) {
        gsap.set(titleLetters, { y: 100, opacity: 0 });
        gsap.to(titleLetters, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.3,
        });
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen"
      data-bg="var(--custom-blue)"
      data-text="var(--custom-pink)"
      data-button-bg="var(--custom-pink)"
      data-button-text="var(--custom-blue)"
      data-nav-text="var(--custom-pink)"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 md:px-16 lg:px-20 2xl:px-32">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto mb-12">
          <nav className="flex items-center space-x-2 text-lg text-custom-pink opacity-70">
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/#work"
              className="hover:opacity-100 transition-opacity"
            >
              Our Cases
            </Link>
            <span>/</span>
            <span className="opacity-100 font-medium">Swedish Data Center</span>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Project Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-custom-pink leading-none">
              {Array.from("SWEDISH").map((letter, index) => (
                <span key={index} className="hero-letter inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-custom-pink leading-none mt-4">
              DATA CENTER
            </h2>
          </div>

          {/* Project Subtitle */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-custom-pink font-light max-w-3xl">
              A professional corporate website showcasing Sweden's premier data
              center services with modern design and user-friendly content
              management through Webnode.
            </p>
          </div>

          {/* Project Tags */}
          <div className="flex flex-wrap gap-3 mb-16">
            <span className="px-6 py-3 border-2 border-custom-pink text-custom-pink rounded-full text-lg font-medium">
              Web Design
            </span>
            <span className="px-6 py-3 border-2 border-custom-pink text-custom-pink rounded-full text-lg font-medium">
              Webnode Development
            </span>
            <span className="px-6 py-3 border-2 border-custom-pink text-custom-pink rounded-full text-lg font-medium">
              Corporate Branding
            </span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={Framer3Image}
              alt="Swedish Data Center"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-5xl md:text-6xl font-bold text-custom-pink mb-8">
                The Challenge
              </h3>
            </div>
            <div>
              <p className="text-xl md:text-2xl text-custom-pink font-light leading-relaxed mb-8">
                Swedish Data Center needed a professional online presence that
                would establish trust and credibility in the competitive data
                center industry while being easily maintainable for their team.
              </p>
              <p className="text-lg md:text-xl text-custom-pink font-light leading-relaxed">
                The challenge was creating a sophisticated corporate website
                that communicated technical expertise while remaining accessible
                to potential clients with varying technical backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h3 className="text-5xl md:text-6xl font-bold text-custom-pink mb-8">
              Strategic Solution
            </h3>
            <p className="text-xl md:text-2xl text-custom-pink font-light leading-relaxed max-w-4xl">
              We developed a comprehensive corporate website using Webnode that
              balances professional aesthetics with technical credibility,
              featuring clear service presentations and easy content management
              capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <h4 className="text-3xl md:text-4xl font-bold text-custom-pink mb-16 text-center">
            Website Highlights
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-custom-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-custom-blue font-bold">01</span>
              </div>
              <h5 className="text-2xl font-bold text-custom-pink mb-4">
                Professional Design
              </h5>
              <p className="text-lg text-custom-pink font-light leading-relaxed">
                Clean, corporate aesthetics that instill confidence and reflect
                the technical sophistication of modern data center services.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-custom-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-custom-blue font-bold">02</span>
              </div>
              <h5 className="text-2xl font-bold text-custom-pink mb-4">
                Service Showcase
              </h5>
              <p className="text-lg text-custom-pink font-light leading-relaxed">
                Comprehensive presentation of data center services with clear
                value propositions and technical specifications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-custom-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-custom-blue font-bold">03</span>
              </div>
              <h5 className="text-2xl font-bold text-custom-pink mb-4">
                Easy Management
              </h5>
              <p className="text-lg text-custom-pink font-light leading-relaxed">
                Webnode-powered content management system allowing the team to
                update content efficiently without technical expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-bold text-custom-pink mb-8">
              The Outcome
            </h3>
            <p className="text-xl md:text-2xl text-custom-pink font-light leading-relaxed max-w-4xl mx-auto">
              The new website successfully positioned Swedish Data Center as a
              leading provider in the industry, enhancing their digital presence
              and client acquisition capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl md:text-7xl font-bold text-custom-pink mb-4">
                200%
              </div>
              <p className="text-xl text-custom-pink font-light">
                Increase in Web Traffic
              </p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-custom-pink mb-4">
                150%
              </div>
              <p className="text-xl text-custom-pink font-light">
                More Lead Inquiries
              </p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-custom-pink mb-4">
                95%
              </div>
              <p className="text-xl text-custom-pink font-light">
                Client Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h4 className="text-3xl md:text-4xl font-bold text-custom-pink mb-8">
              Explore More Work
            </h4>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/work/xtream-esport-arena"
                className="px-8 py-4 border-2 border-custom-pink text-custom-pink rounded-full hover:bg-custom-pink hover:text-custom-blue transition-all duration-300 text-lg font-medium"
              >
                Next: Xtream E-sport Arena →
              </Link>
              <Link
                href="/#work"
                className="px-8 py-4 bg-custom-pink text-custom-blue rounded-full hover:bg-opacity-80 transition-all duration-300 text-lg font-medium"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SwedishDataCenterPage;
