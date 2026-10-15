import React from "react";
import { companyData } from "@/data/mock/company";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Lightbulb,
  Code2,
  Network,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from "lucide-react";

export function AboutPage() {
  const iconList = [Lightbulb, Code2, Network, TrendingUp];

  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header Hero */}
        <div className="max-w-3xl space-y-6">
          <Badge variant="purple" dot>
            ABOUT PRAKALP LABS
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F7FA] leading-tight">
            We build software for businesses that value{" "}
            <span className="bg-gradient-to-r from-[#7C5CFC] to-[#27D9C3] bg-clip-text text-transparent">
              craftsmanship and durability.
            </span>
          </h1>
          <p className="text-lg text-[#A5AFBF] leading-relaxed">
            {companyData.longDescription}
          </p>
        </div>

        {/* Mission & Vision Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#141B29] border border-white/[0.08] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#7C5CFC]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="text-xs font-mono text-[#9D84FD] uppercase tracking-wider mb-3">
              OUR PURPOSE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] mb-4">
              Our Mission
            </h2>
            <p className="text-base text-[#A5AFBF] leading-relaxed">
              {companyData.mission}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#141B29] border border-white/[0.08] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#27D9C3]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="text-xs font-mono text-[#27D9C3] uppercase tracking-wider mb-3">
              THE HORIZON
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] mb-4">
              Our Vision
            </h2>
            <p className="text-base text-[#A5AFBF] leading-relaxed">
              {companyData.vision}
            </p>
          </div>
        </div>

        {/* Engineering Philosophy Section */}
        <div id="philosophy" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <Badge variant="cyan">CORE PRINCIPLES</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA]">
              Engineering Philosophy
            </h2>
            <p className="text-[#A5AFBF] leading-relaxed">
              Our daily technical decisions are governed by four foundational guidelines that protect our clients from technical debt and architectural dead-ends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyData.engineeringPhilosophy.map((item, index) => {
              const IconComp = iconList[index % iconList.length];
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-[#101521] border border-white/[0.06] hover:border-[#7C5CFC]/40 transition-colors space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 flex items-center justify-center text-[#9D84FD]">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono text-[#A5AFBF]/60">PRINCIPLE 0{index + 1}</div>
                  <h3 className="text-xl font-bold text-[#F5F7FA]">{item.title}</h3>
                  <p className="text-sm text-[#A5AFBF] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <Badge variant="purple">HOW WE OPERATE</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA]">
              Organizational Values
            </h2>
            <p className="text-[#A5AFBF] leading-relaxed">
              What you can expect from our engineers, designers, and project leads during any engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.values.map((val) => (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-[#141B29] border border-white/[0.06] space-y-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#27D9C3]" />
                <h3 className="text-lg font-bold text-[#F5F7FA]">{val.title}</h3>
                <p className="text-xs text-[#A5AFBF] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security / Compliance note */}
        <div id="security" className="p-8 sm:p-12 rounded-3xl bg-[#101521] border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#27D9C3]" />
            <h3 className="text-2xl font-bold text-[#F5F7FA]">
              Commitment to Code Quality and Security
            </h3>
          </div>
          <p className="text-sm text-[#A5AFBF] leading-relaxed max-w-4xl">
            We avoid shortcuts that jeopardize data protection. Every project follows strict code review guidelines, automated dependency vulnerability scans, encrypted credential management, and role-based access control.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary">
              Discuss Your Project
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
