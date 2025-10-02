import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const AnimatedButton = () => {
  return (
    <div className="group relative z-50">
      <div className="desktop-button relative overflow-hidden border border-opacity-20 px-6 py-2 font-medium rounded-3xl transition-all duration-500 flex items-center gap-2 bg-transparent">
        {/* Background fill animation */}
        <div className="absolute inset-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-3xl opacity-0 group-hover:opacity-100"></div>
        
        {/* Content */}
        <span className="relative z-10 transition-colors duration-500">
          Let's Talk
        </span>
        
        {/* Arrow icon */}
        <ArrowUpRight 
          className="relative z-10 w-4 h-4 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" 
        />
      </div>
    </div>
  );
};

export default AnimatedButton;