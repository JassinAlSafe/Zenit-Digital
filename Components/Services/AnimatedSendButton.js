import { forwardRef, useState } from "react";

const AnimatedSendButton = forwardRef(({ isSubmitting, disabled, type = "button", onClick }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-full group overflow-hidden rounded-xl transition-all duration-500 ease-out
        ${disabled 
          ? 'cursor-not-allowed opacity-70' 
          : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
        }
      `}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300" />
      
      {/* Hover effect overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500
        ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
      `} />
      
      {/* Animated border glow */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-500
        ${isHovered 
          ? 'shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50' 
          : 'shadow-md'
        }
      `} />
      
      {/* Shimmer effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
        transition-all duration-700 ease-out
        ${isHovered 
          ? 'translate-x-full' 
          : '-translate-x-full'
        }
      `} style={{ 
        width: '200%', 
        transform: isHovered ? 'translateX(50%)' : 'translateX(-100%)',
        transition: 'transform 0.7s ease-out'
      }} />

      {/* Content container */}
      <div className="relative px-8 py-4 flex items-center justify-center gap-3">
        {/* Icon container */}
        <div className={`
          transition-all duration-300 ease-out
          ${isSubmitting 
            ? 'scale-110 animate-spin' 
            : isHovered 
            ? 'scale-110 translate-x-1' 
            : 'scale-100'
          }
        `}>
          {isSubmitting ? (
            // Loading spinner
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            // Send icon with hover animation
            <svg 
              className={`w-5 h-5 text-white transition-all duration-300 ${
                isHovered ? 'translate-x-1' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          )}
        </div>

        {/* Text with typewriter effect */}
        <span className={`
          font-medium text-white transition-all duration-300 text-lg
          ${isHovered ? 'translate-x-1' : ''}
        `}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              Sending
              <span className="flex">
                <span className="animate-pulse" style={{ animationDelay: '0ms' }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: '200ms' }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: '400ms' }}>.</span>
              </span>
            </span>
          ) : (
            'Send Message'
          )}
        </span>

        {/* Trailing particles effect */}
        <div className={`
          absolute right-4 flex gap-1 transition-all duration-500
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
          <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
        </div>
      </div>

      {/* Ripple effect on click */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-200
        ${isSubmitting ? 'bg-white/10 animate-pulse' : ''}
      `} />
    </button>
  );
});

AnimatedSendButton.displayName = "AnimatedSendButton";

export default AnimatedSendButton;