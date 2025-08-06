"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Group78Image from "../../../assets/Group78-2.png";

gsap.registerPlugin(ScrollTrigger);

const ShelfWisePage = () => {
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
      data-text="#CB6516"
      data-button-bg="#CB6516"
      data-button-text="white"
      data-navbar-text="#CB6516"
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 md:px-16 lg:px-20 2xl:px-32">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto mb-12">
          <nav
            className="flex items-center space-x-2 text-lg opacity-70"
            style={{ color: "#CB6516" }}
          >
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
            <span className="opacity-100 font-medium">ShelfWise</span>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Project Title */}
          <div className="mb-8">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl 2xl:text-[12rem] font-bold leading-none"
              style={{ color: "#CB6516" }}
            >
              {Array.from("SHELFWISE").map((letter, index) => (
                <span key={index} className="hero-letter inline-block">
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Project Subtitle */}
          <div className="mb-12">
            <p
              className="text-xl md:text-2xl lg:text-3xl font-light max-w-3xl"
              style={{ color: "#CB6516" }}
            >
              An intelligent inventory management system that transforms how
              businesses track, manage, and optimize their stock levels with
              AI-powered insights.
            </p>
          </div>

          {/* Project Tags */}
          <div className="flex flex-wrap gap-3 mb-16">
            <span
              className="px-6 py-3 border-2 rounded-full text-lg font-medium"
              style={{ borderColor: "#CB6516", color: "#CB6516" }}
            >
              UI/UX Design
            </span>
            <span
              className="px-6 py-3 border-2 rounded-full text-lg font-medium"
              style={{ borderColor: "#CB6516", color: "#CB6516" }}
            >
              Fullstack Development
            </span>
            <span
              className="px-6 py-3 border-2 rounded-full text-lg font-medium"
              style={{ borderColor: "#CB6516", color: "#CB6516" }}
            >
              Database Design
            </span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={Group78Image}
              alt="ShelfWise Inventory Management System"
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
              <h3
                className="text-5xl md:text-6xl font-bold mb-8"
                style={{ color: "#CB6516" }}
              >
                The Challenge
              </h3>
            </div>
            <div>
              <p
                className="text-xl md:text-2xl font-light leading-relaxed mb-8"
                style={{ color: "#CB6516" }}
              >
                Small to medium businesses struggled with outdated inventory
                systems that led to overstocking, stockouts, and inefficient
                resource allocation, costing them revenue and customer
                satisfaction.
              </p>
              <p
                className="text-lg md:text-xl font-light leading-relaxed"
                style={{ color: "#CB6516" }}
              >
                Manual tracking methods and legacy software couldn&apos;t provide
                real-time insights or predictive analytics needed for modern
                inventory optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h3
              className="text-5xl md:text-6xl font-bold mb-8"
              style={{ color: "#CB6516" }}
            >
              Smart Solution
            </h3>
            <p
              className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl"
              style={{ color: "#CB6516" }}
            >
              ShelfWise combines intuitive design with powerful analytics,
              offering businesses a comprehensive platform for inventory
              tracking, automated reordering, and predictive demand forecasting.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <h4
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            style={{ color: "#CB6516" }}
          >
            Powerful Features
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "#CB6516" }}
              >
                <span className="text-2xl text-custom-blue font-bold">01</span>
              </div>
              <h5
                className="text-2xl font-bold mb-4"
                style={{ color: "#CB6516" }}
              >
                Real-time Tracking
              </h5>
              <p
                className="text-lg font-light leading-relaxed"
                style={{ color: "#CB6516" }}
              >
                Live inventory updates with barcode scanning and automated stock
                level monitoring across multiple locations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "#CB6516" }}
              >
                <span className="text-2xl text-custom-blue font-bold">02</span>
              </div>
              <h5
                className="text-2xl font-bold mb-4"
                style={{ color: "#CB6516" }}
              >
                Predictive Analytics
              </h5>
              <p
                className="text-lg font-light leading-relaxed"
                style={{ color: "#CB6516" }}
              >
                AI-powered demand forecasting and automated reorder points to
                prevent stockouts and reduce excess inventory.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "#CB6516" }}
              >
                <span className="text-2xl text-custom-blue font-bold">03</span>
              </div>
              <h5
                className="text-2xl font-bold mb-4"
                style={{ color: "#CB6516" }}
              >
                Smart Reporting
              </h5>
              <p
                className="text-lg font-light leading-relaxed"
                style={{ color: "#CB6516" }}
              >
                Comprehensive dashboards with customizable reports and KPI
                tracking for data-driven decision making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3
              className="text-5xl md:text-6xl font-bold mb-8"
              style={{ color: "#CB6516" }}
            >
              The Results
            </h3>
            <p
              className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto"
              style={{ color: "#CB6516" }}
            >
              ShelfWise delivered significant improvements in inventory
              efficiency and cost reduction for businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div
                className="text-6xl md:text-7xl font-bold mb-4"
                style={{ color: "#CB6516" }}
              >
                45%
              </div>
              <p className="text-xl font-light" style={{ color: "#CB6516" }}>
                Reduction in Stockouts
              </p>
            </div>
            <div>
              <div
                className="text-6xl md:text-7xl font-bold mb-4"
                style={{ color: "#CB6516" }}
              >
                30%
              </div>
              <p className="text-xl font-light" style={{ color: "#CB6516" }}>
                Lower Inventory Costs
              </p>
            </div>
            <div>
              <div
                className="text-6xl md:text-7xl font-bold mb-4"
                style={{ color: "#CB6516" }}
              >
                60%
              </div>
              <p className="text-xl font-light" style={{ color: "#CB6516" }}>
                Time Savings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="px-8 md:px-16 lg:px-20 2xl:px-32 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h4
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "#CB6516" }}
            >
              Explore More Work
            </h4>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/work/swedish-data-center"
                className="px-8 py-4 border-2 rounded-full hover:text-custom-blue transition-all duration-300 text-lg font-medium"
                style={{
                  borderColor: "#CB6516",
                  color: "#CB6516",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#CB6516";
                  e.target.style.color = "var(--custom-blue)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#CB6516";
                }}
              >
                Next: Swedish Data Center →
              </Link>
              <Link
                href="/#work"
                className="px-8 py-4 text-custom-blue rounded-full hover:bg-opacity-80 transition-all duration-300 text-lg font-medium"
                style={{ backgroundColor: "#CB6516" }}
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

export default ShelfWisePage;
