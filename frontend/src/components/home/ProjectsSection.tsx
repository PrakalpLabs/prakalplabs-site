import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "@/lib/api/projects";
import { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowUpRight, ArrowRight, ExternalLink, Terminal } from "lucide-react";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects({ featured: true })
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#080B12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7C5CFC] bg-[#7C5CFC]/10 px-3 py-1 rounded-full border border-[#7C5CFC]/20">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
              Selected Work
            </h2>
            <p className="text-base sm:text-lg text-[#A5AFBF] leading-relaxed">
              Demonstration systems, operational platforms, and software architectures engineered for scalability.
            </p>
          </div>

          <Button href="/projects" variant="secondary" size="md">
            View All Projects
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-[#141B29]/50 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-[#141B29] border border-white/[0.08] overflow-hidden flex flex-col justify-between hover:border-[#7C5CFC]/40 hover:shadow-2xl hover:shadow-[#7C5CFC]/10 transition-all duration-300 group"
              >
                {/* Visual Banner Area */}
                <div className="h-48 bg-gradient-to-br from-[#101521] via-[#141B29] to-[#0A0E17] p-6 relative flex flex-col justify-between border-b border-white/[0.06] overflow-hidden">
                  <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#7C5CFC]/15 text-[#9D84FD] border border-[#7C5CFC]/30">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      DEMO BUILD
                    </span>
                  </div>

                  <div className="relative z-10 my-auto flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#080B12]/80 border border-white/10 flex items-center justify-center text-[#7C5CFC] group-hover:scale-110 group-hover:text-[#27D9C3] transition-all duration-300 shadow-xl">
                      <Terminal className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#A5AFBF]/60 relative z-10 flex justify-between">
                    <span>STATUS: READY</span>
                    <span>v1.4</span>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#F5F7FA] group-hover:text-[#27D9C3] transition-colors leading-snug">
                      <Link to={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#A5AFBF] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#A5AFBF] border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C5CFC] group-hover:text-[#27D9C3] transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.repositoryUrl && (
                        <a
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#A5AFBF] hover:text-white transition-colors"
                          title="Source Code"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#A5AFBF] hover:text-white transition-colors"
                          title="Interactive Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
