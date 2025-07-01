import { forwardRef, useState } from "react";

const ProcessStep = forwardRef(({ step, isExpanded, onToggle }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        process-card bg-white rounded-2xl border border-gray-200 overflow-hidden 
        transition-all duration-500 ease-out cursor-pointer group
        ${isExpanded ? 'shadow-xl border-orange-200' : 'hover:shadow-lg hover:border-gray-300'}
      `}
      onClick={onToggle}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
              {step.icon}
            </div>
            
            {/* Title */}
            <h3 className={`text-2xl md:text-3xl font-semibold text-gray-900 transition-colors duration-300 ${
              isExpanded ? 'text-orange-600' : 'group-hover:text-orange-600'
            }`}>
              {step.title}
            </h3>
          </div>

          {/* Large Number */}
          <div className={`text-6xl md:text-7xl font-bold transition-colors duration-300 ${
            isExpanded ? 'text-orange-500' : 'text-orange-400 group-hover:text-orange-500'
          }`}>
            {step.number}
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          {step.shortDescription}
        </p>

        {/* Expandable Content */}
        <div className={`transition-all duration-500 ease-out ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-6">
              {step.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Duration */}
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-orange-800">Duration</h4>
                </div>
                <p className="text-orange-700 font-medium">{step.duration}</p>
              </div>

              {/* Deliverables */}
              <div className="md:col-span-2 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800">Key Deliverables</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((deliverable, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200"
                    >
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="flex items-center justify-center mt-4 pt-4">
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isExpanded 
              ? 'border-orange-300 bg-orange-50' 
              : 'border-gray-300 group-hover:border-orange-300 group-hover:bg-orange-50'
          }`}>
            <svg 
              className={`w-4 h-4 transition-all duration-300 ${
                isExpanded 
                  ? 'text-orange-600 rotate-180' 
                  : 'text-gray-500 group-hover:text-orange-600'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

ProcessStep.displayName = 'ProcessStep';

const ProcessSteps = forwardRef(({ processSteps, processRefs }, ref) => {
  const [expandedStep, setExpandedStep] = useState(-1); // All cards closed by default

  const handleStepToggle = (index) => {
    setExpandedStep(expandedStep === index ? -1 : index);
  };

  return (
    <div className="process-section px-4 md:px-8 max-w-7xl mx-auto pb-32" ref={ref}>
      {/* Header - Dark Section */}
      <div className="bg-gray-900 rounded-3xl p-8 md:p-12 mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
          How magic happens: 5 steps to turn your idea into reality.
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Our proven methodology transforms complex ideas into successful digital products. 
          Each step is carefully designed to ensure transparency, collaboration, and exceptional results.
        </p>
      </div>

      {/* Process Cards - Light Section */}
      <div className="space-y-4">
        {processSteps.map((step, index) => (
          <ProcessStep
            key={index}
            ref={el => processRefs.current[index] = el}
            step={step}
            isExpanded={expandedStep === index}
            onToggle={() => handleStepToggle(index)}
          />
        ))}
      </div>

    </div>
  );
});

ProcessSteps.displayName = 'ProcessSteps';

export default ProcessSteps;