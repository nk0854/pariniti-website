"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const brandName = "PARINITI";
  const tagline = "EXHIBIT SOLUTIONS";

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const step = (interval / duration) * 100;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 400);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#FFFFFF" }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Brand name - letter by letter reveal */}
          <div className="flex overflow-hidden mb-4">
            {brandName.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-5xl md:text-7xl font-bold tracking-[0.2em]"
                style={{
                  color: "#1d1d1f",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline fade in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            className="text-sm md:text-base tracking-[0.5em] uppercase"
            style={{ color: "#86868b" }}
          >
            {tagline}
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 md:w-80">
            {/* Track */}
            <div
              className="h-[2px] w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.08)" }}
            >
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #B8952C, #D4AF37)",
                  width: `${progress}%`,
                  transition: "width 0.1s ease-out",
                }}
              />
            </div>
            {/* Percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-3 text-xs tracking-[0.3em]"
              style={{ color: "#86868b" }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
