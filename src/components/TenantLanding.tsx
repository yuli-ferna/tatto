"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TenantConfig } from "@/types/tenant";

// ─── Icon helpers ────────────────────────────────────────────────────────────

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

// ─── CSS Variable injector ────────────────────────────────────────────────────

function ThemeInjector({ theme }: { theme: TenantConfig["theme"] }) {
  return (
    <style>{`
      :root {
        --bg-primary: ${theme.bgPrimary};
        --bg-secondary: ${theme.bgSecondary};
        --accent: ${theme.accent};
        --accent-hover: ${theme.accentHover};
        --text-primary: ${theme.textPrimary};
        --text-muted: ${theme.textMuted};
        --border: ${theme.border};
      }

      @import url('https://fonts.googleapis.com/css2?family=${theme.fontDisplay}&family=${theme.fontBody}&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }

      html { scroll-behavior: smooth; }

      body {
        background: var(--bg-primary);
        color: var(--text-primary);
        font-family: 'DM Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      .font-display { font-family: 'Bebas Neue', 'Impact', sans-serif; }

      /* Grain overlay */
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
        opacity: 0.03;
        pointer-events: none;
        z-index: 9999;
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg-primary); }
      ::-webkit-scrollbar-thumb { background: var(--accent); }

      /* Animations */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }

      .animate-fade-up { animation: fadeUp 0.8s ease forwards; }
      .animate-fade-in { animation: fadeIn 1.2s ease forwards; }
      .animate-marquee { animation: marquee 20s linear infinite; }

      .delay-1 { animation-delay: 0.15s; }
      .delay-2 { animation-delay: 0.3s; }
      .delay-3 { animation-delay: 0.45s; }
      .delay-4 { animation-delay: 0.6s; }

      /* Gallery hover */
      .gallery-item { position: relative; overflow: hidden; cursor: pointer; }
      .gallery-item img { transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      .gallery-item:hover img { transform: scale(1.08); }
      .gallery-item .overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      .gallery-item:hover .overlay { opacity: 1; }
      .gallery-item .overlay-content {
        position: absolute; bottom: 0; left: 0; right: 0;
        padding: 20px 16px;
        transform: translateY(8px);
        transition: transform 0.4s ease;
      }
      .gallery-item:hover .overlay-content { transform: translateY(0); }

      /* Nav */
      .nav-link {
        position: relative;
        text-decoration: none;
        color: var(--text-muted);
        font-size: 13px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        transition: color 0.2s;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px; left: 0;
        width: 0; height: 1px;
        background: var(--accent);
        transition: width 0.3s ease;
      }
      .nav-link:hover { color: var(--text-primary); }
      .nav-link:hover::after { width: 100%; }

      /* Artist card */
      .artist-card {
        border: 1px solid var(--border);
        transition: border-color 0.3s, transform 0.3s;
      }
      .artist-card:hover {
        border-color: var(--accent);
        transform: translateY(-4px);
      }

      /* CTA Button */
      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--accent);
        color: var(--text-primary);
        padding: 14px 32px;
        font-size: 13px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        font-weight: 500;
        text-decoration: none;
        transition: background 0.2s, transform 0.2s;
        clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
      }
      .btn-primary:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
      }

      .btn-ghost {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid var(--border);
        color: var(--text-muted);
        padding: 12px 24px;
        font-size: 13px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-decoration: none;
        transition: border-color 0.2s, color 0.2s;
      }
      .btn-ghost:hover {
        border-color: var(--text-muted);
        color: var(--text-primary);
      }

      /* Section separator */
      .sep {
        width: 40px; height: 2px;
        background: var(--accent);
        margin-bottom: 12px;
      }

      /* Filter pills */
      .filter-pill {
        padding: 6px 16px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        border: 1px solid var(--border);
        color: var(--text-muted);
        background: transparent;
        cursor: pointer;
        transition: all 0.2s;
      }
      .filter-pill:hover, .filter-pill.active {
        border-color: var(--accent);
        color: var(--text-primary);
        background: var(--accent);
      }

      /* Lightbox */
      .lightbox {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.95);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s ease;
      }
    `}</style>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar({ config }: { config: TenantConfig }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <span
        className="font-display"
        style={{ fontSize: "22px", letterSpacing: "0.2em", color: "var(--text-primary)" }}
      >
        {config.name}
      </span>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {["Galería", "Artistas", "Contacto"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="nav-link"
          >
            {item}
          </a>
        ))}
        <a href={config.contactCtaUrl} className="btn-primary" style={{ padding: "10px 20px", fontSize: "12px" }}>
          {config.contactCta}
        </a>
      </div>
    </nav>
  );
}

function HeroSection({ config }: { config: TenantConfig }) {
  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background diagonal lines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={`${i * 5}%`} y1="0"
              x2={`${i * 5 - 10}%`} y2="100%"
              stroke="var(--text-primary)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* Accent block top right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "35vw",
          height: "55vh",
          background: "var(--accent)",
          opacity: 0.06,
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Vertical text */}
      <span
        className="font-display"
        style={{
          position: "absolute",
          right: 40,
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontSize: "11px",
          letterSpacing: "0.3em",
          color: "var(--text-muted)",
          transformOrigin: "center",
          opacity: 0.5,
        }}
      >
        {config.location}
      </span>

      {/* Main content */}
      <div style={{ maxWidth: "900px", position: "relative" }}>
        <p
          className="animate-fade-up"
          style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "24px",
            opacity: 0,
          }}
        >
          ✦ Estudio de tatuajes
        </p>

        <h1
          className="font-display animate-fade-up delay-1"
          style={{
            fontSize: "clamp(72px, 12vw, 160px)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            color: "var(--text-primary)",
            opacity: 0,
          }}
        >
          {config.name}
        </h1>

        <p
          className="animate-fade-up delay-2"
          style={{
            marginTop: "32px",
            fontSize: "17px",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: "520px",
            opacity: 0,
          }}
        >
          {config.heroDescription}
        </p>

        <div
          className="animate-fade-up delay-3"
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            opacity: 0,
          }}
        >
          <a href={config.contactCtaUrl} className="btn-primary">
            {config.contactCta}
            <span>→</span>
          </a>
          <a href="#galería" className="btn-ghost">
            Ver trabajos
          </a>
        </div>

        {/* Socials */}
        <div
          className="animate-fade-up delay-4"
          style={{
            marginTop: "64px",
            display: "flex",
            gap: "20px",
            opacity: 0,
          }}
        >
          {config.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-muted)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
          <span style={{ color: "var(--border)", marginLeft: "4px" }}>|</span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                animation: "pulse-dot 2s ease infinite",
              }}
            />
            Turnos disponibles
          </span>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip({ text }: { text: string }) {
  const repeated = Array(8).fill(text).join("  ✦  ");
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 0",
        overflow: "hidden",
        background: "var(--bg-secondary)",
      }}
    >
      <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
        <span
          className="font-display"
          style={{
            fontSize: "13px",
            letterSpacing: "0.25em",
            color: "var(--text-muted)",
            paddingRight: "40px",
          }}
        >
          {repeated}
        </span>
        <span
          className="font-display"
          style={{
            fontSize: "13px",
            letterSpacing: "0.25em",
            color: "var(--text-muted)",
            paddingRight: "40px",
          }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}

function GallerySection({ config }: { config: TenantConfig }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    activeCategory === "Todos"
      ? config.gallery
      : config.gallery.filter((i) => i.category === activeCategory);

  return (
    <section id="galería" style={{ padding: "100px 40px" }}>
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <div className="sep" />
        <h2
          className="font-display"
          style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "0.05em", lineHeight: 1 }}
        >
          TRABAJOS
        </h2>
        <p style={{ marginTop: "12px", color: "var(--text-muted)", fontSize: "15px" }}>
          Una selección de nuestras piezas recientes
        </p>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
        {config.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-style grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
        }}
      >
        {filtered.map((item, i) => (
          <div
            key={i}
            className="gallery-item"
            onClick={() => setLightbox(item.src)}
            style={{
              aspectRatio: i % 3 === 0 ? "3/4" : "1/1",
              background: "var(--bg-secondary)",
              borderRadius: "2px",
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
            <div className="overlay">
              <div className="overlay-content">
                <p style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {item.category}
                </p>
                {item.artist && (
                  <p style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>
                    {item.artist}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: "24px", right: "32px",
              background: "none", border: "none", color: "var(--text-primary)",
              fontSize: "28px", cursor: "pointer", lineHeight: 1,
            }}
          >
            ✕
          </button>
          <div style={{ position: "relative", maxWidth: "80vw", maxHeight: "85vh", width: "100%", height: "100%" }}>
            <Image
              src={lightbox}
              alt="Vista ampliada"
              fill
              sizes="80vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ArtistsSection({ config }: { config: TenantConfig }) {
  return (
    <section
      id="artistas"
      style={{
        padding: "100px 40px",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ marginBottom: "56px" }}>
        <div className="sep" />
        <h2
          className="font-display"
          style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "0.05em", lineHeight: 1 }}
        >
          LOS ARTISTAS
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {config.artists.map((artist, i) => (
          <div
            key={i}
            className="artist-card"
            style={{
              padding: "32px",
              background: "var(--bg-primary)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
                marginBottom: "20px",
                border: "2px solid var(--border)",
              }}
            >
              <Image
                src={artist.avatar}
                alt={artist.name}
                fill
                sizes="72px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3
              className="font-display"
              style={{ fontSize: "26px", letterSpacing: "0.08em", marginBottom: "4px" }}
            >
              {artist.name}
            </h3>
            <p style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
              {artist.role}
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px" }}>
              {artist.bio}
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {artist.specialties.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "3px 10px",
                    border: "1px solid var(--border)",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ config }: { config: TenantConfig }) {
  return (
    <section id="contacto" style={{ padding: "100px 40px" }}>
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "20px" }}>
          ✦ Reservas
        </p>
        <h2
          className="font-display"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "0.05em", lineHeight: 0.95, marginBottom: "28px" }}
        >
          HAGAMOS ALGO JUNTOS
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.7, marginBottom: "48px" }}>
          Mandanos un mensaje para consultar disponibilidad, precios o para discutir tu idea. Respondemos en menos de 24hs.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={config.contactCtaUrl} className="btn-primary">
            {config.contactCta} →
          </a>
          {config.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <SocialIcon icon={s.icon} />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ config }: { config: TenantConfig }) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--bg-secondary)",
      }}
    >
      <span
        className="font-display"
        style={{ fontSize: "16px", letterSpacing: "0.15em", color: "var(--text-muted)" }}
      >
        {config.name}
      </span>
      <span style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
        © {new Date().getFullYear()} — {config.location}
      </span>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function TenantLanding({ config }: { config: TenantConfig }) {
  return (
    <>
      <ThemeInjector theme={config.theme} />
      <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <Navbar config={config} />
        <HeroSection config={config} />
        <MarqueeStrip text={`${config.name} — ${config.tagline}`} />
        <GallerySection config={config} />
        <ArtistsSection config={config} />
        <ContactSection config={config} />
        <Footer config={config} />
      </div>
    </>
  );
}
