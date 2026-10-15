import React from "react";

export function IntegrationsSection() {
  const integrations = [
    { name: "React", label: "React" },
    { name: "Node.js", label: "Node.js" },
    { name: "Express", label: "Express.js" },
    { name: "MongoDB", label: "MongoDB" },
    { name: "TypeScript", label: "TypeScript" },
    { name: "Docker", label: "Docker" },
    { name: "AWS Cloud", label: "AWS" },
    { name: "PostgreSQL", label: "PostgreSQL" },
    { name: "Redis", label: "Redis" },
    { name: "Kubernetes", label: "Kubernetes" },
  ];

  return (
    <section className="py-16 bg-[#080B12] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#A5AFBF]/70 mb-8">
          Seamless Integration with Modern Engineering Stacks
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70 hover:opacity-100 transition-opacity">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="px-4 py-2 rounded-xl bg-[#141B29]/60 border border-white/[0.06] text-xs font-mono font-medium text-[#A5AFBF] hover:text-[#F5F7FA] hover:border-[#7C5CFC]/40 transition-all cursor-default"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
