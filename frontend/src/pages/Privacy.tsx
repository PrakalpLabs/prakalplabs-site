import React from "react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";

export function PrivacyPage() {
  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Badge variant="purple">LEGAL &amp; COMPLIANCE</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA]">Privacy Policy</h1>
        <p className="text-sm text-[#A5AFBF] leading-relaxed">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-sm text-[#A5AFBF] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information Collection</h2>
            <p>
              {siteConfig.name} collects only the necessary information submitted voluntarily through our project inquiry forms (such as name, email, company name, and project descriptions). We do not sell, rent, or monetize your contact or business data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Purpose of Processing</h2>
            <p>
              Information gathered is utilized exclusively to respond to client inquiries, scope engineering proposals, and deliver agreed-upon software development services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Security Standards</h2>
            <p>
              All data transmitted to our systems is encrypted in transit using industry-standard TLS protocols. Stored data is safeguarded by strict database access controls and role-based administrative permissions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Inquiries &amp; Data Rights</h2>
            <p>
              For data access, correction, or deletion requests, contact our compliance team at{" "}
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
