"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const stallSizes = [9, 12, 18, 24, 36];
const openSides = [1, 2, 3, 4];
const budgetOptions = ["Basic", "Standard", "Premium"] as const;

type Budget = (typeof budgetOptions)[number];

const priceRanges: Record<Budget, Record<number, string>> = {
  Basic: {
    9: "1.2L - 1.8L",
    12: "1.8L - 2.5L",
    18: "2.5L - 3.5L",
    24: "3.5L - 5.0L",
    36: "5.0L - 7.5L",
  },
  Standard: {
    9: "2.0L - 3.0L",
    12: "3.0L - 4.5L",
    18: "4.5L - 6.0L",
    24: "6.0L - 8.5L",
    36: "8.5L - 12L",
  },
  Premium: {
    9: "3.5L - 5.0L",
    12: "5.0L - 7.5L",
    18: "7.5L - 10L",
    24: "10L - 15L",
    36: "15L - 22L",
  },
};

export default function ConfiguratorSection() {
  const [selectedSize, setSelectedSize] = useState(18);
  const [selectedSides, setSelectedSides] = useState(2);
  const [selectedBudget, setSelectedBudget] = useState<Budget>("Standard");

  const estimatedPrice = useMemo(() => {
    return priceRanges[selectedBudget][selectedSize] || "Contact Us";
  }, [selectedSize, selectedBudget]);

  return (
    <section className="section-padding relative overflow-hidden" id="configurator" style={{ background: "#FFFFFF" }}>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase"
            style={{ color: "#B8952C" }}
          >
            Customize
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4" style={{ color: "#1d1d1f" }}>
            Design Your Perfect{" "}
            <span style={{ color: "#B8952C" }}>Stall</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Configuration panel */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="rounded-2xl p-6 md:p-8 lg:p-10"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Stall Size */}
              <div className="mb-8">
                <label
                  className="block text-sm font-semibold mb-4 tracking-wide uppercase"
                  style={{ color: "#86868b" }}
                >
                  Stall Size (sqm)
                </label>
                <div className="flex flex-wrap gap-3">
                  {stallSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                      style={{
                        background:
                          selectedSize === size
                            ? "rgba(184,149,44,0.08)"
                            : "#f5f5f7",
                        border:
                          selectedSize === size
                            ? "1.5px solid #B8952C"
                            : "1.5px solid rgba(0,0,0,0.08)",
                        color:
                          selectedSize === size
                            ? "#B8952C"
                            : "#86868b",
                      }}
                      data-cursor="pointer"
                    >
                      {size} sqm
                    </button>
                  ))}
                </div>
              </div>

              {/* Open Sides */}
              <div className="mb-8">
                <label
                  className="block text-sm font-semibold mb-4 tracking-wide uppercase"
                  style={{ color: "#86868b" }}
                >
                  Open Sides
                </label>
                <div className="flex flex-wrap gap-3">
                  {openSides.map((sides) => (
                    <button
                      key={sides}
                      onClick={() => setSelectedSides(sides)}
                      className="relative w-14 h-14 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center"
                      style={{
                        background:
                          selectedSides === sides
                            ? "rgba(184,149,44,0.08)"
                            : "#f5f5f7",
                        border:
                          selectedSides === sides
                            ? "1.5px solid #B8952C"
                            : "1.5px solid rgba(0,0,0,0.08)",
                        color:
                          selectedSides === sides
                            ? "#B8952C"
                            : "#86868b",
                      }}
                      data-cursor="pointer"
                    >
                      {sides}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-8">
                <label
                  className="block text-sm font-semibold mb-4 tracking-wide uppercase"
                  style={{ color: "#86868b" }}
                >
                  Budget Tier
                </label>
                <div className="flex flex-wrap gap-3">
                  {budgetOptions.map((budget) => (
                    <button
                      key={budget}
                      onClick={() => setSelectedBudget(budget)}
                      className="relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                      style={{
                        background:
                          selectedBudget === budget
                            ? "rgba(184,149,44,0.08)"
                            : "#f5f5f7",
                        border:
                          selectedBudget === budget
                            ? "1.5px solid #B8952C"
                            : "1.5px solid rgba(0,0,0,0.08)",
                        color:
                          selectedBudget === budget
                            ? "#B8952C"
                            : "#86868b",
                      }}
                      data-cursor="pointer"
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div
                className="w-full h-px my-6"
                style={{
                  background: "rgba(0,0,0,0.06)",
                }}
              />

              {/* Estimated Price */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "#86868b" }}
                  >
                    Estimated Price Range
                  </p>
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: "#B8952C" }}>
                    {estimatedPrice}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-xs"
                    style={{ color: "#86868b" }}
                  >
                    {selectedSize} sqm / {selectedSides} side
                    {selectedSides > 1 ? "s" : ""} / {selectedBudget}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full py-4 rounded-xl font-semibold text-sm md:text-base tracking-wide transition-all duration-300 hover:opacity-90"
                style={{
                  background: "#B8952C",
                  color: "#FFFFFF",
                  boxShadow: "0 2px 8px rgba(184,149,44,0.2)",
                }}
                data-cursor="pointer"
              >
                Get Exact Quote
              </button>
            </div>
          </motion.div>

          {/* Right: 3D Preview placeholder */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div
              id="configurator-3d"
              className="w-full aspect-[4/3] lg:aspect-square rounded-2xl flex items-center justify-center"
              style={{
                maxHeight: "500px",
                background: "#f5f5f7",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Visual placeholder content */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                    className="animate-float"
                  >
                    {/* 3D cube wireframe */}
                    <path
                      d="M48 16L80 32V64L48 80L16 64V32L48 16Z"
                      stroke="rgba(184,149,44,0.3)"
                      strokeWidth="1"
                    />
                    <path
                      d="M48 16L48 80"
                      stroke="rgba(184,149,44,0.2)"
                      strokeWidth="1"
                    />
                    <path
                      d="M16 32L80 64"
                      stroke="rgba(184,149,44,0.15)"
                      strokeWidth="1"
                    />
                    <path
                      d="M80 32L16 64"
                      stroke="rgba(184,149,44,0.15)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="4"
                      fill="rgba(184,149,44,0.4)"
                    />
                  </svg>
                </div>
                <p
                  className="text-sm font-medium tracking-wider uppercase"
                  style={{ color: "#B8952C" }}
                >
                  3D Preview
                </p>
                <p
                  className="text-xs mt-2 max-w-[200px] mx-auto"
                  style={{ color: "#86868b" }}
                >
                  Interactive 3D model will render here
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
