import React from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-[#080B12] hero-curved-container tech-radial-glow">
      {/* Subtle grid background overlay */}
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />

      {/* Ambient background light gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#7C5CFC]/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#27D9C3]/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block">
              <Badge variant="purple" dot>
                {siteConfig.smallLabel}
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F7FA] leading-[1.1] font-sans">
                Turning Ideas Into{" "}
                <span className="bg-gradient-to-r from-[#7C5CFC] via-[#9D84FD] to-[#27D9C3] bg-clip-text text-transparent">
                  Powerful Solutions.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#A5AFBF] leading-relaxed max-w-2xl font-normal">
                {siteConfig.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="/contact" size="lg" variant="primary">
                Start a Project
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <Button href="/projects" size="lg" variant="secondary">
                Explore Our Work
                <ArrowRight className="w-4 h-4 ml-1 text-[#A5AFBF]" />
              </Button>
            </div>

            {/* Engineering Highlights */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#A5AFBF] mb-1">
                  <Activity className="w-3.5 h-3.5 text-[#27D9C3]" />
                  <span>Uptime</span>
                </div>
                <div className="text-xl font-bold text-[#F5F7FA] font-mono">99.98%</div>
                <div className="text-[11px] text-[#A5AFBF]/70">Engineered SLA</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#A5AFBF] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7C5CFC]" />
                  <span>Safety</span>
                </div>
                <div className="text-xl font-bold text-[#F5F7FA] font-mono">100%</div>
                <div className="text-[11px] text-[#A5AFBF]/70">Strict Type Safety</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#A5AFBF] mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Stack</span>
                </div>
                <div className="text-xl font-bold text-[#F5F7FA] font-mono">Zero</div>
                <div className="text-[11px] text-[#A5AFBF]/70">Vendor Lock-In</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Futuristic Engineering Visual inspired by theme.mp4 */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
              {/* Glowing Aura Rings */}
              <div className="absolute inset-0 rounded-full border border-[#7C5CFC]/20 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-[#27D9C3]/15 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-[#7C5CFC]/10 to-transparent blur-xl" />

              {/* Central Abstract Aerodynamic / Engineering Core */}
              <div className="relative z-10 w-72 h-72 rounded-3xl bg-gradient-to-br from-[#141B29] to-[#0A0E17] border border-white/10 p-6 shadow-2xl shadow-[#7C5CFC]/20 flex flex-col justify-between overflow-hidden group">
                {/* Circuit node lines in background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path
                      d="M 10,20 L 40,20 L 60,40 L 90,40 M 20,80 L 50,80 L 70,60 L 90,60"
                      fill="none"
                      stroke="#7C5CFC"
                      strokeWidth="1"
                    />
                    <circle cx="10" cy="20" r="2" fill="#27D9C3" />
                    <circle cx="60" cy="40" r="2" fill="#7C5CFC" />
                    <circle cx="90" cy="60" r="2" fill="#27D9C3" />
                  </svg>
                </div>

                {/* Top status bar inside card */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    ACTIVE SYSTEM
                  </span>
                  <span className="text-[#A5AFBF]/60 text-[10px]">CORE-v2.6</span>
                </div>

                {/* Center visual: Sleek curved aerodynamic wireframe */}
                <div className="relative my-auto flex items-center justify-center py-4">
                  <svg className="w-48 h-28 drop-shadow-[0_0_15px_rgba(124,92,252,0.4)]" viewBox="0 0 200 120">
                    <defs>
                      <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7C5CFC" />
                        <stop offset="50%" stopColor="#9D84FD" />
                        <stop offset="100%" stopColor="#27D9C3" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10,85 C 60,85 100,20 190,15 C 130,45 80,95 10,85 Z"
                      fill="url(#curveGrad)"
                      opacity="0.85"
                    />
                    <path
                      d="M 20,90 C 70,90 110,35 185,25"
                      fill="none"
                      stroke="#27D9C3"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <circle cx="190" cy="15" r="3.5" fill="#27D9C3" />
                    <circle cx="10" cy="85" r="3.5" fill="#7C5CFC" />
                  </svg>
                </div>

                {/* Live simulated metrics at bottom of card */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.08] text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#A5AFBF]/70 block">Latency</span>
                    <span className="text-[#27D9C3] font-semibold">14.2ms avg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A5AFBF]/70 block">Throughput</span>
                    <span className="text-[#F5F7FA] font-semibold">12,400 req/s</span>
                  </div>
                </div>
              </div>

              {/* Floating pill badge 1: Top Right */}
              <div className="absolute -top-3 -right-2 z-20 bg-[#141B29]/90 border border-white/10 rounded-2xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#7C5CFC]/20 flex items-center justify-center text-[#9D84FD]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#F5F7FA]">Zero Config Drift</div>
                  <div className="text-[9px] text-emerald-400 font-mono">Continuous Sync</div>
                </div>
              </div>

              {/* Floating pill badge 2: Bottom Left */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-[#141B29]/90 border border-white/10 rounded-2xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#27D9C3]/20 flex items-center justify-center text-[#27D9C3]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#F5F7FA]">Architecture Audit</div>
                  <div className="text-[9px] text-[#A5AFBF] font-mono">100% Score Passed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
