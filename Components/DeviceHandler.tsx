"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  deviceDetection,
  viewportUtils,
  touchUtils,
  enhancedIosOptimizations,
  performanceUtils,
  testingUtils,
} from "../utils/deviceUtils";

interface DeviceInfo {
  isIOS: boolean;
  isIPad: boolean;
  isIPhone: boolean;
  isSafari: boolean;
  isTouchDevice: boolean;
  iosVersion: number | null;
  isLandscape: boolean;
  viewport: {
    width: number;
    height: number;
  };
}

const DeviceHandler: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [orientation, setOrientation] = useState<string>("portrait");
  const touchElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize device detection only on client side
    if (typeof window !== "undefined") {
      // Initialize enhanced iOS optimizations
      enhancedIosOptimizations.initEnhanced();

      // Get initial device info
      const info: DeviceInfo = {
        isIOS: deviceDetection.isIOS(),
        isIPad: deviceDetection.isIPad(),
        isIPhone: deviceDetection.isIPhone(),
        isSafari: deviceDetection.isSafari(),
        isTouchDevice: deviceDetection.isTouchDevice(),
        iosVersion: deviceDetection.getIOSVersion(),
        isLandscape: deviceDetection.isLandscape(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      };

      setDeviceInfo(info);
      setOrientation(info.isLandscape ? "landscape" : "portrait");

      // Handle orientation changes
      const handleOrientationChange = () => {
        const newOrientation = deviceDetection.isLandscape()
          ? "landscape"
          : "portrait";
        setOrientation(newOrientation);

        // Update device info
        setDeviceInfo((prev) =>
          prev
            ? {
                ...prev,
                isLandscape: deviceDetection.isLandscape(),
                viewport: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                },
              }
            : null
        );

        console.log("Orientation changed to:", newOrientation);
      };

      // Listen for custom viewport updates
      const handleViewportUpdate = (event: CustomEvent) => {
        console.log("Viewport updated:", event.detail);
        setDeviceInfo((prev) =>
          prev
            ? {
                ...prev,
                viewport: {
                  width: event.detail.width,
                  height: event.detail.height,
                },
              }
            : null
        );
      };

      // Set up orientation change handling
      viewportUtils.handleOrientationChange(handleOrientationChange);

      // Listen for viewport updates
      window.addEventListener(
        "viewport-updated",
        handleViewportUpdate as EventListener
      );

      // Touch event handling for iOS
      if (touchElementRef.current && deviceInfo?.isTouchDevice) {
        const handleTouchStart = (event: TouchEvent) => {
          console.log("Touch started");
          touchUtils.handleTouch(event);

          const coordinates = touchUtils.getTouchCoordinates(event);
          if (coordinates) {
            console.log("Touch coordinates:", coordinates);
          }
        };

        const handleTouchMove = touchUtils.createDebouncedTouchHandler(
          (event: TouchEvent) => {
            const coordinates = touchUtils.getTouchCoordinates(event);
            if (coordinates) {
              console.log("Touch moving:", coordinates);
            }
          }
        );

        const handleTouchEnd = (event: TouchEvent) => {
          console.log("Touch ended");
        };

        // Add touch listeners with proper options
        touchUtils.addTouchListener(
          touchElementRef.current,
          "touchstart",
          handleTouchStart
        );
        touchUtils.addTouchListener(
          touchElementRef.current,
          "touchmove",
          handleTouchMove
        );
        touchUtils.addTouchListener(
          touchElementRef.current,
          "touchend",
          handleTouchEnd
        );

        // Cleanup function
        return () => {
          if (touchElementRef.current) {
            touchUtils.removeTouchListener(
              touchElementRef.current,
              "touchstart",
              handleTouchStart
            );
            touchUtils.removeTouchListener(
              touchElementRef.current,
              "touchmove",
              handleTouchMove
            );
            touchUtils.removeTouchListener(
              touchElementRef.current,
              "touchend",
              handleTouchEnd
            );
          }
          window.removeEventListener(
            "viewport-updated",
            handleViewportUpdate as EventListener
          );
        };
      }
    }
  }, []);

  // Don't render on server side
  if (!deviceInfo) {
    return null;
  }

  return (
    <div className="device-handler">
      {/* Device info display (hidden in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
          <h4 className="font-bold mb-2">Device Info:</h4>
          <div className="space-y-1">
            <div>iOS: {deviceInfo.isIOS ? "✅" : "❌"}</div>
            <div>iPad: {deviceInfo.isIPad ? "✅" : "❌"}</div>
            <div>iPhone: {deviceInfo.isIPhone ? "✅" : "❌"}</div>
            <div>Safari: {deviceInfo.isSafari ? "✅" : "❌"}</div>
            <div>Touch: {deviceInfo.isTouchDevice ? "✅" : "❌"}</div>
            <div>iOS Version: {deviceInfo.iosVersion || "N/A"}</div>
            <div>Orientation: {orientation}</div>
            <div>
              Viewport: {deviceInfo.viewport.width}x{deviceInfo.viewport.height}
            </div>
          </div>
        </div>
      )}

      {/* Touch test area for iOS devices */}
      {deviceInfo.isTouchDevice && (
        <div
          ref={touchElementRef}
          className="touch-test-area fixed bottom-4 right-4 w-20 h-20 bg-blue-500 bg-opacity-50 rounded-full flex items-center justify-center text-white text-xs cursor-pointer z-40"
          style={{
            display: process.env.NODE_ENV === "development" ? "flex" : "none",
          }}
        >
          Touch Test
        </div>
      )}
    </div>
  );
};

export default DeviceHandler;
