"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for data-cursor-text
      const cursorTextAttr = target.getAttribute("data-cursor-text") || target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      
      if (cursorTextAttr) {
        setCursorText(cursorTextAttr);
        setIsHovering(true);
        return;
      }

      // Check if the element is interactive
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
        setCursorText("");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseEnter);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [cursorX, cursorY]);
  
  // Don't render custom cursor if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 items-center justify-center rounded-full bg-neo-lime mix-blend-difference md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? (cursorText ? 3 : 2.5) : 1,
        height: isHovering && cursorText ? 32 : 32,
        width: isHovering && cursorText ? "auto" : 32,
        paddingLeft: isHovering && cursorText ? 12 : 0,
        paddingRight: isHovering && cursorText ? 12 : 0,
        borderRadius: isHovering && cursorText ? 16 : "50%",
      }}
    >
      {cursorText && (
        <span className="whitespace-nowrap text-[8px] font-black text-neo-black">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}

