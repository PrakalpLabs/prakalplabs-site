import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { submitInquiry } from "@/lib/api/inquiries";
import { InquiryInput } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, AlertCircle, RefreshCw, Send, ArrowRight, ShieldCheck } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState<InquiryInput>({
    fullName: "",
    email: "",
    companyName: "",
    projectType: "Custom Software Development",
    estimatedBudget: "$10k - $25k",
    projectDescription: "",
    preferredContactMethod: "email",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    isMock: boolean;
    inquiryId?: string;
  } | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Full name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.projectDescription.trim()) {
      errs.projectDescription = "Project description is required.";
    } else if (formData.projectDescription.trim().length < 15) {
      errs.projectDescription = "Please provide at least 15 characters describing your project.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await submitInquiry(formData);
      setResult(response);
      if (response.success) {
        // Reset form on success
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          projectType: "Custom Software Development",
          estimatedBudget: "$10k - $25k",
          projectDescription: "",
          preferredContactMethod: "email",
          honeypot: "",
        });
        setErrors({});
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Submission failed.";
      setResult({
        success: false,
        message: errorMsg,
        isMock: false,
      });
      // User entered information is preserved in formData!
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="purple" dot>
            START A CONVERSATION
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F7FA]">
            Let&apos;s Build Something Resilient
          </h1>
          <p className="text-lg text-[#A5AFBF] leading-relaxed">
            Discuss your technical requirements, architectural goals, or product vision directly with our engineering team.
          </p>

          <div className="pt-2 flex items-center gap-2">
            <span className="text-xs font-mono text-[#A5AFBF] bg-[#101521] px-3 py-1.5 rounded-full border border-white/[0.08]">
              Current Mode:{" "}
              <strong className="text-[#9D84FD] uppercase font-bold">
                {siteConfig.dataSource === "api" ? "Backend API Active" : "Mock Demonstration Mode"}
              </strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-8 bg-[#141B29] rounded-3xl border border-white/[0.08] p-8 sm:p-12 shadow-2xl relative">
            {/* Success notification banner */}
            {result?.success && (
              <div className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Inquiry Successfully Processed</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-200/90">{result.message}</p>
                {result.isMock && (
                  <p className="text-[11px] font-mono text-emerald-400 pt-1">
                    ℹ️ In Mock Mode (VITE_DATA_SOURCE=mock), data was validated locally. Switch to API mode to persist directly to MongoDB.
                  </p>
                )}
                {result.inquiryId && (
                  <div className="text-[11px] font-mono opacity-80 pt-1">
                    Reference ID: {result.inquiryId}
                  </div>
                )}
              </div>
            )}

            {/* Error notification banner */}
            {result && !result.success && (
              <div className="mb-8 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                  <span>Submission Error</span>
                </div>
                <p className="text-xs leading-relaxed">{result.message}</p>
                <p className="text-[11px] font-mono text-rose-400/80">
                  Your entered data has been preserved below. Please correct any issues and retry.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot field for bot spam protection */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="honeypot">Do not fill this field</label>
                <input
                  type="text"
                  id="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase text-[#F5F7FA] mb-2">
                    Full Name <span className="text-[#7C5CFC]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-[#080B12] border ${
                      errors.fullName ? "border-rose-500" : "border-white/10"
                    } text-sm text-[#F5F7FA] placeholder-[#A5AFBF]/40 focus:outline-none focus:border-[#7C5CFC] transition-colors`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase text-[#F5F7FA] mb-2">
                    Work Email <span className="text-[#7C5CFC]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maya@organization.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#080B12] border ${
                      errors.email ? "border-rose-500" : "border-white/10"
                    } text-sm text-[#F5F7FA] placeholder-[#A5AFBF]/40 focus:outline-none focus:border-[#7C5CFC] transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Company & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-xs font-mono uppercase text-[#F5F7FA] mb-2">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Acme Technologies"
                    className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-white/10 text-sm text-[#F5F7FA] placeholder-[#A5AFBF]/40 focus:outline-none focus:border-[#7C5CFC] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs font-mono uppercase text-[#F5F7FA] mb-2">
                    Primary Service Focus
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-white/10 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFC] transition-colors"
                  >
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Web Application Development">Web Application Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Digital Product Development">Digital Product Development</option>
                    <option value="Business Automation">Business Automation</option>
                    <option value="Technology Consulting">Technology Consulting</option>
                    <option value="Innovative Software Solutions">Innovative Software Solutions</option>
                  </select>
                </div>
              </div>

              {/* Budget & Contact Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="estimatedBudget" className="block text-xs font-mono uppercase text-[#F5F7FA] mb-2">
                    Estimated Budget Tier
                  </label>
                  <select
                    id="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-white/10 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFC] transition-colors"
                  >
                    <option value="Under $10k">Under $10,000</option>
                    <option value="$10k - $25k">$10,000 – $25,000</option>
                    <option value="$25k - $50k">$25,000 – $50,000</option>
                    <option value="$50k+">$50,000+</option>
                    <option value="Undetermined">To Be Determined / Discovery Phase</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferredContactMethod" className="block text-xs font-mono uppercase text-[#F5F7FA] mb-2">
                    Preferred Communication
                  </label>
                  <select
                    id="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredContactMethod: e.target.value as "email" | "phone" | "video_call",
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-white/10 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFC] transition-colors"
                  >
                    <option value="email">Email correspondence</option>
                    <option value="video_call">Introductory video architecture call</option>
                    <option value="phone">Direct telephone call</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="projectDescription" className="block text-xs font-mono uppercase text-[#F5F7FA] mb-2">
                  Project Description &amp; Technical Requirements <span className="text-[#7C5CFC]">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  rows={5}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Outline the operational challenge, required user roles, existing infrastructure, or desired delivery milestones..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#080B12] border ${
                    errors.projectDescription ? "border-rose-500" : "border-white/10"
                  } text-sm text-[#F5F7FA] placeholder-[#A5AFBF]/40 focus:outline-none focus:border-[#7C5CFC] transition-colors leading-relaxed`}
                />
                {errors.projectDescription && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.projectDescription}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={loading}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Inquiry</span>
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-[#A5AFBF]/70 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#27D9C3]" />
                  <span>Strict NDA and Data Privacy Protected</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-[#141B29] border border-white/[0.08] space-y-6">
              <h3 className="text-xl font-bold text-[#F5F7FA]">What happens next?</h3>
              <div className="space-y-4 text-xs text-[#A5AFBF] leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#7C5CFC] font-bold">01.</span>
                  <div>
                    <strong className="text-white block mb-0.5">Technical Review</strong>
                    Our lead architect reviews your requirements within 1 business day.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#27D9C3] font-bold">02.</span>
                  <div>
                    <strong className="text-white block mb-0.5">Exploratory Call</strong>
                    A 30-minute scoping session to clarify technical bounds, timeline, and MVP milestones.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#9D84FD] font-bold">03.</span>
                  <div>
                    <strong className="text-white block mb-0.5">Architecture Proposal</strong>
                    A transparent statement of work with deliverables, architecture choices, and phased billing.
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06] space-y-2">
                <span className="text-[11px] font-mono uppercase text-[#A5AFBF]/60 block">Direct Inquiries</span>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-xs font-mono text-[#9D84FD] hover:underline block break-all"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#101521] border border-white/[0.06] space-y-2">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Engineering Availability
              </span>
              <p className="text-xs text-[#A5AFBF] leading-relaxed">
                Currently booking client sprints for Q2/Q3. Average onboarding turnaround is 7 business days from contract agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
