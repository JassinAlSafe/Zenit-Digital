import { forwardRef } from "react";

const ProcessStepsFooter = forwardRef(({ 
  processSteps, 
  expandedStep, 
  completedSteps, 
  handleStepToggle 
}, ref) => {
  return (
    <div className="mt-20 text-center" ref={ref}>
      <div className="relative bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-2xl p-8 border border-gray-600/40 shadow-xl backdrop-blur-sm overflow-hidden">
        {/* Footer decorative elements */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border border-purple-400/30 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border border-blue-400/30 rounded-full"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-light text-white mb-3">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Each step is carefully designed to build upon the previous one, ensuring a smooth and successful project delivery.
          </p>
        
          {/* Enhanced navigation controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => handleStepToggle(Math.max(0, expandedStep - 1))}
              disabled={expandedStep === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Step indicators with enhanced design */}
            <div className="flex items-center gap-2">
              {processSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleStepToggle(index)}
                  className={`
                    relative group transition-all duration-300 cursor-pointer
                    ${completedSteps.has(index)
                      ? "w-8 h-8" 
                      : expandedStep === index
                      ? "w-10 h-10"
                      : "w-6 h-6 hover:w-7 hover:h-7"
                    }
                  `}
                  title={`Step ${index + 1}: ${step.title}`}
                >
                  <div className={`
                    w-full h-full rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300
                    ${completedSteps.has(index)
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : expandedStep === index
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300"
                    }
                  `}>
                    {index + 1}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {step.title}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleStepToggle(Math.min(processSteps.length - 1, expandedStep + 1))}
              disabled={expandedStep === processSteps.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm text-gray-400 space-y-1">
            <div>Click any step to explore our detailed process</div>
            <div className="text-xs">
              {completedSteps.size} of {processSteps.length} steps explored • 
              Estimated total time: {processSteps.length * 2} minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProcessStepsFooter.displayName = "ProcessStepsFooter";

export default ProcessStepsFooter;