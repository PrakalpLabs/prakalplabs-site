import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-1.5 gap-1.5",
    md: "text-sm px-6 py-2.5 gap-2",
    lg: "text-base px-8 py-3.5 gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#7C5CFC] hover:bg-[#6B4BE0] text-white shadow-lg shadow-[#7C5CFC]/25 hover:shadow-[#7C5CFC]/40 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-[#141B29] hover:bg-[#1A2336] text-[#F5F7FA] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "bg-transparent hover:bg-white/5 text-[#F5F7FA] border border-white/15 hover:border-white/30",
    ghost:
      "bg-transparent hover:bg-white/5 text-[#A5AFBF] hover:text-[#F5F7FA]",
  }[variant];

  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
