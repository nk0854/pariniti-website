"use client";

import { useState } from "react";

export default function WhatsAppButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-[9990] flex items-center gap-3">
      {/* Tooltip */}
      <div
        className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 pointer-events-none"
        style={{
          backgroundColor: "#ffffff",
          color: "#1d1d1f",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          opacity: isTooltipVisible ? 1 : 0,
          transform: isTooltipVisible
            ? "translateX(0px)"
            : "translateX(10px)",
        }}
      >
        Chat with us
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919582323720"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer"
        style={{
          backgroundColor: "#25D366",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow =
            "0 6px 24px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.08)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)";
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          width="28"
          height="28"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.924 15.924 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.32 22.6c-.39 1.1-1.932 2.014-3.182 2.28-.854.182-1.968.326-5.72-1.23-4.8-1.988-7.886-6.862-8.124-7.18-.228-.318-1.924-2.562-1.924-4.886 0-2.324 1.218-3.466 1.65-3.94.392-.428 1.03-.624 1.64-.624.198 0 .376.01.536.018.47.02.706.048 1.016.788.39.926 1.338 3.268 1.456 3.506.12.238.198.516.04.828-.15.318-.228.516-.456.79-.228.278-.478.62-.684.832-.228.234-.466.488-.2.958.266.47 1.182 1.95 2.538 3.16 1.744 1.554 3.214 2.036 3.668 2.262.47.228.742.19 1.016-.114.278-.318 1.186-1.382 1.504-1.856.31-.47.628-.39 1.06-.234.436.152 2.762 1.304 3.234 1.542.47.238.786.358.902.554.118.198.118 1.14-.272 2.24z" />
        </svg>
      </a>
    </div>
  );
}
