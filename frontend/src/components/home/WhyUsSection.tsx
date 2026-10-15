import React from "react";
import { companyData } from "@/data/mock/company";
import { Lightbulb, Code2, Network, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="w-6 h-6 text-[#7C5CFC]" />,
  Code2: <Code2 className="w-6 h-6 text-[#27D9C3]" />,
  Network: <Network className="w-6 h-6 text-[#9D84FD]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-emerald-400" />,
};

export function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#101521] relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#27D9C3] bg-[#27D9C3]/10 px-3 py-1 rounded-full border border-[#27D9C3]/20">
            ENGINEERING PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            More Than Just Code.
          </h2>
          <p className="text-base sm:text-lg text-[#A5AFBF] leading-relaxed">
            Writing code is merely the final step of problem-solving. We approach technology with intellectual discipline, systems thinking, and deep respect for our clients&apos; vision.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyData.engineeringPhilosophy.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl bg-[#141B29] border border-white/[0.08] p-7 flex flex-col justify-between hover:border-[#7C5CFC]/40 hover:bg-[#182133] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {iconMap[item.icon] || <Code2 className="w-6 h-6 text-[#7C5CFC]" />}
                </div>

                <div className="text-xs font-mono text-[#A5AFBF]/60 mb-2">0{index + 1} // PRINCIPLE</div>
                <h3 className="text-lg font-bold text-[#F5F7FA] mb-3 group-hover:text-[#27D9C3] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A5AFBF] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <div className="h-1 w-8 bg-[#7C5CFC]/30 rounded-full group-hover:w-16 group-hover:bg-[#27D9C3] transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
