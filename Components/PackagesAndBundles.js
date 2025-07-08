import React, { useEffect, useRef, useState } from 'react';

const PackagesAndBundles = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  const getAnimationClass = (elementId, baseClass = '') => {
    const isVisible = visibleElements.has(elementId);
    return `${baseClass} transition-all duration-700 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-8 scale-95'
    }`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animate]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (observerRef.current) {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => observerRef.current.observe(el));
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 bg-white">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 bg-white">
        <div 
          data-animate="header-title"
          className={getAnimationClass('header-title')}
        >
          <h1 className="text-4xl lg:text-5xl font-medium text-custom-blue leading-tight">
            Our Packages and Bundles
          </h1>
        </div>
        <div 
          data-animate="header-description"
          className={getAnimationClass('header-description', 'flex items-center')}
          style={{ transitionDelay: '150ms' }}
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            These packages are made tailored to your startup needs from sketching an idea to realising the MVP
          </p>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Left - Mobile App Container */}
        <div 
          data-animate="mobile-container"
          className={getAnimationClass('mobile-container', 'bg-blue-400 rounded-2xl aspect-[4/3] overflow-hidden')}
          style={{ transitionDelay: '300ms' }}
        >
          <img 
            src="/image 55.png" 
            alt="Mobile App Development"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right - Web App Container */}
        <div 
          data-animate="web-container"
          className={getAnimationClass('web-container', 'bg-gray-100 rounded-2xl aspect-[4/3] overflow-hidden')}
          style={{ transitionDelay: '450ms' }}
        >
          <img 
            src="/image 54.png" 
            alt="Web Application Development"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom - Multi-device Container */}
      <div 
        data-animate="multi-device-container"
        className={getAnimationClass('multi-device-container', 'bg-slate-800 rounded-2xl aspect-[16/9] lg:aspect-[2/1] flex justify-end overflow-hidden')}
        style={{ transitionDelay: '600ms' }}
      >
        <img 
          src="/image 60 copy.png" 
          alt="Multi-platform Development"
          className="w-full h-[50%] "
        />
      </div>

      {/* Additional spacing for visual balance */}
      <div className="mt-16">
        <div 
          data-animate="footer-text"
          className={getAnimationClass('footer-text', 'text-center')}
          style={{ transitionDelay: '750ms' }}
        >
          <p className="text-gray-500 text-sm">
            Ready to customize with your images and content
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackagesAndBundles;