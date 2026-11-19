"use client";

import { useState } from "react";
import Image from "next/image";
import { TenantConfig, GalleryVariant, SectionId } from "@/types/tenant";
import { SocialIcon } from "./Icons";

// ─── Separator ────────────────────────────────────────────────────────────────

export function Separator({ config }: { config: TenantConfig }) {
  const s = config.effects.separatorStyle;
  if (s === "none") return null;
  if (s === "accent-bar") return <div style={{ width: 36, height: 2, background: "var(--decorative)", marginBottom: 14 }} />;
  if (s === "line")       return <div style={{ width: "100%", height: 1, background: "var(--border)", margin: "64px 0" }} />;
  if (s === "dot")        return <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--decorative)", marginBottom: 18 }} />;
  return null;
}

// ─── Button ───────────────────────────────────────────────────────────────────

export function Btn({
  href,
  variant = "primary",
  children,
  style: extra,
  onClick,
}: {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const cls = variant === "primary" ? "btn-primary" : "btn-ghost";
  if (href) {
    return (
      <a href={href} className={cls} style={extra}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return <button className={cls} style={extra} onClick={onClick}>{children}</button>;
}

// ─── Gallery variants ─────────────────────────────────────────────────────────

function GalleryMasonry({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (s: string) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(270px, 100%), 1fr))", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} className="gallery-item" onClick={() => onOpen(item.src)}
          style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1", background: "var(--surface-raised)" }}>
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" style={{ objectFit: "cover" }} />
          <div className="g-overlay"><div className="g-overlay-content">
            <p style={{ fontSize: 11, color: "var(--decorative)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{item.category}</p>
            {item.artist && <p style={{ fontSize: 13, color: "white", marginTop: 2 }}>{item.artist}</p>}
          </div></div>
        </div>
      ))}
    </div>
  );
}

function GalleryGrid({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (s: string) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} className="gallery-item" onClick={() => onOpen(item.src)}
          style={{ aspectRatio: "1/1", background: "var(--surface-raised)" }}>
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 600px) 50vw, 25vw" style={{ objectFit: "cover" }} />
          <div className="g-overlay"><div className="g-overlay-content">
            <p style={{ fontSize: 11, color: "var(--decorative)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.category}</p>
          </div></div>
        </div>
      ))}
    </div>
  );
}

function GalleryHorizontalScroll({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (s: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
      {items.map((item, i) => (
        <div key={i} className="gallery-item" onClick={() => onOpen(item.src)}
          style={{ flexShrink: 0, scrollSnapAlign: "start", width: "clamp(240px, 70vw, 320px)", height: "clamp(300px, 55vw, 420px)", background: "var(--surface-raised)" }}>
          <Image src={item.src} alt={item.alt} fill sizes="320px" style={{ objectFit: "cover" }} />
          <div className="g-overlay"><div className="g-overlay-content">
            <p style={{ fontSize: 11, color: "var(--decorative)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.category}</p>
            {item.artist && <p style={{ fontSize: 13, color: "white", marginTop: 2 }}>{item.artist}</p>}
          </div></div>
        </div>
      ))}
    </div>
  );
}

function GalleryFeatured({ items, onOpen }: { items: TenantConfig["gallery"]; onOpen: (s: string) => void }) {
  const [featured, ...rest] = items;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 10 }}>
      {featured && (
        <div className="gallery-item" onClick={() => onOpen(featured.src)}
          style={{ gridRow: "span 2", background: "var(--surface-raised)", minHeight: "clamp(300px, 50vw, 500px)", position: "relative" }}>
          <Image src={featured.src} alt={featured.alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          <div className="g-overlay"><div className="g-overlay-content">
            <p style={{ fontSize: 11, color: "var(--decorative)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{featured.category}</p>
            {featured.artist && <p style={{ fontSize: 14, color: "white", marginTop: 2 }}>{featured.artist}</p>}
          </div></div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {rest.slice(0, 4).map((item, i) => (
          <div key={i} className="gallery-item" onClick={() => onOpen(item.src)}
            style={{ aspectRatio: "1/1", background: "var(--surface-raised)" }}>
            <Image src={item.src} alt={item.alt} fill sizes="25vw" style={{ objectFit: "cover" }} />
            <div className="g-overlay"><div className="g-overlay-content">
              <p style={{ fontSize: 10, color: "var(--decorative)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.category}</p>
            </div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery section ──────────────────────────────────────────────────────────

export function GallerySection({ config }: { config: TenantConfig }) {
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
    <section id="galería" style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)" }}>
      <div style={{ marginBottom: 44 }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 70px)", letterSpacing: "0.04em", lineHeight: 1 }}>
          TRABAJOS
        </h2>
        <p style={{ marginTop: 10, color: "var(--text-subtle)", fontSize: 14 }}>
          Una selección de nuestras piezas recientes
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
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
          <button onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "var(--text-heading)", fontSize: 26, cursor: "pointer" }}>
            ✕
          </button>
          <div style={{ position: "relative", maxWidth: "88vw", maxHeight: "88vh", width: "100%", height: "100%" }}>
            <Image src={lightbox} alt="Expanded view" fill sizes="88vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Artists section ──────────────────────────────────────────────────────────

export function ArtistsSection({ config }: { config: TenantConfig }) {
  return (
    <section id="artistas" style={{
      padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)",
      background: "var(--surface-raised)",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ marginBottom: 52 }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 70px)", letterSpacing: "0.04em", lineHeight: 1 }}>
          LOS ARTISTAS
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: 20 }}>
        {config.artists.map((artist, i) => (
          <div key={i} className="artist-card" style={{ padding: 32, background: "var(--surface)" }}>
            <div style={{
              width: 68, height: 68,
              borderRadius: config.button.variant === "rounded" ? "50%" : 2,
              overflow: "hidden", position: "relative", marginBottom: 18,
              border: "2px solid var(--border)",
            }}>
              <Image src={artist.avatar} alt={artist.name} fill sizes="68px" style={{ objectFit: "cover" }} />
            </div>
            <h3 className="font-display" style={{ fontSize: 24, letterSpacing: "0.06em", marginBottom: 4 }}>{artist.name}</h3>
            <p style={{ fontSize: 11, color: "var(--decorative)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>{artist.role}</p>
            <p style={{ fontSize: 14, color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 18 }}>{artist.bio}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {artist.specialties.map((s) => (
                <span key={s} style={{ padding: "3px 10px", border: "1px solid var(--border)", fontSize: 11, letterSpacing: "0.07em", color: "var(--text-subtle)" }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials section ─────────────────────────────────────────────────────

export function TestimonialsSection({ config }: { config: TenantConfig }) {
  if (!config.testimonials?.length) return null;
  return (
    <section style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", borderTop: "1px solid var(--border)" }}>
      <div style={{ marginBottom: 52 }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 70px)", letterSpacing: "0.04em", lineHeight: 1 }}>
          LO QUE DICEN
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: 20 }}>
        {config.testimonials.map((t, i) => (
          <div key={i} style={{ border: "1px solid var(--border)", padding: 32, transition: "border-color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}>
            {t.rating && <div style={{ marginBottom: 16, color: "var(--decorative)", fontSize: 14, letterSpacing: 2 }}>{"★".repeat(t.rating)}</div>}
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-body)", marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
            <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>— {t.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────

export function ContactSection({ config }: { config: TenantConfig }) {
  return (
    <section id="contacto" style={{ padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
        <Separator config={config} />
        <h2 className="font-display" style={{ fontSize: "clamp(40px, 8vw, 90px)", letterSpacing: "0.04em", lineHeight: 0.94, marginBottom: 26 }}>
          HAGAMOS ALGO JUNTOS
        </h2>
        <p style={{ color: "var(--text-subtle)", fontSize: 15, lineHeight: 1.75, marginBottom: 44 }}>
          Mandanos un mensaje para consultar disponibilidad, precios o para discutir tu idea. Respondemos en menos de 24hs.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
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

export function MarqueeStrip({ config }: { config: TenantConfig }) {
  const text = Array(8).fill(`${config.name} — ${config.tagline}`).join("  ✦  ");
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "13px 0", overflow: "hidden", background: "var(--surface-raised)" }}>
      <div className="anim-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {[0, 1].map((k) => (
          <span key={k} className="font-display" style={{ fontSize: 12, letterSpacing: "0.22em", color: "var(--text-subtle)", paddingRight: 40 }}>{text}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer({ config }: { config: TenantConfig }) {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "clamp(20px, 4vw, 28px) clamp(20px, 5vw, 40px)",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      background: "var(--surface-raised)",
    }}>
      <span className="font-display" style={{ fontSize: 15, letterSpacing: "0.14em", color: "var(--text-subtle)" }}>{config.name}</span>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {config.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text-subtle)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--decorative)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
          >
            <SocialIcon icon={s.icon} />
          </a>
        ))}
        <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>© {new Date().getFullYear()} — {config.location}</span>
      </div>
    </footer>
  );
}

// ─── Section router ───────────────────────────────────────────────────────────

export function SectionRouter({ id, config }: { id: SectionId; config: TenantConfig }) {
  if (id === "gallery")      return <GallerySection config={config} />;
  if (id === "artists"      && config.sections.showArtists)      return <ArtistsSection config={config} />;
  if (id === "testimonials" && config.sections.showTestimonials) return <TestimonialsSection config={config} />;
  if (id === "contact")      return <ContactSection config={config} />;
  return null;
}
