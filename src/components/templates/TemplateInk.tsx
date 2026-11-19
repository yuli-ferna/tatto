"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TenantConfig, SectionId } from "@/types/tenant";
import { SocialIcon, IconMenu, IconClose } from "../shared/Icons";
import { Btn, MarqueeStrip, Footer } from "../shared/Sections";
import ThemeInjector from "../shared/ThemeInjector";

// ─── Book-tab Navbar ──────────────────────────────────────────────────────────
// Desktop: fixed left rail with tabs protruding like book page-tabs.
// Mobile: top bar + fullscreen drawer.

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Inicio",    href: "#inicio"    },
  { label: "Galería",   href: "#galería"   },
  { label: "Artistas",  href: "#artistas"  },
  { label: "Contacto",  href: "#contacto"  },
];

function BookTabNav({ config }: { config: TenantConfig }) {
  const [active, setActive] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.href.slice(1))).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (href: string) => {
    setActive(href.slice(1));
    setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Desktop book-tab rail ── */}
      <aside className="bunker-rail">
        {/* Logo / name */}
        <div style={{ padding: "28px 0 32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          {config.logo ? (
            <Image src={config.logo} alt={config.name} width={40} height={40} style={{ objectFit: "contain" }} />
          ) : (
            <span className="font-display" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--decorative)", textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)", lineHeight: 1, padding: "8px 0" }}>
              {config.name}
            </span>
          )}
          {/* Thin horizontal rule */}
          <div style={{ width: 1, height: 32, background: "var(--border)" }} />
        </div>

        {/* Tabs */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <button
                key={item.href}
                onClick={() => handleTabClick(item.href)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 0,
                  position: "relative",
                }}
              >
                {/* Tab shape: protrudes to the right */}
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  color: isActive ? "var(--text-inverse)" : "var(--text-subtle)",
                  background: isActive ? "var(--decorative)" : "transparent",
                  border: `1px solid ${isActive ? "var(--decorative)" : "var(--border)"}`,
                  borderRight: "none",
                  padding: "14px 8px",
                  // Tab corners: rounded top-left and bottom-left in vertical orientation
                  borderRadius: "0 4px 4px 0",
                  marginRight: -1,
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                  minHeight: 72,
                }}>
                  {item.label}
                </span>
                {/* Right edge line connecting tab to page edge */}
                {isActive && (
                  <div style={{ width: 2, height: "100%", background: "var(--surface)", position: "absolute", right: -1, top: 0, zIndex: 1 }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom socials */}
        <div style={{ padding: "24px 0 32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 1, height: 24, background: "var(--border)" }} />
          {config.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-subtle)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <nav className="bunker-topbar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 60, padding: "0 20px",
        display: "none", alignItems: "center", justifyContent: "space-between",
        background: scrolled || menuOpen ? `var(--surface)f0` : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled || menuOpen ? "var(--border)" : "transparent"}`,
        transition: "all 0.3s ease",
      }}>
        <a href="#inicio" style={{ textDecoration: "none" }}>
          {config.logo
            ? <Image src={config.logo} alt={config.name} width={100} height={28} style={{ objectFit: "contain" }} />
            : <span className="font-display" style={{ fontSize: 16, letterSpacing: "0.2em", color: "var(--decorative)" }}>{config.name}</span>
          }
        </a>
        <button onClick={() => setMenuOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-heading)", padding: 4, display: "flex" }}>
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* ── Mobile fullscreen drawer ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 190,
        background: `var(--surface)f8`,
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 4,
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.38s cubic-bezier(0.77,0,0.175,1)",
      }}>
        {/* Decorative thin vertical lines */}
        <div style={{ position: "absolute", left: "10%", top: 0, bottom: 0, width: 1, background: "var(--border)", opacity: 0.4 }} />
        <div style={{ position: "absolute", right: "10%", top: 0, bottom: 0, width: 1, background: "var(--border)", opacity: 0.4 }} />

        {NAV_ITEMS.map((item, i) => (
          <button key={item.href} onClick={() => handleTabClick(item.href)}
            style={{
              all: "unset",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 9vw, 52px)",
              letterSpacing: "0.06em",
              color: active === item.href.slice(1) ? "var(--decorative)" : "var(--text-heading)",
              padding: "10px 0",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.06}s`,
              transitionProperty: "opacity, transform, color",
              transitionDuration: "0.4s",
            }}>
            {item.label}
          </button>
        ))}
        <div style={{ marginTop: 32, display: "flex", gap: 20, opacity: menuOpen ? 1 : 0, transition: "opacity 0.4s ease 0.28s" }}>
          {config.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-subtle)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .bunker-rail {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 52px; z-index: 100;
          display: flex; flex-direction: column; align-items: center;
          background: var(--surface);
          border-left: 1px solid var(--border);
        }
        @media (max-width: 768px) {
          .bunker-rail    { display: none; }
          .bunker-topbar  { display: flex !important; }
          .bunker-content { padding-right: 0 !important; padding-top: 60px !important; }
        }
      `}</style>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Full-bleed background image, title centered with curly braces accent,
// decorative arrow ornament, book-page feel.

function BunkerHero({ config }: { config: TenantConfig }) {
  return (
    <section id="inicio" style={{
      minHeight: "100svh",
      position: "relative",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-end",
      overflow: "hidden",
    }}>
      {/* Background image */}
      {config.heroImage && (
        <Image
          src={config.heroImage}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      )}

      {/* Multi-layer dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.45) 50%, rgba(10,8,6,0.25) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,8,6,0.5) 100%)" }} />

      {/* Decorative thin vertical lines — book page feel */}
      <div style={{ position: "absolute", left: "8%", top: "15%", bottom: "20%", width: 1, background: "var(--decorative)", opacity: 0.25 }} />
      <div style={{ position: "absolute", right: "calc(52px + 8%)", top: "15%", bottom: "20%", width: 1, background: "var(--decorative)", opacity: 0.25 }} />

      {/* Arc ornaments (ref image 1 - side decorations) */}
      <svg style={{ position: "absolute", left: "4%", top: "50%", transform: "translateY(-50%)", opacity: 0.35, pointerEvents: "none" }} width="60" height="180" viewBox="0 0 60 180" fill="none">
        {[0, 20, 40].map((offset, i) => (
          <path key={i} d={`M55 ${10 + offset} Q5 ${90} 55 ${170 - offset}`} stroke="var(--decorative)" strokeWidth="1" fill="none" opacity={1 - i * 0.2} />
        ))}
      </svg>
      <svg style={{ position: "absolute", right: "calc(52px + 4%)", top: "50%", transform: "translateY(-50%) scaleX(-1)", opacity: 0.35, pointerEvents: "none" }} width="60" height="180" viewBox="0 0 60 180" fill="none">
        {[0, 20, 40].map((offset, i) => (
          <path key={i} d={`M55 ${10 + offset} Q5 ${90} 55 ${170 - offset}`} stroke="var(--decorative)" strokeWidth="1" fill="none" opacity={1 - i * 0.2} />
        ))}
      </svg>

      {/* Center content */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "0 clamp(24px,8vw,80px) clamp(48px,8vw,96px)",
        textAlign: "center",
      }}>
        {/* Tagline above */}
        <p className="anim-fade-up" style={{ fontSize: "clamp(10px,1.2vw,12px)", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--decorative)", marginBottom: "clamp(16px,3vw,24px)" }}>
          {config.location}
        </p>

        {/* Main title with curly accent */}
        <h1 className="font-display anim-fade-up d1" style={{
          fontSize: "clamp(44px,9vw,130px)",
          lineHeight: 0.92,
          letterSpacing: "0.04em",
          color: "var(--text-heading)",
          textShadow: "0 2px 40px rgba(0,0,0,0.8)",
        }}>
          <span style={{ color: "var(--decorative)", fontStyle: "normal" }}>{"\u007B"}</span>
          {config.name.split(" ")[0]}
          <span style={{ color: "var(--decorative)" }}>{"\u007D"}</span>
          {config.name.includes(" ") && (
            <><br />{config.name.split(" ").slice(1).join(" ")}</>
          )}
        </h1>

        {/* Subtitle / tagline */}
        <p className="anim-fade-up d2" style={{
          marginTop: "clamp(16px,3vw,24px)",
          fontSize: "clamp(12px,1.6vw,16px)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--text-heading)",
          opacity: 0.85,
        }}>
          {config.tagline}
        </p>

        {/* Arrow ornament — ref image 1 */}
        <div className="anim-fade-up d3" style={{ display: "flex", alignItems: "center", gap: 16, margin: "clamp(24px,4vw,36px) 0" }}>
          <ArrowOrnament direction="left" />
          <a href={config.contactCtaUrl} className="btn-primary" style={{ padding: "clamp(10px,1.5vw,14px) clamp(20px,3vw,32px)" }}>
            {config.contactCta}
          </a>
          <ArrowOrnament direction="right" />
        </div>

        {/* Socials row */}
        <div className="anim-fade-up d4" style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {config.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-subtle)", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6, textDecoration: "none", fontSize: "clamp(11px,1.2vw,13px)", letterSpacing: "0.08em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
              <SocialIcon icon={s.icon} />
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowOrnament({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="80" height="14" viewBox="0 0 80 14" fill="none" style={{ opacity: 0.7 }}>
      {direction === "right" ? (
        <>
          <line x1="0" y1="7" x2="60" y2="7" stroke="var(--decorative)" strokeWidth="0.8" />
          <polygon points="60,3 75,7 60,11" fill="var(--decorative)" opacity="0.9" />
          <line x1="65" y1="4" x2="80" y2="7" stroke="var(--decorative)" strokeWidth="0.5" />
          <line x1="65" y1="10" x2="80" y2="7" stroke="var(--decorative)" strokeWidth="0.5" />
        </>
      ) : (
        <>
          <line x1="80" y1="7" x2="20" y2="7" stroke="var(--decorative)" strokeWidth="0.8" />
          <polygon points="20,3 5,7 20,11" fill="var(--decorative)" opacity="0.9" />
          <line x1="15" y1="4" x2="0" y2="7" stroke="var(--decorative)" strokeWidth="0.5" />
          <line x1="15" y1="10" x2="0" y2="7" stroke="var(--decorative)" strokeWidth="0.5" />
        </>
      )}
    </svg>
  );
}

// ─── Gallery section ──────────────────────────────────────────────────────────

function BunkerGallery({ config }: { config: TenantConfig }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === "Todos"
    ? config.gallery
    : config.gallery.filter((i) => i.category === activeCategory);

  return (
    <section id="galería" style={{ padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)" }}>
      {/* Section header with calligraphic number */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 48 }}>
        <span className="font-display" style={{ fontSize: "clamp(60px,10vw,120px)", lineHeight: 1, color: "var(--border)", userSelect: "none", marginTop: -12 }}>01</span>
        <div style={{ paddingTop: 12 }}>
          <div style={{ width: 32, height: 1, background: "var(--decorative)", marginBottom: 12 }} />
          <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,60px)", letterSpacing: "0.06em", lineHeight: 1 }}>GALERÍA</h2>
          <p style={{ color: "var(--text-subtle)", fontSize: "clamp(13px,1.4vw,15px)", marginTop: 8 }}>Nuestros trabajos recientes</p>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {config.categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`filter-pill ${activeCategory === cat ? "active" : ""}`}>{cat}</button>
        ))}
      </div>

      {/* Masonry grid */}
      <div style={{ columns: "repeat(auto-fill, minmax(min(240px,100%), 1fr))", columnGap: 10 }}>
        {filtered.map((item, i) => (
          <div key={i} onClick={() => setLightbox(item.src)}
            style={{ breakInside: "avoid", marginBottom: 10, position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: i % 4 === 0 ? "3/4" : i % 4 === 2 ? "4/5" : "1/1", display: "block" }}>
            <Image src={item.src} alt={item.alt} fill sizes="(max-width:600px) 100vw,(max-width:900px) 50vw,33vw" style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
              className="gallery-zoom" />
            <div className="g-overlay">
              <div className="g-overlay-content">
                <p style={{ fontSize: 10, color: "var(--decorative)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{item.category}</p>
                {item.artist && <p style={{ fontSize: 12, color: "white", marginTop: 2 }}>{item.artist}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "var(--text-heading)", fontSize: 26, cursor: "pointer" }}>✕</button>
          <div style={{ position: "relative", maxWidth: "88vw", maxHeight: "88vh", width: "100%", height: "100%" }}>
            <Image src={lightbox} alt="Vista ampliada" fill sizes="88vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}

      <style>{`.gallery-zoom:hover { transform: scale(1.07); }`}</style>
    </section>
  );
}

// ─── Artist cards — ref image 2 (ARTIST OF THE DAY card style) ────────────────

function BunkerArtists({ config }: { config: TenantConfig }) {
  return (
    <section id="artistas" style={{
      padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)",
      background: "var(--surface-raised)",
      borderTop: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 56 }}>
        <span className="font-display" style={{ fontSize: "clamp(60px,10vw,120px)", lineHeight: 1, color: "var(--border)", userSelect: "none", marginTop: -12 }}>02</span>
        <div style={{ paddingTop: 12 }}>
          <div style={{ width: 32, height: 1, background: "var(--decorative)", marginBottom: 12 }} />
          <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,60px)", letterSpacing: "0.06em", lineHeight: 1 }}>ARTISTAS</h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px,100%), 1fr))", gap: 20 }}>
        {config.artists.map((artist, i) => (
          <div key={i} style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            transition: "border-color 0.3s, transform 0.3s",
            position: "relative",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--decorative)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>

            {/* Header strip — ref image 2 label bar */}
            <div style={{ background: "var(--decorative)", padding: "6px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-inverse)", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                Artista del estudio
              </span>
              {artist.availability && (
                <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-inverse)", opacity: 0.8 }}>{artist.availability}</span>
              )}
            </div>

            <div style={{ padding: 24 }}>
              {/* Avatar + meta */}
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ flexShrink: 0, width: 64, height: 64, overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
                  <Image src={artist.avatar} alt={artist.name} fill sizes="64px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="font-display" style={{ fontSize: "clamp(18px,2.5vw,22px)", letterSpacing: "0.06em", marginBottom: 4 }}>{artist.name}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3px 12px", fontSize: 11, color: "var(--text-subtle)" }}>
                    <span>Estilo</span>
                    <span style={{ color: "var(--text-body)" }}>{artist.specialties[0]}</span>
                    {artist.priceFrom && (
                      <>
                        <span>Desde</span>
                        <span style={{ color: "var(--text-body)" }}>{artist.priceFrom}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "clamp(13px,1.4vw,14px)", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 18 }}>{artist.bio}</p>

              {/* Specialties */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                {artist.specialties.map((s) => (
                  <span key={s} style={{ padding: "3px 10px", border: "1px solid var(--border)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-subtle)" }}>{s}</span>
                ))}
              </div>

              {/* CTA row */}
              <div style={{ display: "flex", gap: 8 }}>
                <a href={config.contactCtaUrl} className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "10px 12px", fontSize: 11 }}>
                  Reservar
                </a>
                {artist.instagramUrl && (
                  <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: "10px 14px", fontSize: 11 }}>
                    <SocialIcon icon="instagram" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function BunkerTestimonials({ config }: { config: TenantConfig }) {
  if (!config.testimonials?.length) return null;
  return (
    <section style={{ padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)", borderTop: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 52 }}>
        <span className="font-display" style={{ fontSize: "clamp(60px,10vw,120px)", lineHeight: 1, color: "var(--border)", userSelect: "none", marginTop: -12 }}>03</span>
        <div style={{ paddingTop: 12 }}>
          <div style={{ width: 32, height: 1, background: "var(--decorative)", marginBottom: 12 }} />
          <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,60px)", letterSpacing: "0.06em", lineHeight: 1 }}>OPINIONES</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))", gap: 20 }}>
        {config.testimonials.map((t, i) => (
          <div key={i} style={{ border: "1px solid var(--border)", padding: "28px 28px 24px", position: "relative" }}>
            {/* Opening quote mark */}
            <span className="font-display" style={{ position: "absolute", top: 12, left: 16, fontSize: 48, lineHeight: 1, color: "var(--decorative)", opacity: 0.3 }}>"</span>
            {t.rating && <div style={{ marginBottom: 12, color: "var(--decorative)", fontSize: 13, letterSpacing: 2 }}>{"★".repeat(t.rating)}</div>}
            <p style={{ fontSize: "clamp(14px,1.5vw,15px)", lineHeight: 1.8, color: "var(--text-body)", marginBottom: 20, fontStyle: "italic", paddingTop: 8 }}>"{t.text}"</p>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>— {t.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function BunkerContact({ config }: { config: TenantConfig }) {
  return (
    <section id="contacto" style={{ padding: "clamp(60px,10vw,100px) clamp(20px,5vw,48px)", borderTop: "1px solid var(--border)" }}>
      {/* Calligraphic sketch text — ref image 3 */}
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <svg style={{ position: "absolute", left: -60, top: -40, opacity: 0.12, pointerEvents: "none" }} width="200" height="120" viewBox="0 0 200 120" fill="none">
          <path d="M10,60 Q30,20 60,60 Q90,100 120,60 Q150,20 180,60" stroke="var(--text-heading)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M5,80 Q40,40 80,80 Q120,120 160,80 Q180,60 200,70" stroke="var(--text-heading)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>

        <div style={{ width: 32, height: 1, background: "var(--decorative)", margin: "0 auto 16px" }} />
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--decorative)", marginBottom: 20 }}>Reservas & Consultas</p>
        <h2 className="font-display" style={{ fontSize: "clamp(38px,7vw,80px)", letterSpacing: "0.04em", lineHeight: 0.94, marginBottom: 24 }}>
          HAGAMOS ALGO<br />ÚNICO
        </h2>
        <p style={{ color: "var(--text-subtle)", fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.75, marginBottom: 44, maxWidth: 480, margin: "0 auto 44px" }}>
          Contanos tu idea y te respondemos en menos de 24hs. Trabajamos diseños a medida.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={config.contactCtaUrl} className="btn-primary">{config.contactCta} →</a>
          {config.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <SocialIcon icon={s.icon} /> {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bunker Footer ────────────────────────────────────────────────────────────

function BunkerFooter({ config }: { config: TenantConfig }) {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "24px clamp(20px,5vw,48px)",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      background: "var(--surface)",
    }}>
      <span className="font-display" style={{ fontSize: 13, letterSpacing: "0.2em", color: "var(--text-subtle)" }}>{config.name}</span>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {config.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text-subtle)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
            <SocialIcon icon={s.icon} />
          </a>
        ))}
        <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>© {new Date().getFullYear()} — {config.location}</span>
      </div>
    </footer>
  );
}

// ─── Section router ───────────────────────────────────────────────────────────

function BunkerSectionRouter({ id, config }: { id: SectionId; config: TenantConfig }) {
  if (id === "gallery")      return <BunkerGallery config={config} />;
  if (id === "artists"      && config.sections.showArtists)      return <BunkerArtists config={config} />;
  if (id === "testimonials" && config.sections.showTestimonials) return <BunkerTestimonials config={config} />;
  if (id === "contact")      return <BunkerContact config={config} />;
  return null;
}

// ─── Template: BUNKER ─────────────────────────────────────────────────────────

export default function TemplateBunker({ config }: { config: TenantConfig }) {
  return (
    <>
      <ThemeInjector config={config} />

      {/* Extra global styles for the bunker template */}
      <style>{`
        .g-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .gallery-item:hover .g-overlay, div:hover > .g-overlay { opacity: 1; }
        .g-overlay-content {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 16px;
          transform: translateY(6px); transition: transform 0.4s ease;
        }
        div:hover > .g-overlay .g-overlay-content { transform: translateY(0); }
        .lightbox {
          position: fixed; inset: 0; background: var(--surface-overlay);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
        }
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulseDot { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .anim-fade-up  { animation: fadeUp 0.8s ease forwards; opacity: 0; }
        .anim-fade-in  { animation: fadeIn 1.2s ease forwards; opacity: 0; }
        .anim-marquee  { animation: marquee 22s linear infinite; }
        .d1 { animation-delay: 0.12s; }
        .d2 { animation-delay: 0.26s; }
        .d3 { animation-delay: 0.40s; }
        .d4 { animation-delay: 0.56s; }
      `}</style>

      <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
        <BookTabNav config={config} />

        {/* Content area — offset on desktop for the right rail */}
        <div className="bunker-content" style={{ paddingRight: 52 }}>
          <BunkerHero config={config} />
          {config.sections.showMarquee && <MarqueeStrip config={config} />}
          {config.sections.order.map((id) => (
            <BunkerSectionRouter key={id} id={id} config={config} />
          ))}
          <BunkerFooter config={config} />
        </div>
      </div>
    </>
  );
}
