import { forwardRef, useState } from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactSection = forwardRef((props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call or integrate with your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="contact-section px-4 md:px-8 max-w-7xl mx-auto pb-32"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced container */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
        
        {/* Main container */}
        <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/95 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700/50 backdrop-blur-lg overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          
          {/* Corner accents */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-purple-500/30 rounded-tl-2xl"></div>
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-blue-500/30 rounded-br-2xl"></div>
          
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-16 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              {/* Animated accent elements */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
              </div>
              
              <div className="inline-flex items-center gap-3 bg-gray-800/80 px-5 py-3 rounded-full mb-8 border border-gray-700/50 shadow-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-gray-300 font-medium text-sm">Get In Touch</span>
              </div>
              
              <div className="relative mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                  Let&apos;s Start Your Project
                </h2>
                {/* Glowing text effect */}
                <div className="absolute inset-0 text-4xl md:text-5xl lg:text-6xl font-light text-purple-400/20 mb-6 leading-tight blur-sm">
                  Let&apos;s Start Your Project
                </div>
              </div>
              
              <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                Ready to transform your ideas into reality? Get in touch with our team and let&apos;s discuss how we can bring your vision to life.
              </p>
            </div>

            {/* Contact content grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <ContactForm 
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
              />
              
              {/* Contact Information */}
              <ContactInfo />
            </div>

            {/* Bottom accent */}
            <div className="mt-16 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ContactSection.displayName = "ContactSection";

export default ContactSection;