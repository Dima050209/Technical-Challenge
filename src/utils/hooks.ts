import { useState, useEffect } from "react";

export function useResponsiveVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 2000) {
        setVisibleCount(7); // large screens
      } else if (width >= 1500) {
        setVisibleCount(5);
      } else if (width >= 800) {
        setVisibleCount(4); // tablets
      } else if (width >= 400) {
        setVisibleCount(2); // small tablets
      } else {
        setVisibleCount(1); // mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return visibleCount;
}
