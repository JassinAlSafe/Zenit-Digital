import React, { forwardRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AbstractShapes from "./AbstractShapes";

const ServiceCardSkeleton = () => (
  <div className="bg-[#f5f3f0] rounded-3xl min-h-[500px] flex flex-col animate-pulse">
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    </div>
    <div className="flex-1 bg-gray-200 rounded-b-3xl"></div>
  </div>
);

const ServiceCard = forwardRef(({ service, index }, ref) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500 + index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const handleReadMore = () => {
    router.push(`/services/${service.slug}`);
  };

  if (isLoading) {
    return <ServiceCardSkeleton />;
  }

  // Get appropriate hover description for each service
  const getHoverDescription = (slug) => {
    switch (slug) {
      case "data-engineering-ai":
        return "Transform your data into intelligent insights with cutting-edge AI solutions and machine learning.";
      case "product-design":
        return "Award-winning design for coherent digital services with jaw-dropping user experience.";
      case "full-stack-development":
        return "Build robust, scalable applications from frontend to backend with modern technologies.";
      default:
        return service.shortDescription;
    }
  };

  return (
    <div
      ref={ref}
      className="service-card bg-[#f5f3f0] rounded-3xl transition-all duration-300 ease-out cursor-pointer relative overflow-hidden min-h-[500px] flex flex-col hover:shadow-xl hover:scale-105 hover:bg-white group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleReadMore}
    >
      {/* Title at top left */}
      <div className="p-6 pb-0">
        <h3 className="text-2xl font-medium text-gray-900">{service.title}</h3>
      </div>

      {/* Abstract Shape Container */}
      <div className="relative flex-1 p-8 flex items-center justify-center">
        <div className="w-[180px] h-[180px] relative overflow-hidden transition-transform duration-300 group-hover:scale-110">
          <AbstractShapes shapeType={service.shape} />
        </div>
      </div>

      {/* Hover content at bottom */}
      <div className="p-6 pt-0">
        <div
          className={`space-y-4 transition-all duration-300 ${
            isHovered
              ? "opacity-100 max-h-32"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <p className="text-gray-700 text-sm leading-relaxed">
            {getHoverDescription(service.slug)}
          </p>
          <button
            className="inline-flex items-center text-gray-900 font-medium text-sm hover:text-blue-600 transition-colors duration-200 underline"
            onClick={(e) => {
              e.stopPropagation();
              handleReadMore();
            }}
          >
            Read more
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200/50 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
