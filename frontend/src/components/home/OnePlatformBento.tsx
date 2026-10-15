import React from "react";
import { TrendingUp, Sparkles, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function OnePlatformBento() {
  return (
    <section className="py-20 md:py-28 bg-[#080B12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#7C5CFC] bg-[#7C5CFC]/10 px-3 py-1 rounded-full border border-[#7C5CFC]/20">
            ENGINEERING EXCELLENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            One platform. Built for scale, speed, and precision.
          </h2>
          <p className="text-base sm:text-lg text-[#A5AFBF] leading-relaxed">
            Discover how our proven software engineering methods transform ambitious concepts into dependable, high-performing digital platforms.
          </p>
        </div>

        {/* 3 Bento Cards Grid (from theme.mp4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Bento Card 1: Increased Efficiency */}
          <div className="rounded-3xl bg-[#141B29]/90 border border-white/[0.08] p-6 lg:p-8 flex flex-col justify-between hover:border-[#7C5CFC]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7C5CFC]/5 group">
            {/* Visual Top Area */}
            <div className="rounded-2xl bg-[#101521] border border-white/[0.06] p-5 mb-8">
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Efficiency Peak
                </span>
                <span className="text-[#A5AFBF]/60">+74%</span>
              </div>

              {/* Sparkline Bar Visualization */}
              <div className="space-y-2">
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  {[35, 45, 40, 60, 55, 75, 70, 85, 90, 95, 100].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-[#7C5CFC]/20 to-[#27D9C3] rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-[#A5AFBF]/60 font-mono pt-1">
                  <span>BASELINE</span>
                  <span className="text-[#27D9C3]">OPTIMIZED</span>
                </div>
              </div>
            </div>

            {/* Content Bottom */}
            <div>
              <h3 className="text-xl font-bold text-[#F5F7FA] mb-2 group-hover:text-[#27D9C3] transition-colors">
                Increased Efficiency
              </h3>
              <p className="text-sm text-[#A5AFBF] leading-relaxed">
                Never miss an operational opportunity. Use intelligent event pipelines that process tasks with sub-millisecond precision, seamlessly synchronizing data into your databases.
              </p>
            </div>
          </div>

          {/* Bento Card 2: Comprehensive Intelligence (Highlight Card in theme.mp4) */}
          <div className="rounded-3xl bg-gradient-to-b from-[#1C1335] to-[#141B29] border border-[#7C5CFC]/40 p-6 lg:p-8 flex flex-col justify-between shadow-xl shadow-[#7C5CFC]/10 transition-all duration-300 hover:border-[#7C5CFC] group">
            {/* Visual Top Area: Glowing Purple Chart */}
            <div className="rounded-2xl bg-[#0F0C1D] border border-[#7C5CFC]/30 p-5 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C5CFC]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-[#9D84FD] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Core Telemetry
                </span>
                <span className="text-xs text-[#27D9C3] font-mono font-bold">+99.2%</span>
              </div>

              {/* Glowing SVG Step Wave */}
              <div className="h-20 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 160 60">
                  <defs>
                    <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 5,50 L 30,42 L 55,45 L 80,30 L 105,25 L 130,12 L 155,8"
                    fill="none"
                    stroke="#7C5CFC"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 5,50 L 30,42 L 55,45 L 80,30 L 105,25 L 130,12 L 155,8 L 155,60 L 5,60 Z"
                    fill="url(#purpleGlow)"
                  />
                  <circle cx="155" cy="8" r="4" fill="#27D9C3" className="animate-pulse" />
                </svg>
              </div>

              <div className="pt-2 text-[11px] text-[#A5AFBF] font-mono flex items-center justify-between">
                <span>Multi-Source Feed</span>
                <span className="text-emerald-400">Synced</span>
              </div>
            </div>

            {/* Content Bottom */}
            <div>
              <h3 className="text-xl font-bold text-[#F5F7FA] mb-2 group-hover:text-[#9D84FD] transition-colors">
                Comprehensive Intelligence
              </h3>
              <p className="text-sm text-[#A5AFBF] leading-relaxed">
                Connect structured and unstructured data across your enterprise. Turn disparate data into unified, actionable insights with bespoke dashboards and algorithmic analysis.
              </p>
            </div>
          </div>

          {/* Bento Card 3: Smarter Architecture */}
          <div className="rounded-3xl bg-[#141B29]/90 border border-white/[0.08] p-6 lg:p-8 flex flex-col justify-between hover:border-[#27D9C3]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#27D9C3]/5 group">
            {/* Visual Top Area: Clean component table */}
            <div className="rounded-2xl bg-[#101521] border border-white/[0.06] p-5 mb-8">
              <div className="text-[11px] font-mono text-[#A5AFBF]/70 uppercase pb-2 mb-2 border-b border-white/[0.06] flex justify-between">
                <span>Service Node</span>
                <span>Latency</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-[#F5F7FA] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    AUTH-GATEWAY
                  </span>
                  <span className="text-[#27D9C3]">12ms</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-[#F5F7FA] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    EVENT-PIPELINE
                  </span>
                  <span className="text-[#7C5CFC]">4ms</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#F5F7FA] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    STATE-CACHE
                  </span>
                  <span className="text-emerald-400">1ms</span>
                </div>
              </div>
            </div>

            {/* Content Bottom */}
            <div>
              <h3 className="text-xl font-bold text-[#F5F7FA] mb-2 group-hover:text-[#27D9C3] transition-colors">
                Smarter Architecture
              </h3>
              <p className="text-sm text-[#A5AFBF] leading-relaxed">
                Eliminate technical debt and optimize cloud infrastructure before scaling. Build with decoupled microservices, resilient caching, and automated failover guarantees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
