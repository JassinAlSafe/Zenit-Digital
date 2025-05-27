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

    // Detect Windows devices
    isWindows: (): boolean => {
        return /Windows/.test(navigator.userAgent) || /Win32|Win64|WOW64/.test(navigator.userAgent);
    },

    // Detect macOS devices
    isMacOS: (): boolean => {
        return /Mac OS X/.test(navigator.userAgent) && !/iPhone|iPad|iPod/.test(navigator.userAgent);
    },

    // Detect Android devices
    isAndroid: (): boolean => {
        return /Android/.test(navigator.userAgent);
    },

    // Detect Safari browser
    isSafari: (): boolean => {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },

    // Detect Chrome browser
    isChrome: (): boolean => {
        return /Chrome/.test(navigator.userAgent) && !/Edge|OPR/.test(navigator.userAgent);
    },

    // Detect Firefox browser
    isFirefox: (): boolean => {
        return /Firefox/.test(navigator.userAgent);
    },

    // Detect Edge browser (legacy and Chromium-based)
    isEdge: (): boolean => {
        return /Edge|Edg/.test(navigator.userAgent);
    },

    // Detect Internet Explorer
    isIE: (): boolean => {
        return /Trident|MSIE/.test(navigator.userAgent);
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

    // Get Windows version
    getWindowsVersion: (): string | null => {
        const match = navigator.userAgent.match(/Windows NT (\d+\.\d+)/);
        if (!match) return null;

        const version = parseFloat(match[1]);
        if (version >= 10.0) return '10+';
        if (version >= 6.3) return '8.1';
        if (version >= 6.2) return '8';
        if (version >= 6.1) return '7';
        return 'Legacy';
    },

    // Check if device is in landscape mode
    isLandscape: (): boolean => {
        return window.innerWidth > window.innerHeight;
    },

    // Get device pixel ratio
    getPixelRatio: (): number => {
        return window.devicePixelRatio || 1;
    },

    // Get comprehensive browser info
    getBrowserInfo: (): {
        name: string;
        platform: string;
        supportsWebM: boolean;
        supportsMP4: boolean;
        preferredFormats: string[];
    } => {
        const ua = navigator.userAgent;
        let browserName = 'Unknown';
        let platform = 'Unknown';

        // Detect browser
        if (deviceDetection.isChrome()) browserName = 'Chrome';
        else if (deviceDetection.isFirefox()) browserName = 'Firefox';
        else if (deviceDetection.isEdge()) browserName = 'Edge';
        else if (deviceDetection.isSafari()) browserName = 'Safari';
        else if (deviceDetection.isIE()) browserName = 'Internet Explorer';

        // Detect platform
        if (deviceDetection.isWindows()) platform = 'Windows';
        else if (deviceDetection.isMacOS()) platform = 'macOS';
        else if (deviceDetection.isIOS()) platform = 'iOS';
        else if (deviceDetection.isAndroid()) platform = 'Android';

        // Determine codec support
        const video = document.createElement('video');
        const supportsWebM = video.canPlayType('video/webm; codecs="vp9,opus"') !== '';
        const supportsMP4 = video.canPlayType('video/mp4; codecs="avc1.42E01E,mp4a.40.2"') !== '';

        // Determine preferred formats based on browser and platform
        let preferredFormats = ['mp4']; // Default to MP4 for maximum compatibility

        if (platform === 'Windows') {
            if (browserName === 'Chrome' || browserName === 'Edge') {
                preferredFormats = supportsWebM ? ['mp4', 'webm'] : ['mp4'];
            } else if (browserName === 'Firefox') {
                preferredFormats = ['mp4', 'webm'];
            } else {
                preferredFormats = ['mp4']; // IE, legacy browsers
            }
        } else if (platform === 'macOS' || platform === 'iOS') {
            if (browserName === 'Safari') {
                preferredFormats = ['mp4']; // Safari prefers MP4
            } else {
                preferredFormats = supportsWebM ? ['mp4', 'webm'] : ['mp4'];
            }
        } else {
            // Android, Linux, others
            preferredFormats = supportsWebM ? ['webm', 'mp4'] : ['mp4'];
        }

        return {
            name: browserName,
            platform,
            supportsWebM,
            supportsMP4,
            preferredFormats
        };
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
    // Apply platform-specific body classes for CSS targeting
    applyPlatformClasses: (): void => {
        const body = document.body;
        const browserInfo = deviceDetection.getBrowserInfo();

        // Platform classes
        if (deviceDetection.isIOS()) {
            body.classList.add('ios-device');

            if (deviceDetection.isIPad()) {
                body.classList.add('ipad-device');
            }

            if (deviceDetection.isIPhone()) {
                body.classList.add('iphone-device');
            }
        }

        if (deviceDetection.isWindows()) {
            body.classList.add('windows-device');
            const winVersion = deviceDetection.getWindowsVersion();
            if (winVersion) {
                body.classList.add(`windows-${winVersion.toLowerCase().replace('+', '-plus')}`);
            }
        }

        if (deviceDetection.isMacOS()) {
            body.classList.add('macos-device');
        }

        if (deviceDetection.isAndroid()) {
            body.classList.add('android-device');
        }

        // Browser classes
        body.classList.add(`browser-${browserInfo.name.toLowerCase().replace(' ', '-')}`);

        // Browser-specific classes
        if (deviceDetection.isSafari()) {
            body.classList.add('safari-browser');
        }

        if (deviceDetection.isChrome()) {
            body.classList.add('chrome-browser');
        }

        if (deviceDetection.isFirefox()) {
            body.classList.add('firefox-browser');
        }

        if (deviceDetection.isEdge()) {
            body.classList.add('edge-browser');
        }

        if (deviceDetection.isIE()) {
            body.classList.add('ie-browser');
        }

        // Video codec support classes
        if (browserInfo.supportsWebM) {
            body.classList.add('supports-webm');
        }

        if (browserInfo.supportsMP4) {
            body.classList.add('supports-mp4');
        }

        if (deviceDetection.isTouchDevice()) {
            body.classList.add('touch-device');
        }
    },

    // Apply iOS-specific body classes for CSS targeting (deprecated - use applyPlatformClasses)
    applyIOSClasses: (): void => {
        console.warn('applyIOSClasses is deprecated. Use applyPlatformClasses instead.');
        iosOptimizations.applyPlatformClasses();
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
                // Use type assertion for webkit-specific property
                (element.style as any).webkitOverflowScrolling = 'touch';
            }
        });
    },

    // Initialize all platform optimizations
    init: (): void => {
        if (typeof window === 'undefined') return;

        iosOptimizations.applyPlatformClasses();
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

        // Windows-specific optimizations
        if (deviceDetection.isWindows()) {
            // Improve text rendering on Windows
            document.body.style.textRendering = 'optimizeLegibility';
            (document.body.style as any).fontSmoothing = 'antialiased';
            (document.body.style as any).webkitFontSmoothing = 'antialiased';
        }

        const browserInfo = deviceDetection.getBrowserInfo();
        console.log('Platform optimizations initialized', {
            platform: browserInfo.platform,
            browser: browserInfo.name,
            isIOS: deviceDetection.isIOS(),
            isWindows: deviceDetection.isWindows(),
            isMacOS: deviceDetection.isMacOS(),
            isAndroid: deviceDetection.isAndroid(),
            supportsWebM: browserInfo.supportsWebM,
            supportsMP4: browserInfo.supportsMP4,
            preferredFormats: browserInfo.preferredFormats,
            isTouchDevice: deviceDetection.isTouchDevice(),
            iosVersion: deviceDetection.getIOSVersion(),
            windowsVersion: deviceDetection.getWindowsVersion()
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

    // Test video codec support (Windows-specific)
    testVideoCodecSupport: (): void => {
        const video = document.createElement('video');
        const browserInfo = deviceDetection.getBrowserInfo();

        console.log('🎬 Video Codec Support Test');
        console.log('Platform:', browserInfo.platform);
        console.log('Browser:', browserInfo.name);

        const codecs = {
            'MP4 H.264': 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
            'MP4 H.265': 'video/mp4; codecs="hev1.1.6.L93.90"',
            'WebM VP8': 'video/webm; codecs="vp8,vorbis"',
            'WebM VP9': 'video/webm; codecs="vp9,opus"',
            'WebM AV1': 'video/webm; codecs="av01.0.05M.08"',
            'OGG Theora': 'video/ogg; codecs="theora,vorbis"'
        };

        Object.entries(codecs).forEach(([name, mimeType]) => {
            const support = video.canPlayType(mimeType);
            const status = support === 'probably' ? '✅ Probably' :
                support === 'maybe' ? '⚠️ Maybe' : '❌ No';
            console.log(`${status} ${name}: ${mimeType}`);
        });

        console.log('Preferred formats:', browserInfo.preferredFormats);
    },

    // Test video file accessibility
    testVideoFileAccess: async (videoSources: string[]): Promise<void> => {
        console.log('🔍 Testing Video File Access');

        for (const src of videoSources) {
            try {
                const response = await fetch(src, { method: 'HEAD' });
                if (response.ok) {
                    console.log(`✅ ${src} - Accessible (${response.status})`);
                    console.log(`   Content-Type: ${response.headers.get('Content-Type')}`);
                    console.log(`   Content-Length: ${response.headers.get('Content-Length')}`);
                    console.log(`   Accept-Ranges: ${response.headers.get('Accept-Ranges')}`);
                } else {
                    console.warn(`⚠️ ${src} - HTTP ${response.status}`);
                }
            } catch (error) {
                console.error(`❌ ${src} - Failed to fetch:`, error);
            }
        }
    },

    // Test video element creation and loading
    testVideoElementCreation: (videoSrc: string): Promise<{ success: boolean; error?: any }> => {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.muted = true;
            video.playsInline = true;
            video.preload = 'metadata';

            const timeout = setTimeout(() => {
                resolve({ success: false, error: 'Timeout' });
            }, 10000);

            video.addEventListener('loadedmetadata', () => {
                clearTimeout(timeout);
                console.log('✅ Video metadata loaded successfully');
                console.log(`   Duration: ${video.duration}s`);
                console.log(`   Dimensions: ${video.videoWidth}x${video.videoHeight}`);
                resolve({ success: true });
            });

            video.addEventListener('error', (e) => {
                clearTimeout(timeout);
                console.error('❌ Video failed to load:', e);
                resolve({ success: false, error: e });
            });

            video.src = videoSrc;
        });
    },

    // Comprehensive Windows video diagnostics
    runWindowsVideoDiagnostics: async (testVideoSrc?: string): Promise<void> => {
        if (!deviceDetection.isWindows()) {
            console.log('ℹ️ Not a Windows device, skipping Windows-specific diagnostics');
            return;
        }

        console.log('🖥️ Running Windows Video Diagnostics...');

        const browserInfo = deviceDetection.getBrowserInfo();
        const windowsVersion = deviceDetection.getWindowsVersion();

        console.log('System Information:');
        console.log(`   Windows Version: ${windowsVersion}`);
        console.log(`   Browser: ${browserInfo.name}`);
        console.log(`   User Agent: ${navigator.userAgent}`);

        // Test codec support
        testingUtils.testVideoCodecSupport();

        // Test hardware acceleration
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        console.log('Hardware Acceleration:', gl ? '✅ Available' : '❌ Not Available');

        if (gl) {
            const webglContext = gl as WebGLRenderingContext;
            const debugInfo = webglContext.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                console.log(`   GPU: ${webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}`);
            }
        }

        // Test video file if provided
        if (testVideoSrc) {
            console.log('\nTesting video file loading...');
            await testingUtils.testVideoFileAccess([testVideoSrc]);
            const result = await testingUtils.testVideoElementCreation(testVideoSrc);

            if (!result.success) {
                console.error('Video loading failed. Possible solutions:');
                console.log('1. Check if video file exists and is accessible');
                console.log('2. Verify video codec is supported on this browser');
                console.log('3. Check browser security settings');
                console.log('4. Try a different video format (MP4 is most compatible)');
            }
        }

        console.log('🖥️ Windows Video Diagnostics Complete');
    },

    // Run all compatibility tests
    runCompatibilityTests: (): void => {
        if (process.env.NODE_ENV === 'development') {
            console.log('🧪 Running compatibility tests...');

            testingUtils.testHoverStates();
            testingUtils.testFormInputs();
            testingUtils.testFixedPositioning();
            testingUtils.testSafeAreas();
            testingUtils.testVideoCodecSupport();

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