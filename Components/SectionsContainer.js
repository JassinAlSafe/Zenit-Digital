'use client';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SelectedWorks from "./SelectedWorks";
import ServicesSection from "./StackedFolders/ServicesSection";

export default function StackedCardsContainer() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      const ctx = gsap.context(() => {
        // Get our sections
        const container = containerRef.current;
        const selectedWorksSection = document.querySelector(".selected-works-section");
        const servicesSection = document.querySelector(".services-section");
        const navbar = document.querySelector(".navbar");
        
        if (!selectedWorksSection || !servicesSection) {
          console.error("Could not find sections");
          return;
        }
        
        // Fix for horizontal scroll
        document.body.style.overflowX = "hidden";
        
        // Set up the stacking context
        gsap.set(container, {
          position: "relative",
          overflow: "visible"
        });
      
      // Set up our sections exactly as they should be
      gsap.set(selectedWorksSection, { 
        position: "relative",
        zIndex: 2,
        backgroundColor: "var(--custom-blue)",
        width: "100%",
        margin: "0 auto"
      });
      
      gsap.set(servicesSection, {
        backgroundColor: "white",
        marginTop: "-100vh",
        position: "relative",
        zIndex: 1 
      });
      
      // Create a marker for transition
      const triggerMarker = document.createElement("div");
      triggerMarker.className = "section-transition-trigger";
      triggerMarker.style.height = "100vh";
      selectedWorksSection.appendChild(triggerMarker);
      
      // Create the slide-up and shrink animation without any color management
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerMarker,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: false
        }
      });
      
      tl.to(selectedWorksSection, {
        y: "-30vh",
        duration: 0.3,
        ease: "none"
      }, 0);
      
      tl.to(selectedWorksSection, {
        y: "-100vh",
        width: "80%",
        borderRadius: "50px",
        duration: 0.7,
        ease: "none",
        onUpdate: function() {
          selectedWorksSection.style.marginLeft = "auto";
          selectedWorksSection.style.marginRight = "auto";
        }
      }, 0.3);
      
      // Simplified color management system
      const colorTriggers = [
        {
          trigger: selectedWorksSection,
          colors: { bg: "var(--custom-blue)", text: "var(--custom-pink)" }
        },
        {
          trigger: servicesSection,
          colors: { bg: "white", text: "var(--custom-green)" }
        }
      ];

      colorTriggers.forEach(({ trigger, colors }) => {
        if (trigger) {
          ScrollTrigger.create({
            trigger,
            start: "top 75%",
            end: "bottom 25%",
            onEnter: () => {
              document.body.style.backgroundColor = colors.bg;
              document.body.style.color = colors.text;
            },
            onEnterBack: () => {
              document.body.style.backgroundColor = colors.bg;
              document.body.style.color = colors.text;
            }
          });
        }
      });
      
      // Simplified navbar animation for medium and large screens
      if (window.innerWidth >= 768 && navbar) {
        const projects = document.querySelectorAll('.scroll-item');
        const firstProject = projects[0];
        const lastService = servicesSection.querySelector('.sticky:last-child');
        
        if (firstProject && lastService) {
          const toggleNavbar = (show) => {
            if (window.matchMedia("(min-width: 768px)").matches) {
              gsap.to(navbar, {
                y: show ? "0%" : "-100%",
                duration: 0.5,
                ease: "power2.out"
              });
            }
          };
          
          // Hide navbar during projects and services sections
          ScrollTrigger.create({
            trigger: firstProject,
            start: "top 50%",
            end: () => lastService.offsetTop + lastService.offsetHeight,
            onEnter: () => toggleNavbar(false),
            onLeave: () => toggleNavbar(true),
            onEnterBack: () => toggleNavbar(false),
            onLeaveBack: () => toggleNavbar(true)
          });
        }
      }
      
        // Resize handler
        const handleResize = () => {
          if (window.innerWidth < 768 && navbar) {
            gsap.to(navbar, { y: "0%", duration: 0.3 });
          }
          document.body.style.overflowX = "hidden";
        };
        
        window.addEventListener('resize', handleResize);
        
        // Store cleanup function for resize handler
        return () => {
          if (triggerMarker.parentNode) {
            triggerMarker.parentNode.removeChild(triggerMarker);
          }
          window.removeEventListener('resize', handleResize);
        };
      });
      
      // Cleanup using gsap.context
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="stacked-cards-container w-full overflow-x-hidden" ref={containerRef}>
      <SelectedWorks />
      <ServicesSection />
    </div>
  );
}