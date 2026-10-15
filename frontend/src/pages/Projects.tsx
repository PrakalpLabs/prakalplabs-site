import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "@/lib/api/projects";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/Icons";
import { Search, ExternalLink, ArrowRight, Terminal } from "lucide-react";

const categories = [
  "All",
  "Web Development",
  "Custom Software",
  "Digital Products",
  "Automation",
  "UI/UX Design",
];

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjects({
      category: selectedCategory,
      search: searchQuery,
    })
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-16 md:py-24 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="purple" dot>
            PORTFOLIO &amp; ARCHITECTURES
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F7FA]">
            Selected Engineering Projects
          </h1>
          <p className="text-lg text-[#A5AFBF] leading-relaxed">
            Demonstration architectures, high-concurrency systems, and custom software platforms engineered for resilience and precision.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#141B29] border border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
                    : "text-[#A5AFBF] hover:text-[#F5F7FA] hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#A5AFBF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by technology or keyword..."
              className="w-full bg-[#080B12] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-[#F5F7FA] placeholder-[#A5AFBF]/60 focus:outline-none focus:border-[#7C5CFC]"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-[#141B29]/40 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 rounded-3xl bg-[#141B29]/30 border border-white/[0.06] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center text-[#A5AFBF] mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">No projects found</h3>
            <p className="text-sm text-[#A5AFBF] max-w-sm mx-auto">
              No project records matched your filter criteria &quot;{searchQuery || selectedCategory}&quot;. Try clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#7C5CFC] text-white hover:bg-[#6B4BE0] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-[#141B29] border border-white/[0.08] overflow-hidden flex flex-col justify-between hover:border-[#7C5CFC]/40 hover:shadow-2xl hover:shadow-[#7C5CFC]/10 transition-all duration-300 group"
              >
                {/* Visual Header */}
                <div className="h-44 bg-gradient-to-br from-[#101521] via-[#141B29] to-[#0A0E17] p-6 relative flex flex-col justify-between border-b border-white/[0.06] overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#7C5CFC]/15 text-[#9D84FD] border border-[#7C5CFC]/30">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      DEMO PROJECT
                    </span>
                  </div>

                  <div className="relative z-10 my-auto flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#080B12]/80 border border-white/10 flex items-center justify-center text-[#7C5CFC] group-hover:scale-110 group-hover:text-[#27D9C3] transition-all duration-300">
                      <Terminal className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#A5AFBF]/60 relative z-10 flex justify-between">
                    <span>STATUS: ACTIVE</span>
                    <span>v1.2</span>
                  </div>
                </div>

                {/* Details */}
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

                    {/* Tech tags */}
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

                  {/* Actions */}
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
    </div>
  );
}
