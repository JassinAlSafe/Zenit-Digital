import React, { useRef } from 'react';
import { ArrowRight, Zap, Palette, Wrench, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOS } from "../utils/OsProvider"; // Import the OS hook

const Strategy = () => {
  const scrollRef = useRef(null);
  const { isWindows, isDetected } = useOS(); // Use the OS hook

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Strategie",
      description: "Op basis van jouw energiedata maken we de uitdagingen en mogelijkheden zichtbaar. Als jouw energiestrategie partner blijven we actief meedenken, want iedere energiestrategie is uniek en dynamisch."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Ontwerp",
      description: "Jouw data zorgt voor inzicht in de te nemen maatregelen. Tijdens het ontwerpproces ontvouwt zich een concrete oplossing. Gedetailleerd uitgewerkt én praktisch haalbaar."
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Realisatie",
      description: "Vakkundige monteurs zorgen voor een plan dat werkt, perfect volgens het ontwerp. Merkonfhankelijke en betrouwbare installaties van onder andere zonnepanelen en batterijen."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Monitoring",
      description: "We houden jouw installatie in topvorm door actieve monitoring van data. Real-time monitoring en regelmatige controles zorgen voor maximale efficiëntie."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Onderhoud",
      description: "Regelmatig onderhoud houdt jouw energiesysteem in optimale conditie. Onze specialisten voeren preventieve controles uit en lossen eventuele problemen snel op."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Optimalisatie",
      description: "Continue verbetering van jouw energieprestaties door data-analyse en technische aanpassingen. We zorgen ervoor dat je installatie altijd op maximale efficiëntie draait."
    }
  ];

  // Get platform-specific title classes
  const getTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing - reduced to prevent overflow
      return "text-3xl md:text-4xl font-bold text-gray-900 mb-6";
    } else {
      // macOS classes (original)
      return "text-4xl md:text-5xl font-bold text-gray-900 mb-6";
    }
  };

  // Get platform-specific card title classes
  const getCardTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-lg font-semibold text-gray-900 mb-4";
    } else {
      // macOS classes (original)
      return "text-xl font-semibold text-gray-900 mb-4";
    }
  };

  // Get platform-specific card description classes
  const getCardDescriptionClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-gray-600 text-xs leading-relaxed mb-8";
    } else {
      // macOS classes (original)
      return "text-gray-600 text-sm leading-relaxed mb-8";
    }
  };

  // Wait for OS detection before rendering to prevent hydration mismatch
  if (!isDetected) {
    return (
      <div className="bg-white min-h-screen py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header with default styling */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Strategy
            </h1>
          </div>
        </div>

        {/* Cards - Full Width Overflow with default styling */}
        <div className="mb-12">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              paddingLeft: 'max(1rem, calc((100vw - 1280px) / 2 + 1rem))',
              paddingRight: '1rem'
            }}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                div::-webkit-scrollbar {
                  display: none;
                }
              `
            }} />
            {services.map((service, index) => (
              <div key={index} className="rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 w-80 flex-shrink-0" style={{backgroundColor: '#F5F5F5'}}>
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-blue-600">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="flex justify-start">
                  <ArrowRight className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* CTA Button */}
            <button className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 mb-6 md:mb-0">
              Kom meer te weten
            </button>

            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <button 
                onClick={scrollLeft}
                className="w-12 h-12 bg-custom-blue rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-custom-pink" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-12 h-12 bg-custom-blue rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-custom-pink" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={getTitleClasses()}>
            Our Strategy
          </h1>
        </div>
      </div>

      {/* Cards - Full Width Overflow */}
      <div className="mb-12">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingLeft: 'max(1rem, calc((100vw - 1280px) / 2 + 1rem))',
            paddingRight: '1rem'
          }}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              div::-webkit-scrollbar {
                display: none;
              }
            `
          }} />
          {services.map((service, index) => (
            <div key={index} className="rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 w-80 bg-gray-50 flex-shrink-0" >
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-blue-600">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className={getCardTitleClasses()}>
                {service.title}
              </h3>
              
              <p className={getCardDescriptionClasses()}>
                {service.description}
              </p>

              {/* Arrow */}
              <div className="flex justify-start">
                <ArrowRight className="w-5 h-5 text-gray-900" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* CTA Button */}
          <button className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 mb-6 md:mb-0">
            Read More
          </button>

          {/* Navigation Arrows */}
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 bg-custom-blue rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-custom-pink" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 bg-custom-blue rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 text-custom-pink" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategy;