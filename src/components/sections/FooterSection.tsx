"use client";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Stall Fabrication", href: "#services" },
  { label: "Stall Branding", href: "#services" },
  { label: "Event Planning", href: "#services" },
];

export default function FooterSection() {
  return (
    <footer
      className="relative"
      style={{ background: "#1d1d1f" }}
    >
      {/* Top gold line */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 5%, #B8952C 20%, #B8952C 80%, transparent 95%)",
          opacity: 0.4,
        }}
      />

      <div className="page-container" style={{ paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Column 1: Brand */}
          <div className="text-center md:text-left">
            <div className="mb-6">
              <span
                className="text-3xl font-bold tracking-[0.15em]"
                style={{
                  background:
                    "linear-gradient(135deg, #B8952C, #D4C06A, #B8952C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                PARINITI
              </span>
              <span
                className="block text-xs tracking-[0.4em] uppercase mt-2"
                style={{ color: "rgba(184,149,44,0.5)" }}
              >
                Exhibit Solutions
              </span>
            </div>
            <p
              className="text-base leading-relaxed mb-8 max-w-sm mx-auto md:mx-0"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              India&apos;s leading exhibition stall fabrication and branding
              company. Transforming empty spaces into powerful brand experiences
              that leave lasting impressions.
            </p>
            <p
              className="text-base italic"
              style={{ color: "rgba(184,149,44,0.5)" }}
            >
              &ldquo;We Design Experiences, Not Just Stalls&rdquo;
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left">
            <h4
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-8"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base transition-colors duration-300 hover:text-[#B8952C] inline-flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    data-cursor="pointer"
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-300"
                      style={{ background: "#B8952C" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="text-center md:text-left">
            <h4
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-8"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Services
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base transition-colors duration-300 hover:text-[#B8952C] inline-flex items-center gap-2 group"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    data-cursor="pointer"
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-300"
                      style={{ background: "#B8952C" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="page-container" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-sm tracking-wide"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              &copy; 2025 Pariniti Exhibit Solutions. All rights reserved.
            </p>
            <p
              className="text-sm tracking-wide flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Designed with
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#B8952C"
                stroke="none"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              precision
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
