"use client";
import { useEffect, useRef } from "react";

export default function ServiceSection({
  children,
  title,
  subtitle = "",
  backgroundColor = "black",
  textColor = "white",
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contentRef.current.classList.add("visible");
        } else {
          contentRef.current.classList.remove("visible");
        }
      },
      { threshold: 0.3 }
    );

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="service-section"
      style={{ backgroundColor, color: textColor }}
    >
      {title && (
        <div className="container mx-auto px-6">
          {subtitle && (
            <span className="text-4xl md:text-6xl text-gray-500 font-light">
              ({subtitle})
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold mb-8">{title}</h2>
        </div>
      )}
      <div ref={contentRef} className="service-content container mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
