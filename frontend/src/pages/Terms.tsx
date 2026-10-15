import React from "react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";

export function TermsPage() {
  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Badge variant="purple">TERMS &amp; CONDITIONS</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA]">Terms of Service</h1>
        <p className="text-sm text-[#A5AFBF] leading-relaxed">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-sm text-[#A5AFBF] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Scope of Services</h2>
            <p>
              {siteConfig.name} provides software engineering, website development, product design, and technology consulting. All specific commercial deliverables, milestones, and payment terms are governed by signed Statements of Work (SOW).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Intellectual Property</h2>
            <p>
              Unless otherwise agreed in a customized development contract, clients retain full ownership of custom code, business logic, and intellectual property developed exclusively for their projects upon complete payment settlement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Demonstration Content</h2>
            <p>
              Portions of this website displaying sample architectures, telemetry metrics, and demonstration builds are presented for technical capability illustration and do not represent endorsements or claims on third-party trademarks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Contact &amp; Governance</h2>
            <p>
              Legal inquiries and contract notices may be directed to{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#7C5CFC] underline">
                {siteConfig.contactEmail}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
