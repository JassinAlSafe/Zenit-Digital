"use client";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

// Utility function for className merging (replace with your actual cn function)
const cn = (...classes) => classes.filter(Boolean).join(" ");

// TextReveal component from Magic UI
export const TextReveal = ({ children, className }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-7xl items-center bg-transparent px-4"
        }
      >
        <span
          ref={targetRef}
          className={
            "flex flex-wrap text-black/20 dark:text-white/20"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-custom-pink dark:text-custom-pink"}
      >
        {children}
      </motion.span>
    </span>
  );
};

// Updated AboutSection component
const AboutSection = () => {
  const [isWindows, setIsWindows] = useState(false);

  // Function to detect Windows
  const detectWindows = () => {
    if (typeof window === "undefined") return false;
    return window.navigator.platform.toLowerCase().includes('win');
  };

  useEffect(() => {
    // Detect Windows for platform-specific styling
    setIsWindows(detectWindows());
  }, []);

  // Get platform-specific text classes
  const getTextClasses = () => {
    const baseClasses = "flex flex-wrap font-normal text-left";
    if (isWindows) {
      // Windows-specific text sizing - reduced to prevent overflow
      return `${baseClasses} 2xl:text-[8.5rem] px-12 text-4xl text-[#13496C] md:text-7xl lg:text-7xl`;
    } else {
      // macOS classes (original)
      return `${baseClasses} 2xl:text-[10rem] text-5xl text-[#13496C] md:text-7xl lg:text-8xl`;
    }
  };

  return (
    <section
      id="about"
      className="about-section min-h-screen w-full"
      data-bg="var(--custom-blue)"
      data-text="#13496C"
      data-button-bg="var(--custom-pink)"
      data-button-text="var(--custom-blue)"
      data-navbar-text="var(--custom-pink)"
    >
      <div className="w-full h-full flex items-center justify-center">
        <TextReveal className={getTextClasses()}>
          We create elevating digital solutions that empower startups through innovative software and purposeful design.
        </TextReveal>
      </div>
    </section>
  );
};

export default AboutSection;