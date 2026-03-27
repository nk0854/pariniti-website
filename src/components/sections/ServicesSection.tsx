"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Stall Fabrication",
    description:
      "Custom-built exhibition stalls designed and fabricated to perfection. From concept to completion, we create structures that stand out on every exhibition floor.",
    iconPath:
      "M3 21V7l9-4 9 4v14M3 21h18M9 21V11h6v10M3 10h18M7 21v-4h2v4M15 21v-4h2v4",
  },
  {
    title: "Stall Branding",
    description:
      "Comprehensive branding solutions that transform your stall into a powerful brand statement. Graphics, signage, lighting, and visual storytelling that captivates.",
    iconPath:
      "M12 2L2 7v10l10 5 10-5V7L12 2zM12 22V12M2 7l10 5 10-5M7 9.5v5M17 9.5v5",
  },
  {
    title: "Event Planning",
    description:
      "Full-service event planning and management for exhibitions, trade shows, and corporate events. Seamless execution from logistics to on-ground coordination.",
    iconPath:
      "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM10 14l2 2 4-4",
  },
  {
    title: "Additional Services",
    description:
      "Everything beyond the stall - furniture rental, AV equipment, hospitality, promotional materials, and on-site support to ensure a flawless exhibition experience.",
    iconPath:
      "M12 5v14M5 12h14M7.5 7.5l9 9M16.5 7.5l-9 9",
  },
];

export default function ServicesSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      id="services"
      style={{ background: "#FAF8F5" }}
    >
      <div
        className="relative z-10"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: "clamp(20px, 3vw, 48px)",
          paddingRight: "clamp(20px, 3vw, 48px)",
        }}
      >
        <motion.div
          className="text-center"
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.32em] md:text-sm"
            style={{ color: "#B8952C" }}
          >
            What We Do
          </span>
          <h2
            className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#1d1d1f" }}
          >
            Our Premium <span style={{ color: "#B8952C" }}>Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-9">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex min-h-[280px] flex-col items-center justify-center rounded-[26px] px-8 py-9 md:min-h-[290px] md:px-10 md:py-10 lg:px-12 lg:py-12"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 24px rgba(17,17,17,0.04)",
              }}
            >
              <div className="mx-auto flex w-full max-w-[28rem] flex-col items-center text-center">
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "rgba(184,149,44,0.1)" }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B8952C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={service.iconPath} />
                  </svg>
                </div>

                <h3
                  className="mb-3 text-xl font-bold lg:text-[1.45rem]"
                  style={{ color: "#1d1d1f", lineHeight: 1.2 }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-[0.98rem] md:text-base"
                  style={{ color: "#424245", lineHeight: 1.75 }}
                >
                  {service.description}
                </p>

                <div
                  className="mt-5 text-sm font-semibold"
                  style={{ color: "#B8952C" }}
                >
                  Learn More
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
