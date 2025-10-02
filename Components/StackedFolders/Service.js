import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useOS } from "../../utils/OsProvider"; // Import the OS hook

export default function Service() {
  const { isWindows, isDetected } = useOS(); // Use the OS hook

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const titleLetters = document.querySelectorAll(".services-title-letter");

      // IMPORTANT: Remove all GSAP setup for the section itself
      // This will now be handled by the parent container

      // Animate only the title letters
      if (titleLetters.length > 0) {
        gsap.set(titleLetters, { y: 160 });
        gsap.to(titleLetters, {
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
      }
    }
  }, []);

  // Get platform-specific title classes
  const getTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing - reduced to prevent overflow
      return "section-heading col-span-6 max-w-[18ch] text-6xl lg:text-8xl md:text-8xl 2xl:text-[8.5rem] mt-44 2xl:mt-72 font-bold text-custom-green";
    } else {
      // macOS classes (original)
      return "section-heading col-span-6 max-w-[18ch] text-7xl lg:text-9xl md:text-9xl 2xl:text-[10rem] mt-44 2xl:mt-72 font-bold text-custom-green";
    }
  };

  // Get platform-specific service number classes
  const getServiceNumberClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "col-span-2 text-xl hidden md:block lg:text-4xl md:text-4xl 2xl:text-7xl font-light text-gray-400 ml-10";
    } else {
      // macOS classes (original)
      return "col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10";
    }
  };

  // Get platform-specific service title classes
  const getServiceTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-2xl lg:text-4xl 2xl:text-7xl ml-5 lg:ml-0 md:text-5xl font-bold lg:font-medium text-custom-green";
    } else {
      // macOS classes (original)
      return "text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0 md:text-6xl font-bold lg:font-medium text-custom-green";
    }
  };

  // Get platform-specific description classes
  const getDescriptionClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "max-w-[40ch] ml-5 text-sm lg:text-lg  font-normal leading-relaxed text-custom-green animated-text";
    } else {
      // macOS classes (original)
      return "max-w-[40ch] ml-5 text-sm text-gray-500 lg:text-xl font-normal leading-relaxed text-custom-green animated-text";
    }
  };

  // Get platform-specific feature title classes
  const getFeatureTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-base lg:text-xl font-normal text-custom-green";
    } else {
      // macOS classes (original)
      return "text-lg lg:text-2xl font-normal text-custom-green";
    }
  };

  // Wait for OS detection before rendering to prevent hydration mismatch
  if (!isDetected) {
    return (
      <section
        className="services-section pt-44 bg-white"
        id="services"
        data-bg="white"
        data-text="var(--custom-blue)"
        data-button-bg="var(--custom-blue)"
        data-button-text="var(--custom-pink)"
        data-nav-text="var(--custom-pink)"
      >
        <div className="flex w-full flex-col gap-y-space-lg md:gap-y-space-2xl mt-32 2xl:mt-80">
          {/* Title container with default styling */}
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
          {/* Rest of default content... */}
        </div>
      </section>
    );
  }

  return (
    <section
      className="services-section pt-44 bg-white"
      id="services"
      data-bg="white"
      data-text="var(--custom-blue)"
      data-button-bg="var(--custom-blue)"
      data-button-text="var(--custom-pink)"
      data-nav-text="var(--custom-pink)"
    >
      <div className="flex w-full flex-col gap-y-space-lg md:gap-y-space-2xl mt-32 2xl:mt-80">
        {/* Title container with overflow hidden */}
        <div className="title-container pl-4 md:pl-8 lg:pl-8">
          <div className="overflow-hidden inline-block">
            <h1 className={getTitleClasses()}>
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
            {/* Web Development Card */}
            <div
            className="sticky top-0 border-t border-t-gray-300"
            style={{ top: "calc(20vh + 0em)", marginBottom: "14em" }}
          >
            <div className="flex grid-cols-12 items-center gap-x-space-xs text-left md:grid md:gap-x-fluid">
              <span className={getServiceNumberClasses()}>
                01
              </span>
              <div className="col-span-6 col-start-6 flex flex-col ">
                <div className="flex items-center justify-between py-8">
                  <h3 className={getServiceTitleClasses()}>
                    Web Development
                  </h3>
                  {/* Globe Icon */}
                  <svg className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400 hidden md:block mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </div>
              </div>
              <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                <div className="col-span-7 col-start-6 flex flex-col gap-y-space-sm pt-space-sm">
                  <p className={getDescriptionClasses()}>
                    We offer end-to-end web development services tailored to
                    your business needs. Our focus is on delivering
                    high-performance websites with clean, scalable code and a
                    custom look and feel.
                  </p>

                  <div className=" space-y-0  ml-5 text-sm">
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          01
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          NextJs
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          02
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          CMS Integration
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          03
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          UI/UX Design
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          04
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          SEO
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="sticky top-0 border-t border-t-gray-300 bg-white"
              style={{ top: "calc(20vh + 5.75em)", marginBottom: "11em" }}
            >
              <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left md:grid md:gap-x-fluid">
                <span className={getServiceNumberClasses()}>
                  02
                </span>
                <div className="col-span-6 col-start-6 flex flex-col">
                  <div className="flex items-center justify-between py-8">
                    <h3 className={getServiceTitleClasses()}>
                      Mobile App Development
                    </h3>
                    {/* Phone Icon */}
                    <svg className="w-8 h-8 lg:w-12 lg:h-12 hidden md:block text-gray-400 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
              </div>
              </div>
              <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm">
                  <p className={getDescriptionClasses()}>
                    A powerful mobile app can transform how users experience
                    your brand—right in the palm of their hand. We craft sleek,
                    high-performing apps with custom code and intuitive design,
                    built to engage, retain, and scale with your vision.
                  </p>

                  <div className=" space-y-0  ml-5">
                    <div className="border-t border-gray-300 py-4 lg:py-6 ">
                      <div className="flex items-center ">
                        <span className="text-base text-custom-green font-normal pr-6 ">
                          01
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          React Native & Expo
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          02
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          UI/UX Design
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          03
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          IOS & Android
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="sticky top-0 border-t border-t-gray-300 bg-white mb-[1em] md:mb-[-2em]"
              style={{ top: "calc(20vh + 5.75em)"}}
            >
              <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left md:grid md:gap-x-fluid">
                <span className={getServiceNumberClasses()}>
                  03
                </span>
                <div className="col-span-6 col-start-6 flex flex-col">
                  <div className="flex items-center justify-between py-8">
                    <h3 className={getServiceTitleClasses()}>
                      Fullstack Development
                    </h3>
                    {/* Tools/Wrench Icon */}
                    <svg className="w-8 h-8 lg:w-12 lg:h-12 hidden md:block text-gray-400 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm">
                  <p className={getDescriptionClasses()}>
                    From backend logic to front-end finesse, We build complete
                    digital solutions tailored to your unique challenges. Our
                    full-stack approach combines custom software development
                    with thoughtful design, ensuring seamless performance across
                    every layer of your product.
                  </p>

                  <div className=" space-y-0  ml-5">
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          01
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          NextJS
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4  lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          02
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          Node.Js
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4  lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          03
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          UI/UX Design
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          04
                        </span>
                        <h4 className={getFeatureTitleClasses()}>
                          Supabase
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}