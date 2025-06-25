"use client";

import React, { useRef, useEffect, memo, ReactNode, ButtonHTMLAttributes } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  magneticStrength?: number;
}

const MagneticButton = memo<MagneticButtonProps>(({
  children,
  className = "",
  onClick,
  href,
  magneticStrength = 0.4,
  ...props
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magneticStrength]);

  const buttonContent = (
    <div
      ref={buttonRef}
      className={`cursor-pointer inline-block relative z-50 pointer-events-auto ${className}`}
      onClick={onClick}
      style={{ isolation: "isolate" }}
      {...props}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
});

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
