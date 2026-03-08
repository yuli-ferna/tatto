"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  TenantConfig,
  ButtonStyle,
  HeroVariant,
  GalleryVariant,
  SectionId,
} from "@/types/tenant";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.5l5.793-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.006-1.371l-.36-.214-3.717.974.99-3.62-.234-.37A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}
function SocialIcon({ icon }: { icon: string }) {
  if (icon === "instagram") return <IconInstagram />;
  if (icon === "tiktok") return <IconTikTok />;
  if (icon === "whatsapp") return <IconWhatsApp />;
  return null;
}

// ─── Theme injector ───────────────────────────────────────────────────────────

function ThemeInjector({ config }: { config: TenantConfig }) {
  const { tokens, effects, button } = config;

  const btnLetterSpacing =
    button.letterSpacing === "tight" ? "0.04em" :
    button.letterSpacing === "wide"  ? "0.14em" : "0.08em";

  // Genera el clip-path solo si el botón es angular
  const btnClipPath =
    button.variant === "angular"
      ? "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
      : "none";

  const btnRadius =
    button.variant === "rounded" ? "9999px" :
    button.variant === "square"  ? "0px" : "2px";

  const btnBg =
    button.variant === "outline" || button.variant === "underline"
      ? "transparent"
      : "var(--interactive)";

  const btnColor =
    button.variant === "outline" || button.variant === "underline"
      ? "var(--interactive)"
      : "var(--interactive-fg)";

  const btnBorder =
    button.variant === "outline"
      ? "1px solid var(--interactive)"
      : button.variant === "underline"
      ? "none"
      : "none";

  const btnUnderline =
    button.variant === "underline"
      ? "underline"
      : "none";

  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=${tokens.fontDisplay}&family=${tokens.fontBody}&display=swap');

      :root {
        --surface: ${tokens.surface};
        --surface-raised: ${tokens.surfaceRaised};
        --surface-overlay: ${tokens.surfaceOverlay};
        --text-heading: ${tokens.textHeading};
        --text-body: ${tokens.textBody};
        --text-subtle: ${tokens.textSubtle};
        --text-inverse: ${tokens.textInverse};
        --interactive: ${tokens.interactive};
        --interactive-hover: ${tokens.interactiveHover};
        --interactive-fg: ${tokens.interactiveFg};
        --decorative: ${tokens.decorative};
        --border: ${tokens.border};
        --border-strong: ${tokens.borderStrong};
        --grain-opacity: ${effects.grainOpacity};
        --font-display: '${tokens.fontDisplayFamily}', serif;
        --font-body: '${tokens.fontBodyFamily}', sans-serif;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        background: var(--surface);
        color: var(--text-body);
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
      }

      /* Grain */
      body::after {
        content: '';
        position: fixed; inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        opacity: var(--grain-opacity);
        pointer-events: none;
        z-index: 9998;
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: var(--surface); }
      ::-webkit-scrollbar-thumb { background: var(--decorative); }

      /* Typography */
      .font-display { font-family: var(--font-display); }
      h1, h2, h3 { color: var(--text-heading); }

      /* Animations */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes pulseDot {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
      @keyframes spinSlow {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      .anim-fade-up  { animation: fadeUp 0.8s ease forwards; opacity: 0; }
      .anim-fade-in  { animation: fadeIn 1.2s ease forwards; opacity: 0; }
      .anim-marquee  { animation: marquee 22s linear infinite; }
      .d1 { animation-delay: 0.12s; }
      .d2 { animation-delay: 0.26s; }
      .d3 { animation-delay: 0.4s; }
      .d4 { animation-delay: 0.56s; }

      /* ── Button ── */
      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 13px 28px;
        font-family: var(--font-body);
        font-size: 13px;
        font-weight: 500;
        letter-spacing: ${btnLetterSpacing};
        text-transform: ${button.uppercase ? "uppercase" : "none"};
        text-decoration: ${btnUnderline};
        background: ${btnBg};
        color: ${btnColor};
        border: ${btnBorder};
        border-radius: ${btnRadius};
        clip-path: ${btnClipPath};
        cursor: pointer;
        transition: background 0.2s, color 0.2s, transform 0.2s, opacity 0.2s;
        white-space: nowrap;
      }
      .btn-primary:hover {
        background: ${button.variant === "outline" || button.variant === "underline" ? "transparent" : "var(--interactive-hover)"};
        color: ${button.variant === "outline" || button.variant === "underline" ? "var(--interactive-hover)" : "var(--interactive-fg)"};
        transform: translateY(-2px);
      }

      .btn-ghost {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        font-family: var(--font-body);
        font-size: 13px;
        letter-spacing: ${btnLetterSpacing};
        text-transform: ${button.uppercase ? "uppercase" : "none"};
        background: transparent;
        color: var(--text-subtle);
        border: 1px solid var(--border);
        border-radius: ${btnRadius};
        cursor: pointer;
        text-decoration: none;
        transition: border-color 0.2s, color 0.2s;
      }
      .btn-ghost:hover {
        border-color: var(--border-strong);
        color: var(--text-heading);
      }

      /* ── Nav link ── */
      .nav-link {
        position: relative;
        text-decoration: none;
        color: var(--text-subtle);
        font-size: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        transition: color 0.2s;
        font-family: var(--font-body);
      }
      .nav-link::after {
        content: '';
        position: absolute; bottom: -3px; left: 0;
        width: 0; height: 1px;
        background: var(--decorative);
        transition: width 0.3s ease;
      }
      .nav-link:hover { color: var(--text-heading); }
      .nav-link:hover::after { width: 100%; }

      /* ── Gallery items ── */
      .gallery-item { position: relative; overflow: hidden; cursor: pointer; }
      .gallery-item img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
      .gallery-item:hover img { transform: scale(1.07); }
      .g-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%);
        opacity: 0; transition: opacity 0.4s ease;
      }
      .gallery-item:hover .g-overlay { opacity: 1; }
      .g-overlay-content {
        position: absolute; bottom: 0; left: 0; right: 0; padding: 18px 16px;
        transform: translateY(6px); transition: transform 0.4s ease;
      }
      .gallery-item:hover .g-overlay-content { transform: translateY(0); }

      /* ── Artist card ── */
      .artist-card {
        border: 1px solid var(--border);
        transition: border-color 0.3s, transform 0.3s;
      }
      .artist-card:hover {
        border-color: var(--decorative);
        transform: translateY(-4px);
      }

      /* ── Separator ── */
      .sep-accent-bar { width: 36px; height: 2px; background: var(--decorative); margin-bottom: 14px; }
      .sep-line       { width: 100%; height: 1px; background: var(--border); margin: 64px 0; }
      .sep-dot        { width: 6px; height: 6px; border-radius: 50%; background: var(--decorative); margin-bottom: 18px; }

      /* ── Lightbox ── */
      .lightbox {
        position: fixed; inset: 0;
        background: var(--surface-overlay);
        z-index: 1000;
        display: flex; align-items: center; justify-content: center;
        animation: fadeIn 0.2s ease;
      }

      /* ── Testimonial card ── */
      .testimonial-card {
        border: 1px solid var(--border);
        padding: 32px;
        transition: border-color 0.3s;
      }
      .testimonial-card:hover { border-color: var(--border-strong); }

      /* ── Filter pill ── */
      .filter-pill {
        padding: 6px 16px;
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border: 1px solid var(--border);
        color: var(--text-subtle);
        background: transparent;
        cursor: pointer;
        font-family: var(--font-body);
        transition: all 0.2s;
        border-radius: ${btnRadius};
      }
      .filter-pill:hover, .filter-pill.active {
        border-color: var(--interactive);
        color: var(--interactive-fg);
        background: var(--interactive);
      }

      /* ── Horizontal scroll gallery ── */
      .h-scroll { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 16px; scroll-snap-type: x mandatory; }
      .h-scroll::-webkit-scrollbar { height: 3px; }
      .h-scroll::-webkit-scrollbar-thumb { background: var(--decorative); }
      .h-scroll-item { flex-shrink: 0; scroll-snap-align: start; }
    `}</style>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

function Separator({ config }: { config: TenantConfig }) {
  const style = config.effects.separatorStyle;
  if (style === "none") return null;
  if (style === "accent-bar") return <div className="sep-accent-bar" />;
  if (style === "dot") return <div className="sep-dot" />;
  if (style === "line") return <div className="sep-line" />;
  return null;
}

// ─── Button ───────────────────────────────────────────────────────────────────

function Btn({
  href,
  variant = "primary",
  children,
  style: extraStyle,
}: {
  href: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      className={variant === "primary" ? "btn-primary" : "btn-ghost"}
      style={extraStyle}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ config }: { config: TenantConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const { navbar, tokens } = config;

  useEffect(() => {
    if (navbar.variant !== "overlay") return;
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [navbar.variant]);

  const isSolid = navbar.variant === "solid" || (navbar.variant === "overlay" && scrolled);

  const logoSize = navbar.logoSize === "sm" ? "16px" : navbar.logoSize === "lg" ? "26px" : "20px";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "18px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: isSolid ? `${tokens.surfaceRaised}f2` : "transparent",
      backdropFilter: isSolid ? "blur(12px)" : "none",
      borderBottom: `1px solid ${isSolid ? tokens.border : "transparent"}`,
      transition: "all 0.35s ease",
    }}>
      <span className="font-display" style={{ fontSize: logoSize, letterSpacing: "0.18em", color: "var(--text-heading)" }}>
        {config.name}
      </span>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {["Galería", "Artistas", "Contacto"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
        ))}
        <Btn href={config.contactCtaUrl} style={{ padding: "9px 18px", fontSize: "11px" }}>
          {config.contactCta}
        </Btn>
      </div>
    </nav>
  );
}

// ─── Hero variants ────────────────────────────────────────────────────────────

function HeroCinematic({ config }: { config: TenantConfig }) {
  const { effects } = config;
  return (
    <section id="inicio" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 40px 80px", position: "relative", overflow: "hidden" }}>
      {/* Diagonal lines */}
      {effects.heroShowDiagonalLines && (
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={i} x1={`${i * 6}%`} y1="0" x2={`${i * 6 - 12}%`} y2="100%" stroke="var(--text-heading)" strokeWidth="1" />
          ))}
        </svg>
      )}

      {/* Accent shape */}
      {effects.heroAccentShape === "diagonal" && (
        <div style={{ position: "absolute", top: 0, right: 0, width: "35vw", height: "55vh", background: "var(--decorative)", opacity: 0.07, clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }} />
      )}
      {effects.heroAccentShape === "rect" && (
        <div style={{ position: "absolute", top: "10vh", right: "5vw", width: "260px", height: "340px", border: "1px solid var(--decorative)", opacity: 0.15 }} />
      )}
      {effects.heroAccentShape === "circle" && (
        <div style={{ position: "absolute", top: "8vh", right: "8vw", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid var(--decorative)", opacity: 0.2 }} />
      )}

      {/* Vertical text */}
      {effects.heroShowVerticalText && (
        <span className="font-display" style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontSize: "11px", letterSpacing: "0.3em", color: "var(--text-subtle)", opacity: 0.5 }}>
          {config.location}
        </span>
      )}

      <div style={{ maxWidth: "900px", position: "relative" }}>
        <p className="anim-fade-up" style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--decorative)", marginBottom: "22px" }}>
          ✦ Estudio de tatuajes
        </p>
        <h1 className="font-display anim-fade-up d1" style={{ fontSize: "clamp(70px, 12vw, 155px)", lineHeight: 0.9, letterSpacing: "0.02em" }}>
          {config.name}
        </h1>
        <p className="anim-fade-up d2" style={{ marginTop: "30px", fontSize: "16px", lineHeight: 1.75, color: "var(--text-subtle)", maxWidth: "500px" }}>
          {config.heroDescription}
        </p>
        <div className="anim-fade-up d3" style={{ marginTop: "44px", display: "flex", gap: "14px", alignItems: "center" }}>
          <Btn href={config.contactCtaUrl}>{config.contactCta} →</Btn>
          <Btn href="#galería" variant="ghost">Ver trabajos</Btn>
        </div>
        <div className="anim-fade-up d4" style={{ marginTop: "60px", display: "flex", gap: "18px", alignItems: "center" }}>
          {config.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-subtle)", transition: "color 0.2s", display: "flex" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
          <span style={{ color: "var(--border)", marginLeft: "4px" }}>|</span>
          <span style={{ fontSize: "12px", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "7px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulseDot 2s ease infinite" }} />
            Turnos disponibles
          </span>
        </div>
      </div>
    </section>
  );
}

function HeroEditorial({ config }: { config: TenantConfig }) {
  const { effects } = config;
  return (
    <section id="inicio" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
      {effects.heroAccentShape === "circle" && (
        <div style={{ position: "absolute", top: "12vh", right: "10vw", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid var(--decorative)", opacity: 0.18, animation: "spinSlow 40s linear infinite" }} />
      )}
      {effects.heroAccentShape === "rect" && (
        <div style={{ position: "absolute", bottom: "15vh", left: "5vw", width: "120px", height: "4px", background: "var(--decorative)", opacity: 0.6 }} />
      )}

      <div style={{ maxWidth: "800px" }}>
        <p className="anim-fade-up" style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--decorative)", marginBottom: "28px" }}>
          {config.location} — Arte mural
        </p>
        <h1 className="font-display anim-fade-up d1" style={{ fontSize: "clamp(60px, 10vw, 130px)", lineHeight: 0.92, letterSpacing: "0.01em", marginBottom: "36px" }}>
          {config.name}
        </h1>
        <p className="anim-fade-up d2" style={{ fontSize: "20px", lineHeight: 1.65, color: "var(--text-subtle)", maxWidth: "520px", fontStyle: "italic", marginBottom: "12px" }}>
          "{config.tagline}"
        </p>
        <p className="anim-fade-up d2" style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--text-subtle)", maxWidth: "460px", marginTop: "16px" }}>
          {config.heroDescription}
        </p>
        <div className="anim-fade-up d3" style={{ marginTop: "48px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Btn href={config.contactCtaUrl}>{config.contactCta}</Btn>
          <Btn href="#galería" variant="ghost">Ver proyectos</Btn>
        </div>
        <div className="anim-fade-up d4" style={{ marginTop: "56px", display: "flex", gap: "14px" }}>
          {config.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-subtle)", transition: "color 0.2s", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", fontSize: "13px" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
            >
              <SocialIcon icon={s.icon} />
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSplit({ config }: { config: TenantConfig }) {
  return (
    <section id="inicio" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>
      {/* Left: text */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "120px 48px 80px", position: "relative", zIndex: 1 }}>
        <p className="anim-fade-up" style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--decorative)", marginBottom: "22px" }}>
          ✦ {config.location}
        </p>
        <h1 className="font-display anim-fade-up d1" style={{ fontSize: "clamp(52px, 7vw, 96px)", lineHeight: 0.93 }}>
          {config.name}
        </h1>
        <p className="anim-fade-up d2" style={{ marginTop: "28px", fontSize: "15px", lineHeight: 1.75, color: "var(--text-subtle)", maxWidth: "400px" }}>
          {config.heroDescription}
        </p>
        <div className="anim-fade-up d3" style={{ marginTop: "40px", display: "flex", gap: "12px" }}>
          <Btn href={config.contactCtaUrl}>{config.contactCta} →</Btn>
        </div>
      </div>
      {/* Right: image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {config.gallery[0] && (
          <Image src={config.gallery[0].src} alt={config.gallery[0].alt} fill sizes="50vw" style={{ objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--surface) 0%, transparent 30%)" }} />
      </div>
    </section>
  );
}

function HeroMinimal({ config }: { config: TenantConfig }) {
  return (
    <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", textAlign: "center" }}>
      <div>
        <h1 className="font-display anim-fade-up" style={{ fontSize: "clamp(64px, 11vw, 140px)", lineHeight: 0.9, letterSpacing: "0.04em", marginBottom: "32px" }}>
          {config.name}
        </h1>
        <p className="anim-fade-up d1" style={{ fontSize: "18px", color: "var(--text-subtle)", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.7 }}>
          {config.heroDescription}
        </p>
        <div className="anim-fade-up d2" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Btn href={config.contactCtaUrl}>{config.contactCta}</Btn>
          <Btn href="#galería" variant="ghost">Portfolio</Btn>
        </div>
      </div>
    </section>
  );
}

const heroMap: Record<HeroVariant, React.FC<{ config: TenantConfig }>> = {
  cinematic: HeroCinematic,
  editorial: HeroEditorial,
  split:     HeroSplit,
  minimal:   HeroMinimal,
};

// ─── Gallery variants ─────────────────────────────────────────────────────────

function GalleryMasonry({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (src: string) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "10px" }}>
      {items.map((item, i) => (
        <div key={i} className="gallery-item" onClick={() => onOpen(item.src)}
          style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1", background: "var(--surface-raised)", borderRadius: "2px" }}>
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
          <div className="g-overlay">
            <div className="g-overlay-content">
              <p style={{ fontSize: "11px", color: "var(--decorative)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{item.category}</p>
              {item.artist && <p style={{ fontSize: "13px", color: "white", marginTop: "2px" }}>{item.artist}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryGrid({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (src: string) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
      {items.map((item, i) => (
        <div key={i} className="gallery-item" onClick={() => onOpen(item.src)}
          style={{ aspectRatio: "1/1", background: "var(--surface-raised)" }}>
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          <div className="g-overlay">
            <div className="g-overlay-content">
              <p style={{ fontSize: "11px", color: "var(--decorative)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryHorizontalScroll({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (src: string) => void }) {
  return (
    <div className="h-scroll">
      {items.map((item, i) => (
        <div key={i} className="gallery-item h-scroll-item" onClick={() => onOpen(item.src)}
          style={{ width: "320px", height: "420px", background: "var(--surface-raised)" }}>
          <Image src={item.src} alt={item.alt} fill sizes="320px" style={{ objectFit: "cover" }} />
          <div className="g-overlay">
            <div className="g-overlay-content">
              <p style={{ fontSize: "11px", color: "var(--decorative)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.category}</p>
              {item.artist && <p style={{ fontSize: "13px", color: "white", marginTop: "2px" }}>{item.artist}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryFeatured({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (src: string) => void }) {
  const [featured, ...rest] = items;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {/* Featured left */}
      {featured && (
        <div className="gallery-item" onClick={() => onOpen(featured.src)}
          style={{ gridRow: "span 2", background: "var(--surface-raised)", minHeight: "500px", position: "relative" }}>
          <Image src={featured.src} alt={featured.alt} fill sizes="50vw" style={{ objectFit: "cover" }} />
          <div className="g-overlay">
            <div className="g-overlay-content">
              <p style={{ fontSize: "11px", color: "var(--decorative)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{featured.category}</p>
              {featured.artist && <p style={{ fontSize: "14px", color: "white", marginTop: "2px" }}>{featured.artist}</p>}
            </div>
          </div>
        </div>
      )}
      {/* Secondary grid right */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {rest.slice(0, 4).map((item, i) => (
          <div key={i} className="gallery-item" onClick={() => onOpen(item.src)}
            style={{ aspectRatio: "1/1", background: "var(--surface-raised)" }}>
            <Image src={item.src} alt={item.alt} fill sizes="25vw" style={{ objectFit: "cover" }} />
            <div className="g-overlay">
              <div className="g-overlay-content">
                <p style={{ fontSize: "10px", color: "var(--decorative)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery section (with filter + lightbox) ─────────────────────────────────

function GallerySection({ config }: { config: TenantConfig }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "Todos"
    ? config.gallery
    : config.gallery.filter((i) => i.category === activeCategory);

  const GalleryComponent = {
    masonry: GalleryMasonry,
    grid: GalleryGrid,
    "horizontal-scroll": GalleryHorizontalScroll,
    featured: GalleryFeatured,
  }[config.variants.gallery as GalleryVariant];

  return (
    <section id="galería" style={{ padding: "100px 40px" }}>
      <div style={{ marginBottom: "44px" }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(38px, 6vw, 70px)", letterSpacing: "0.04em", lineHeight: 1 }}>
          TRABAJOS
        </h2>
        <p style={{ marginTop: "10px", color: "var(--text-subtle)", fontSize: "14px" }}>
          Una selección de nuestras piezas recientes
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "36px", flexWrap: "wrap" }}>
        {config.categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`filter-pill ${activeCategory === cat ? "active" : ""}`}>
            {cat}
          </button>
        ))}
      </div>

      <GalleryComponent items={filtered} onOpen={setLightbox} />

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "var(--text-heading)", fontSize: "26px", cursor: "pointer" }}>✕</button>
          <div style={{ position: "relative", maxWidth: "80vw", maxHeight: "85vh", width: "100%", height: "100%" }}>
            <Image src={lightbox} alt="Vista ampliada" fill sizes="80vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Artists section ──────────────────────────────────────────────────────────

function ArtistsSection({ config }: { config: TenantConfig }) {
  return (
    <section id="artistas" style={{ padding: "100px 40px", background: "var(--surface-raised)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ marginBottom: "52px" }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(38px, 6vw, 70px)", letterSpacing: "0.04em", lineHeight: 1 }}>
          LOS ARTISTAS
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {config.artists.map((artist, i) => (
          <div key={i} className="artist-card" style={{ padding: "32px", background: "var(--surface)" }}>
            <div style={{ width: 68, height: 68, borderRadius: config.button.variant === "rounded" ? "50%" : "2px", overflow: "hidden", position: "relative", marginBottom: "18px", border: "2px solid var(--border)" }}>
              <Image src={artist.avatar} alt={artist.name} fill sizes="68px" style={{ objectFit: "cover" }} />
            </div>
            <h3 className="font-display" style={{ fontSize: "24px", letterSpacing: "0.06em", marginBottom: "4px" }}>{artist.name}</h3>
            <p style={{ fontSize: "11px", color: "var(--decorative)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "14px" }}>{artist.role}</p>
            <p style={{ fontSize: "14px", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: "18px" }}>{artist.bio}</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {artist.specialties.map((s) => (
                <span key={s} style={{ padding: "3px 10px", border: "1px solid var(--border)", fontSize: "11px", letterSpacing: "0.07em", color: "var(--text-subtle)" }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials section ─────────────────────────────────────────────────────

function TestimonialsSection({ config }: { config: TenantConfig }) {
  if (!config.testimonials?.length) return null;
  return (
    <section style={{ padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ marginBottom: "52px" }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(38px, 6vw, 70px)", letterSpacing: "0.04em", lineHeight: 1 }}>
          LO QUE DICEN
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {config.testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            {t.rating && (
              <div style={{ marginBottom: "16px", color: "var(--decorative)", fontSize: "14px", letterSpacing: "2px" }}>
                {"★".repeat(t.rating)}
              </div>
            )}
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--text-body)", marginBottom: "20px", fontStyle: "italic" }}>
              "{t.text}"
            </p>
            <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
              — {t.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────

function ContactSection({ config }: { config: TenantConfig }) {
  return (
    <section id="contacto" style={{ padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "660px", margin: "0 auto", textAlign: "center" }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(44px, 8vw, 90px)", letterSpacing: "0.04em", lineHeight: 0.94, marginBottom: "26px" }}>
          HAGAMOS ALGO JUNTOS
        </h2>
        <p style={{ color: "var(--text-subtle)", fontSize: "15px", lineHeight: 1.75, marginBottom: "44px" }}>
          Mandanos un mensaje para consultar disponibilidad, precios o para discutir tu idea. Respondemos en menos de 24hs.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Btn href={config.contactCtaUrl}>{config.contactCta} →</Btn>
          {config.socials.map((s) => (
            <Btn key={s.label} href={s.url} variant="ghost">
              <SocialIcon icon={s.icon} /> {s.label}
            </Btn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function MarqueeStrip({ config }: { config: TenantConfig }) {
  const text = Array(8).fill(`${config.name} — ${config.tagline}`).join("  ✦  ");
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "13px 0", overflow: "hidden", background: "var(--surface-raised)" }}>
      <div className="anim-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {[0, 1].map((k) => (
          <span key={k} className="font-display" style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--text-subtle)", paddingRight: "40px" }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ config }: { config: TenantConfig }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface-raised)" }}>
      <span className="font-display" style={{ fontSize: "15px", letterSpacing: "0.14em", color: "var(--text-subtle)" }}>{config.name}</span>
      <span style={{ fontSize: "12px", color: "var(--text-subtle)", letterSpacing: "0.04em" }}>© {new Date().getFullYear()} — {config.location}</span>
    </footer>
  );
}

// ─── Section router ───────────────────────────────────────────────────────────

function SectionRouter({ id, config }: { id: SectionId; config: TenantConfig }) {
  if (id === "gallery") return <GallerySection config={config} />;
  if (id === "artists" && config.sections.showArtists) return <ArtistsSection config={config} />;
  if (id === "testimonials" && config.sections.showTestimonials) return <TestimonialsSection config={config} />;
  if (id === "contact") return <ContactSection config={config} />;
  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function TenantLanding({ config }: { config: TenantConfig }) {
  const HeroComponent = heroMap[config.variants.hero];

  return (
    <>
      <ThemeInjector config={config} />
      <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
        <Navbar config={config} />
        <HeroComponent config={config} />
        {config.sections.showMarquee && <MarqueeStrip config={config} />}
        {config.sections.order.map((id) => (
          <SectionRouter key={id} id={id} config={config} />
        ))}
        <Footer config={config} />
      </div>
    </>
  );
}
