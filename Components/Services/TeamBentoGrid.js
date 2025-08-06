import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";

const TeamMemberSkeleton = ({ size }) => (
  <div
    className={`
      bg-gray-800 rounded-2xl overflow-hidden relative animate-pulse
      ${size === 'large' ? 'col-span-2 row-span-2 h-64 md:h-80' : ''}
      ${size === 'medium' ? 'col-span-1 row-span-2 h-48 md:h-64' : ''}
      ${size === 'small' ? 'col-span-1 row-span-1 h-32 md:h-48' : ''}
    `}
  >
    <div className="w-full h-full bg-gray-700"></div>
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="h-4 bg-gray-600 rounded mb-2"></div>
      <div className="h-3 bg-gray-600 rounded w-2/3"></div>
    </div>
  </div>
);

const TeamMemberCard = forwardRef(({ member, index }, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getCardHeight = (size) => {
    switch(size) {
      case 'large': return 'h-64 md:h-80';
      case 'medium': return 'h-48 md:h-64';
      case 'small': return 'h-32 md:h-48';
      default: return 'h-48';
    }
  };

  const getGridSpan = (size) => {
    switch(size) {
      case 'large': return 'col-span-2 row-span-2';
      case 'medium': return 'col-span-1 row-span-2';
      case 'small': return 'col-span-1 row-span-1';
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <div
      ref={ref}
      className={`
        team-card bg-gray-800 rounded-2xl overflow-hidden relative group cursor-pointer 
        hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 ease-out
        ${getGridSpan(member.size)} ${getCardHeight(member.size)}
      `}
      style={{ 
        transform: `translateY(${index % 2 === 0 ? '0px' : '10px'})`,
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">{member.name}</p>
        </div>
      )}

      {/* Image */}
      {!imageError && (
        <>
          <Image
            src={member.image}
            alt={member.name}
            fill
            className={`
              object-cover group-hover:scale-110 transition-transform duration-700 ease-out
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
            priority={index < 2}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15"></div>
        </>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2">
          <div className="w-8 h-0.5 bg-white/60 rounded-full"></div>
        </div>
        
        <h4 className="text-white font-semibold text-sm md:text-base mb-1 group-hover:text-blue-300 transition-colors duration-300">
          {member.name}
        </h4>
        <p className="text-gray-300 text-xs md:text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          {member.role}
        </p>
        
        {/* Additional info on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 mt-2">
          <div className="flex items-center text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Available for collaboration
          </div>
        </div>
      </div>

      {/* Card number indicator */}
      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">{String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

const TeamBentoGrid = forwardRef(({ teamMembers, teamRefs }, ref) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="team-section px-4 md:px-8 max-w-7xl mx-auto pb-24" ref={ref}>
      <div className="mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-4"></div>
          </div>
          <div className="text-gray-400 text-sm md:text-base">
            {teamMembers.length} talented individuals
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
          Talented individuals passionate about creating exceptional digital experiences. 
          Our diverse team brings together expertise from design, development, and strategy.
        </p>
      </div>

      {/* Grid container with better responsive behavior */}
      <div className="relative">
        {isLoading ? (
          // Loading skeletons
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
            {teamMembers.map((member, index) => (
              <TeamMemberSkeleton key={index} size={member.size} />
            ))}
          </div>
        ) : (
          // Actual team grid
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 auto-rows-fr">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                ref={el => teamRefs.current[index] = el}
                member={member}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Team stats overlay */}
        <div className="absolute -bottom-12 left-0 right-0 flex justify-center opacity-60">
          <div className="flex items-center space-x-8 text-gray-400 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              {teamMembers.filter(m => m.size === 'large').length} Lead Members
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              {teamMembers.filter(m => m.size === 'medium').length} Senior Members
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              {teamMembers.filter(m => m.size === 'small').length} Team Members
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TeamBentoGrid.displayName = 'TeamBentoGrid';

export default TeamBentoGrid;