import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServiceBySlug } from "@/lib/api/services";
import { Service } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, AlertCircle, Cpu, ArrowUpRight } from "lucide-react";

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getServiceBySlug(slug)
        .then((data) => setService(data))
        .catch((err) => console.error("Error loading service detail:", err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#7C5CFC] border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono text-[#A5AFBF]">Loading service specifications...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Service Not Found</h2>
        <p className="text-sm text-[#A5AFBF]">The requested service specification could not be located.</p>
        <Button href="/services" variant="secondary">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Services
        </Button>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back navigation */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A5AFBF] hover:text-[#7C5CFC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Services
        </Link>

        {/* Hero */}
        <div className="space-y-6">
          <Badge variant="purple" dot>
            SERVICE SPECIFICATION
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
            {service.title}
          </h1>
          <p className="text-lg text-[#A5AFBF] leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </div>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Business Problems Addressed */}
          <div className="p-8 rounded-3xl bg-[#141B29] border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-bold text-[#F5F7FA] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              Business Challenges Addressed
            </h3>
            <ul className="space-y-3 text-sm text-[#A5AFBF]">
              {service.businessProblems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables */}
          <div className="p-8 rounded-3xl bg-[#141B29] border border-white/[0.08] space-y-4">
            <h3 className="text-lg font-bold text-[#F5F7FA] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#27D9C3]" />
              Key Deliverables
            </h3>
            <ul className="space-y-3 text-sm text-[#A5AFBF]">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27D9C3] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies & Capabilities */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#101521] border border-white/[0.08] space-y-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#F5F7FA]">Primary Technology Stack</h3>
            <div className="flex flex-wrap gap-2.5">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-xl bg-[#080B12] text-sm font-mono text-[#9D84FD] border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] space-y-3">
            <h3 className="text-xl font-bold text-[#F5F7FA]">Core Technical Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-[#A5AFBF]">
                  <span className="w-2 h-2 rounded-full bg-[#7C5CFC]" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Process */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[#F5F7FA]">Engagement Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.process.map((step) => (
              <div key={step.step} className="p-6 rounded-2xl bg-[#141B29] border border-white/[0.06] space-y-2">
                <span className="text-xs font-mono text-[#27D9C3]">PHASE 0{step.step}</span>
                <h4 className="text-base font-bold text-white">{step.title}</h4>
                <p className="text-xs text-[#A5AFBF] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#141B29] to-[#1C1335] border border-[#7C5CFC]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#F5F7FA]">Ready to build with {service.title}?</h3>
            <p className="text-sm text-[#A5AFBF] mt-1">Let&apos;s evaluate your requirements and scope a tailored engineering engagement.</p>
          </div>
          <Button href="/contact" size="lg" variant="primary">
            Start a Conversation
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
