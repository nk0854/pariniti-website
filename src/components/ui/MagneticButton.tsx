"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "filled" | "outlined";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function MagneticButton({
  children,
  variant = "filled",
  onClick,
  className = "",
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull toward cursor (subtle)
      const pullStrength = 0.3;
      el.style.transform = `translate(${x * pullStrength}px, ${y * pullStrength}px) scale(1.05)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px) scale(1)";
  }, []);

  const filledStyles: React.CSSProperties = {
    background: "linear-gradient(135deg, #D4AF37, #B8972E, #D4AF37)",
    color: "#0A0A0A",
    border: "none",
    boxShadow: "0 0 0px rgba(212, 175, 55, 0)",
  };

  const outlinedStyles: React.CSSProperties = {
    background: "transparent",
    color: "#D4AF37",
    border: "1px solid rgba(212, 175, 55, 0.5)",
    boxShadow: "0 0 0px rgba(212, 175, 55, 0)",
  };

  const baseStyles: React.CSSProperties = {
    ...(variant === "filled" ? filledStyles : outlinedStyles),
    transition:
      "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.3s ease",
    willChange: "transform",
  };

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.boxShadow =
        variant === "filled"
          ? "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.15)"
          : "0 0 25px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(212, 175, 55, 0.05)";
    },
    [variant]
  );

  const handleMouseLeaveStyles = useCallback(
    (e: React.MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.boxShadow = "0 0 0px rgba(212, 175, 55, 0)";
    },
    []
  );

  const sharedProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className: `inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.1em] uppercase cursor-pointer ${className}`,
    style: baseStyles,
    onMouseMove: handleMouseMove,
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      handleMouseLeaveStyles(e);
    },
    onMouseEnter: handleMouseEnter,
    "data-cursor": "pointer" as const,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...sharedProps} type="button">
      {children}
    </button>
  );
}
