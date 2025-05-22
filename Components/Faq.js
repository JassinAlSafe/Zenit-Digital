import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Zap, CheckCircle, User } from 'lucide-react';
import Image from 'next/image';
import people from './../public/image.png';

const Fa = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const faqSections = [
    {
      id: 'digital',
      title: 'Digitala lås, IMD & trygghet',
      content: 'Information om digitala lås, IMD-system och säkerhetslösningar.'
    },
    {
      id: 'administration',
      title: 'Effektivare administration',
      content: 'Verktyg och funktioner för att effektivisera din administration.'
    },
    {
      id: 'experience',
      title: 'Attraktivare upplevelse',
      content: 'Förbättra användarupplevelsen med moderna lösningar.'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left side - Square Image */}
        <div className="flex justify-center">
          <div className="w-96 h-96  rounded-md flex items-center justify-center">
            <Image 
                     src={people}
                     alt="Frame Logo" 
                     width="60" 
                     height="60"
                     className="loading-logo" 
                   />
          </div>
        </div>

        {/* Right side - FAQ Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-2">
              Simplifying your tech
            </h1>
          </div>

          <div className="space-y-4">
            {faqSections.map((section) => (
              <div key={section.id} className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full py-6 flex items-center justify-between text-left hover:text-red-50 transition-colors"
                >
                  <span className="text-xl text-gray-600 font-normal">
                    {section.title}
                  </span>
                  {openSections[section.id] ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {openSections[section.id] && (
                  <div className="pb-6 text-gray-600">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="border-2 border-[#A494F3] hover:bg-[#A494F3] text-[#A494F3] hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
            Kom igång
          </button>
        </div>

      </div>
    </div>
  );
};

export default Fa;