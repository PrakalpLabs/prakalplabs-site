import React from "react";
import { Hero } from "@/components/home/Hero";
import { OnePlatformBento } from "@/components/home/OnePlatformBento";
import { InteractiveShowcase } from "@/components/home/InteractiveShowcase";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { SecurityBanner } from "@/components/home/SecurityBanner";
import { CtaSection } from "@/components/home/CtaSection";

export function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <OnePlatformBento />
      <InteractiveShowcase />
      <ServicesSection />
      <WhyUsSection />
      <ProjectsSection />
      <ProcessSection />
      <IntegrationsSection />
      <SecurityBanner />
      <CtaSection />
    </div>
  );
}
