import { forwardRef } from "react";

const Hero = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="relative pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="mb-16">
        {/* Large title */}
        <div className="mb-8">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white leading-tight">
            Our services
          </h1>
        </div>

        {/* Description below title */}
        <div>
          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl">
            We are your trusted ally, reliably crafting cutting-edge services
            for a brighter future.
          </p>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
