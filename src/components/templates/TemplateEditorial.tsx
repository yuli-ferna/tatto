"use client";

import { useState } from "react";
import Image from "next/image";
import { TenantConfig } from "@/types/tenant";
import { SocialIcon, IconMenu, IconClose } from "../shared/Icons";
import { Btn, GallerySection, ArtistsSection, TestimonialsSection, Footer, MarqueeStrip } from "../shared/Sections";
import ThemeInjector from "../shared/ThemeInjector";

// ─── Constants ────────────────────────────────────────────────────────────────

const DESK_BG   = "linear-gradient(160deg, #3d2b1f 0%, #1e1208 55%, #0d0806 100%)";
const DESK_DARK = "#0d0806"; // solid dark for hole fills

const ruledLineBg = `repeating-linear-gradient(
  transparent, transparent 31px,
  var(--border) 31px, var(--border) 32px
)`;

const marginLine = (
  <div aria-hidden style={{
    position: "absolute", left: "clamp(52px,7vw,80px)",
    top: 0, bottom: 0, width: 1,
    background: "rgba(180,60,60,0.18)", pointerEvents: "none",
  }} />
);

const PUNCH_HOLES = Array.from({ length: 18 });

// ─── Sticky notebook navbar (not fixed — stays inside the frame) ──────────────

function EditorialNavbar({ config }: { config: TenantConfig }) {
  const [open, setOpen] = useState(false);
  const navItems = ["Galería", "Artistas", "Contacto"];

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        height: 56, display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(20px,5vw,40px)",
        background: `${config.tokens.surface}f4`,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <a href="#inicio" style={{ textDecoration: "none" }}>
          <span className="font-display" style={{
            fontSize: 14, letterSpacing: "0.22em",
            color: "var(--text-heading)", lineHeight: 1,
          }}>
            {config.name}
          </span>
        </a>

        {/* Desktop links */}
        <div className="ed-desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
          <a href={config.contactCtaUrl} className="btn-primary" style={{ padding: "8px 18px", fontSize: 11 }}>
            {config.contactCta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ed-mobile-btn"
          onClick={() => setOpen((v) => !v)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--text-heading)" }}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: `${config.tokens.surfaceRaised}fb`,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center", gap: 8,
        }}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-display"
              style={{
                textDecoration: "none", color: "var(--text-heading)",
                fontSize: "clamp(36px,10vw,56px)", letterSpacing: "0.06em",
              }}>
              {item}
            </a>
          ))}
          <a href={config.contactCtaUrl} className="btn-primary" style={{ marginTop: 24 }} onClick={() => setOpen(false)}>
            {config.contactCta} →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 680px) {
          .ed-desktop-nav { display: none !important; }
          .ed-mobile-btn  { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── Punch-hole binding strip ─────────────────────────────────────────────────

function BindingStrip() {
  return (
    <div style={{
      position: "sticky", top: 0, height: "100vh",
      width: 34, flexShrink: 0,
      background: "var(--surface-raised)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      alignItems: "center",
      paddingTop: 72,
      gap: 44,
      zIndex: 10,
    }}>
      {PUNCH_HOLES.map((_, i) => (
        <div key={i} style={{
          width: 13, height: 13, borderRadius: "50%", flexShrink: 0,
          background: DESK_DARK,
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6), 0 0 0 1.5px #888",
        }} />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function EditorialHero({ config }: { config: TenantConfig }) {
  return (
    <section id="inicio" style={{
      minHeight: "100svh", display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative", overflow: "hidden",
      padding: "clamp(80px,12vw,120px) clamp(24px,6vw,52px) clamp(56px,8vw,88px)",
      backgroundImage: ruledLineBg, backgroundPositionY: "28px",
    }}>
      {marginLine}

      <p className="anim-fade-up" style={{
        fontFamily: "var(--font-body)", fontSize: 11,
        letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--text-subtle)", marginBottom: "clamp(28px,4vw,44px)",
      }}>
        {config.location} — Arte
      </p>

      <div className="ed-hero-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "clamp(36px,6vw,88px)", alignItems: "end",
      }}>
        <div>
          <h1 className="font-display anim-fade-up d1" style={{
            fontSize: "clamp(60px,10vw,136px)", lineHeight: 0.88,
            letterSpacing: "-0.01em", fontWeight: 700, color: "var(--text-heading)",
          }}>
            {config.logo
              ? <Image src={config.logo} alt={config.name} width={200} height={60}
                  style={{ objectFit: "contain", marginBottom: 12 }} />
              : config.name}
          </h1>
          <p className="font-display anim-fade-up d2" style={{
            marginTop: "clamp(14px,2.5vw,24px)", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(18px,2.8vw,30px)", lineHeight: 1.4, color: "var(--text-subtle)",
          }}>
            &ldquo;{config.tagline}&rdquo;
          </p>
        </div>

        <div className="anim-fade-up d2" style={{ paddingBottom: 6 }}>
          <p style={{
            fontFamily: "var(--font-body)", lineHeight: 1.85, color: "var(--text-subtle)",
            fontSize: "clamp(13px,1.4vw,15px)", marginBottom: "clamp(22px,3vw,32px)",
          }}>
            {config.heroDescription}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn href={config.contactCtaUrl}>{config.contactCta}</Btn>
            <Btn href="#galería" variant="ghost">Ver trabajos</Btn>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: "clamp(20px,3vw,32px)", flexWrap: "wrap" }}>
            {config.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  color: "var(--text-subtle)", textDecoration: "none",
                  fontFamily: "var(--font-body)", fontSize: 12,
                  letterSpacing: "0.08em", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-heading)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                <SocialIcon icon={s.icon} /><span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0,
        left: "clamp(24px,6vw,52px)", right: "clamp(24px,6vw,52px)",
        height: 1, background: "var(--border-strong)",
      }} />

      <style>{`
        @media (max-width: 680px) {
          .ed-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Section wrapper with large faded number ──────────────────────────────────

function EdSection({
  number, children, style: extra,
}: {
  number: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "relative", ...extra }}>
      <span className="font-display" aria-hidden style={{
        position: "absolute", left: "clamp(20px,4vw,36px)", top: "clamp(52px,9vw,88px)",
        fontSize: "clamp(80px,14vw,200px)", lineHeight: 1, fontWeight: 700,
        color: "var(--border)", zIndex: 0, pointerEvents: "none",
        userSelect: "none", letterSpacing: "-0.04em",
      }}>
        {number}
      </span>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function EditorialContact({ config }: { config: TenantConfig }) {
  const links = [
    { label: `${config.contactCta} →`, href: config.contactCtaUrl },
    ...config.socials.map((s) => ({ label: `${s.label} →`, href: s.url })),
  ];

  return (
    <section id="contacto" style={{
      padding: "clamp(72px,11vw,120px) clamp(24px,6vw,52px)",
      position: "relative", overflow: "hidden",
      backgroundImage: ruledLineBg, backgroundPositionY: "28px",
      borderTop: "1px solid var(--border)",
    }}>
      {marginLine}
      <div style={{ position: "relative", maxWidth: 700 }}>
        <div style={{ marginBottom: "clamp(28px,5vw,48px)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 11,
              letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-subtle)",
            }}>04</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(40px,7vw,88px)", lineHeight: 0.92,
            fontWeight: 700, color: "var(--text-heading)", letterSpacing: "0.02em",
          }}>Hagamos algo juntos</h2>
        </div>

        <p style={{
          fontFamily: "var(--font-body)", color: "var(--text-subtle)",
          fontSize: 15, lineHeight: 1.8,
          marginBottom: "clamp(28px,4vw,48px)", maxWidth: 480,
        }}>
          Mandanos un mensaje para consultar disponibilidad, precios o para discutir tu idea.
          Respondemos en menos de 24hs.
        </p>

        <div>
          {links.map(({ label, href }, i) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "18px 0",
                borderBottom: `1px solid ${i === links.length - 1 ? "var(--border-strong)" : "var(--border)"}`,
                textDecoration: "none", color: "var(--text-heading)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px,3.2vw,40px)", fontWeight: 600,
                letterSpacing: "0.02em", transition: "padding-left 0.22s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "16px"; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0px"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Template: EDITORIAL ──────────────────────────────────────────────────────

export default function TemplateEditorial({ config }: { config: TenantConfig }) {
  const renderSection = (id: string) => {
    switch (id) {
      case "gallery":
        return (
          <EdSection key="gallery" number="01">
            <GallerySection config={config} />
          </EdSection>
        );
      case "artists":
        return config.sections.showArtists ? (
          <EdSection key="artists" number="02" style={{ background: "var(--surface-raised)" }}>
            <ArtistsSection config={config} />
          </EdSection>
        ) : null;
      case "testimonials":
        return config.sections.showTestimonials ? (
          <EdSection key="testimonials" number="03">
            <TestimonialsSection config={config} />
          </EdSection>
        ) : null;
      case "contact":
        return <EditorialContact key="contact" config={config} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ThemeInjector config={config} />
      <style>{`
        body { background: ${DESK_BG} !important; }

        /* Shared section h2 overrides for editorial scale */
        .ed-gallery h2, .ed-artists h2 {
          font-size: clamp(42px, 7vw, 88px) !important;
          line-height: 0.92 !important;
          letter-spacing: 0.02em !important;
          font-weight: 700 !important;
        }
      `}</style>

      {/* Dark desk outer frame */}
      <div style={{
        minHeight: "100vh",
        background: DESK_BG,
        padding: "clamp(20px,3vw,48px) clamp(12px,2vw,28px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "hidden",
      }}>
        {/* Tilted notebook group */}
        <div style={{
          transform: "rotate(-1.5deg)",
          transformOrigin: "center top",
          width: "100%",
          maxWidth: 1320,
          position: "relative",
        }}>
          {/* Right page-stack edges (visible stacked pages) */}
          <div aria-hidden style={{
            position: "absolute",
            right: -10,
            top: 8,
            bottom: -4,
            width: 16,
            background: `repeating-linear-gradient(
              to bottom,
              #F0EBE1 0px, #F0EBE1 1px,
              #D4CEBB 1px, #D4CEBB 2px,
              #EDE9DB 2px, #EDE9DB 4px,
              #E8E3D8 4px, #E8E3D8 5px
            )`,
            boxShadow: "4px 0 14px rgba(0,0,0,0.45)",
            zIndex: 0,
          }} />

          {/* Notebook */}
          <div style={{
            width: "100%",
            minHeight: "calc(100vh - clamp(40px,6vw,96px))",
            background: "var(--surface)",
            display: "flex",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 32px 100px rgba(0,0,0,0.6)",
            position: "relative",
            zIndex: 1,
          }}>
            {/* Left binding strip with punch holes */}
            <BindingStrip />

            {/* Page content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <EditorialNavbar config={config} />
              <EditorialHero config={config} />
              {config.sections.showMarquee && <MarqueeStrip config={config} />}
              {config.sections.order.map((id) => renderSection(id))}
              <Footer config={config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
