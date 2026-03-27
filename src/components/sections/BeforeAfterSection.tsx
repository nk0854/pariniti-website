"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="before-after"
      style={{ background: "#f5f5f7" }}
    >
      <div
        className="relative z-10"
        style={{
          maxWidth: 1640,
          margin: "0 auto",
          paddingLeft: "clamp(18px, 2vw, 30px)",
          paddingRight: "clamp(18px, 2vw, 30px)",
        }}
      >
        <motion.div
          className="text-center"
          style={{ marginBottom: 44 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em] md:text-sm"
            style={{ color: "#B8952C" }}
          >
            Transformation
          </span>
          <h2
            className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#1d1d1f" }}
          >
            See The Magic <span style={{ color: "#B8952C" }}>Happen</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            ref={containerRef}
            className="relative mx-auto w-full select-none overflow-hidden rounded-[30px] aspect-[16/10] lg:aspect-[21/10]"
            style={{
              maxWidth: 1480,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 18px 42px rgba(17,17,17,0.08)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (!isDragging) return;
              updateSliderPosition(e.clientX);
            }}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={(e) => updateSliderPosition(e.touches[0].clientX)}
            onClick={(e) => updateSliderPosition(e.clientX)}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/gds_final_4k.jpg"
                alt="After - Completed exhibition stall"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1480px"
                priority
              />
              <div
                className="absolute right-4 top-4 z-10 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] md:right-6 md:top-6"
                style={{
                  background: "#B8952C",
                  color: "#FFFFFF",
                  boxShadow: "0 8px 18px rgba(17,17,17,0.18)",
                }}
              >
                After
              </div>
            </div>

            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute inset-0" style={{ background: "#ececf1" }} />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent 0px, transparent 64px, rgba(0,0,0,0.04) 65px), repeating-linear-gradient(0deg, transparent 0px, transparent 64px, rgba(0,0,0,0.04) 65px)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="relative flex h-[62%] w-[68%] items-center justify-center rounded-[28px] border-2 border-dashed border-black/10">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <svg
                      width="54"
                      height="54"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(0,0,0,0.14)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                    </svg>
                    <span
                      className="text-sm font-semibold uppercase tracking-[0.18em] md:text-lg"
                      style={{ color: "rgba(0,0,0,0.2)" }}
                    >
                      Empty Exhibition Space
                    </span>
                    <span
                      className="text-xs font-medium uppercase tracking-[0.22em]"
                      style={{ color: "rgba(0,0,0,0.16)" }}
                    >
                      Before Pariniti
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="absolute left-4 top-4 z-10 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] md:left-6 md:top-6"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  color: "#86868b",
                  backdropFilter: "blur(10px)",
                }}
              >
                Before
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 z-20 flex items-center"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div
                className="absolute top-0 bottom-0 w-[3px]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #FFFFFF 10%, #FFFFFF 90%, transparent)",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
              />
              <div
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14"
                style={{
                  background: "#B8952C",
                  boxShadow: "0 10px 24px rgba(184,149,44,0.42), 0 4px 12px rgba(0,0,0,0.16)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M8 5l-5 7 5 7" />
                  <path d="M16 5l5 7-5 7" />
                </svg>
              </div>
            </div>
          </div>

          <motion.p
            className="mt-8 text-center text-sm leading-8 md:text-base"
            style={{ color: "#6f6f74", maxWidth: 760, marginInline: "auto" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Drag the slider to see how we transform empty exhibition spaces into
            stunning, brand-immersive stall experiences. Every detail is crafted
            to leave a lasting impression.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
