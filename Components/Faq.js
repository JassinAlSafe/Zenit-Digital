import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Who is Aria for?",
      answer: "Aria is designed for B2B marketplaces and businesses looking to streamline their payment processes and improve customer experience."
    },
    {
      question: "What countries does Aria support for buyers and suppliers?",
      answer: "Aria supports a wide range of countries for both buyers and suppliers, with coverage across North America, Europe, and Asia Pacific regions."
    },
    {
      question: "Can Aria be white-labeled?",
      answer: "Yes, Aria offers white-label solutions that allow you to customize the platform with your own branding and maintain a consistent user experience."
    },
    {
      question: "How long does integration typically take?",
      answer: "Most integrations are completed within 2-4 weeks, depending on your existing infrastructure and customization requirements. Our technical team provides full support throughout the process."
    },
    {
      question: "What payment methods does Aria support?",
      answer: "Aria supports multiple payment methods including bank transfers, credit cards, digital wallets, and specialized B2B payment solutions like net terms and purchase orders."
    },

  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      {/* Title */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-medium text-custom-blue leading-tight">
          Got Questions?         
        </h1>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-4 items-start">
        {/* Left side - Image */}
        <div className="relative max-w-lg">          
          <img 
            src="/group.webp"
            className="w-full aspect-square object-cover rounded-xl shadow-lg"
          />
          
          {/* Overlay card */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-custom-pink text-2xl font-bold">€€€</div>
                  <div>
                    <div className="text-gray-900 font-semibold">MRR Calculator for B2B</div>
                    <div className="text-gray-600 text-sm">marketplaces</div>
                  </div>
                </div>
                <div className="bg-custom-pink rounded-full p-2">
                  <svg className="w-5 h-5 text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between text-left py-4   transition-colors"
              >
                <span className="text-xl font-normal text-custom-blue pr-8    ">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 rounded-full p-1 ">
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-custom-pink" />
                  ) : (
                    <Plus className="w-5 h-5 text-custom-pink font-bold" />
                  )}
                </div>
              </button>
              
              {openFaq === index && (
                <div className="mt-2 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}