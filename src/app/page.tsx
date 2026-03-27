"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// UI Components
import Navbar from "@/components/ui/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import StickyCTA from "@/components/ui/StickyCTA";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

// 3D Components (dynamic import with no SSR)
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#B8952C] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || "0.5");
        gsap.to(el, {
          yPercent: speed * 20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    };

    if (!isLoading) {
      initGSAP();
    }
  }, [isLoading]);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <main className="relative bg-white">
          <Navbar />

          {/* Hero with 3D on the right side */}
          <section id="home" className="relative">
            <HeroSection />
            {/* 3D scene positioned on the right half */}
            <div
              className="hidden lg:block absolute top-0 right-0 h-full"
              style={{ width: "50%", zIndex: 5 }}
            >
              <div className="w-full h-full">
                <HeroScene />
              </div>
            </div>
            {/* Mobile: 3D below hero */}
            <div className="lg:hidden page-container" style={{ marginTop: -20, marginBottom: 40 }}>
              <div style={{ height: "clamp(260px, 50vw, 400px)" }}>
                <HeroScene />
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services">
            <ServicesSection />
          </section>

          {/* Portfolio */}
          <section id="portfolio">
            <PortfolioSection />
          </section>

          {/* Before After */}
          <section>
            <BeforeAfterSection />
          </section>

          {/* Events */}
          <section id="events">
            <EventsSection />
          </section>

          {/* Testimonials */}
          <section>
            <TestimonialsSection />
          </section>

          {/* Contact */}
          <section id="contact">
            <ContactSection />
          </section>

          {/* Footer */}
          <FooterSection />

          {/* Floating CTAs */}
          <WhatsAppButton />
          <StickyCTA />
        </main>
      )}
    </>
  );
}
