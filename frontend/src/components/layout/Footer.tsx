import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-footer-inner">
        <div className="studio-footer-top">
          <div className="studio-footer-brand">
            <Link to="/" className="studio-wordmark studio-wordmark-light" aria-label="Prakalp Labs home">
              <span className="studio-wordmark-icon">p.</span>
              <span>Prakalp <b>Labs</b></span>
            </Link>
            <p>Thoughtful digital products, made with care.</p>
          </div>
          <div className="studio-footer-cta">
            <span>Have something in mind?</span>
            <Link to="/contact">We&apos;d love to hear about it <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <div className="studio-footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <div className="studio-footer-links">
            <Link to="/services">Services</Link>
            <Link to="/projects">Work</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
