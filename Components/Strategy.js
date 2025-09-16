import React, { useRef } from 'react';
import { ArrowRight, Zap, Palette, Wrench, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

const Strategy = () => {
  const scrollRef = useRef(null);

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
      title: "Strategy",
      description: "We analyze your startup's vision and market position to create a comprehensive digital strategy. Every startup is unique, and we craft tailored approaches that align with your goals and industry dynamics."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Design",
      description: "User-centered design that transforms your ideas into intuitive digital experiences. Our design process focuses on creating solutions that are both visually stunning and functionally excellent."
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Development",
      description: "Expert developers bring your vision to life using cutting-edge technologies. We build scalable, secure, and high-performance applications that grow with your startup."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Launch",
      description: "Strategic market entry with comprehensive launch support. We ensure your product reaches the right audience with maximum impact through targeted marketing and growth strategies."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Scale",
      description: "Post-launch optimization and scaling strategies to accelerate your growth. We monitor performance, gather user feedback, and implement improvements to maximize your success."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Support",
      description: "Ongoing technical support and strategic guidance as your startup evolves. We're your long-term partner, ensuring your digital solutions continue to drive business growth."
    }
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16 mb-16">
          {/* Title */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-tight">
              Our Strategy
            </h1>
          </div>

          {/* Description */}
          <div className="lg:w-1/2 lg:-mt-2 xl:-mt-1">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Our proven methodology takes your startup from concept to market through strategic planning and expert execution
            </p>
          </div>
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
            Learn More
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