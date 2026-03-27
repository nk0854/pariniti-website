"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const alignmentClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div ref={ref} className={`flex flex-col ${alignmentClasses} mb-12 md:mb-16`}>
      {/* Subtitle / Gold label tag */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-block text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full"
        style={{
          color: "#D4AF37",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          backgroundColor: "rgba(212, 175, 55, 0.05)",
        }}
      >
        {subtitle}
      </motion.span>

      {/* Title with gold gradient */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        style={{
          background: "linear-gradient(135deg, #D4AF37, #F5E6A3, #D4AF37)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </motion.h2>

      {/* Horizontal gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] rounded-full"
        style={{
          width: align === "center" ? 80 : 60,
          background: "linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.2))",
          transformOrigin: align === "center" ? "center" : "left",
        }}
      />
    </div>
  );
}
