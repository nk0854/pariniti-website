"use client";

import { motion } from "framer-motion";

const events = [
  {
    name: "World Food India",
    year: "2025",
    location: "New Delhi, India",
    description:
      "India's premier food industry exhibition bringing together global food brands, manufacturers, and innovators under one roof.",
  },
  {
    name: "Bangalore Tech Summit",
    year: "2025",
    location: "Bengaluru, India",
    description:
      "One of the largest technology conferences in Asia, showcasing cutting-edge innovations and digital transformation solutions.",
  },
  {
    name: "India International Trade Fair",
    year: "2025",
    location: "New Delhi, India",
    description:
      "The flagship trade fair of India, connecting businesses across diverse sectors with national and international markets.",
  },
  {
    name: "PackEx India",
    year: "2025",
    location: "Mumbai, India",
    description:
      "The leading packaging industry exhibition featuring the latest in packaging technology, materials, and sustainable solutions.",
  },
  {
    name: "FoodTech India",
    year: "2025",
    location: "Mumbai, India",
    description:
      "India's foremost food processing and technology trade show, driving innovation in food manufacturing and supply chain.",
  },
];

export default function EventsSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      id="events"
      style={{ background: "#f5f5f7" }}
    >
      <div
        className="relative z-10"
        style={{
          maxWidth: 1740,
          margin: "0 auto",
          paddingLeft: "clamp(18px, 2vw, 30px)",
          paddingRight: "clamp(18px, 2vw, 30px)",
        }}
      >
        <motion.div
          className="text-center"
          style={{ marginBottom: 52 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em] md:text-sm"
            style={{ color: "#B8952C" }}
          >
            Where We&apos;ve Been
          </span>
          <h2
            className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#1d1d1f" }}
          >
            Events We&apos;ve <span style={{ color: "#B8952C" }}>Covered</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.08 * index }}
              className="group flex min-h-[260px] w-full max-w-[420px] flex-[1_1_260px] flex-col overflow-hidden"
              style={{
                borderRadius: "16px",
                padding: "clamp(20px, 3vw, 32px)",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 12px 28px rgba(17,17,17,0.06)",
              }}
              whileHover={{ y: -6 }}
              data-cursor="pointer"
            >
              <div className="flex items-start justify-between gap-4" style={{ marginBottom: "5px" }}>
                <span
                  className="rounded-full font-bold"
                  style={{ padding: "4px 10px", fontSize: "11px", letterSpacing: "0.1em", background: "#B8952C", color: "#FFFFFF" }}
                >
                  {event.year}
                </span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B8952C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-45 transition-all duration-300 group-hover:opacity-90"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <h3
                className="mb-3 text-2xl font-bold"
                style={{ color: "#1d1d1f", lineHeight: 1.2 }}
              >
                {event.name}
              </h3>

              <p
                className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#86868b" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {event.location}
              </p>

              <p
                className="text-base leading-8"
                style={{ color: "#424245" }}
              >
                {event.description}
              </p>

              <div className="mt-auto pt-6">
                <div
                  className="h-px w-20 transition-all duration-300 group-hover:w-full"
                  style={{
                    background:
                      "linear-gradient(to right, #B8952C, rgba(184,149,44,0.15))",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
