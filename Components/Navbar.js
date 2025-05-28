"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FlipText from "./FlipText";

gsap.registerPlugin(ScrollTrigger);

// TextReveal Component for animated text (keep your existing code)
const TextReveal = ({
  text,
  className = "",
  textClassName = "",
  tag = "div",
  splitLines = false,
  staggerDelay = 0.04,
  duration = 1,
  onComplete = () => {},
}) => {
  // Your existing TextReveal component code
  const containerRef = useRef(null);
  const TextTag = tag;

  // Split text into lines if requested
  const lines = splitLines
    ? text.split(" ").reduce((acc, word) => {
        if (acc.length === 0) return [word];
        const lastLine = acc[acc.length - 1].split(" ");
        if (lastLine.length > 3) {
          return [...acc, word];
        } else {
          acc[acc.length - 1] += " " + word;
          return acc;
        }
      }, [])
    : [text];

  useEffect(() => {
    // Get all letter elements
    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll(".reveal-letter");

    // Initial setup - hide letters below their position
    gsap.set(letters, { y: 60, opacity: 0 });

    // Animate letters
    gsap.to(letters, {
      y: 0,
      opacity: 1,
      duration: duration,
      stagger: staggerDelay,
      ease: "power3.out",
      onComplete: onComplete,
    });
  }, [text, duration, staggerDelay, onComplete]);

  return (
    <div ref={containerRef} className={className}>
      <TextTag className={textClassName}>
        {lines.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className="overflow-hidden">
            {Array.from(line).map((letter, letterIndex) => (
              <span
                key={`letter-${lineIndex}-${letterIndex}`}
                className="reveal-letter inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        ))}
      </TextTag>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuContent, setShowMenuContent] = useState(false);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const contactInfoRef = useRef(null);
  const router = useRouter();

  const [navStyles, setNavStyles] = useState({
    bgColor: "white",
    textColor: "black",
    buttonBgColor: "var(--custom-blue)",
    buttonTextColor: "white",
    menuBgColor: "var(--custom-pink)",
    menuTextColor: "var(--custom-blue)",
  });

  // Enhanced navigation function to handle both scrolling and routing
  const navigateTo = (item) => {
    console.log(`Navigating to: ${item}`);

    // Handle Contact differently - navigate to booking page
    if (item.toLowerCase() === "contact") {
      if (isMenuOpen) {
        toggleMenu();
        // Use a timeout to allow the menu to close before navigating
        setTimeout(() => {
          router.push("/booking");
        }, 800);
      } else {
        router.push("/booking");
      }
      return;
    }

    // For other items, use scroll navigation
    const sectionId =
      item.toLowerCase() === "work" ? "work" : item.toLowerCase();

    if (isMenuOpen) {
      toggleMenu();
      // Use a timeout to allow the menu to close before scrolling
      setTimeout(() => {
        scrollToElement(sectionId);
      }, 800);
    } else {
      scrollToElement(sectionId);
    }
  };

  // Function to handle the actual scrolling
  const scrollToElement = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(`Found section: ${sectionId}`);

      // Calculate position with offset for fixed navbar
      const headerOffset = 100; // Adjust based on your navbar height
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      // Scroll to the adjusted position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Section not found: ${sectionId}`);
    }
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Open the menu with animation
      setIsMenuOpen(true);

      // Get button position for animation origin
      const menuButton = document.querySelector(".menu-button");
      const buttonRect = menuButton.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Set initial state (small circle at button position)
      gsap.set(menuOverlayRef.current, {
        clipPath: `circle(0px at ${buttonRect.left + buttonRect.width / 2}px ${
          buttonRect.top + buttonRect.height / 2
        }px)`,
        opacity: 1,
      });

      // Animate to full screen
      gsap.to(menuOverlayRef.current, {
        clipPath: `circle(${Math.sqrt(
          windowWidth * windowWidth + windowHeight * windowHeight
        )}px at ${buttonRect.left + buttonRect.width / 2}px ${
          buttonRect.top + buttonRect.height / 2
        }px)`,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          // Show menu content after circle animation completes
          setShowMenuContent(true);
        },
      });
    } else {
      // Hide text first
      setShowMenuContent(false);

      // After a small delay, animate the circle closed
      setTimeout(() => {
        // Close the menu with reverse animation
        const menuButton = document.querySelector(".menu-button");
        const buttonRect = menuButton.getBoundingClientRect();

        // Shrink circle back to button
        gsap.to(menuOverlayRef.current, {
          clipPath: `circle(0px at ${
            buttonRect.left + buttonRect.width / 2
          }px ${buttonRect.top + buttonRect.height / 2}px)`,
          duration: 0.6,
          ease: "power3.in",
          onComplete: () => setIsMenuOpen(false),
        });
      }, 300);
    }
  };

  // Helper function to determine menu colors based on navbar colors
  const getMenuColors = (bgColor, textColor) => {
    // For blue/pink combination
    if (
      bgColor.includes("custom-blue") ||
      textColor.includes("custom-blue") ||
      bgColor.includes("custom-pink") ||
      textColor.includes("custom-pink")
    ) {
      return {
        menuBgColor: "var(--custom-pink)",
        menuTextColor: "var(--custom-blue)",
      };
    }
    // For green/light-green combination
    else if (
      bgColor.includes("custom-green") ||
      textColor.includes("custom-green") ||
      bgColor.includes("light-green") ||
      textColor.includes("light-green")
    ) {
      return {
        menuBgColor: "var(--custom-lightGreen)",
        menuTextColor: "var(--custom-green)",
      };
    }
    // Default fallback
    return {
      menuBgColor: textColor,
      menuTextColor: bgColor,
    };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const navbar = document.querySelector(".navbar");
      const menuButton = document.querySelector(".menu-button");
      const desktopButton = document.querySelector(".desktop-button");
      const sections = document.querySelectorAll("section");

      // GSAP Animation for Navbar
      gsap.set(navbar, {
        y: -100,
        opacity: 0,
      });
      gsap.to(navbar, {
        y: 0,
        opacity: 1,
        delay: 0.8,
        duration: 2,
        ease: "power4.out",
      });

      // GSAP Animation for Menu Button
      gsap.set(menuButton, {
        scale: 0,
        opacity: 0,
      });
      gsap.to(menuButton, {
        scale: 1,
        opacity: 1,
        delay: 1.2,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });

      // ScrollTrigger for Navbar and Button Color Change
      sections.forEach((section, index) => {
        const bgColor = section.getAttribute("data-bg") || "white";
        const textColor = section.getAttribute("data-text") || "black";
        const buttonBgColor =
          section.getAttribute("data-button-bg") || "var(--custom-blue)";
        const buttonTextColor =
          section.getAttribute("data-button-text") || "white";
        const navbarTextColor =
          section.getAttribute("data-navbar-text") || textColor; // Add specific navbar text color

        const { menuBgColor, menuTextColor } = getMenuColors(
          bgColor,
          textColor
        );

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setNavStyles({
              bgColor,
              textColor,
              buttonBgColor,
              buttonTextColor,
              menuBgColor,
              menuTextColor,
              navbarTextColor,
            });

            if (navbar) {
              navbar.style.backgroundColor = bgColor;
              navbar.style.color = navbarTextColor;
            }
            if (menuButton) {
              menuButton.style.backgroundColor = buttonBgColor;
              menuButton.style.color = buttonTextColor;
            }
            if (desktopButton) {
              desktopButton.style.backgroundColor = buttonBgColor;
              desktopButton.style.color = buttonTextColor;
            }
          },
          onLeaveBack: () => {
            const prevSection = sections[index - 1];
            if (prevSection) {
              const prevBgColor =
                prevSection.getAttribute("data-bg") || "white";
              const prevTextColor =
                prevSection.getAttribute("data-text") || "black";
              const prevButtonBgColor =
                prevSection.getAttribute("data-button-bg") ||
                "var(--custom-blue)";
              const prevButtonTextColor =
                prevSection.getAttribute("data-button-text") || "white";
              const prevNavTextColor =
                prevSection.getAttribute("data-navbar-text") || prevTextColor;

              const {
                menuBgColor: prevMenuBgColor,
                menuTextColor: prevMenuTextColor,
              } = getMenuColors(prevBgColor, prevTextColor);

              setNavStyles({
                bgColor: prevBgColor,
                textColor: prevTextColor,
                buttonBgColor: prevButtonBgColor,
                buttonTextColor: prevButtonTextColor,
                menuBgColor: prevMenuBgColor,
                menuTextColor: prevMenuTextColor,
                navbarTextColor: prevNavTextColor,
              });

              if (navbar) {
                navbar.style.backgroundColor = prevBgColor;
                navbar.style.color = prevNavTextColor;
              }
              if (menuButton) {
                menuButton.style.backgroundColor = prevButtonBgColor;
                menuButton.style.color = prevButtonTextColor;
              }
              if (desktopButton) {
                desktopButton.style.backgroundColor = prevButtonBgColor;
                desktopButton.style.color = prevButtonTextColor;
              }
            }
          },
        });
      });
    }
  }, []);

  // Animation timing for contact info
  const handleMenuItemsComplete = () => {
    // Animate contact info after menu items animation completes
    gsap.fromTo(
      contactInfoRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  };

  const menuItems = ["About", "Work", "Services", "Contact"];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar w-full flex items-center px-6 py-4 z-40 transition-colors cursor-pointer duration-500 bg-white md:fixed md:top-0 md:left-0 ">
        {/* Logo - Mobile center, desktop left */}
        <div className="flex flex-1 justify-center md:justify-start items-center gap-2 z-50">
          {/* Alternative logo images that switch based on the navbar color */}

          <div className="relative w-4 h-4 md:w-5 md:h-5">
            {/* First logo (default/dark version) - visible when navbarTextColor is dark */}
            <Image
              src={logo2}
              alt="Zenit Logo light"
              width={20}
              height={20}
              className="absolute top-0 left-0 transition-opacity duration-500"
              style={{
                opacity:
                  navStyles.navbarTextColor?.includes("custom-pink") ||
                  navStyles.navbarTextColor?.includes("white") ||
                  navStyles.navbarTextColor?.includes("light")
                    ? 1
                    : 0,
              }}
            />
            {/* Second logo (light version) - visible when navbarTextColor is light */}
            <Image
              src={logo}
              alt="Zenit Logo dark"
              width={20}
              height={20}
              className="absolute top-0 left-0 transition-opacity duration-500"
              style={{
                opacity:
                  navStyles.navbarTextColor?.includes("custom-pink") ||
                  navStyles.navbarTextColor?.includes("white") ||
                  navStyles.navbarTextColor?.includes("light")
                    ? 0
                    : 1,
              }}
            />
          </div>

          <FlipText
            className="font-bold text-md"
            animationType="slide"
            duration={0.3}
          >
            ZENIT
          </FlipText>
        </div>

        {/* Centered Nav Links - Desktop Only */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-50">
          <ul className="flex gap-10">
            <li className="hover:text-custom-blue cursor-pointer">
              <FlipText
                onClick={() => navigateTo("about")}
                className="border-none bg-transparent p-0 m-0 text-inherit font-inherit hover:text-custom-blue cursor-pointer"
                animationType="slide"
                duration={0.3}
              >
                About
              </FlipText>
            </li>
            <li className="hover:text-custom-blue cursor-pointer">
              <FlipText
                onClick={() => navigateTo("work")}
                className="border-none bg-transparent p-0 m-0 text-inherit font-inherit hover:text-custom-blue cursor-pointer"
                animationType="slide"
                duration={0.3}
              >
                Cases
              </FlipText>
            </li>
            <li className="hover:text-custom-blue cursor-pointer">
              <FlipText
                onClick={() => navigateTo("services")}
                className="border-none bg-transparent p-0 m-0 text-inherit font-inherit hover:text-custom-blue cursor-pointer"
                animationType="slide"
                duration={0.3}
              >
                Services
              </FlipText>
            </li>
          </ul>
        </div>

        {/* Button - Right */}
        <div className="hidden md:flex items-center ml-auto z-50 ">
          <Link href="/booking">
            <FlipText
              className="desktop-button px-6 py-2 text-white rounded-2xl hover:bg-gray-800 transition-colors duration-500"
              animationType="slide"
              duration={0.3}
            >
              Let&apos;s Talk
            </FlipText>
          </Link>
        </div>
      </nav>

      {/* Circular Menu Button - Visible only on small screens */}
      <button
        onClick={toggleMenu}
        className="menu-button md:hidden fixed bottom-6 right-6 w-16 h-16 bg-custom-blue text-white rounded-full flex items-center justify-center z-50 shadow-lg transition-all duration-300"
        style={{
          backgroundColor: isMenuOpen
            ? navStyles.menuTextColor
            : navStyles.buttonBgColor,
          color: isMenuOpen ? navStyles.menuBgColor : navStyles.buttonTextColor,
        }}
      >
        {isMenuOpen ? (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay with Animation */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 md:hidden pointer-events-none"
        style={{
          backgroundColor: navStyles.menuBgColor,
          color: navStyles.menuTextColor,
          zIndex: 45,
          opacity: 0,
        }}
      >
        {/* Menu Content - Only render when needed */}
        {isMenuOpen && (
          <div
            ref={menuContentRef}
            className="pl-12 pr-6 pt-32 flex-grow flex flex-col h-full pointer-events-auto"
          >
            {showMenuContent && (
              <>
                {/* Menu Items with TextReveal Effect */}
                <ul className="text-5xl font-medium flex flex-col gap-6">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="cursor-pointer transition-colors duration-300 hover:opacity-70"
                      onClick={() => navigateTo(item)}
                    >
                      <TextReveal
                        text={item}
                        staggerDelay={0.03}
                        duration={0.8}
                        onComplete={
                          index === menuItems.length - 1
                            ? handleMenuItemsComplete
                            : undefined
                        }
                      />
                    </li>
                  ))}
                </ul>

                {/* Contact Info - Will be animated after menu items */}
                <div ref={contactInfoRef} className="mt-auto mb-12 opacity-0">
                  <div className="text-lg mb-3">hello@zenitdigital.se</div>
                  <div className="text-lg mb-3">072-336 43 84</div>
                  <Link
                    href="https://www.linkedin.com/company/zenit-digital-studios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:opacity-70 transition-opacity duration-300"
                  >
                    LinkedIn ↗
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
