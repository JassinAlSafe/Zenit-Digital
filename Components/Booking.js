"use client";
import React, { useState, useEffect } from "react";
// Import framer-motion for animations
import { motion } from "framer-motion";
import { useOS } from "../utils/OsProvider"; // Import the OS hook

const BookingForm = () => {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  
  const { isWindows, isDetected } = useOS(); // Use the OS hook

  // Set animation visible on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    serviceRequired: "",
    comments: "",
  });

  // Loading and success states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error for this field when user types
    if (formErrors[id]) {
      setFormErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!phoneRegex.test(formData.mobile)) {
      errors.mobile = "Please enter a valid mobile number";
    }
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.serviceRequired || !formData.serviceRequired.trim()) {
      errors.serviceRequired = "Service selection is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          company: "",
          serviceRequired: "",
          comments: "",
        });
        setFormErrors({});
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form after successful submission
  const handleReset = () => {
    setSubmitSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      company: "",
      serviceRequired: "",
      comments: "",
    });
  };

  // Get platform-specific mobile title classes
  const getMobileTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-3xl font-sm text-black mb-8 pt-8";
    } else {
      // macOS classes (original)
      return "text-4xl font-sm text-black mb-8 pt-8";
    }
  };

  // Get platform-specific mobile feature text classes
  const getMobileFeatureTextClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-black text-base font-medium";
    } else {
      // macOS classes (original)
      return "text-black text-lg font-medium";
    }
  };

  // Get platform-specific desktop title classes
  const getDesktopTitleClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing - reduced to prevent overflow
      return "text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-md";
    } else {
      // macOS classes (original)
      return "text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-md";
    }
  };

  // Get platform-specific desktop feature text classes
  const getDesktopFeatureTextClasses = () => {
    if (isWindows) {
      // Windows-specific text sizing
      return "text-xs md:text-sm lg:text-base font-sm";
    } else {
      // macOS classes (original)
      return "text-sm md:text-base lg:text-lg font-sm";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  // Wait for OS detection before rendering to prevent hydration mismatch
  if (!isDetected) {
    return (
      <section
        className="w-full min-h-screen overflow-x-hidden"
        data-bg="white"
        data-text="black"
        data-button-bg="var(--custom-blue)"
        data-button-text="var(--custom-pink)"
        data-navbar-text="black"
      >
        {/* Default mobile layout */}
        <div className="w-full py-12 px-6 md:hidden bg-[#ffffff]">
          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-sm text-black mb-8 pt-8">
              Book a<br />
              <span>Digital consultation</span>
            </h1>
            {/* Rest of default mobile content... */}
          </motion.div>
        </div>

        {/* Default desktop layout */}
        <div className="flex flex-col md:flex-row w-full min-h-screen md:h-screen">
          <motion.div
            className="w-full md:w-1/2 p-4 md:p-8 lg:p-12 flex-col justify-center bg-white text-black hidden md:flex"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 md:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-md">
                Book your
                <br />
                digital <span>consultation</span>
              </h1>
            </div>
            {/* Rest of default desktop content... */}
          </motion.div>
          {/* Form area remains the same for default... */}
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full min-h-screen overflow-x-hidden"
      data-bg="white"
      data-text="black"
      data-button-bg="var(--custom-blue)"
      data-button-text="var(--custom-pink)"
      data-navbar-text="black"
    >
      {/* Full-width purple background for mobile */}
      <div className="w-full py-12 px-6 md:hidden bg-[#ffffff]">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={getMobileTitleClasses()}>
            Book a<br />
            <span>Digital consultation</span>
          </h1>

          <motion.div
            className="space-y-6 text-left mt-12"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-custom-blue mr-4 mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <p className={getMobileFeatureTextClasses()}>
                Transform your digital presence with our expert team
              </p>
            </motion.div>

            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-custom-blue mr-4 mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </div>
              <p className={getMobileFeatureTextClasses()}>
                Custom web design and development solutions
              </p>
            </motion.div>

            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-custom-blue mr-4 mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <p className={getMobileFeatureTextClasses()}>
                Digital marketing that delivers measurable results
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main desktop layout */}
      <div className="flex flex-col md:flex-row w-full min-h-screen md:h-screen">
        {/* Left content area - hidden on mobile */}
        <motion.div
          className="w-full md:w-1/2 p-4 md:p-8 lg:p-12 flex-col justify-center bg-white text-black hidden md:flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 md:mb-8">
            <h1 className={getDesktopTitleClasses()}>
              Book your
              <br />
              digital <span>consultation</span>
            </h1>
          </div>

          {/* Benefits list - only visible on desktop */}
          <motion.div
            className="space-y-3 md:space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="w-8 h-8 md:w-8 md:h-8 rounded-full  flex items-center justify-center text-black mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 md:h-4 md:w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div>
                <p className={getDesktopFeatureTextClasses()}>
                  Transform your digital presence with our expert team
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="w-8 h-8 md:w-8 md:h-8 rounded-full  flex items-center justify-center text-black mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 md:h-4 md:w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </div>
              <div>
                <p className={getDesktopFeatureTextClasses()}>
                  Custom web design and development solutions
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full  flex items-center justify-center text-black mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 md:h-4 md:w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <div>
                <p className={getDesktopFeatureTextClasses()}>
                  Digital marketing that delivers measurable results
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right form area */}
        <div className="w-full md:w-1/2 bg-[#A494F3] md:h-screen">
          <div className="w-full h-full relative overflow-hidden">
            {/* Abstract geometric shapes - visible on mobile and desktop */}
            <motion.div
              className="absolute w-36 md:w-48 h-36 md:h-48 bg-purple-300 rotate-45 -top-20 -right-20 opacity-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 0.5 : 0,
                scale: isVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
            ></motion.div>
            <motion.div
              className="absolute w-36 md:w-48 h-36 md:h-48 bg-purple-300 -rotate-12 bottom-40 -left-20 opacity-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 0.5 : 0,
                scale: isVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.7, delay: 0.4 }}
            ></motion.div>
            <motion.div
              className="absolute w-60 md:w-72 h-60 md:h-72 bg-purple-300 rotate-12 -bottom-40 -right-20 opacity-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 0.5 : 0,
                scale: isVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.7, delay: 0.6 }}
            ></motion.div>

            {/* Form container */}
            <div className="relative w-full md:h-full flex items-center justify-center p-4 md:px-6 md:py-4 mt-8">
              <motion.div
                className="bg-white p-6 md:p-7 lg:p-9 w-full max-w-md md:max-w-lg rounded-lg shadow-lg overflow-y-auto mx-auto my-10 md:my-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {submitSuccess ? (
                  <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl text-custom-blue font-bold mb-2">
                      Thank You!
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Your consultation request has been submitted successfully.
                      Our digital team will get back to you shortly.
                    </p>
                    <motion.button
                      onClick={handleReset}
                      className="bg-custom-blue text-custom-pink py-2 px-6 rounded hover:bg-gray-800 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Another Consultation
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                  >
                    <motion.h2
                      className="text-xl md:text-2xl font-bold mb-5 text-black"
                      variants={itemVariants}
                    >
                      {/* Book Your Digital Consultation */}
                    </motion.h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {submitError && (
                        <div
                          className="p-3 bg-red-100 text-red-700 rounded mb-4"
                          role="alert"
                        >
                          <p>{submitError}</p>
                        </div>
                      )}

                      {/* Responsive grid - stacked on mobile, side-by-side on larger screens */}
                      <motion.div
                        className="space-y-5 mb-7"
                        variants={itemVariants}
                      >
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm md:text-base font-medium mb-1.5 text-black"
                          >
                            First Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full p-2.5 border rounded text-black ${
                              formErrors.firstName
                                ? "border-red-500"
                                : "border-gray-400"
                            } bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                            required
                            aria-invalid={!!formErrors.firstName}
                            aria-describedby={
                              formErrors.firstName
                                ? "firstName-error"
                                : undefined
                            }
                            placeholder="Enter your first name"
                          />
                          {formErrors.firstName && (
                            <p
                              id="firstName-error"
                              className="mt-1 text-red-500 text-xs"
                            >
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm md:text-base font-medium mb-1.5 text-black"
                          >
                            Last Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full p-2.5 border rounded text-black ${
                              formErrors.lastName
                                ? "border-red-500"
                                : "border-gray-400"
                            } bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                            required
                            aria-invalid={!!formErrors.lastName}
                            aria-describedby={
                              formErrors.lastName ? "lastName-error" : undefined
                            }
                            placeholder="Enter your last name"
                          />
                          {formErrors.lastName && (
                            <p
                              id="lastName-error"
                              className="mt-1 text-red-500 text-xs"
                            >
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="email"
                          className="block text-sm md:text-base font-medium mb-1.5 text-black"
                        >
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full p-2.5 border rounded text-black ${
                            formErrors.email
                              ? "border-red-500"
                              : "border-gray-400"
                          } bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                          required
                          aria-invalid={!!formErrors.email}
                          aria-describedby={
                            formErrors.email ? "email-error" : undefined
                          }
                          placeholder="email@example.com"
                        />
                        {formErrors.email && (
                          <p
                            id="email-error"
                            className="mt-1 text-red-500 text-xs"
                          >
                            {formErrors.email}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="mobile"
                          className="block text-sm md:text-base font-medium mb-1.5 text-black"
                        >
                          Mobile<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className={`w-full p-2.5 border rounded text-black ${
                            formErrors.mobile
                              ? "border-red-500"
                              : "border-gray-400"
                          } bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                          required
                          aria-invalid={!!formErrors.mobile}
                          aria-describedby={
                            formErrors.mobile ? "mobile-error" : undefined
                          }
                          placeholder="+1 (234) 567-8910"
                        />
                        {formErrors.mobile && (
                          <p
                            id="mobile-error"
                            className="mt-1 text-red-500 text-xs"
                          >
                            {formErrors.mobile}
                          </p>
                        )}
                      </motion.div>

                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        variants={itemVariants}
                      >
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm md:text-base font-medium mb-1.5 text-black"
                          >
                            Company<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={`w-full p-2.5 border rounded text-black ${
                              formErrors.company
                                ? "border-red-500"
                                : "border-gray-400"
                            } bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                            required
                            aria-invalid={!!formErrors.company}
                            aria-describedby={
                              formErrors.company ? "company-error" : undefined
                            }
                            placeholder="Your company name"
                          />
                          {formErrors.company && (
                            <p
                              id="company-error"
                              className="mt-1 text-red-500 text-xs"
                            >
                              {formErrors.company}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="serviceRequired"
                            className="block text-sm md:text-base font-medium mb-1.5 text-black"
                          >
                            Service Required
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="serviceRequired"
                            value={formData.serviceRequired}
                            onChange={handleChange}
                            className={`w-full p-2.5 border rounded text-black ${
                              formErrors.serviceRequired
                                ? "border-red-500"
                                : "border-gray-400"
                            } bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent appearance-none cursor-pointer bg-no-repeat bg-right bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')] pr-10`}
                            required
                            aria-invalid={!!formErrors.serviceRequired}
                            aria-describedby={
                              formErrors.serviceRequired
                                ? "serviceRequired-error"
                                : undefined
                            }
                          >
                            <option value="">Select a service</option>
                            <option value="web-design">Web Design</option>
                            <option value="web-development">
                              Web Development
                            </option>
                            <option value="ecommerce">
                              E-commerce Solutions
                            </option>
                            <option value="seo">SEO & Content Marketing</option>
                            <option value="branding">
                              Branding & Identity
                            </option>
                            <option value="mobile-app">
                              Mobile App Development
                            </option>
                            <option value="social-media">
                              Social Media Marketing
                            </option>
                            <option value="other">Other</option>
                          </select>
                          {formErrors.serviceRequired && (
                            <p
                              id="serviceRequired-error"
                              className="mt-1 text-red-500 text-xs"
                            >
                              {formErrors.serviceRequired}
                            </p>
                          )}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="comments"
                          className="block text-sm md:text-base font-medium mb-1.5 text-black"
                        >
                          Comments
                        </label>
                        <textarea
                          id="comments"
                          value={formData.comments}
                          onChange={handleChange}
                          rows="3"
                          className="w-full p-2.5 border border-gray-400 rounded text-black bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                          placeholder="Tell us about your project or requirements"
                        ></textarea>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-custom-blue text-custom-pink py-2.5 px-5 rounded hover:bg-gray-800 transition flex justify-center items-center text-base"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Book Your Consultation"
                          )}
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;