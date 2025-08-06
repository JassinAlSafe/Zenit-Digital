import { ReactNode } from 'react';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Text animation component props
export interface TextRevealProps extends BaseComponentProps {
  text: string;
  textClassName?: string;
  tag?: keyof JSX.IntrinsicElements;
  splitLines?: boolean;
  staggerDelay?: number;
  duration?: number;
  onComplete?: () => void;
}

// Animation callback types
export type AnimationCallback = () => void;
export type AnimationStartCallback = (callback: AnimationCallback) => void;

// Header component props
export interface TestHeaderProps {
  onAnimationStart?: AnimationStartCallback;
}

// Project data interfaces
export interface ProjectLink {
  text: string;
  url?: string;
}

export interface Project {
  id: number;
  image: string | any; // StaticImageData from Next.js
  title: string;
  description: string;
  links: string[];
  route?: string;
}

// Form interfaces
export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: string;
  serviceRequired: string;
  comments?: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Section component props
export interface ServiceSectionProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

// Animation configuration types
export interface AnimationConfig {
  durations: {
    fast: number;
    normal: number;
    slow: number;
    letterStagger: number;
  };
  ease: {
    power1: string;
    power2: string;
    power3: string;
    power4: string;
    elastic: string;
    linear: string;
  };
  offsets: {
    letterReveal: number;
    smallReveal: number;
  };
  scrollTrigger: {
    start: string;
    centerStart: string;
    centerEnd: string;
  };
}

// GSAP utility types
export interface GSAPCleanupOptions {
  triggers?: gsap.ScrollTrigger[];
  tweens?: gsap.core.Tween[];
}

export interface ScrollTriggerConfig {
  trigger: Element | string;
  start?: string;
  end?: string;
  onEnter?: () => void;
  onEnterBack?: () => void;
  onLeave?: () => void;
  onLeaveBack?: () => void;
  toggleActions?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}