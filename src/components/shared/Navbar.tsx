"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TenantConfig } from "@/types/tenant";
import { SocialIcon, IconMenu, IconClose } from "./Icons";

interface NavbarProps {
  config: TenantConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { navbar, tokens } = config;

  useEffect(() => {
    if (navbar.variant !== "overlay") return;
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [navbar.variant]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isSolid = navbar.variant === "solid" || (navbar.variant === "overlay" && scrolled);
  const logoSize = navbar.logoSize === "sm" ? "15px" : navbar.logoSize === "lg" ? "24px" : "19px";
  const navItems = ["Galería", "Artistas", "Contacto"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(20px, 5vw, 40px)",
        height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: isSolid || menuOpen ? `${tokens.surfaceRaised}f2` : "transparent",
        backdropFilter: isSolid || menuOpen ? "blur(14px)" : "none",
        borderBottom: `1px solid ${isSolid || menuOpen ? tokens.border : "transparent"}`,
        transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
      }}>
        {/* Logo */}
        <a href="#inicio" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          {config.logo ? (
            <Image
              src={config.logo}
              alt={`${config.name} logo`}
              width={120}
              height={32}
              style={{ objectFit: "contain", height: "32px", width: "auto" }}
            />
          ) : (
            <span className="font-display" style={{ fontSize: logoSize, letterSpacing: "0.18em", color: "var(--text-heading)", lineHeight: 1 }}>
              {config.name}
            </span>
          )}
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-nav">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
          <a href={config.contactCtaUrl} className="btn-primary" style={{ padding: "9px 18px", fontSize: "11px" }}>
            {config.contactCta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-heading)", display: "none", padding: "4px" }}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99,
        background: `${tokens.surfaceRaised}f8`,
        backdropFilter: "blur(16px)",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", gap: "8px",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.77, 0, 0.175, 1)",
      }}>
        {navItems.map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="font-display"
            style={{
              textDecoration: "none",
              fontSize: "clamp(36px, 10vw, 56px)",
              letterSpacing: "0.06em",
              color: "var(--text-heading)",
              transition: "color 0.2s",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transitionDelay: menuOpen ? `${i * 0.07}s` : "0s",
              transitionProperty: "opacity, transform, color",
              transitionDuration: "0.4s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-heading)")}
          >
            {item}
          </a>
        ))}

        <a
          href={config.contactCtaUrl}
          onClick={() => setMenuOpen(false)}
          className="btn-primary"
          style={{
            marginTop: "24px",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transitionDelay: menuOpen ? `${navItems.length * 0.07}s` : "0s",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.4s",
          }}
        >
          {config.contactCta} →
        </a>

        {/* Socials in drawer */}
        <div style={{
          display: "flex", gap: "20px", marginTop: "32px",
          opacity: menuOpen ? 1 : 0,
          transition: `opacity 0.4s ease ${navItems.length * 0.07 + 0.1}s`,
        }}>
          {config.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-subtle)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Responsive styles injected once */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
