import React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const TestHeader = ({ onAnimationStart }) => {
  // Create refs for the video elements and sliding images
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  
  // State for scroll position
  const [scrollY, setScrollY] = useState(0);
  
  // State to detect Windows for platform-specific adjustments
  const [isWindows, setIsWindows] = useState(false);

  // Function to detect Windows
  const detectWindows = () => {
    if (typeof window === "undefined") return false;
    return window.navigator.platform.toLowerCase().includes('win');
  };

  useEffect(() => {
    // Detect Windows for platform-specific styling
    setIsWindows(detectWindows());
  }, []);

  useEffect(() => {
    // Hide everything initially
    gsap.set('.subtext, .cta-button', { autoAlpha: 0 });
    gsap.set([mobileVideoRef.current, desktopVideoRef.current], { autoAlpha: 0, scale: 0.9, x: 30 });
    
    // Hide sliding images initially
    gsap.set([leftImageRef.current, rightImageRef.current], { autoAlpha: 0 });

    // Number of words in the title
    const words = document.querySelectorAll('.word');
    const wordCount = words.length;
    
    // Create a single timeline for all animations
    const tl = gsap.timeline({
      onStart: () => {
        // Notify parent component that animation has started
        if (onAnimationStart && typeof onAnimationStart === 'function') {
          onAnimationStart();
        }
      }
    });
    
    // Animate title words one by one - slowed down
    words.forEach((word, index) => {
      tl.fromTo(word, 
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 
        index * 0.2
      );
      
      // After the last word animation starts, immediately queue up the next elements
      if (index === wordCount - 1) {
        // Add animations for paragraph and button at the same time, immediately after the last word starts
        tl.to(['.subtext', '.cta-button'], { 
          autoAlpha: 1, 
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4");
        
       
        // Add sliding images animation
        tl.to([leftImageRef.current, rightImageRef.current], {
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");
      }
    });
    
    // Handle scroll for sliding images
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onAnimationStart]);

  // Calculate slide distances based on scroll position
  const slideDistance = Math.min(scrollY * 0.3, 200); // Max slide of 200px

  // Get platform-specific title classes
  const getTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing - reduced to prevent overflow
      return "text-4xl 2xl:text-[11rem] lg:text-7xl md:text-5xl font-medium lg:font-medium leading-none mb-6 text-custom-blue";
    } else {
      // macOS classes (original)
      return "text-5xl 2xl:text-[13rem] lg:text-8xl md:text-6xl font-medium lg:font-medium leading-none mb-6 text-custom-blue";
    }
  };

  // Get platform-specific subtitle classes
  const getSubtitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "subtext font-light 2xl:text-xl text-lg mb-8 text-gray-500 max-w-xl mx-auto";
    } else {
      // macOS classes (original)
      return "subtext font-light 2xl:text-2xl text-xl mb-8 text-gray-500 max-w-xl mx-auto";
    }
  };

  return (
    <>
      <style jsx>{`
        .slide-image {
          position: absolute;
          width: 850px;
          height: 750px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          transition: transform 0.1s ease-out;
          z-index: 5;
          opacity: 0.8;
        }

     .slide-image-left {
  top: 80%;
  left: -300px;
  transform: translateY(-90%);
  background-image: url('/image 80.png'); /* Replace with your left image */
}

.slide-image-right {
   top: 80%;
  right: -300px;
  transform: translateY(-90%);
  background-image: url('/image 80-2.png'); /* Replace with your right image */
}
   

        /* Responsive Design for sliding images */
      /* Responsive Design for sliding images */
@media (max-width: 768px) {
  .slide-image {
    width: 400px;  /* Change from 10px to 400px */
    height: 300px; /* Change from 5px to 300px */
  }

  .slide-image-left {
    left: -300px;
    top: 70%;
  }

  .slide-image-right {
    right: -300px;
    top: 70%;
  }
}

@media (max-width: 480px) {
  .slide-image {
    width: 400px;  /* Smaller for very small screens */
    height: 300px;
  }
    .slide-image-left {
    left: -200px;
    top: 70%;
  }

  .slide-image-right {
    right: -200px;
    top: 70%;
  }
}
      `}</style>

      <section
        className="relative h-screen w-full flex items-start justify-center mb-64"
        data-bg="white"
        data-text="var(--custom-blue)"
        data-button-bg="white"
        data-button-text="var(--custom-blue)"
        data-navbar-text="var(--custom-blue)"
        id="/"
      >
        {/* Sliding Images */}
<div 
  ref={leftImageRef}
  className="slide-image slide-image-left"
  style={{
    transform: `translateX(${slideDistance}px) translateY(-50%)`
  }}
/>
<div 
  ref={rightImageRef}
  className="slide-image slide-image-right"
  style={{
    transform: `translateX(-${slideDistance}px) translateY(-50%)`
  }}
/>

        <div className="w-full overflow-hidden flex items-center justify-center flex-col mt-12  ">
          
        <h2 className="text-lg font-semibold hidden lg:flex ">
        <div className="relative flex items-center justify-center md:justify-start mt-20">
        <Link
  href="https://www.google.com/maps/search/?api=1&query=Xtream+E-sport+Arena+Spelhall+Göteborg,+Kyrkvägen+19,+433+33+Partille"
  target="_blank"
  className="flex items-center justify-center w-max rounded-full border bg-neutral-300/20 backdrop-blur-lg px-2 py-1 gap-1 shadow-3xl shadow-background/40 cursor-pointer select-none "
>
  <div className="text-neutral-400 text-xs font-normal pr-1 pl-0 flex items-center justify-center">
    <p className="mr-2">
      <button className="bg-custom-pink text-custom-blue text-xs px-2 py-1 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
      </button>
    </p>
    The Agency for startups
  </div>
</Link>
    </div>
  </h2>

  <div className="container mx-auto px-4 relative">
  <div className="flex flex-col items-center text-center">
              <div className="w-full lg:py-6  2xl:w-full lg:w-3/4 z-10">
              <h1 className={getTitleClasses()}>
                  <span className="word">Together</span> <span className="word">We</span> <br/> <span className="word ">Reach</span> <span className="word">Further</span>
                </h1>
                <p className={getSubtitleClasses()}>
                  Looking to build your next big idea? We craft custom software to help 
                  <span className="font-bold text-gray-700">   startups </span>
                  and businesses grow with style and speed.
                </p>

                <Link href="/booking">
                  <button
                    className="cta-button bg-custom-blue text-custom-pink hover:bg-[#2C2C75] font-normal py-3 px-6 rounded-full inline-flex items-center"
                  >
                    Explore
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </Link>
              </div>

              {/* Video for small screens (below md breakpoint) */}
              <div className="w-full block md:hidden">
                <video
                  ref={mobileVideoRef}
                  className="w-full h-auto object-contain"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/airplane.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video for medium and large screens */}
              {/* <div className="absolute right-0 mt-36 2xl:mt-60 top-24 w-1/2 h-full hidden md:block">
                <div className="relative w-full h-full flex items-center justify-end">
                  <video
                    ref={desktopVideoRef}
                    className="w-full h-auto object-contain 2xl:scale-125"
                    style={{
                       filter:
                        "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(175deg) brightness(0.5) contrast(0.8)",
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/airplane.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestHeader;