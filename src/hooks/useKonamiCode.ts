"use client";

import { useEffect, useState, useRef } from "react";

export function useKonamiCode() {
  const [isActivated, setIsActivated] = useState(false);
  const history = useRef<string[]>([]);
  
  const sequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Guard against missing key property
      if (!e || !e.key) return;
      
      // Normalize key to handle case sensitivity (e.g. "B" vs "b")
      // We keep "ArrowUp" etc as is, but lowercase single letters
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      
      history.current = [...history.current, key].slice(-sequence.length);

      // Check if history matches sequence
      const isMatch = history.current.length === sequence.length && 
        history.current.every((k, i) => k === sequence[i]);

      if (isMatch) {
        setIsActivated((prev) => {
          const nextState = !prev;
          if (typeof document !== 'undefined' && document.body) {
            document.body.style.filter = nextState ? "invert(1) hue-rotate(180deg)" : "";
          }
          
          return nextState;
        });
        // Reset history after successful activation
        history.current = [];
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("keydown", handleKeyDown);
      }
      // Reset filter on unmount to prevent visual artifacts
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.filter = "";
      }
    };
  }, []);

  return isActivated;
}
