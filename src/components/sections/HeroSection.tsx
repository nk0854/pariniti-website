"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats = [
  { value: "200+", label: "Projects" },
  { value: "50+", label: "Events" },
  { value: "98%", label: "Satisfaction" },
];

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        className="relative z-10 w-full hero-container"
        style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(40px, 6vw, 80px)" }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left side - Text */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Gold label pill */}
            <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
              <span
                className="inline-block px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-[0.25em] uppercase"
                style={{
                  background: "rgba(184, 149, 44, 0.08)",
                  border: "1px solid rgba(184, 149, 44, 0.2)",
                  color: "#B8952C",
                }}
              >
                Premium Exhibition Solutions
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
              style={{ color: "#1d1d1f", marginBottom: 28 }}
            >
              We Design{" "}
              <span className="text-gold-gradient">Experiences,</span>
              <br />
              Not Just Stalls
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg lg:text-xl leading-relaxed"
              style={{ color: "#424245", maxWidth: 520, marginBottom: "clamp(24px, 4vw, 40px)" }}
            >
              India&apos;s leading exhibition stall fabrication &amp; branding
              company. Transforming spaces into unforgettable brand experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center"
              style={{ gap: 16, marginBottom: "clamp(24px, 4vw, 48px)" }}
            >
              <a
                href="#contact"
                className="group relative rounded-full font-semibold tracking-wide overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: "#B8952C",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 20px rgba(184, 149, 44, 0.25)",
                  padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 36px)",
                  fontSize: 16,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#a38326";
                  e.currentTarget.style.boxShadow =
                    "0 6px 28px rgba(184, 149, 44, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#B8952C";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(184, 149, 44, 0.25)";
                }}
                data-cursor="pointer"
              >
                Get Your Stall Design
              </a>

              <a
                href="#portfolio"
                className="rounded-full font-semibold tracking-wide transition-all duration-300"
                style={{
                  border: "1.5px solid #B8952C",
                  color: "#B8952C",
                  backgroundColor: "transparent",
                  padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 36px)",
                  fontSize: 16,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(184, 149, 44, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                data-cursor="pointer"
              >
                View Our Work
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex"
              style={{ gap: "clamp(24px, 5vw, 56px)" }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span
                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ color: "#1d1d1f" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs md:text-sm tracking-wide uppercase"
                    style={{ color: "#86868b", marginTop: 8 }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side placeholder for 3D */}
          <div className="w-full lg:w-1/2 hidden lg:block" />
        </div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#86868b" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#86868b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
