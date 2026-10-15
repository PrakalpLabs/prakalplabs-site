import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080B12]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#27D9C3] p-[1.5px] shadow-lg shadow-[#7C5CFC]/20 group-hover:shadow-[#7C5CFC]/40 transition-shadow">
              <div className="w-full h-full bg-[#080B12] rounded-[10px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#7C5CFC] group-hover:text-[#27D9C3] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#F5F7FA] font-sans">
                Prakalp<span className="text-[#7C5CFC]">.</span>Labs
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A5AFBF] font-mono -mt-1">
                Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#101521]/70 border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-150 ${
                    isActive
                      ? "text-[#F5F7FA] bg-[#141B29] border border-white/10 shadow-sm"
                      : "text-[#A5AFBF] hover:text-[#F5F7FA] hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Status Badge & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#101521] border border-white/[0.07] text-[11px] text-[#A5AFBF]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Q2/Q3</span>
            </div>

            <Button href="/contact" size="sm" variant="primary">
              Let&apos;s Talk
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button href="/contact" size="sm" variant="primary" className="!px-3 !py-1 text-xs">
              Talk
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg bg-[#141B29] border border-white/10 text-[#A5AFBF] hover:text-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-3 px-4 pb-6 pt-2 bg-[#0E131F]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl">
          <div className="flex flex-col gap-2">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#7C5CFC]/15 text-[#9D84FD] border border-[#7C5CFC]/30"
                      : "text-[#A5AFBF] hover:text-[#F5F7FA] hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141B29] text-xs text-[#A5AFBF]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for New Projects</span>
              </div>
              <Button href="/contact" variant="primary" className="w-full justify-center">
                Start a Conversation
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
