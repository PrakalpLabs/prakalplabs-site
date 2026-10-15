import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/api/projects";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Server,
  ArrowUpRight,
} from "lucide-react";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getProjectBySlug(slug)
        .then((data) => setProject(data))
        .catch((err) => console.error("Error loading project detail:", err))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#7C5CFC] border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono text-[#A5AFBF]">Loading case study architecture...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Project Not Found</h2>
        <p className="text-sm text-[#A5AFBF]">The requested project case study could not be located.</p>
        <Button href="/projects" variant="secondary">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Navigation Breadcrumb */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A5AFBF] hover:text-[#7C5CFC] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Projects
        </Link>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="purple">{project.category}</Badge>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              DEMONSTRATION SYSTEM
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F7FA] leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-[#A5AFBF] leading-relaxed max-w-3xl">
            {project.overview}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-[#7C5CFC] hover:bg-[#6B4BE0] text-white shadow-lg shadow-[#7C5CFC]/25 transition-all"
              >
                <span>Launch Interactive Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-[#141B29] hover:bg-[#1A2336] text-[#F5F7FA] border border-white/10 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Technical Architecture Canvas */}
        <div className="rounded-3xl bg-[#141B29] border border-white/[0.08] p-8 sm:p-10 relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-[#27D9C3]" />
              <span className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                System Topology &amp; Architecture
              </span>
            </div>
            <span className="text-xs font-mono text-[#A5AFBF]/60">ID: {project.id}</span>
          </div>

          {/* Problem & Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 rounded-2xl bg-[#080B12] border border-white/[0.06] space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                The Problem Statement
              </div>
              <p className="text-sm text-[#A5AFBF] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#080B12] border border-white/[0.06] space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#27D9C3]">
                The Engineering Solution
              </div>
              <p className="text-sm text-[#A5AFBF] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            <h3 className="text-base font-bold text-[#F5F7FA] font-mono uppercase tracking-wider">
              Engineered Capabilities &amp; Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#101521] border border-white/[0.04]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#7C5CFC] mt-0.5 shrink-0" />
                  <span className="text-xs text-[#F5F7FA]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3 pt-6 mt-6 border-t border-white/[0.06]">
            <div className="text-xs font-mono text-[#A5AFBF]/70 uppercase">Technology Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-[#080B12] text-xs font-mono text-[#27D9C3] border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#141B29] to-[#1C1335] border border-[#7C5CFC]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-[#F5F7FA]">Need a similar architecture built?</h3>
            <p className="text-sm text-[#A5AFBF] mt-1">Our engineering team can architect and deploy custom software matching your performance constraints.</p>
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
