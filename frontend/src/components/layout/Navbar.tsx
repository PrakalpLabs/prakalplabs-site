import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  return (
    <header className="studio-header">
      <div className="studio-header-inner">
        <Link to="/" className="studio-wordmark" aria-label="Prakalp Labs home">
          <span className="studio-wordmark-icon">p.</span>
          <span>Prakalp <b>Labs</b></span>
        </Link>

        <button
          className="studio-menu-toggle"
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`studio-nav${isOpen ? " studio-nav-open" : ""}`} aria-label="Main navigation">
          {siteConfig.navItems.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={isActive ? "studio-nav-link studio-nav-active" : "studio-nav-link"}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link to="/contact" className="studio-nav-cta">
            Start a conversation <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
