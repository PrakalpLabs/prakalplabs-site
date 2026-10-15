import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = "",
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-[#141B29] border border-white/[0.08] p-6 transition-all duration-300 ${
        hoverEffect
          ? "hover:border-[#7C5CFC]/40 hover:bg-[#182133] hover:shadow-xl hover:shadow-[#7C5CFC]/5 hover:-translate-y-1"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
