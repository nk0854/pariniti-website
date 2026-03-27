"use client";

import { useState, useEffect, useCallback, type RefObject } from "react";

interface UseScrollProgressReturn {
  pageProgress: number; // 0 to 1
  elementProgress: number; // 0 to 1
}

export function useScrollProgress(
  elementRef?: RefObject<HTMLElement | null>
): UseScrollProgressReturn {
  const [pageProgress, setPageProgress] = useState(0);
  const [elementProgress, setElementProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    // Page-level scroll progress
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    setPageProgress(progress);

    // Element-level scroll progress
    if (elementRef?.current) {
      const el = elementRef.current;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 0 when element top enters viewport bottom, 1 when element bottom exits viewport top
      const elTop = rect.top;
      const elHeight = rect.height;
      const totalTravel = windowHeight + elHeight;
      const traveled = windowHeight - elTop;
      const elProgress = Math.max(0, Math.min(traveled / totalTravel, 1));
      setElementProgress(elProgress);
    }
  }, [elementRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return { pageProgress, elementProgress };
}

export default useScrollProgress;
