"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Pariniti transformed our exhibition presence completely. The stall they fabricated for us at World Food India was nothing short of spectacular. The attention to detail and quality of construction exceeded our expectations.",
    name: "Rajesh Kumar",
    company: "STARK PACKMATE",
    rating: 5,
  },
  {
    quote:
      "Working with Pariniti was a seamless experience. From initial design to final execution, their team was professional and creative. Our branded stall at Bangalore Tech Summit attracted more visitors than ever before.",
    name: "Priya Sharma",
    company: "NULLVOID TECHNOLOGIES",
    rating: 5,
  },
  {
    quote:
      "The team at Pariniti truly understands the exhibition industry. They delivered a premium stall within our budget and timeline. Their branding work helped us stand out in a crowded exhibition hall.",
    name: "Amit Patel",
    company: "ARKA AGRO",
    rating: 5,
  },
  {
    quote:
      "We've worked with several stall fabricators, but Pariniti is in a league of their own. The quality of materials, the innovative design, and the on-site support were all exceptional. Highly recommended!",
    name: "Suresh Menon",
    company: "MICRON HVAC",
    rating: 5,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -140 : 140,
    opacity: 0,
    scale: 0.97,
  }),
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="testimonials"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative z-10 page-container">
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
            Client Love
          </span>
          <h2
            className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#1d1d1f" }}
          >
            What Our Clients <span style={{ color: "#B8952C" }}>Say</span>
          </h2>
        </motion.div>

        <motion.div
          className="w-full"
          style={{ maxWidth: "1060px", marginLeft: "auto", marginRight: "auto" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative min-h-[440px] overflow-hidden sm:min-h-[380px] md:min-h-[330px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div
                  className="flex h-full flex-col items-center justify-center rounded-[30px] px-6 py-10 text-center md:px-12 md:py-14"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 18px 44px rgba(17,17,17,0.06)",
                  }}
                >
                  <div className="mb-7 flex justify-center">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="rgba(184,149,44,0.22)"
                    >
                      <path d="M11 7.5c0 1.1-.4 2.1-1.2 2.9-.8.8-1.8 1.2-2.9 1.2-1.1 0-2.1-.4-2.9-1.2-.8-.8-1.2-1.8-1.2-2.9 0-2.1.8-4 2.4-5.6C6.8.3 8.7-.4 11-.4v2.2c-1.5 0-2.7.5-3.6 1.4-.9.9-1.4 2-1.4 3.3h1.1c1.1 0 2.1.4 2.9 1.2.8.8 1 1.7 1 2.8zm10 0c0 1.1-.4 2.1-1.2 2.9-.8.8-1.8 1.2-2.9 1.2-1.1 0-2.1-.4-2.9-1.2-.8-.8-1.2-1.8-1.2-2.9 0-2.1.8-4 2.4-5.6C16.8.3 18.7-.4 21-.4v2.2c-1.5 0-2.7.5-3.6 1.4-.9.9-1.4 2-1.4 3.3h1.1c1.1 0 2.1.4 2.9 1.2.8.8 1 1.7 1 2.8z" transform="translate(0,6)" />
                    </svg>
                  </div>

                  <p
                    className="mx-auto mb-8 max-w-[820px] text-base italic leading-7 sm:text-lg sm:leading-9 md:text-[1.55rem]"
                    style={{ color: "#1d1d1f" }}
                  >
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div className="mb-5 flex justify-center gap-2">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <svg
                        key={i}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="#B8952C"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <div>
                    <p className="text-lg font-bold" style={{ color: "#1d1d1f" }}>
                      {current.name}
                    </p>
                    <p
                      className="mt-2 text-sm font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "#86868b" }}
                    >
                      {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3" style={{ marginTop: "10px" }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="h-3 w-3 rounded-full transition-all duration-300"
                style={{
                  background: index === currentIndex ? "#B8952C" : "rgba(184,149,44,0.18)",
                  transform: index === currentIndex ? "scale(1.25)" : "scale(1)",
                }}
                data-cursor="pointer"
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
