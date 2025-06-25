"use client";

import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { useCursor } from "../utils/CursorContext";

const CustomCursor = memo(() => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const { cursorType } = useCursor();

  useEffect(() => {
    // Check if we're on a touch device - if so, don't use custom cursor
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Initial setup - hide cursor and position off-screen
    gsap.set([cursor, follower], { opacity: 0, xPercent: -50, yPercent: -50 });

    // Main cursor animation function
    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      // Animate cursor dot (fast movement)
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power1.out",
        overwrite: "auto",
      });

      // Animate follower (delayed for trailing effect)
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Show cursor when it first moves
    const onMouseMove = (e) => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      moveCursor(e);
    };

    // Handle mouse down/up events
    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.2,
        backgroundColor: "#0FB190",
        overwrite: "auto",
      });
      gsap.to(follower, {
        scale: 0.8,
        duration: 0.2,
        borderColor: "#0FB190",
        borderWidth: 2,
        overwrite: "auto",
      });
    };

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        backgroundColor: "rgba(164, 148, 243, 1)",
        overwrite: "auto",
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.2,
        borderColor: "rgba(164, 148, 243, 1)",
        borderWidth: 1,
        overwrite: "auto",
      });
    };

    // Handle button hover effects
    const handleButtonEnter = (e) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Scale up both cursors slightly
      gsap.to(cursor, {
        width: 12,
        height: 12,
        backgroundColor: "rgba(164, 148, 243, 0.8)",
        duration: 0.3,
        overwrite: "auto",
      });

      gsap.to(follower, {
        width: 40,
        height: 40,
        duration: 0.3,
        borderColor: "rgba(164, 148, 243, 0.5)",
        overwrite: "auto",
      });

      // Center on the button immediately instead of magnetic effect
      gsap.to([cursor, follower], {
        x: centerX,
        y: centerY,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const handleButtonLeave = () => {
      // Return cursor to normal size
      gsap.to(cursor, {
        width: 8,
        height: 8,
        backgroundColor: "rgba(164, 148, 243, 1)",
        duration: 0.3,
        overwrite: "auto",
      });

      gsap.to(follower, {
        width: 32,
        height: 32,
        borderColor: "rgba(164, 148, 243, 1)",
        duration: 0.3,
        overwrite: "auto",
      });
    };

    // Track when cursor leaves the window
    const onMouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    // Find and add event listeners to all buttons and links
    const interactiveElements = document.querySelectorAll(
      "button, a, input[type='button'], input[type='submit'], [role='button'], .btn"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleButtonEnter);
      element.addEventListener("mouseleave", handleButtonLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleButtonEnter);
        element.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, []);

  // Apply different cursor styles based on cursorType from context
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    switch (cursorType) {
      case "button":
        gsap.to(cursor, {
          width: 12,
          height: 12,
          backgroundColor: "#0FB190",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(follower, {
          width: 40,
          height: 40,
          borderColor: "#0FB190",
          duration: 0.3,
          overwrite: "auto",
        });
        break;

      case "text":
        gsap.to(cursor, {
          width: 4,
          height: 20,
          borderRadius: "2px",
          backgroundColor: "#A494F3",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(follower, {
          opacity: 0.5,
          duration: 0.3,
          overwrite: "auto",
        });
        break;

      case "link":
        gsap.to(cursor, {
          width: 10,
          height: 10,
          backgroundColor: "#A494F3",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(follower, {
          width: 36,
          height: 36,
          opacity: 0.7,
          borderColor: "#A494F3",
          duration: 0.3,
          overwrite: "auto",
        });
        break;

      default:
        gsap.to(cursor, {
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgba(164, 148, 243, 1)",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(follower, {
          width: 32,
          height: 32,
          opacity: 1,
          borderColor: "rgba(164, 148, 243, 1)",
          duration: 0.3,
          overwrite: "auto",
        });
    }
  }, [cursorType]);

  return (
    <>
      {/* Small inner cursor */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-custom-pink rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ top: 0, left: 0 }}
      ></div>

      {/* Larger outer cursor */}
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-custom-pink rounded-full pointer-events-none z-[9998]"
        style={{ top: 0, left: 0 }}
      ></div>
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
