import React from 'react';
import image from './../public/image 72.png'; // Adjust the path as necessary

const CtaBanner = ({ 
  title = "Har du fortfarande frågor?",
  subtitle = "Kontakta oss gärna på hello@zenitdigital.se",
  description = "så återkommer vi så fort vi kan",
  primaryButtonText = "Kontakt",
  secondaryButtonText = "Lets Talk",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
  rightImage = image,
  className = ""
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-custom-blue p-8 md:p-12 ${className}`}>
      {/* Background pattern/texture overlay */}
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="flex-1 text-left lg:max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-7xl font-normal text-white mb-12 leading-tight">
            {title}
          </h2>
          
          <div className="text-lg md:text-xl text-blue-100 mb-8 space-y-1">
            <p>{subtitle}</p>
            <p>{description}</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onPrimaryClick}
              className="px-5 py-2 bg-custom-pink hover:bg-blue-600 text-custom-blue font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {primaryButtonText}
            </button>
            
            <button
              onClick={onSecondaryClick}
              className="px-5 py-2 border  border-[#E0FF5E] hover:bg-green-500 text-[#E0FF5E] font-normal rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {secondaryButtonText}
            </button>
          </div>
        </div>
        
        {/* Right image */}
        {rightImage && (
          <div className="flex-shrink-0 lg:max-w-sm">
            <div className="relative">
              {typeof rightImage === 'string' ? (
                <img 
                  src={rightImage} 
                  alt="CTA Banner" 
                  className="w-full h-auto max-w-xs lg:max-w-sm drop-shadow-2xl"
                />
              ) : rightImage.src ? (
                <img 
                  src={rightImage.src} 
                  alt="CTA Banner" 
                  className="w-full h-auto object-contain max-w-xs lg:max-w-sm drop-shadow-2xl"
                />
              ) : (
                <div className="w-full h-auto max-w-xs lg:max-w-sm">
                  {rightImage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
    </div>
  );
};

// Example usage with demo
const App = () => {
  const handlePrimaryClick = () => {
    console.log('Primary button clicked');
  };

  const handleSecondaryClick = () => {
    console.log('Secondary button clicked');
  };

  return (
    <div className="py-32 bg-white">
      <div className="max-w-6xl mx-auto">
        <CtaBanner
          title="Har du fortfarande frågor?"
          subtitle="Kontakta oss gärna på hello@zenitdigital.se"
          description="så återkommer vi så fort vi kan"
          primaryButtonText="Kontakt"
          secondaryButtonText="Lets Talk"
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />
      </div>
    </div>
  );
};

export default App;