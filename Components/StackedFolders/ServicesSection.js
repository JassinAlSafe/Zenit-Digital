import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../../data/servicesData";

export default function ServicesSection() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const titleLetters = document.querySelectorAll(".services-title-letter");
      const scrollTriggers = [];

      // Animate only the title letters
      if (titleLetters.length > 0) {
        gsap.set(titleLetters, { y: 160 });
        const tl = gsap.to(titleLetters, {
          y: 0,
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
        
        // Store ScrollTrigger reference
        if (tl.scrollTrigger) {
          scrollTriggers.push(tl.scrollTrigger);
        }
      }

      // Cleanup function
      return () => {
        // Kill all ScrollTriggers
        scrollTriggers.forEach(trigger => trigger.kill());
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <section
      className="services-section pt-44 bg-white"
      id="services"
      data-bg="white"
      data-text="var(--custom-green)"
      data-button-bg="var(--custom-green)"
      data-button-text="var(--custom-lightGreen)"
      data-navbar-text="black"
    >
      <div className="flex w-full flex-col gap-y-space-lg md:gap-y-space-2xl mt-32 2xl:mt-80">
        {/* Title container with overflow hidden */}
        <div className="title-container pl-4 md:pl-8 lg:pl-8">
          <div className="overflow-hidden inline-block">
            <h1 className="section-heading col-span-6 max-w-[18ch] text-7xl lg:text-9xl md:text-9xl 2xl:text-[10rem] mt-44 2xl:mt-72 font-bold text-custom-green">
              {Array.from("SERVICES").map((letter, index) => (
                <span
                  key={index}
                  className="services-title-letter inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className="w-full pt-space-lg">
          <div className="mt-12 flex flex-col">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={service.id}
                className="sticky top-0 border-t border-t-gray-800 bg-white"
                style={{ 
                  top: `calc(20vh + ${index * 5.75}em)`, 
                  marginBottom: index === services.slice(0, 3).length - 1 ? "1em" : "14em"
                }}
              >
                <div className="flex grid-cols-12 items-center gap-x-space-xs text-left md:grid md:gap-x-fluid">
                  <span className="col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-6 col-start-6 flex flex-col">
                    <div className="flex items-center justify-between py-8">
                      <h3 className="text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0 md:text-6xl font-bold lg:font-medium text-custom-green">
                        {service.title}
                      </h3>
                      <div className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400 hidden md:block mr-5 text-4xl">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                  <div className="col-span-7 col-start-6 flex flex-col gap-y-space-sm pt-space-sm">
                    <p className="max-w-[40ch] ml-5 text-sm lg:text-xl font-normal leading-relaxed text-custom-green animated-text">
                      {service.fullDescription}
                    </p>

                    <div className="space-y-0 ml-5 text-sm">
                      {service.technologies.slice(0, 4).map((tech, techIndex) => (
                        <div key={techIndex} className="border-t border-gray-800 py-4 lg:py-6">
                          <div className="flex items-center">
                            <span className="text-base text-custom-green font-normal pr-6">
                              {String(techIndex + 1).padStart(2, '0')}
                            </span>
                            <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                              {tech}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}