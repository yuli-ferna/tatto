"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TenantConfig, SectionId } from "@/types/tenant";
import { SocialIcon, IconMenu, IconClose } from "../shared/Icons";
import { Btn, GallerySection, ArtistsSection, TestimonialsSection, ContactSection } from "../shared/Sections";
import ThemeInjector from "../shared/ThemeInjector";

// ─── Sidebar nav (desktop) + top bar (mobile) ─────────────────────────────────

function MinimalNav({ config }: { config: TenantConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Galería", "Artistas", "Contacto"];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="minimal-sidebar" style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: 200, zIndex: 100,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "40px 32px",
        borderRight: "1px solid var(--border)",
        background: "var(--surface)",
      }}>
        <div>
          {config.logo
            ? <Image src={config.logo} alt={config.name} width={100} height={28} style={{ objectFit: "contain", marginBottom: 48 }} />
            : <span className="font-display" style={{ fontSize: 16, letterSpacing: "0.18em", display: "block", marginBottom: 48, color: "var(--text-heading)" }}>{config.name}</span>
          }
          <nav style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </nav>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            {config.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--text-subtle)", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 8, textDecoration: "none", fontSize: 12 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
                <SocialIcon icon={s.icon} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
          <Btn href={config.contactCtaUrl} style={{ width: "100%", justifyContent: "center", padding: "10px 12px", fontSize: 11 }}>
            {config.contactCta}
          </Btn>
        </div>
      </aside>

      {/* Mobile top bar */}
      <nav className="minimal-topbar" style={{
        display: "none",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: "0 20px",
        alignItems: "center", justifyContent: "space-between",
        background: `var(--surface)f2`,
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <span className="font-display" style={{ fontSize: 17, letterSpacing: "0.16em", color: "var(--text-heading)" }}>{config.name}</span>
        <button onClick={() => setMenuOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-heading)", padding: 4 }}>
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99,
        background: `var(--surfaceRaised)f8`,
        backdropFilter: "blur(16px)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8,
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.77,0,0.175,1)",
      }}>
        {navItems.map((item, i) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
            className="font-display"
            style={{
              textDecoration: "none",
              fontSize: "clamp(36px,10vw,52px)",
              letterSpacing: "0.06em", color: "var(--text-heading)",
              opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.07}s`,
              transitionProperty: "opacity, transform, color",
              transitionDuration: "0.4s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-heading)")}>
            {item}
          </a>
        ))}
        <Btn href={config.contactCtaUrl} style={{ marginTop: 24 }}>{config.contactCta} →</Btn>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .minimal-sidebar  { display: none !important; }
          .minimal-topbar   { display: flex !important; }
          .minimal-content  { margin-left: 0 !important; padding-top: 60px !important; }
        }
      `}</style>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function MinimalHero({ config }: { config: TenantConfig }) {
  return (
    <section id="inicio" style={{
      minHeight: "100svh",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)",
    }}>
      {config.logo && (
        <Image src={config.logo} alt={config.name} width={140} height={40}
          className="anim-fade-up"
          style={{ objectFit: "contain", marginBottom: 40 }} />
      )}
      <p className="anim-fade-up" style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--decorative)", marginBottom: 24 }}>
        {config.location}
      </p>
      <h1 className="font-display anim-fade-up d1" style={{ fontSize: "clamp(52px,8vw,110px)", lineHeight: 0.92, marginBottom: 32 }}>
        {config.name}
      </h1>
      <div style={{ width: "100%", height: 1, background: "var(--border)", marginBottom: 32 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="minimal-hero-bottom">
        <p className="anim-fade-up d2" style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-subtle)" }}>{config.heroDescription}</p>
        <div className="anim-fade-up d3" style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
          <Btn href={config.contactCtaUrl}>{config.contactCta} →</Btn>
          <Btn href="#galería" variant="ghost">Ver trabajos</Btn>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .minimal-hero-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Minimal footer (inside content area) ────────────────────────────────────

function MinimalFooter({ config }: { config: TenantConfig }) {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "clamp(20px,4vw,28px) clamp(20px,5vw,48px)",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
    }}>
      <span className="font-display" style={{ fontSize: 14, letterSpacing: "0.14em", color: "var(--text-subtle)" }}>{config.name}</span>
      <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>© {new Date().getFullYear()} — {config.location}</span>
    </footer>
  );
}

// ─── Template: MINIMAL ────────────────────────────────────────────────────────

export default function TemplateMinimal({ config }: { config: TenantConfig }) {
  const sectionMap: Record<SectionId, React.ReactNode> = {
    gallery:      <GallerySection key="gallery" config={config} />,
    artists:      config.sections.showArtists      ? <ArtistsSection key="artists" config={config} />           : null,
    testimonials: config.sections.showTestimonials ? <TestimonialsSection key="testimonials" config={config} />  : null,
    contact:      <ContactSection key="contact" config={config} />,
  };

  return (
    <>
      <ThemeInjector config={config} />
      <div style={{ display: "flex" }}>
        <MinimalNav config={config} />
        {/* Main content — offset by sidebar width on desktop */}
        <main className="minimal-content" style={{ marginLeft: 200, flex: 1, minHeight: "100vh", background: "var(--surface)" }}>
          <MinimalHero config={config} />
          {config.sections.order.map((id) => sectionMap[id])}
          <MinimalFooter config={config} />
        </main>
      </div>
    </>
  );
}
