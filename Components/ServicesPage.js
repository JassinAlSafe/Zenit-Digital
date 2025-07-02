"use client";

import { useRef } from "react";
import { services, processSteps } from "../data/servicesData";
import { teamMembers } from "../data/teamData";
import { useServicesAnimations } from "./Services/useServicesAnimations";
import Hero from "./Services/Hero";
import ServiceCard from "./Services/ServiceCard";
import TeamBentoGrid from "./Services/TeamBentoGrid";
import ProcessSteps from "./Services/ProcessSteps";
import ContactSection from "./Services/ContactSection";
import ServicesFooter from "./Services/ServicesFooter";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef([]);
  const teamRef = useRef([]);
  const processRef = useRef([]);

  // Custom hook for GSAP animations
  useServicesAnimations(heroRef, servicesRef, teamRef, processRef);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gray-900 text-white"
      data-bg="var(--custom-dark)"
      data-text="white"
      data-button-bg="var(--custom-pink)"
      data-button-text="var(--custom-blue)"
      data-navbar-text="white"
    >
      {/* Hero Section */}
      <Hero ref={heroRef} />

      {/* Services Grid */}
      <div className="services-grid px-4 md:px-8 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              ref={(el) => (servicesRef.current[index] = el)}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Process Section */}
      <ProcessSteps processSteps={processSteps} processRefs={processRef} />

      {/* Team Bento Grid Section */}
      <TeamBentoGrid teamMembers={teamMembers} teamRefs={teamRef} />

      {/* Contact Section */}
      <ContactSection />

      {/* Services Footer */}
      <ServicesFooter />
    </section>
  );
}
