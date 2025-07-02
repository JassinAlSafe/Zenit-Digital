import { forwardRef } from "react";

const ContactInfo = forwardRef((props, ref) => {
  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      description: "Send us an email anytime",
      contact: "hello@zenitdigital.se",
      action: "mailto:hello@zenitdigital.se",
      color: "purple"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      contact: "+46 70 123 45 67",
      action: "tel:+46701234567",
      color: "blue"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Us",
      description: "Come say hello at our office",
      contact: "Stockholm, Sweden",
      action: "#",
      color: "green"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: "#",
      color: "blue"
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: "#",
      color: "blue"
    },
    {
      name: "GitHub",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: "#",
      color: "gray"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'purple':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30';
      case 'blue':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30';
      case 'green':
        return 'text-green-400 bg-green-500/20 border-green-500/30 hover:bg-green-500/30';
      case 'gray':
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30 hover:bg-gray-500/30';
      default:
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30';
    }
  };

  return (
    <div ref={ref} className="space-y-8">
      {/* Contact Methods */}
      <div className="space-y-6">
        <div className="mb-8">
          <h3 className="text-2xl font-light text-white mb-2">Get in touch</h3>
          <p className="text-gray-400">Choose your preferred way to reach us</p>
        </div>

        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.action}
            className="group block bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 group-hover:scale-110
                ${getColorClasses(method.color)}
              `}>
                {method.icon}
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-medium text-white mb-1 group-hover:text-gray-100 transition-colors duration-300">
                  {method.title}
                </h4>
                <p className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors duration-300">
                  {method.description}
                </p>
                <p className={`font-medium transition-colors duration-300 ${getColorClasses(method.color).split(' ')[0]}`}>
                  {method.contact}
                </p>
              </div>

              <div className="text-gray-500 group-hover:text-gray-400 transition-all duration-300 group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Social Links */}
      <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-gray-700/30 backdrop-blur-sm">
        <h4 className="text-lg font-medium text-white mb-4">Follow us</h4>
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className={`
                flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 hover:scale-110
                ${getColorClasses(social.color)}
              `}
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <h4 className="text-lg font-medium text-white">Quick Response</h4>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          We typically respond to all inquiries within 2-4 hours during business hours. 
          For urgent matters, please call us directly.
        </p>
      </div>
    </div>
  );
});

ContactInfo.displayName = "ContactInfo";

export default ContactInfo;