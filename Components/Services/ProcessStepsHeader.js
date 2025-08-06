import { forwardRef } from "react";

const ProcessStepsHeader = forwardRef(({ 
  isAutoPlaying, 
  startAutoPlay, 
  stopAutoPlay, 
  expandedStep, 
  processSteps, 
  progressPercentage, 
  autoPlayProgress, 
  timeRemaining 
}, ref) => {
  return (
    <div className="mb-16 text-center" ref={ref}>
      {/* Animated accent elements */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
      </div>
      
      <div className="inline-flex items-center gap-3 bg-gray-800/80 px-5 py-3 rounded-full mb-8 border border-gray-700/50 shadow-lg backdrop-blur-sm">
        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-blue-400'} transition-colors duration-300`} />
        <span className="text-gray-300 font-medium text-sm">
          {isAutoPlaying ? 'Auto-playing' : 'Step by Step'}
        </span>
      </div>
      
      <div className="relative mb-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
          Our Proven Process
        </h2>
        {/* Glowing text effect */}
        <div className="absolute inset-0 text-4xl md:text-5xl lg:text-6xl font-light text-blue-400/20 mb-6 leading-tight blur-sm">
          Our Proven Process
        </div>
      </div>
      
      <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
        We follow a structured approach to ensure your project delivers exceptional results at every stage.
      </p>

      {/* Enhanced controls */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <button
          onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
          className={`
            flex items-center gap-3 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border shadow-lg backdrop-blur-sm hover:scale-105
            ${isAutoPlaying 
              ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border-red-500/50 hover:shadow-red-500/20' 
              : 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border-green-500/50 hover:shadow-green-500/20'
            }
          `}
        >
          {isAutoPlaying ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Auto-play
            </>
          )}
        </button>

        <div className="text-xs text-gray-400 hidden sm:flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/30">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Use ← → keys to navigate • Spacebar to play/pause
        </div>
      </div>
      
      {/* Enhanced progress bar */}
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400/30 rounded-full">
              <div className="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm font-medium text-gray-300">Progress</span>
          </div>
          <span className="text-sm font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-500/30">
            {expandedStep >= 0 ? expandedStep + 1 : 0} of {processSteps.length}
          </span>
        </div>
        <div className="relative w-full bg-gray-700/50 rounded-full h-4 border border-gray-600/50 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"></div>
          
          {/* Main progress bar */}
          <div 
            className="relative bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${expandedStep >= 0 ? progressPercentage : 0}%` }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
          </div>
          
          {/* Auto-play progress overlay */}
          {isAutoPlaying && (
            <div 
              className="absolute top-0 bg-green-400 h-4 rounded-full transition-all duration-100 ease-linear opacity-70 shadow-lg shadow-green-400/30"
              style={{ 
                width: `${((expandedStep + autoPlayProgress / 100) / processSteps.length) * 100}%`,
                left: `${(expandedStep / processSteps.length) * 100}%`,
                maxWidth: `${100 / processSteps.length}%`
              }}
            />
          )}
        </div>
        {isAutoPlaying && (
          <div className="text-xs text-green-400 mt-3 flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            Next step in {Math.ceil(timeRemaining / 1000)}s
          </div>
        )}
      </div>
    </div>
  );
});

ProcessStepsHeader.displayName = "ProcessStepsHeader";

export default ProcessStepsHeader;