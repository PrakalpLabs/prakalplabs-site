import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 md:py-36 bg-[#080B12] relative overflow-hidden text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7C5CFC]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Central futuristic aircraft / core graphic with glowing circuit traces (from theme.mp4 00:10-00:12) */}
        <div className="relative w-full max-w-lg mx-auto h-36 flex items-center justify-center">
          {/* Left glowing circuit traces */}
          <div className="absolute left-0 w-40 h-24 hidden sm:block">
            <svg className="w-full h-full" viewBox="0 0 160 80">
              <path
                d="M 10,40 L 60,40 L 90,20 L 150,20 M 30,60 L 80,60 L 110,40 L 150,40 M 50,15 L 90,15 L 120,35 L 150,35"
                fill="none"
                stroke="#7C5CFC"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                opacity="0.6"
              />
              <circle cx="10" cy="40" r="3" fill="#27D9C3" />
              <circle cx="30" cy="60" r="3" fill="#7C5CFC" />
            </svg>
          </div>

          {/* Right glowing circuit traces */}
          <div className="absolute right-0 w-40 h-24 hidden sm:block">
            <svg className="w-full h-full" viewBox="0 0 160 80">
              <path
                d="M 150,40 L 100,40 L 70,20 L 10,20 M 130,60 L 80,60 L 50,40 L 10,40 M 110,15 L 70,15 L 40,35 L 10,35"
                fill="none"
                stroke="#7C5CFC"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                opacity="0.6"
              />
              <circle cx="150" cy="40" r="3" fill="#27D9C3" />
              <circle cx="130" cy="60" r="3" fill="#7C5CFC" />
            </svg>
          </div>

          {/* Center Supersonic / Core Emblem */}
          <div className="relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#141B29] to-[#0A0E17] border-2 border-[#7C5CFC]/50 flex items-center justify-center shadow-2xl shadow-[#7C5CFC]/40 group hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12 text-[#F5F7FA] drop-shadow-[0_0_12px_rgba(124,92,252,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Aircraft / Arrowhead silhouette */}
              <path d="M12 2L4 20L12 17L20 20L12 2Z" fill="url(#ctaGrad)" stroke="#7C5CFC" />
              <defs>
                <linearGradient id="ctaGrad" x1="12" y1="2" x2="12" y2="20">
                  <stop offset="0%" stopColor="#7C5CFC" />
                  <stop offset="100%" stopColor="#27D9C3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F7FA]">
            Have an Idea Worth Building?
          </h2>
          <p className="text-base sm:text-lg text-[#A5AFBF] leading-relaxed">
            Let&apos;s discuss your vision and explore how we can bring it to life with modern architecture, thoughtful design, and production-tested engineering.
          </p>
        </div>

        <div>
          <Button href="/contact" size="lg" variant="primary">
            Start a Conversation
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
