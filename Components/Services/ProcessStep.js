import { forwardRef, useState, useEffect } from "react";

const ProcessStep = forwardRef(({ step, isExpanded, onToggle, stepIndex, isAutoPlaying }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    setAnimationDelay(stepIndex * 100);
  }, [stepIndex]);

  return (
    <div
      ref={ref}
      className={`
        process-step relative transition-all duration-500 cursor-pointer group
        rounded-2xl overflow-hidden mb-4 last:mb-0 transform
        ${isExpanded 
          ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-2 border-blue-500/50 scale-[1.02]" 
          : "bg-gray-800/70 hover:bg-gray-800 hover:shadow-xl border border-gray-700/50 hover:border-blue-500/30 hover:scale-[1.01]"
        }
        ${isAutoPlaying && isExpanded ? "ring-2 ring-blue-400/50 ring-offset-2 ring-offset-gray-900" : ""}
      `}
      style={{ 
        animationDelay: `${animationDelay}ms`,
        transform: isExpanded ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)'
      }}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl transition-opacity duration-300 ${isHovered && !isExpanded ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="relative p-6 md:p-8">
        {/* Main content */}
        <div>
          <div className="w-full">
            {/* Step number badge and title */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all duration-300 relative
                ${isExpanded 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110 shadow-lg shadow-blue-500/30" 
                  : "bg-gray-700 text-gray-300 group-hover:bg-blue-600 group-hover:text-white"
                }
              `}>
                {step.number}
                {isExpanded && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30 animate-ping" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`
                  font-light transition-all duration-500 
                  ${isExpanded
                    ? "text-2xl md:text-3xl text-white"
                    : "text-xl md:text-2xl text-gray-200 group-hover:text-white"
                  }
                `}>
                  {step.title}
                </h3>
                
                {/* Estimated reading time */}
                <div className={`
                  flex items-center gap-2 mt-1 transition-all duration-300
                  ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-60"}
                `}>
                  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-gray-400">
                    {step.readingTime || '2 min read'}
                  </span>
                </div>
              </div>
              
              {/* Expand/collapse icon with enhanced animation */}
              <div className={`
                ml-auto flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                ${isExpanded 
                  ? "bg-blue-600/20 text-blue-400 rotate-180 scale-110" 
                  : "bg-gray-700 text-gray-400 group-hover:bg-blue-600/20 group-hover:text-blue-400 group-hover:scale-105"
                }
              `}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Always visible description */}
            <p className={`
              leading-relaxed transition-all duration-500 mb-4
              ${isExpanded 
                ? "text-base text-gray-300" 
                : "text-gray-400 group-hover:text-gray-300"
              }
            `}>
              {step.shortDescription}
            </p>

            {/* Expanded content */}
            <div className={`
              transition-all duration-700 ease-out overflow-hidden
              ${isExpanded
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0"
              }
            `}>
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-300 leading-relaxed mb-6">
                  {step.fullDescription}
                </p>

                {/* Enhanced details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Duration badge */}
                  <div className="flex items-center gap-3 bg-gray-800/80 px-4 py-3 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600/20 rounded-full">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Duration</p>
                      <p className="text-sm text-gray-400">{step.duration}</p>
                    </div>
                  </div>

                  {/* Deliverables badge */}
                  {step.deliverables && step.deliverables.length > 0 && (
                    <div className="flex items-center gap-3 bg-gray-800/80 px-4 py-3 rounded-lg border border-gray-600/30">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-600/20 rounded-full">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Deliverables</p>
                        <p className="text-sm text-gray-400">
                          {step.deliverables.length} item{step.deliverables.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Deliverables list */}
                {step.deliverables && step.deliverables.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-white mb-3">What you&apos;ll receive:</h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active step indicator */}
      {isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
      )}
    </div>
  );
});

ProcessStep.displayName = "ProcessStep";

export default ProcessStep;