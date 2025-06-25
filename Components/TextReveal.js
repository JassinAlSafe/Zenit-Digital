'use client';
import React, { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * TextReveal Component
 * 
 * A reusable component that animates text with a letter-by-letter reveal animation on scroll.
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The text to animate
 * @param {string} [props.className] - Additional CSS classes for the container
 * @param {string} [props.textClassName] - Additional CSS classes for the text
 * @param {string} [props.tag] - HTML tag to use for the text (default: 'h1')
 * @param {boolean} [props.splitLines] - Whether to split the text into multiple lines
 * @param {number} [props.staggerDelay] - Delay between each letter animation (default: 0.04)
 * @param {number} [props.duration] - Duration of the animation (default: 1)
 */
const TextReveal = memo(({
  text,
  className = "",
  textClassName = "",
  tag = "h1",
  splitLines = true,
  staggerDelay = 0.04,
  duration = 1,
  onComplete = () => {}
}) => {
  const containerRef = useRef(null);
  const TextTag = tag;
  
  // Split text into lines if requested
  const lines = splitLines ? text.split(" ").reduce((acc, word) => {
    if (acc.length === 0) return [word];
    
    const lastLine = acc[acc.length - 1].split(" ");
    if (lastLine.length > 3) {
      return [...acc, word];
    } else {
      acc[acc.length - 1] += " " + word;
      return acc;
    }
  }, []) : [text];

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Make sure the container is available
    const container = containerRef.current;
    if (!container) return;
    
    // Get all letter elements
    const letters = container.querySelectorAll(".reveal-letter");
    
    // Initial setup - hide letters below their position
    gsap.set(letters, { y: 160 });
    
    // Create a ScrollTrigger for the animation
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(letters, {
          y: 0,
          duration: duration,
          stagger: staggerDelay,
          ease: "power3.out",
          onComplete: onComplete
        });
      },
      once: true
    });
    
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, duration, staggerDelay, onComplete]);

  return (
    <div ref={containerRef} className={className}>
      <TextTag className={textClassName}>
        {lines.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className="overflow-hidden">
            {Array.from(line).map((letter, letterIndex) => (
              <span 
                key={`letter-${lineIndex}-${letterIndex}`} 
                className="reveal-letter inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        ))}
      </TextTag>
    </div>
  );
});

TextReveal.displayName = 'TextReveal';

export default TextReveal;