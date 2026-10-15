import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "@/lib/api/services";
import { Service } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Globe,
  Cpu,
  Layout,
  Palette,
  Layers,
  Zap,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Cpu,
  Layout,
  Palette,
  Layers,
  Zap,
  Briefcase,
  Sparkles,
};

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data))
      .catch((err) => console.error("Error loading services:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="purple" dot>
            OUR EXPERTISE
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F7FA]">
            Engineering Services Built for Real Problems
          </h1>
          <p className="text-lg text-[#A5AFBF] leading-relaxed">
            From modern responsive web applications to custom backend automation and high-concurrency cloud systems, explore our full spectrum of technology capabilities.
          </p>
        </div>

        {/* Services List */}
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-[#141B29]/40 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {services.map((service, index) => {
              const IconComp = iconMap[service.icon] || Cpu;

              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="rounded-3xl bg-[#141B29] border border-white/[0.08] p-8 lg:p-12 transition-all duration-300 hover:border-[#7C5CFC]/30 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left: Summary & Problems */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 flex items-center justify-center text-[#9D84FD]">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-[#A5AFBF]/60">0{index + 1} // SERVICE</span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] group-hover:text-[#27D9C3] transition-colors">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-base text-[#A5AFBF] leading-relaxed">
                        {service.description}
                      </p>

                      {/* Business Problems Addressed */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                          Business Challenges Addressed
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A5AFBF]">
                          {service.businessProblems.map((prob, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span>{prob}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#27D9C3]" />
                          Key Deliverables
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A5AFBF]">
                          {service.deliverables.map((deliv, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#27D9C3] mt-1.5 shrink-0" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: Technologies & Process */}
                    <div className="lg:col-span-5 bg-[#101521] rounded-2xl p-6 sm:p-8 border border-white/[0.06] flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA]">
                          Technologies Utilized
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono px-2.5 py-1 rounded bg-[#080B12] text-[#9D84FD] border border-white/[0.06]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-white/[0.06] space-y-3">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA]">
                            Engagement Process
                          </h4>
                          <div className="space-y-2">
                            {service.process.slice(0, 3).map((step) => (
                              <div key={step.step} className="flex items-start gap-3 text-xs">
                                <span className="font-mono text-[#27D9C3] font-semibold">0{step.step}.</span>
                                <div>
                                  <span className="font-semibold text-white">{step.title}</span> —{" "}
                                  <span className="text-[#A5AFBF]">{step.description}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <Link
                          to={`/services/${service.slug}`}
                          className="text-xs font-semibold text-[#7C5CFC] hover:text-[#27D9C3] transition-colors inline-flex items-center gap-1"
                        >
                          <span>Full Specifications</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <Button href="/contact" size="sm" variant="primary">
                          Inquire
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
