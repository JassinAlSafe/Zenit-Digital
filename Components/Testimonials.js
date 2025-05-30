import React, { useState, useRef, useEffect } from "react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const slideWidth = useRef(0);
  const slideGap = 15;

  // Helper function to get video sources with fallbacks
  const getVideoSources = (baseName) => {
    const sources = [];

    // Add WebM source if available
    const webmSources = {
      airplane: "/airplane.webm",
      flower: "/Flower_02.webm",
      globe: "/globe.webm",
    };

    if (webmSources[baseName]) {
      sources.push({ src: webmSources[baseName], type: "video/webm" });
    }

    // Add MP4 fallback
    sources.push({ src: `/${baseName}.mp4`, type: "video/mp4" });

    return sources;
  };

  const testimonials = [
    {
      id: 2,
      title: "Designed for our workflow",
      text: "Customizing the payment infrastructure to match our marketplace setup was incredibly easy. ",
      videoBaseName: "airplane",
    },
    {
      id: 3,
      title: "Free from any risk",
      text: "Enjoy 100% protection against payment defaults. We take on all credit and dispute risks.",
      videoBaseName: "flower",
    },
    {
      id: 4,
      title: "Boosted our revenue",
      text: "Keeping transactions on our platform—from sourcing to invoicing—has significantly increased.",
      videoBaseName: "globe",
    },
  ];

  useEffect(() => {
    // Calculate slide width based on container
    const calculateWidth = () => {
      const containerWidth =
        window.innerWidth > 768 ? 780 : window.innerWidth - 48;
      // Show 2 cards at a time on desktop
      const slidesPerView = window.innerWidth > 768 ? 2 : 1;
      slideWidth.current = containerWidth / slidesPerView - slideGap;
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);

    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  useEffect(() => {
    setTranslateX(-(activeIndex * (slideWidth.current + slideGap)));
  }, [activeIndex, slideWidth]);

  const handleNext = () => {
    if (activeIndex < testimonials.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <section
      className="overflow-x-clip"
      data-bg="white"
      data-text="var(--custom-green)"
      data-button-bg="white"
      data-button-text="var(--custom-green)"
      data-nav-text="var(--custom-lightGreen)"
    >
      <div className="pt-16 md:pt-16 pb-16 md:pb-16 space-y-12 md:space-y-24">
        <div className="container mx-auto flex w-full flex-col gap-6 gap-y-10 lg:flex-row xl:gap-[94px]">
          {/* Left Side - Fixed Content */}
          <div className="relative z-[6] flex w-full flex-1 flex-col justify-between gap-y-6 h-[600px] md-large:max-w-[283px] bg-white">
            <div className="mt-8">
              <h2 className="text-4xl font-medium leading-tight">
                Upgrade your product
              </h2>
              <div className="mt-6 text-lg opacity-70 font-extraLight">
                See what our clients have to say about their experience working
                with us and the results they've achieved.
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 mb-8">
              <button
                type="button"
                aria-label="Previous"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full disabled:opacity-30 rotate-180"
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "rotate(316.518397deg)",
                      background:
                        "linear-gradient(0deg, rgb(95, 243, 211) 20.5%, rgb(218, 165, 249) 50.56%, rgb(219, 165, 244) 75.81%)",
                    }}
                  >
                    <div className="absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                </div>
                <div className="absolute inset-[2px] rounded-full bg-white"></div>
                <svg
                  className="relative translate-x-[1px]"
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.44095 7.0007L0.364258 1.92401L1.81474 0.473541L8.34188 7.0007L1.81474 13.5278L0.364258 12.0773L5.44095 7.0007Z"
                    fill="#072929"
                  ></path>
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next"
                onClick={handleNext}
                disabled={activeIndex === testimonials.length - 1}
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full disabled:opacity-30"
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "rotate(316.518397deg)",
                      background:
                        "linear-gradient(0deg, rgb(95, 243, 211) 20.5%, rgb(218, 165, 249) 50.56%, rgb(219, 165, 244) 75.81%)",
                    }}
                  >
                    <div className="absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                </div>
                <div className="absolute inset-[2px] rounded-full bg-white"></div>
                <svg
                  className="relative translate-x-[1px]"
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.44095 7.0007L0.364258 1.92401L1.81474 0.473541L8.34188 7.0007L1.81474 13.5278L0.364258 12.0773L5.44095 7.0007Z"
                    fill="#072929"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Testimonial Cards */}
          <div className="relative z-[5] w-full max-w-[780px] flex-1 xl:max-w-[903px]">
            <div className="h-full min-h-[600px]">
              <div className="!overflow-visible h-full">
                <div
                  className="flex transition-all duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(${translateX}px)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className="!h-full flex-shrink-0"
                      style={{
                        width: slideWidth.current,
                        marginRight: slideGap,
                      }}
                    >
                      {/* Main card with light background */}
                      <div
                        className="flex h-full flex-col overflow-hidden rounded-lg"
                        style={{ backgroundColor: "#F6FAF3" }}
                      >
                        {/* Title and text at the top */}
                        <div className="px-8 pt-8">
                          <h3 className="text-2xl font-medium text-black">
                            {testimonial.title}
                          </h3>
                          <div className="mt-3 text-base text-black opacity-80">
                            {testimonial.text}
                          </div>
                        </div>

                        {/* Video section in custom-green container */}
                        <div className="flex-grow flex items-center justify-center p-8">
                          <div
                            className="w-ful h-full rounded-md overflow-hidden flex items-center justify-center p-4"
                            style={{ backgroundColor: "var(--custom-green)" }}
                          >
                            <video
                              className="w-full h-full aspect-video object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                            >
                              {getVideoSources(testimonial.videoBaseName).map(
                                (source, index) => (
                                  <source
                                    key={index}
                                    src={source.src}
                                    type={source.type}
                                  />
                                )
                              )}
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-[-100%] top-0 z-[5] hidden w-[calc(100%_+_100vw)] translate-x-[-100vw] scale-x-[1.05] bg-[linear-gradient(to_right,_rgba(255,_255,_255,_0.85)_97%,_rgba(255,_255,_255,_0)_100%)] md-large:block pointer-events-none"></div>
          </div>

          {/* Left border */}
          <div className="absolute bottom-0 left-[-1px] top-0 z-[7] border-l"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
