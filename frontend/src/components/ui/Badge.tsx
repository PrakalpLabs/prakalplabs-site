import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "cyan" | "neutral" | "success" | "warning";
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = "purple",
  className = "",
  dot = false,
}: BadgeProps) {
  const variantStyles = {
    purple: "bg-[#7C5CFC]/10 text-[#9D84FD] border-[#7C5CFC]/30",
    cyan: "bg-[#27D9C3]/10 text-[#27D9C3] border-[#27D9C3]/30",
    neutral: "bg-white/5 text-[#A5AFBF] border-white/10",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  }[variant];

  const dotColors = {
    purple: "bg-[#7C5CFC]",
    cyan: "bg-[#27D9C3]",
    neutral: "bg-[#A5AFBF]",
    success: "bg-emerald-400 animate-pulse",
    warning: "bg-amber-400",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${variantStyles} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors}`} />}
      {children}
    </span>
  );
}
