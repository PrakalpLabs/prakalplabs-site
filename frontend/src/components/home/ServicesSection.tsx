import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "@/lib/api/services";
import { Service } from "@/types";
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

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data))
      .catch((err) => console.error("Error loading services:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#080B12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7C5CFC] bg-[#7C5CFC]/10 px-3 py-1 rounded-full border border-[#7C5CFC]/20">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
              What We Do
            </h2>
            <p className="text-base sm:text-lg text-[#A5AFBF] leading-relaxed">
              Technology solutions built around real business problems and ambitious product ideas.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9D84FD] hover:text-white transition-colors group"
          >
            <span>Explore All 8 Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-[#141B29]/50 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Cpu;

              return (
                <div
                  key={service.id}
                  className="rounded-2xl bg-[#141B29] border border-white/[0.08] p-7 flex flex-col justify-between hover:border-[#7C5CFC]/40 hover:bg-[#182133] hover:shadow-2xl hover:shadow-[#7C5CFC]/5 transition-all duration-300 group"
                >
                  <div className="space-y-5">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 flex items-center justify-center text-[#9D84FD] group-hover:scale-105 group-hover:bg-[#7C5CFC] group-hover:text-white transition-all duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#F5F7FA] group-hover:text-[#27D9C3] transition-colors mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#A5AFBF] leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Capabilities list */}
                    {service.capabilities && (
                      <ul className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                        {service.capabilities.slice(0, 3).map((cap, idx) => (
                          <li key={idx} className="text-xs text-[#A5AFBF]/80 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#7C5CFC]" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Footer link */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06]">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C5CFC] group-hover:text-[#27D9C3] transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
