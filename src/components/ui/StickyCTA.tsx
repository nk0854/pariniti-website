"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight;
      const shouldShow = window.scrollY > scrollThreshold;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBar = isVisible && !isDismissed;

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9980] px-4 py-3 md:py-4"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Text */}
            <p
              className="text-sm md:text-base font-medium tracking-wide hidden sm:block"
              style={{ color: "#1d1d1f" }}
            >
              Get Your Stall Design in 24 Hours
            </p>
            <p
              className="text-sm font-medium tracking-wide sm:hidden"
              style={{ color: "#1d1d1f" }}
            >
              Stall Design in 24 Hours
            </p>

            <div className="flex items-center gap-3">
              {/* CTA Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37, #B8952C, #D4AF37)",
                  color: "#ffffff",
                  boxShadow: "0 2px 12px rgba(184, 149, 44, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(184, 149, 44, 0.35)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(184, 149, 44, 0.25)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Get Quote
              </a>

              {/* Dismiss Button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
                style={{
                  color: "rgba(0, 0, 0, 0.35)",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#1d1d1f";
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(0, 0, 0, 0.35)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(0, 0, 0, 0.04)";
                }}
                aria-label="Dismiss"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
