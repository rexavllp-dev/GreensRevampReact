"use client";
import { useState, useEffect } from 'react';

// Custom hook for getting window size
export default function useWindowSize() {
  // Initialize state with the current window size
  let innerHeight;
  let innerWidth;
  if (typeof window !== "undefined") {
    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth;
  }
  const [windowSize, setWindowSize] = useState({
    width: innerWidth,
    height: innerHeight,
  });

  useEffect(() => {
    // Handler to update window size when the window is resized
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that effect runs only once on mount

  // Return the current window size
  return windowSize;
}
