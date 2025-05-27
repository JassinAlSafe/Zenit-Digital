/**
 * Device Detection and Handling Utilities
 * Comprehensive iOS detection, orientation handling, and touch optimizations
 */

// Device detection utilities
export const deviceDetection = {
    // Detect iOS devices
    isIOS: (): boolean => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },

    // Detect specific iOS devices
    isIPad: (): boolean => {
        return /iPad/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    },

    isIPhone: (): boolean => {
        return /iPhone/.test(navigator.userAgent);
    },

    isIPod: (): boolean => {
        return /iPod/.test(navigator.userAgent);
    },

    // Detect Safari browser
    isSafari: (): boolean => {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },

    // Detect if device supports touch
    isTouchDevice: (): boolean => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Get iOS version
    getIOSVersion: (): number | null => {
        const match = navigator.userAgent.match(/OS (\d+)/);
        return match ? parseInt(match[1], 10) : null;
    },

    // Check if device is in landscape mode
    isLandscape: (): boolean => {
        return window.innerWidth > window.innerHeight;
    },

    // Get device pixel ratio
    getPixelRatio: (): number => {
        return window.devicePixelRatio || 1;
    }
};

// Viewport and orientation utilities
export const viewportUtils = {
    // Get actual viewport height (accounting for iOS Safari address bar)
    getActualViewportHeight: (): number => {
        if (deviceDetection.isIOS()) {
            return window.innerHeight;
        }
        return window.innerHeight;
    },

    // Set CSS custom properties for viewport
    setViewportProperties: (): void => {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
        document.documentElement.style.setProperty('--vh-actual', `${vh}px`);
    },

    // Handle orientation changes with proper delay
    handleOrientationChange: (callback?: () => void): void => {
        window.addEventListener('orientationchange', () => {
            // Delay to allow for proper viewport adjustment
            setTimeout(() => {
                viewportUtils.setViewportProperties();

                // Recalculate layouts if needed
                if (callback) {
                    callback();
                }

                // Dispatch custom event for components to listen to
                window.dispatchEvent(new CustomEvent('viewport-updated', {
                    detail: {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        isLandscape: deviceDetection.isLandscape()
                    }
                }));
            }, 100);
        });

        // Also handle resize events for better coverage
        window.addEventListener('resize', () => {
            setTimeout(() => {
                viewportUtils.setViewportProperties();
                if (callback) callback();
            }, 50);
        });
    }
};

// Touch event utilities
export const touchUtils = {
    // Enhanced touch event handler with passive support
    addTouchListener: (
        element: HTMLElement,
        eventType: 'touchstart' | 'touchmove' | 'touchend',
        handler: (event: TouchEvent) => void,
        options: { passive?: boolean; capture?: boolean } = { passive: true }
    ): void => {
        element.addEventListener(eventType, handler, options);
    },

    // Remove touch listeners
    removeTouchListener: (
        element: HTMLElement,
        eventType: 'touchstart' | 'touchmove' | 'touchend',
        handler: (event: TouchEvent) => void
    ): void => {
        element.removeEventListener(eventType, handler);
    },

    // Handle touch with proper iOS optimizations
    handleTouch: (event: TouchEvent): void => {
        // Prevent default behavior that might cause issues
        if (deviceDetection.isIOS()) {
            // Allow scrolling but prevent unwanted zoom/pan
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }
    },

    // Get touch coordinates
    getTouchCoordinates: (event: TouchEvent): { x: number; y: number } | null => {
        if (event.touches && event.touches.length > 0) {
            return {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
        return null;
    },

    // Debounced touch handler to prevent excessive calls
    createDebouncedTouchHandler: (
        handler: (event: TouchEvent) => void,
        delay: number = 16
    ): (event: TouchEvent) => void => {
        let timeoutId: NodeJS.Timeout;

        return (event: TouchEvent) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => handler(event), delay);
        };
    }
};

// iOS-specific fixes and optimizations
export const iosOptimizations = {
    // Apply iOS-specific body classes for CSS targeting
    applyIOSClasses: (): void => {
        const body = document.body;

        if (deviceDetection.isIOS()) {
            body.classList.add('ios-device');

            if (deviceDetection.isIPad()) {
                body.classList.add('ipad-device');
            }

            if (deviceDetection.isIPhone()) {
                body.classList.add('iphone-device');
            }

            if (deviceDetection.isSafari()) {
                body.classList.add('safari-browser');
            }
        }

        if (deviceDetection.isTouchDevice()) {
            body.classList.add('touch-device');
        }
    },

    // Fix iOS Safari viewport issues
    fixIOSViewport: (): void => {
        if (deviceDetection.isIOS()) {
            // Set initial viewport properties
            viewportUtils.setViewportProperties();

            // Handle the iOS Safari address bar resize
            const resizeHandler = () => {
                viewportUtils.setViewportProperties();
            };

            window.addEventListener('resize', resizeHandler);
            window.addEventListener('orientationchange', () => {
                setTimeout(resizeHandler, 100);
            });
        }
    },

    // Prevent iOS bounce scrolling on specific elements
    preventBounceScrolling: (elements: NodeListOf<Element> | HTMLElement[]): void => {
        elements.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.style.overscrollBehavior = 'none';
                element.style.webkitOverflowScrolling = 'touch';
            }
        });
    },

    // Initialize all iOS optimizations
    init: (): void => {
        if (typeof window === 'undefined') return;

        iosOptimizations.applyIOSClasses();
        iosOptimizations.fixIOSViewport();

        // Handle orientation changes
        viewportUtils.handleOrientationChange();

        // Prevent zoom on double tap for iOS
        if (deviceDetection.isIOS()) {
            document.addEventListener('touchstart', (event) => {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            }, { passive: false });
        }

        console.log('iOS optimizations initialized', {
            isIOS: deviceDetection.isIOS(),
            isIPad: deviceDetection.isIPad(),
            isIPhone: deviceDetection.isIPhone(),
            isSafari: deviceDetection.isSafari(),
            isTouchDevice: deviceDetection.isTouchDevice(),
            iosVersion: deviceDetection.getIOSVersion()
        });
    }
};

// Main initialization function
export const initializeDeviceUtils = (): void => {
    if (typeof window !== 'undefined') {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', iosOptimizations.init);
        } else {
            iosOptimizations.init();
        }
    }
};

// Performance and testing utilities for iPad-specific issues
export const performanceUtils = {
    // Monitor performance for mobile devices
    isLowPerformanceDevice: (): boolean => {
        // Check for low-end devices based on hardware concurrency and memory
        const cores = navigator.hardwareConcurrency || 1;
        const memory = (navigator as any).deviceMemory || 1;

        return cores <= 2 || memory <= 2;
    },

    // Optimize animations based on device performance
    getOptimalAnimationSettings: (): { duration: number; easing: string; reduce: boolean } => {
        const isLowPerf = performanceUtils.isLowPerformanceDevice();
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        return {
            duration: isLowPerf ? 200 : prefersReduced ? 100 : 400,
            easing: isLowPerf ? 'ease' : 'ease-out',
            reduce: isLowPerf || prefersReduced
        };
    },

    // Monitor frame rate
    measureFrameRate: (callback: (fps: number) => void): () => void => {
        let frames = 0;
        let lastTime = performance.now();
        let animationId: number;

        const measureFrame = (currentTime: number) => {
            frames++;

            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                callback(fps);
                frames = 0;
                lastTime = currentTime;
            }

            animationId = requestAnimationFrame(measureFrame);
        };

        animationId = requestAnimationFrame(measureFrame);

        // Return cleanup function
        return () => cancelAnimationFrame(animationId);
    }
};

// Testing utilities for iPad compatibility
export const testingUtils = {
    // Test hover state replacement
    testHoverStates: (): void => {
        const hoverElements = document.querySelectorAll(':hover');
        if (hoverElements.length > 0 && deviceDetection.isTouchDevice()) {
            console.warn('⚠️ Hover states detected on touch device:', hoverElements);
        }
    },

    // Test form input sizes
    testFormInputs: (): void => {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach((input) => {
            const styles = window.getComputedStyle(input);
            const fontSize = parseFloat(styles.fontSize);
            const minHeight = parseFloat(styles.minHeight);

            if (fontSize < 16) {
                console.warn('⚠️ Input font size too small (will cause zoom):', input, `${fontSize}px`);
            }

            if (minHeight < 44) {
                console.warn('⚠️ Input touch target too small:', input, `${minHeight}px`);
            }
        });
    },

    // Test fixed positioning issues
    testFixedPositioning: (): void => {
        const fixedElements = document.querySelectorAll('[style*="position: fixed"], .fixed');
        fixedElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < 0 || rect.left < 0) {
                console.warn('⚠️ Fixed element may have positioning issues:', element);
            }
        });
    },

    // Test safe area support
    testSafeAreas: (): void => {
        const supportsEnv = CSS.supports('padding-top', 'env(safe-area-inset-top)');

        if (deviceDetection.isIOS() && !supportsEnv) {
            console.warn('⚠️ Safe area insets not supported on this device');
        } else if (supportsEnv) {
            console.log('✅ Safe area insets supported');
        }
    },

    // Run all compatibility tests
    runCompatibilityTests: (): void => {
        if (process.env.NODE_ENV === 'development') {
            console.log('🧪 Running iPad compatibility tests...');

            testingUtils.testHoverStates();
            testingUtils.testFormInputs();
            testingUtils.testFixedPositioning();
            testingUtils.testSafeAreas();

            // Test performance
            const stopFpsMonitor = performanceUtils.measureFrameRate((fps) => {
                if (fps < 30) {
                    console.warn(`⚠️ Low frame rate detected: ${fps}fps`);
                } else {
                    console.log(`✅ Frame rate: ${fps}fps`);
                }
            });

            // Stop monitoring after 5 seconds
            setTimeout(stopFpsMonitor, 5000);

            console.log('🧪 Compatibility tests completed');
        }
    }
};

// Enhanced iOS optimizations with new features
export const enhancedIosOptimizations = {
    ...iosOptimizations,

    // Apply performance optimizations based on device capabilities
    applyPerformanceOptimizations: (): void => {
        const settings = performanceUtils.getOptimalAnimationSettings();

        // Set CSS custom properties for animation settings
        document.documentElement.style.setProperty('--animation-duration', `${settings.duration}ms`);
        document.documentElement.style.setProperty('--animation-easing', settings.easing);

        if (settings.reduce) {
            document.body.classList.add('reduced-motion');
        }

        // Apply low performance optimizations if needed
        if (performanceUtils.isLowPerformanceDevice()) {
            document.body.classList.add('low-performance-device');
            console.log('🔧 Applied low performance optimizations');
        }
    },

    // Enhanced safe area handling
    applySafeAreaClasses: (): void => {
        if (CSS.supports('padding-top', 'env(safe-area-inset-top)')) {
            document.body.classList.add('supports-safe-area');

            // Add classes for different safe area configurations
            const testDiv = document.createElement('div');
            testDiv.style.paddingTop = 'env(safe-area-inset-top)';
            document.body.appendChild(testDiv);

            const computedPadding = window.getComputedStyle(testDiv).paddingTop;
            if (parseFloat(computedPadding) > 0) {
                document.body.classList.add('has-safe-area-insets');
            }

            document.body.removeChild(testDiv);
        }
    },

    // Initialize enhanced optimizations
    initEnhanced: (): void => {
        if (typeof window === 'undefined') return;

        // Run original optimizations
        iosOptimizations.init();

        // Apply performance optimizations
        enhancedIosOptimizations.applyPerformanceOptimizations();

        // Apply safe area classes
        enhancedIosOptimizations.applySafeAreaClasses();

        // Run compatibility tests in development
        testingUtils.runCompatibilityTests();

        console.log('🚀 Enhanced iOS optimizations initialized');
    }
};

// Export for easy access
export default {
    deviceDetection,
    viewportUtils,
    touchUtils,
    iosOptimizations,
    enhancedIosOptimizations,
    performanceUtils,
    testingUtils,
    initializeDeviceUtils
}; 