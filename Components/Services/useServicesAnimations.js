import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useServicesAnimations = (heroRef, servicesRef, teamRef, processRef) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      const ctx = gsap.context(() => {
        // Hero section animation - immediate load, no ScrollTrigger needed
        if (heroRef.current) {
          gsap.fromTo(".hero-title", 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
          );
          gsap.fromTo(".hero-subtitle", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
          );
        }

        // Service cards - single ScrollTrigger for all cards
        if (servicesRef.current.length > 0) {
          gsap.fromTo(servicesRef.current.filter(Boolean), 
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".services-grid",
                start: "top 85%",
                toggleActions: "play none none none",
              }
            }
          );
        }

        // Team cards - optimized single trigger
        if (teamRef.current.length > 0) {
          gsap.fromTo(teamRef.current.filter(Boolean),
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".team-section",
                start: "top 85%",
                toggleActions: "play none none none",
              }
            }
          );
        }

        // Process steps - optimized single trigger
        if (processRef.current.length > 0) {
          gsap.fromTo(processRef.current.filter(Boolean),
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".process-section",
                start: "top 85%",
                toggleActions: "play none none none",
              }
            }
          );
        }
      });

      // Cleanup using gsap.context
      return () => ctx.revert();
    }
  }, [heroRef, servicesRef, teamRef, processRef]);
};