import React, { useLayoutEffect, useRef, useCallback } from "react";

// Lenis mock for the demo (simplified smooth scrolling)
const Lenis = class {
  constructor(options) {
    this.wrapper = options.wrapper;
    this.content = options.content;
    this.duration = options.duration || 1.2;
    this.lerp = options.lerp || 0.1;
    this.callbacks = [];
    this.targetScroll = 0;
    this.currentScroll = 0;
    this.isScrolling = false;
  }

  on(event, callback) {
    if (event === 'scroll') {
      this.callbacks.push(callback);
    }
  }

  raf(time) {
    if (this.wrapper) {
      const target = this.wrapper.scrollTop;
      if (Math.abs(target - this.currentScroll) > 0.1) {
        this.currentScroll += (target - this.currentScroll) * this.lerp;
        this.callbacks.forEach(cb => cb({ scroll: this.currentScroll }));
      }
    }
  }

  destroy() {
    this.callbacks = [];
  }
};

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 500,
  itemScale = 0.05,
  itemStackDistance = 60,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart;
      
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        card.style.transform = transform;
        lastTransformsRef.current.set(i, newTransform);
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner'),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      
      // Remove sticky positioning and let ScrollStack handle it
      card.style.position = 'relative';
      card.style.top = 'auto';
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [setupLenis, updateCardTransforms]);

  return (
    <div
      className={`relative w-full h-screen overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{ 
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
      }}
    >
      <div className="scroll-stack-inner pb-[100vh]">
        {children}
        <div className="w-full h-px" />
      </div>
    </div>
  );
};

export default function ServicesScrollStack() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Title Section - Outside ScrollStack */}
      <section className="pt-44 bg-white">
        <div className="title-container pl-4 md:pl-8 lg:pl-8 mb-20">
          <div className="overflow-hidden inline-block">
            <h1 className="text-7xl lg:text-9xl md:text-9xl 2xl:text-[10rem] font-bold text-gray-900">
              SERVICES
            </h1>
          </div>
        </div>
      </section>

      {/* ScrollStack with Service Cards */}
      <ScrollStack 
        itemDistance={600}
        itemScale={0.05}
        itemStackDistance={80}
        rotationAmount={0}
        blurAmount={0}
        className="w-full"
      >
        {/* Web Development Card */}
        <div className="scroll-stack-card border-t border-t-gray-300 bg-white pt-8 pb-32">
          <div className="flex grid-cols-12 items-center gap-x-4 text-left md:grid">
            <span className="col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10">
              01
            </span>
            <div className="col-span-6 col-start-6 flex flex-col">
              <div className="flex items-center justify-between py-8">
                <h3 className="text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0 md:text-6xl font-bold lg:font-medium text-gray-900">
                  Web Development
                </h3>
                <svg className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400 hidden md:block mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex min-h-[30vh] flex-col pt-4 md:grid md:min-h-[40vh] md:grid-cols-12">
            <div className="col-span-7 col-start-6 flex flex-col gap-y-4 pt-4">
              <p className="max-w-[40ch] ml-5 text-sm lg:text-xl font-normal leading-relaxed text-gray-900">
                We offer end-to-end web development services tailored to your business needs. Our focus is on delivering high-performance websites with clean, scalable code and a custom look and feel.
              </p>
              <div className="space-y-0 ml-5 text-sm">
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">01</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">NextJs</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">02</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">CMS Integration</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">03</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">UI/UX Design</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">04</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">SEO</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Development Card */}
        <div className="scroll-stack-card border-t border-t-gray-300 bg-white pt-8 pb-32">
          <div className="flex grid-cols-12 items-center justify-start gap-x-4 text-left md:grid">
            <span className="col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10">
              02
            </span>
            <div className="col-span-6 col-start-6 flex flex-col">
              <div className="flex items-center justify-between py-8">
                <h3 className="text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0 md:text-6xl font-bold lg:font-medium text-gray-900">
                  Mobile App Development
                </h3>
                <svg className="w-8 h-8 lg:w-12 lg:h-12 hidden md:block text-gray-400 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex min-h-[30vh] flex-col pt-4 md:grid md:min-h-[40vh] md:grid-cols-12">
            <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-4 pt-4">
              <p className="max-w-[40ch] ml-5 text-sm lg:text-xl font-normal leading-relaxed text-gray-900">
                A powerful mobile app can transform how users experience your brand—right in the palm of their hand. We craft sleek, high-performing apps with custom code and intuitive design, built to engage, retain, and scale with your vision.
              </p>
              <div className="space-y-0 ml-5">
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">01</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">React Native & Expo</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">02</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">UI/UX Design</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">03</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">IOS & Android</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullstack Development Card */}
        <div className="scroll-stack-card border-t border-t-gray-300 bg-white pt-8 pb-32">
          <div className="flex grid-cols-12 items-center justify-start gap-x-4 text-left md:grid">
            <span className="col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10">
              03
            </span>
            <div className="col-span-6 col-start-6 flex flex-col">
              <div className="flex items-center justify-between py-8">
                <h3 className="text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0 md:text-6xl font-bold lg:font-medium text-gray-900">
                  Fullstack Development
                </h3>
                <svg className="w-8 h-8 lg:w-12 lg:h-12 hidden md:block text-gray-400 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex min-h-[30vh] flex-col pt-4 md:grid md:min-h-[40vh] md:grid-cols-12">
            <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-4 pt-4">
              <p className="max-w-[40ch] ml-5 text-sm lg:text-xl font-normal leading-relaxed text-gray-900">
                From backend logic to front-end finesse, We build complete digital solutions tailored to your unique challenges. Our full-stack approach combines custom software development with thoughtful design, ensuring seamless performance across every layer of your product.
              </p>
              <div className="space-y-0 ml-5">
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">01</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">NextJS</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">02</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">Node.Js</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">03</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">UI/UX Design</h4>
                  </div>
                </div>
                <div className="border-t border-gray-300 py-4 lg:py-6">
                  <div className="flex items-center">
                    <span className="text-base text-gray-900 font-normal pr-6">04</span>
                    <h4 className="text-lg lg:text-2xl font-normal text-gray-900">Supabase</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollStack>
    </div>
  );
}