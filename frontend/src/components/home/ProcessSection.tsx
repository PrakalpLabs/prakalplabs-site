import React, { useState } from "react";
import { companyData } from "@/data/mock/company";
import { Search, Compass, Terminal, Rocket, Repeat } from "lucide-react";

const processIcons: Record<string, React.ReactNode> = {
  "01": <Search className="w-5 h-5 text-[#7C5CFC]" />,
  "02": <Compass className="w-5 h-5 text-[#27D9C3]" />,
  "03": <Terminal className="w-5 h-5 text-[#9D84FD]" />,
  "04": <Rocket className="w-5 h-5 text-amber-400" />,
  "05": <Repeat className="w-5 h-5 text-emerald-400" />,
};

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-[#101521] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#7C5CFC] bg-[#7C5CFC]/10 px-3 py-1 rounded-full border border-[#7C5CFC]/20">
            ENGAGEMENT LIFECYCLE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            From Idea to Impact
          </h2>
          <p className="text-base sm:text-lg text-[#A5AFBF] leading-relaxed">
            A structured, repeatable engineering process that minimizes technical risk, accelerates feedback loops, and guarantees production reliability.
          </p>
        </div>

        {/* Process Timeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {companyData.approach.map((item, idx) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                activeStep === idx
                  ? "bg-[#141B29] border-[#7C5CFC] shadow-lg shadow-[#7C5CFC]/15 -translate-y-1"
                  : "bg-[#080B12]/60 border-white/[0.06] hover:border-white/20 hover:bg-[#141B29]/60"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#A5AFBF]/60">{item.step}</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  {processIcons[item.step]}
                </div>
              </div>
              <h3 className="text-base font-bold text-[#F5F7FA] mb-1">{item.title}</h3>
              <p className="text-xs text-[#A5AFBF] line-clamp-2">{item.description}</p>
            </button>
          ))}
        </div>

        {/* Step Deep-Dive Canvas */}
        <div className="rounded-3xl bg-[#141B29] border border-white/[0.08] p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#27D9C3] bg-[#27D9C3]/10 px-3 py-1 rounded-full">
                <span>PHASE {companyData.approach[activeStep].step}</span>
                <span>//</span>
                <span>{companyData.approach[activeStep].title.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
                {companyData.approach[activeStep].title} — {companyData.approach[activeStep].description}
              </h3>
              <p className="text-sm sm:text-base text-[#A5AFBF] leading-relaxed">
                During this phase, our team collaborates directly with your stakeholders to eliminate ambiguities, establish measurable success metrics, and produce documented technical specifications before writing code.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#080B12] rounded-2xl p-6 border border-white/[0.06] space-y-4">
              <div className="text-xs font-mono text-[#A5AFBF]/70 uppercase">Standard Deliverables</div>
              <ul className="space-y-2 text-xs text-[#F5F7FA]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC]" />
                  <span>Architecture &amp; Data Contract Schema</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27D9C3]" />
                  <span>Automated CI/CD Pipeline Config</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Security &amp; Vulnerability Matrix</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Telemetry &amp; SLA Monitor Runbook</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
