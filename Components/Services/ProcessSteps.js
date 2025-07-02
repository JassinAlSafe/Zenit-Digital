import { forwardRef, useState } from "react";
import ProcessStep from "./ProcessStep";
import ProcessStepsHeader from "./ProcessStepsHeader";
import ProcessStepsFooter from "./ProcessStepsFooter";
import { useProcessStepsAutoPlay } from "./useProcessStepsAutoPlay";

const ProcessSteps = forwardRef(({ processSteps, processRefs }, ref) => {
  const [expandedStep, setExpandedStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set([0]));

  const {
    isAutoPlaying,
    autoPlayProgress,
    timeRemaining,
    startAutoPlay,
    stopAutoPlay,
    handleStepToggle
  } = useProcessStepsAutoPlay(processSteps, expandedStep, setExpandedStep, setCompletedSteps);

  const progressPercentage = ((expandedStep + 1) / processSteps.length) * 100;

  return (
    <div
      className="process-section px-4 md:px-8 max-w-7xl mx-auto pb-32"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced container with multiple layers */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-xl"></div>
        
        {/* Main container */}
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/90 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700/50 backdrop-blur-lg overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          
          {/* Corner accents */}
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-blue-500/30 rounded-tr-2xl"></div>
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-purple-500/30 rounded-bl-2xl"></div>
          
          {/* Floating particles */}
          <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-40 left-16 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 right-32 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <ProcessStepsHeader
              isAutoPlaying={isAutoPlaying}
              startAutoPlay={startAutoPlay}
              stopAutoPlay={stopAutoPlay}
              expandedStep={expandedStep}
              processSteps={processSteps}
              progressPercentage={progressPercentage}
              autoPlayProgress={autoPlayProgress}
              timeRemaining={timeRemaining}
            />

            {/* Process steps container */}
            <div className="relative mt-16">
              {/* Clean minimal connection line */}
              <div className="absolute left-6 top-12 bottom-12 w-px bg-gradient-to-b from-blue-500/20 via-purple-500/30 to-blue-500/20"></div>
              
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={index}
                    ref={(el) => (processRefs.current[index] = el)}
                    step={step}
                    stepIndex={index}
                    isExpanded={expandedStep === index}
                    isAutoPlaying={isAutoPlaying}
                    onToggle={() => handleStepToggle(index)}
                  />
                ))}
              </div>
            </div>

            <ProcessStepsFooter
              processSteps={processSteps}
              expandedStep={expandedStep}
              completedSteps={completedSteps}
              handleStepToggle={handleStepToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

ProcessSteps.displayName = "ProcessSteps";

export default ProcessSteps;