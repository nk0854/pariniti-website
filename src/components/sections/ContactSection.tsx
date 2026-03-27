"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";

const stallSizeOptions = ["9 sqm", "12 sqm", "18 sqm", "20 sqm", "24 sqm", "36 sqm"];

const inputStyles = {
  background: "#f6f6f8",
  border: "1px solid rgba(0,0,0,0.08)",
  color: "#1d1d1f",
  outline: "none",
} as const;

const inputFocusClass =
  "focus:border-[#B8952C] focus:shadow-[0_0_0_4px_rgba(184,149,44,0.1)]";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stallSize: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="contact"
      style={{ background: "#f5f5f7" }}
    >
      <div
        className="relative z-10"
        style={{
          maxWidth: 1620,
          margin: "0 auto",
          paddingLeft: "clamp(18px, 2vw, 30px)",
          paddingRight: "clamp(18px, 2vw, 30px)",
        }}
      >
        <motion.div
          className="text-center"
          style={{ marginBottom: 54 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em] md:text-sm"
            style={{ color: "#B8952C" }}
          >
            Get In Touch
          </span>
          <h2
            className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#1d1d1f" }}
          >
            Let&apos;s Create Something <span style={{ color: "#B8952C" }}>Amazing</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.92fr_1.18fr] xl:items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="rounded-[30px]"
              style={{
                padding: "clamp(24px, 4vw, 40px)",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 18px 42px rgba(17,17,17,0.05)",
              }}
            >
              <p
                className="font-semibold uppercase"
                style={{ color: "#B8952C", fontSize: "11px", letterSpacing: "0.28em", marginBottom: "12px" }}
              >
                Contact Details
              </p>
              <h3
                className="font-bold"
                style={{ color: "#1d1d1f", lineHeight: 1.25, fontSize: "24px", marginBottom: "32px" }}
              >
                Tell us about your stall requirement and we&apos;ll shape the right setup.
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div className="flex items-center" style={{ gap: "16px" }}>
                  <div
                    className="flex flex-shrink-0 items-center justify-center"
                    style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(184,149,44,0.09)" }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B8952C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13 2 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold uppercase" style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "4px" }}>
                      Email
                    </p>
                    <a
                      href="mailto:info@parinities.com"
                      className="font-medium transition-colors duration-300 hover:text-[#B8952C]"
                      style={{ color: "#1d1d1f", fontSize: "15px" }}
                      data-cursor="pointer"
                    >
                      info@parinities.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center" style={{ gap: "16px" }}>
                  <div
                    className="flex flex-shrink-0 items-center justify-center"
                    style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(184,149,44,0.09)" }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B8952C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold uppercase" style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "4px" }}>
                      Phone
                    </p>
                    <a
                      href="tel:+919582323720"
                      className="font-medium transition-colors duration-300 hover:text-[#B8952C]"
                      style={{ color: "#1d1d1f", fontSize: "15px" }}
                      data-cursor="pointer"
                    >
                      +91 95823 23720
                    </a>
                  </div>
                </div>

                <div className="flex items-center" style={{ gap: "16px" }}>
                  <div
                    className="flex flex-shrink-0 items-center justify-center"
                    style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(184,149,44,0.09)" }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B8952C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold uppercase" style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "4px" }}>
                      Address
                    </p>
                    <p className="font-medium" style={{ color: "#1d1d1f", fontSize: "15px" }}>
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "32px" }}>
                <p
                  className="font-semibold uppercase"
                  style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "14px" }}
                >
                  Follow Us
                </p>
                <div className="flex flex-wrap" style={{ gap: "10px" }}>
                  {[
                    {
                      label: "Instagram",
                      icon: (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="17.5" cy="6.5" r="1.5" fill="#424245" stroke="none" />
                        </>
                      ),
                    },
                    {
                      label: "LinkedIn",
                      icon: (
                        <>
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </>
                      ),
                    },
                    {
                      label: "Facebook",
                      icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
                    },
                    {
                      label: "X",
                      icon: (
                        <>
                          <path d="M4 4l11.733 16H20L8.267 4H4z" />
                          <path d="M4 20l6.768-6.768M13.232 10.768L20 4" />
                        </>
                      ),
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href="#"
                      aria-label={item.label}
                      className="flex items-center justify-center transition-all duration-300 hover:scale-105"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: "0 8px 18px rgba(17,17,17,0.05)",
                      }}
                      data-cursor="pointer"
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#424245"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {item.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div
                className="rounded-[24px]"
                style={{
                  marginTop: "28px",
                  padding: "20px",
                  background: "linear-gradient(135deg, rgba(184,149,44,0.12), rgba(255,255,255,1))",
                  border: "1px solid rgba(184,149,44,0.18)",
                }}
              >
                <p className="text-base italic leading-8" style={{ color: "#B8952C" }}>
                  &ldquo;We Design Experiences, Not Just Stalls&rdquo;
                </p>
                <p
                  className="mt-3 text-xs font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "#86868b" }}
                >
                  Pariniti Exhibit Solutions
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-[30px]"
              style={{
                padding: "clamp(24px, 4vw, 40px)",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 18px 42px rgba(17,17,17,0.05)",
              }}
            >
              <div style={{ marginBottom: "32px" }}>
                <p
                  className="font-semibold uppercase"
                  style={{ color: "#B8952C", fontSize: "11px", letterSpacing: "0.26em", marginBottom: "12px" }}
                >
                  Project Brief
                </p>
                <h3 className="font-bold" style={{ color: "#1d1d1f", fontSize: "24px", lineHeight: 1.25 }}>
                  Share your event details and we&apos;ll get back with the right plan.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px" }}>
                <div>
                  <label
                    htmlFor="name"
                    className="block font-semibold uppercase"
                    style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full transition-all duration-300 ${inputFocusClass}`}
                    style={{ ...inputStyles, padding: "14px 18px", fontSize: "15px", borderRadius: "12px" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-semibold uppercase"
                    style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full transition-all duration-300 ${inputFocusClass}`}
                    style={{ ...inputStyles, padding: "14px 18px", fontSize: "15px", borderRadius: "12px" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block font-semibold uppercase"
                    style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full transition-all duration-300 ${inputFocusClass}`}
                    style={{ ...inputStyles, padding: "14px 18px", fontSize: "15px", borderRadius: "12px" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="stallSize"
                    className="block font-semibold uppercase"
                    style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}
                  >
                    Stall Size
                  </label>
                  <select
                    id="stallSize"
                    name="stallSize"
                    value={formData.stallSize}
                    onChange={handleChange}
                    className={`w-full appearance-none transition-all duration-300 ${inputFocusClass}`}
                    style={{
                      ...inputStyles,
                      padding: "14px 18px",
                      fontSize: "15px",
                      borderRadius: "12px",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 18px center",
                    }}
                  >
                    <option value="">Select size</option>
                    {stallSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <label
                  htmlFor="message"
                  className="block font-semibold uppercase"
                  style={{ color: "#86868b", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your exhibition requirements, expected event date, and any design ideas you already have..."
                  rows={8}
                  className={`w-full resize-none transition-all duration-300 ${inputFocusClass}`}
                  style={{ ...inputStyles, padding: "14px 18px", fontSize: "15px", borderRadius: "12px", minHeight: 200 }}
                />
              </div>

              <button
                type="submit"
                className="group w-full font-semibold transition-all duration-300"
                style={{
                  marginTop: "24px",
                  padding: "16px",
                  fontSize: "16px",
                  borderRadius: "12px",
                  background: "#B8952C",
                  color: "#FFFFFF",
                  boxShadow: "0 14px 28px rgba(184,149,44,0.24)",
                }}
                data-cursor="pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
