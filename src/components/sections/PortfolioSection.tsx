"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type FilterType = "all" | "small" | "medium" | "large";

interface PortfolioItem {
  company: string;
  size: string;
  service: string;
  category: FilterType;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    company: "Stark Packmate",
    size: "12 sqm",
    service: "Branding + Furniture",
    category: "medium",
    image: "/images/7.jpeg",
  },
  {
    company: "Ultracare Remedies",
    size: "9 sqm",
    service: "Stall Fabrication",
    category: "small",
    image: "/images/2.jpeg",
  },
  {
    company: "Namrta Foil & Paper",
    size: "9 sqm",
    service: "Stall Fabrication",
    category: "small",
    image: "/images/3.jpeg",
  },
  {
    company: "Floedge Industries",
    size: "12 sqm",
    service: "Stall Fabrication",
    category: "medium",
    image: "/images/4.jpeg",
  },
  {
    company: "Ishan International",
    size: "18 sqm",
    service: "Branding + Furniture",
    category: "medium",
    image: "/images/5.jpeg",
  },
  {
    company: "Mukesh Agarbatti Works",
    size: "24 sqm",
    service: "Stall Fabrication",
    category: "large",
    image: "/images/6.jpeg",
  },
  {
    company: "Param Agarbatti",
    size: "36 sqm",
    service: "Stall Fabrication",
    category: "large",
    image: "/images/11.jpeg",
  },
  {
    company: "GDS Innovations",
    size: "18 sqm",
    service: "Branding + Furniture",
    category: "medium",
    image: "/images/10.jpeg",
  },
  {
    company: "DiaBeagle",
    size: "18 sqm",
    service: "Stall Fabrication",
    category: "medium",
    image: "/images/9.jpeg",
  },
  {
    company: "S.K. Dent India",
    size: "24 sqm",
    service: "Stall Fabrication",
    category: "large",
    image: "/images/13.jpeg",
  },
  {
    company: "CBS Technologies",
    size: "12 sqm",
    service: "Branding + Furniture",
    category: "medium",
    image: "/images/14.jpeg",
  },
  {
    company: "Mottronics India",
    size: "9 sqm",
    service: "Stall Branding",
    category: "small",
    image: "/images/12.jpeg",
  },
  {
    company: "Care EV India",
    size: "9 sqm",
    service: "Stall Fabrication",
    category: "small",
    image: "/images/WhatsApp Image 2026-03-26 at 2.06.24 PM.jpeg",
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Small (9 sqm)", value: "small" },
  { label: "Medium (12-18 sqm)", value: "medium" },
  { label: "Large (20-36 sqm)", value: "large" },
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="portfolio"
      style={{ background: "#f5f5f7" }}
    >
      <div
        className="relative z-10"
        style={{
          maxWidth: 1780,
          margin: "0 auto",
          paddingLeft: "clamp(18px, 2vw, 30px)",
          paddingRight: "clamp(18px, 2vw, 30px)",
        }}
      >
        <motion.div
          className="text-center"
          style={{ marginBottom: 36 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em] md:text-sm"
            style={{ color: "#B8952C" }}
          >
            Our Work
          </span>
          <h2
            className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#1d1d1f" }}
          >
            Exhibition <span style={{ color: "#B8952C" }}>Portfolio</span>
          </h2>
        </motion.div>

        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-4 md:mb-16 md:gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className="rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-150"
              style={{
                padding: "clamp(10px, 2vw, 16px) clamp(20px, 4vw, 48px)",
                background: activeFilter === filter.value ? "#B8952C" : "#FFFFFF",
                color: activeFilter === filter.value ? "#FFFFFF" : "#616166",
                border:
                  activeFilter === filter.value
                    ? "1px solid #B8952C"
                    : "1px solid rgba(0,0,0,0.08)",
                boxShadow:
                  activeFilter === filter.value
                    ? "0 10px 22px rgba(184,149,44,0.22)"
                    : "0 6px 16px rgba(17,17,17,0.04)",
              }}
              data-cursor="pointer"
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <br />

        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.company}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[20px]"
                style={{
                  boxShadow: "0 12px 28px rgba(17,17,17,0.08)",
                }}
                whileHover={{ y: -6 }}
                data-cursor="pointer"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.company}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,7,7,0.9) 0%, rgba(7,7,7,0.38) 46%, rgba(7,7,7,0.08) 100%)",
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 z-10 pt-14 lg:pt-16" style={{ padding: "56px 24px 20px 24px" }}>
                    <h3 className="mb-1.5 text-lg font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] lg:text-xl">
                      {item.company}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full text-[11px] font-semibold"
                        style={{ padding: "4px 12px", background: "#B8952C", color: "#FFFFFF" }}
                      >
                        {item.size}
                      </span>
                      <span
                        className="text-sm font-medium leading-snug"
                        style={{ color: "rgba(255,255,255,0.82)" }}
                      >
                        {item.service}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
