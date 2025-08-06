"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Group5Image from "../../../assets/Group5.png";

gsap.registerPlugin(ScrollTrigger);

const XtreamEsportArenaPage = () => {
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
      style={{ backgroundColor: "white" }}
      data-bg="white"
      data-text="var(--custom-pink)"
      data-button-bg="var(--custom-pink)"
      data-button-text="white"
      data-navbar-text="var(--custom-pink)"
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
            <span className="opacity-100 font-medium">
              Xtream E-sport Arena
            </span>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Project Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl 2xl:text-[12rem] font-bold text-custom-pink leading-none">
              {Array.from("XTREAM").map((letter, index) => (
                <span key={index} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-custom-pink leading-none mt-4">
              E-SPORT ARENA
            </h2>
          </div>

          {/* Project Subtitle */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-custom-pink font-light max-w-3xl">
              A cutting-edge gaming arena platform designed to bring esports
              enthusiasts together with modern design and seamless user
              experience.
            </p>
          </div>

          {/* Project Tags */}
          <div className="flex flex-wrap gap-3 mb-16">
            <span className="px-6 py-3 border-2 border-custom-pink text-custom-pink rounded-full text-lg font-medium">
              Web Design
            </span>
            <span className="px-6 py-3 border-2 border-custom-pink text-custom-pink rounded-full text-lg font-medium">
              Web Development
            </span>
            <span className="px-6 py-3 border-2 border-custom-pink text-custom-pink rounded-full text-lg font-medium">
              UI/UX Design
            </span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={Group5Image}
              alt="Xtream E-sport Arena"
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
                The gaming industry needed a modern, professional platform that
                could bring esports enthusiasts together while providing an
                intuitive booking system for gaming sessions and tournaments.
              </p>
              <p className="text-lg md:text-xl text-custom-pink font-light leading-relaxed">
                Traditional gaming centers lacked the digital presence and user
                experience that modern gamers expect, creating a gap between
                physical gaming spaces and digital engagement.
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
              Our Solution
            </h3>
            <p className="text-xl md:text-2xl text-custom-pink font-light leading-relaxed max-w-4xl">
              We created a comprehensive digital platform that combines stunning
              visual design with functional user experience, featuring real-time
              booking systems, tournament management, and community features.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <h4 className="text-3xl md:text-4xl font-bold text-custom-pink mb-16 text-center">
            Key Features Delivered
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-custom-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-custom-blue font-bold">01</span>
              </div>
              <h5 className="text-2xl font-bold text-custom-pink mb-4">
                Real-time Booking System
              </h5>
              <p className="text-lg text-custom-pink font-light leading-relaxed">
                Seamless reservation system allowing gamers to book gaming
                sessions with real-time availability updates.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-custom-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-custom-blue font-bold">02</span>
              </div>
              <h5 className="text-2xl font-bold text-custom-pink mb-4">
                Tournament Management
              </h5>
              <p className="text-lg text-custom-pink font-light leading-relaxed">
                Complete tournament organization tools with bracket management
                and live score tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-custom-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-custom-blue font-bold">03</span>
              </div>
              <h5 className="text-2xl font-bold text-custom-pink mb-4">
                Community Hub
              </h5>
              <p className="text-lg text-custom-pink font-light leading-relaxed">
                Social features connecting gamers with team formation tools and
                community events.
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
              The Impact
            </h3>
            <p className="text-xl md:text-2xl text-custom-pink font-light leading-relaxed max-w-4xl mx-auto">
              The new platform transformed how gamers interact with esports
              facilities, creating a seamless bridge between digital and
              physical gaming experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl md:text-7xl font-bold text-custom-pink mb-4">
                300%
              </div>
              <p className="text-xl text-custom-pink font-light">
                Increase in Online Bookings
              </p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-custom-pink mb-4">
                85%
              </div>
              <p className="text-xl text-custom-pink font-light">
                User Satisfaction Rate
              </p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-custom-pink mb-4">
                50+
              </div>
              <p className="text-xl text-custom-pink font-light">
                Tournaments Hosted
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
                href="/work/shelfwise"
                className="px-8 py-4 border-2 border-custom-pink text-custom-pink rounded-full hover:bg-custom-pink hover:text-custom-blue transition-all duration-300 text-lg font-medium"
              >
                Next: ShelfWise →
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

export default XtreamEsportArenaPage;
