import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { Terminal, Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080B12] border-t border-white/[0.08] pt-16 pb-12 text-[#A5AFBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#27D9C3] p-[1px]">
                <div className="w-full h-full bg-[#080B12] rounded-[7px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[#7C5CFC]" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#F5F7FA]">
                Prakalp<span className="text-[#7C5CFC]">.</span>Labs
              </span>
            </Link>

            <p className="text-sm text-[#A5AFBF] leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.find((s) => s.platform === "GitHub")?.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141B29] border border-white/10 flex items-center justify-center text-[#A5AFBF] hover:text-[#F5F7FA] hover:border-[#7C5CFC]/40 transition-colors"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.find((s) => s.platform === "LinkedIn")?.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141B29] border border-white/10 flex items-center justify-center text-[#A5AFBF] hover:text-[#F5F7FA] hover:border-[#7C5CFC]/40 transition-colors"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.find((s) => s.platform === "X")?.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#141B29] border border-white/10 flex items-center justify-center text-[#A5AFBF] hover:text-[#F5F7FA] hover:border-[#7C5CFC]/40 transition-colors"
                aria-label="X Twitter profile"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="w-8 h-8 rounded-lg bg-[#141B29] border border-white/10 flex items-center justify-center text-[#A5AFBF] hover:text-[#F5F7FA] hover:border-[#7C5CFC]/40 transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded bg-[#101521] border border-white/[0.06] text-[#A5AFBF]">
                <span className="w-2 h-2 rounded-full bg-[#7C5CFC]" />
                Runtime Data Source:{" "}
                <span className="text-[#F5F7FA] font-mono uppercase font-semibold">
                  {siteConfig.dataSource}
                </span>
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-4 font-mono">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.solutions.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="hover:text-[#F5F7FA] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-4 font-mono">
              Company &amp; Work
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="hover:text-[#F5F7FA] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Quick Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-4 font-mono">
              Inquiries
            </h4>
            <p className="text-xs text-[#A5AFBF] mb-3">
              Have a project, RFP, or architecture inquiry? Reach our engineering team.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-xs font-mono text-[#9D84FD] hover:underline block break-all"
            >
              {siteConfig.contactEmail}
            </a>
            <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs space-y-1">
              <span className="block text-[#A5AFBF]/70 font-mono">Status</span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Engineering Systems Operational
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5AFBF]/70">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved. Turning Ideas Into Powerful Solutions.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#F5F7FA] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#F5F7FA] transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin" className="hover:text-[#7C5CFC] transition-colors font-mono">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
