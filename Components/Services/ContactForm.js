import { forwardRef, useState } from "react";
import AnimatedSendButton from "./AnimatedSendButton";

const ContactForm = forwardRef(({ onSubmit, isSubmitting, submitStatus }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    budget: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const services = [
    'Data Engineering & AI',
    'Product Design',
    'Full-Stack Development',
    'Consulting',
    'Other'
  ];

  const budgetRanges = [
    '$10k - $25k',
    '$25k - $50k',
    '$50k - $100k',
    '$100k+',
    'Let\'s discuss'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      message: true
    });

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      // Reset form on success
      if (submitStatus === 'success') {
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
          budget: ''
        });
        setTouched({});
      }
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 bg-gray-800/60 border rounded-xl text-white placeholder-gray-400 
    focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm
    ${errors[fieldName] && touched[fieldName] 
      ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500' 
      : 'border-gray-600/50 focus:ring-blue-500/20 focus:border-blue-500/50 hover:border-gray-500/70'
    }
  `;

  return (
    <div ref={ref} className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-8 border border-gray-700/30 backdrop-blur-sm">
        <div className="mb-6">
          <h3 className="text-2xl font-light text-white mb-2">Send us a message</h3>
          <p className="text-gray-400">We&apos;ll get back to you within 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your full name"
                className={inputClasses('name')}
                required
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="your@email.com"
                className={inputClasses('email')}
                required
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Company and Service row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company name"
                className={inputClasses('company')}
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                Service Interest
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={inputClasses('service')}
              >
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service} value={service} className="bg-gray-800">
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
              Project Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={inputClasses('budget')}
            >
              <option value="">Select budget range</option>
              {budgetRanges.map(range => (
                <option key={range} value={range} className="bg-gray-800">
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Tell us about your project, goals, and timeline..."
              className={inputClasses('message')}
              required
            />
            {errors.message && touched.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          {/* Submit Status */}
          {submitStatus && (
            <div className={`p-4 rounded-xl border ${
              submitStatus === 'success' 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {submitStatus === 'success' 
                ? '✓ Message sent successfully! We\'ll get back to you soon.' 
                : '✗ Failed to send message. Please try again.'
              }
            </div>
          )}

          {/* Animated Send Button */}
          <AnimatedSendButton 
            isSubmitting={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;