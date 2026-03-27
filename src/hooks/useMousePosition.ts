"use client";

import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface NormalizedMousePosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

interface UseMousePositionReturn {
  raw: MousePosition;
  normalized: NormalizedMousePosition;
}

export function useMousePosition(): UseMousePositionReturn {
  const [raw, setRaw] = useState<MousePosition>({ x: 0, y: 0 });
  const [normalized, setNormalized] = useState<NormalizedMousePosition>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setRaw({ x: clientX, y: clientY });

    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setNormalized({
        x: (clientX - centerX) / centerX,
        y: (clientY - centerY) / centerY,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return { raw, normalized };
}

export default useMousePosition;
