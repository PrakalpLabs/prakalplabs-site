import React from "react";
import { ShieldCheck, Lock, CheckCircle, Award } from "lucide-react";

export function SecurityBanner() {
  return (
    <section className="py-16 bg-[#080B12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0D121D] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle background ambient light */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7C5CFC]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#27D9C3] bg-[#27D9C3]/10 px-3 py-1 rounded-full border border-[#27D9C3]/20">
                DATA PRIVACY &amp; SECURITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
                Enterprise-Grade Security &amp; Compliance
              </h3>
              <p className="text-sm text-[#A5AFBF] leading-relaxed">
                Experience systems designed with zero-trust architectural principles, end-to-end encryption, and rigorous data protection standards.
              </p>
            </div>

            {/* Right: Circular Seals from theme.mp4 */}
            <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-5">
              {/* Seal 1: SOC 2 */}
              <div className="w-24 h-24 rounded-full bg-[#141B29] border-2 border-white/10 p-2 flex flex-col items-center justify-center text-center shadow-lg hover:border-[#7C5CFC] transition-colors group">
                <span className="text-[9px] font-mono text-[#A5AFBF]/70 block">AUDITED</span>
                <span className="text-xs font-bold text-[#F5F7FA] font-mono mt-0.5 group-hover:text-[#9D84FD]">
                  SOC2
                </span>
                <span className="text-[8px] font-mono text-emerald-400">TYPE II</span>
              </div>

              {/* Seal 2: ISO 27001 */}
              <div className="w-24 h-24 rounded-full bg-[#141B29] border-2 border-white/10 p-2 flex flex-col items-center justify-center text-center shadow-lg hover:border-[#27D9C3] transition-colors group">
                <span className="text-[9px] font-mono text-[#A5AFBF]/70 block">SECURITY</span>
                <span className="text-xs font-bold text-[#F5F7FA] font-mono mt-0.5 group-hover:text-[#27D9C3]">
                  ISO
                </span>
                <span className="text-[8px] font-mono text-[#27D9C3]">27001</span>
              </div>

              {/* Seal 3: GDPR */}
              <div className="w-24 h-24 rounded-full bg-[#141B29] border-2 border-white/10 p-2 flex flex-col items-center justify-center text-center shadow-lg hover:border-amber-400 transition-colors group">
                <span className="text-[9px] font-mono text-[#A5AFBF]/70 block">PRIVACY</span>
                <span className="text-xs font-bold text-[#F5F7FA] font-mono mt-0.5 group-hover:text-amber-400">
                  GDPR
                </span>
                <span className="text-[8px] font-mono text-amber-400">COMPLIANT</span>
              </div>

              {/* Seal 4: 99.99% SLA */}
              <div className="w-24 h-24 rounded-full bg-[#141B29] border-2 border-white/10 p-2 flex flex-col items-center justify-center text-center shadow-lg hover:border-emerald-400 transition-colors group">
                <span className="text-[9px] font-mono text-[#A5AFBF]/70 block">RELIABILITY</span>
                <span className="text-xs font-bold text-[#F5F7FA] font-mono mt-0.5 group-hover:text-emerald-400">
                  99.99%
                </span>
                <span className="text-[8px] font-mono text-emerald-400">UPTIME</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
