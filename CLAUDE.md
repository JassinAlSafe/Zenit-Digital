# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run vercel-build` - Build for Vercel deployment (with NODE_OPTIONS='--no-warnings')
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run deploy` - Execute custom deployment script with cache clearing
- `npm run clear-cache` - Clear .next cache and npm cache

## Project Architecture

This is a Next.js 15 landing page for Zenit Digital built with:

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom configurations
- **Animations**: GSAP with ScrollTrigger for scroll-based animations and smooth transitions
- **UI Components**: Aceternity UI, Framer Motion for interactive elements
- **Email**: SendGrid for booking form submissions
- **Icons**: Heroicons and Lucide React

### Key Architecture Patterns

**Component Structure:**
- `/Components/` - Contains all reusable UI components
- `/app/` - Next.js App Router pages and API routes
- `/utils/` - Context providers and utility functions

**Animation System:**
- GSAP-based animations with scroll triggers
- Custom cursor system using React Context (`CursorContext`)
- Loading screen with GSAP timeline animations
- Smooth scroll and magnetic button effects

**State Management:**
- React Context for cursor state management
- Component-level state for loading and animation states
- Navigation handling with popstate events

**Styling Approach:**
- Tailwind CSS for utility-first styling
- Custom background/text color changes on scroll
- Responsive design with mobile-first approach

## Configuration Notes

- **TypeScript**: Configured with strict mode but build errors are ignored in production
- **ESLint**: Configured to ignore errors during builds
- **Images**: Optimized for Sanity CDN, unoptimized in development
- **Caching**: Aggressive cache headers for static assets, no-cache for pages
- **Deployment**: Custom deployment script handles cache clearing and Vercel deployment

## API Routes

- `/api/send-booking-email` - POST endpoint for booking form submissions using SendGrid

## Environment Variables Required

- `SENDGRID_API_KEY` - SendGrid API key for email functionality
- `SENDGRID_FROM_EMAIL` - From email address (defaults to noreply@zenitdigital.se)
- `SENDGRID_ADMIN_EMAIL` - Admin notification email (defaults to admin@zenitdigital.se)

## GSAP with React Best Practices

This project heavily uses GSAP for animations. Follow these patterns when working with GSAP in React components:

### Basic Setup Pattern
```javascript
useEffect(() => {
  // Always register plugins inside useEffect for client-side execution
  gsap.registerPlugin(ScrollTrigger);
  
  // Your GSAP animations here
  const tl = gsap.timeline();
  
  // Cleanup function
  return () => {
    // Kill timelines to prevent memory leaks
    tl.kill();
    // Kill ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

### Key Guidelines
- **Always cleanup**: Kill timelines and ScrollTriggers in useEffect cleanup
- **Use refs for DOM targeting**: Prefer `useRef` over class selectors when possible
- **Client-side only**: Register GSAP plugins inside useEffect to avoid SSR issues
- **Conditional execution**: Check `typeof window !== "undefined"` for browser-only code
- **Store trigger references**: Keep ScrollTrigger instances in arrays for proper cleanup

### ScrollTrigger Pattern
```javascript
const scrollTriggers = [];

sections.forEach((section, index) => {
  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => { /* animation */ },
  });
  scrollTriggers.push(trigger);
});

// Cleanup
return () => {
  scrollTriggers.forEach(trigger => trigger.kill());
};
```

### Common Issues to Avoid
- Don't create animations outside useEffect
- Don't forget to kill timelines and triggers
- Don't use GSAP in server-side rendering context
- Don't target elements that may not exist in the DOM

## GSAP Implementation Patterns in This Project

### Text Animation Techniques
**Letter-by-letter reveals**: Common pattern for text entrances
```javascript
// Split text into letters and animate with stagger
gsap.set(letters, { y: 160 });
gsap.to(letters, {
  y: 0,
  duration: 1,
  stagger: 0.04,
  ease: "power3.out"
});
```

**Scrolling text**: Used in `TextScroll.js` for infinite horizontal scrolling
```javascript
gsap.to(textElement, {
  x: -textWidth,
  duration: 20,
  ease: "linear",
  repeat: -1
});
```

### Interactive Animation Patterns
**Magnetic effects**: Custom hook `useMagneticEffect` for button interactions
```javascript
const { x, y } = mouse;
gsap.to(elementRef.current, {
  x: (x - rect.left - rect.width / 2) * strength,
  y: (y - rect.top - rect.height / 2) * strength,
  duration: 0.3,
  ease: "power2.out"
});
```

**Custom cursor**: Two-element cursor system with different speeds
```javascript
// Main cursor follows immediately
gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
// Follower has delay for trail effect  
gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.15 });
```

### ScrollTrigger Patterns
**Stacked sections**: Used for folder-style animations
```javascript
ScrollTrigger.create({
  trigger: section,
  start: "top center",
  end: "bottom center", 
  scrub: 1,
  pin: true,
  onUpdate: (self) => {
    gsap.to(section, { y: -self.progress * 100 });
  }
});
```

**Color transitions**: Background changes on scroll
```javascript
ScrollTrigger.create({
  trigger: section,
  start: "top center",
  onEnter: () => {
    document.body.style.backgroundColor = bgColor;
  }
});
```

### Animation Constants Used
- **Durations**: 0.3-2.4s (most common: 1-1.2s)
- **Stagger delays**: 0.03-0.04s for text
- **Y displacement**: 160px for text reveals
- **Easing preferences**: `power3.out`, `power2.out`, `elastic.out(1, 0.3)`

### Project-Specific Utilities
- `GsapInitializer.js`: Centralized GSAP setup with `force3D: true`
- `useMagneticEffect.js`: Reusable magnetic button hook
- `CursorContext.js`: Global cursor state management
- Custom loading animations with timeline sequences