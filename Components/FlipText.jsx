"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const FlipText = ({
  children,
  className = "",
  href,
  onClick,
  animationType = "slide", // "slide", "flip", "mask"
  duration = 0.4,
  ...props
}) => {
  const containerRef = useRef(null);
  const originalTextRef = useRef(null);
  const hoverTextRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const originalText = originalTextRef.current;
    const hoverText = hoverTextRef.current;

    if (!container || !originalText || !hoverText) return;

    // Set initial states
    gsap.set(hoverText, {
      y: animationType === "slide" ? "100%" : 0,
      rotationX: animationType === "flip" ? -90 : 0,
      opacity: animationType === "mask" ? 0 : 1,
    });

    const handleMouseEnter = () => {
      const tl = gsap.timeline();

      if (animationType === "slide") {
        tl.to(
          originalText,
          {
            y: "-100%",
            duration: duration,
            ease: "power2.inOut",
          },
          0
        ).to(
          hoverText,
          {
            y: "0%",
            duration: duration,
            ease: "power2.inOut",
          },
          0
        );
      } else if (animationType === "flip") {
        tl.to(
          originalText,
          {
            rotationX: 90,
            duration: duration / 2,
            ease: "power2.in",
          },
          0
        ).to(
          hoverText,
          {
            rotationX: 0,
            duration: duration / 2,
            ease: "power2.out",
          },
          duration / 2
        );
      } else if (animationType === "mask") {
        tl.to(
          originalText,
          {
            opacity: 0,
            duration: duration / 2,
            ease: "power2.inOut",
          },
          0
        ).to(
          hoverText,
          {
            opacity: 1,
            duration: duration / 2,
            ease: "power2.inOut",
          },
          duration / 2
        );
      }
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();

      if (animationType === "slide") {
        tl.to(
          hoverText,
          {
            y: "100%",
            duration: duration,
            ease: "power2.inOut",
          },
          0
        ).to(
          originalText,
          {
            y: "0%",
            duration: duration,
            ease: "power2.inOut",
          },
          0
        );
      } else if (animationType === "flip") {
        tl.to(
          hoverText,
          {
            rotationX: -90,
            duration: duration / 2,
            ease: "power2.in",
          },
          0
        ).to(
          originalText,
          {
            rotationX: 0,
            duration: duration / 2,
            ease: "power2.out",
          },
          duration / 2
        );
      } else if (animationType === "mask") {
        tl.to(
          hoverText,
          {
            opacity: 0,
            duration: duration / 2,
            ease: "power2.inOut",
          },
          0
        ).to(
          originalText,
          {
            opacity: 1,
            duration: duration / 2,
            ease: "power2.inOut",
          },
          duration / 2
        );
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animationType, duration]);

  const content = (
    <div
      ref={containerRef}
      className={`relative inline-block cursor-pointer overflow-hidden ${className}`}
      onClick={onClick}
      style={{
        perspective: animationType === "flip" ? "1000px" : "none",
      }}
      {...props}
    >
      <div
        ref={originalTextRef}
        className="block"
        style={{
          transformOrigin:
            animationType === "flip" ? "center bottom" : "center",
        }}
      >
        {children}
      </div>
      <div
        ref={hoverTextRef}
        className="absolute inset-0 flex items-center"
        style={{
          transformOrigin: animationType === "flip" ? "center top" : "center",
        }}
      >
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};

export default FlipText;
