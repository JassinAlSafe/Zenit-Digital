/**
 * Browser Compatibility Utilities
 * Handles cross-browser compatibility issues and feature detection
 */

// Browser detection utilities
export const getBrowser = () => {
  if (typeof window === 'undefined') return 'server';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const vendor = window.navigator.vendor?.toLowerCase() || '';
  
  // Check for Chrome (must be before Safari check)
  if (userAgent.includes('chrome') && vendor.includes('google')) {
    return 'chrome';
  }
  
  // Check for Safari
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return 'safari';
  }
  
  // Check for Firefox
  if (userAgent.includes('firefox')) {
    return 'firefox';
  }
  
  // Check for Edge
  if (userAgent.includes('edg')) {
    return 'edge';
  }
  
  // Check for Internet Explorer
  if (userAgent.includes('msie') || userAgent.includes('trident')) {
    return 'ie';
  }
  
  return 'unknown';
};

// Check if browser is Safari (for video format selection)
export const isSafari = () => {
  return getBrowser() === 'safari';
};

// Check if browser is Firefox (for specific CSS fixes)
export const isFirefox = () => {
  return getBrowser() === 'firefox';
};

// Check if browser is IE (for compatibility warnings)
export const isIE = () => {
  return getBrowser() === 'ie';
};

// Get platform (Windows, Mac, Linux, iOS, Android)
export const getPlatform = () => {
  if (typeof window === 'undefined') return 'server';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';
  
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac')) return 'macos';
  if (platform.includes('linux')) return 'linux';
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'android';
  
  return 'unknown';
};

// Check if device supports touch
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

// Get optimal video format based on browser support
export const getVideoFormat = (basePath) => {
  const browser = getBrowser();
  
  // Safari prefers .mov or .mp4
  if (browser === 'safari') {
    return `${basePath}.mov`;
  }
  
  // Modern browsers support WebM
  if (browser === 'chrome' || browser === 'firefox' || browser === 'edge') {
    // Check if WebM is actually supported
    const video = document.createElement('video');
    if (video.canPlayType('video/webm').replace(/no/, '')) {
      return `${basePath}.webm`;
    }
  }
  
  // Fallback to MP4 (universal support)
  return `${basePath}.mp4`;
};

// Apply vendor-prefixed styles for better compatibility
export const setVendorStyle = (element, property, value) => {
  if (!element || !property) return;
  
  const prefixes = ['webkit', 'moz', 'ms', 'o'];
  const capitalizedProperty = property.charAt(0).toUpperCase() + property.slice(1);
  
  // Set standard property
  element.style[property] = value;
  
  // Set vendor-prefixed properties
  prefixes.forEach(prefix => {
    element.style[`${prefix}${capitalizedProperty}`] = value;
  });
};

// Get vendor-prefixed CSS property value
export const getVendorCSSValue = (property, value) => {
  const browser = getBrowser();
  
  // Handle clip-path for Safari
  if (property === 'clipPath' && browser === 'safari') {
    return {
      WebkitClipPath: value,
      clipPath: value
    };
  }
  
  // Handle backdrop-filter for older browsers
  if (property === 'backdropFilter') {
    return {
      WebkitBackdropFilter: value,
      backdropFilter: value
    };
  }
  
  // Handle transform for older browsers
  if (property === 'transform') {
    return {
      WebkitTransform: value,
      MozTransform: value,
      msTransform: value,
      transform: value
    };
  }
  
  // Default: return original property
  return { [property]: value };
};

// Check for CSS feature support
export const supportsCSSFeature = (property, value) => {
  if (typeof window === 'undefined') return false;
  
  // Check using CSS.supports if available
  if (window.CSS && window.CSS.supports) {
    return CSS.supports(property, value);
  }
  
  // Fallback: create element and check computed style
  const element = document.createElement('div');
  element.style[property] = value;
  return element.style[property] !== '';
};

// Apply browser-specific class to body
export const applyBrowserClass = () => {
  if (typeof document === 'undefined') return;
  
  const browser = getBrowser();
  const platform = getPlatform();
  
  // Add browser class
  document.body.classList.add(`browser-${browser}`);
  
  // Add platform class
  document.body.classList.add(`platform-${platform}`);
  
  // Add touch support class
  if (isTouchDevice()) {
    document.body.classList.add('touch-device');
  } else {
    document.body.classList.add('no-touch');
  }
  
  // Add WebP support class
  checkWebPSupport().then(supported => {
    document.body.classList.add(supported ? 'webp' : 'no-webp');
  });
};

// Check WebP image format support
export const checkWebPSupport = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Polyfill for smooth scroll on Safari
export const smoothScrollPolyfill = () => {
  if (!('scrollBehavior' in document.documentElement.style)) {
    // Import smooth scroll polyfill for browsers that don't support it
    import('smoothscroll-polyfill').then(smoothscroll => {
      smoothscroll.polyfill();
    });
  }
};

// Fix for Safari's handling of 100vh
export const fix100vh = () => {
  if (typeof window === 'undefined') return;
  
  // First we get the viewport height and multiply it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Update on resize
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
};

// Initialize all browser compatibility fixes
export const initBrowserCompat = () => {
  if (typeof window === 'undefined') return;
  
  // Apply browser classes
  applyBrowserClass();
  
  // Fix 100vh on mobile browsers
  fix100vh();
  
  // Add smooth scroll polyfill if needed
  smoothScrollPolyfill();
  
  // Warn about IE
  if (isIE()) {
    console.warn('Internet Explorer detected. Some features may not work correctly. Please upgrade to a modern browser.');
  }
};

export default {
  getBrowser,
  isSafari,
  isFirefox,
  isIE,
  getPlatform,
  isTouchDevice,
  getVideoFormat,
  setVendorStyle,
  getVendorCSSValue,
  supportsCSSFeature,
  applyBrowserClass,
  checkWebPSupport,
  smoothScrollPolyfill,
  fix100vh,
  initBrowserCompat
};