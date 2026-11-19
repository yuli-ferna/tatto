"use client";

import { useRef } from "react";
import Image from "next/image";
import { TenantConfig, GalleryItem, StudioPhoto, Artist } from "@/types/tenant";
import { SocialIcon, IconInstagram, IconWhatsApp } from "../shared/Icons";

/**
 * Bunker template — dark, hand-made studio vibe.
 * Elegant italic serif headings + Permanent Marker notes, polaroid gallery,
 * rotating "¿primera vez?" sticker, scrolling ribbon and WhatsApp quote form.
 *
 * Colors and fonts come from config.tokens; the marker font is part of the
 * template's personality and is always loaded.
 */

// ─── Styles ───────────────────────────────────────────────────────────────────

function BunkerStyles({ config }: { config: TenantConfig }) {
  const t = config.tokens;
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=${t.fontDisplay}&family=${t.fontBody}&display=swap');

      html { scroll-behavior: smooth; }
      body { margin: 0; background: ${t.surface}; }

      .bk {
        --bk-fondo: ${t.surface};
        --bk-superficie: ${t.surfaceRaised};
        --bk-texto: ${t.textHeading};
        --bk-texto-2: ${t.textBody};
        --bk-primario: ${t.interactive};
        --bk-primario-hover: ${t.interactiveHover};
        --bk-acento: ${t.decorative};
        --bk-borde: ${t.border};
        --bk-borde-fuerte: ${t.borderStrong};
        --bk-display: '${t.fontDisplayFamily}', Georgia, serif;
        --bk-body: '${t.fontBodyFamily}', system-ui, sans-serif;
        --bk-marker: 'Permanent Marker', cursive;
        --bk-sombra: 0 0 0 1px var(--bk-borde-fuerte), 0 6px 18px rgba(0,0,0,.55);

        min-height: 100vh;
        background: var(--bk-fondo);
        color: var(--bk-texto);
        font-family: var(--bk-body);
        font-size: 15px;
        line-height: 1.55;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }
      .bk *, .bk *::before, .bk *::after { box-sizing: border-box; }
      .bk a { color: var(--bk-acento); text-underline-offset: 3px; }
      .bk a:hover { color: var(--bk-texto); }
      .bk :focus-visible { outline: 2px solid var(--bk-primario); outline-offset: 2px; }
      .bk ::selection { background: color-mix(in srgb, var(--bk-primario) 30%, transparent); }

      /* Type */
      .bk-elegante { font-family: var(--bk-display); font-weight: 300; font-style: italic; letter-spacing: -.01em; margin: 0; color: var(--bk-texto); }
      .bk-marca { font-family: var(--bk-marker); font-weight: 400; display: inline-block; transform: rotate(-3deg); }
      .bk-nota { font-family: var(--bk-marker); color: var(--bk-acento); font-size: 16px; display: inline-block; transform: rotate(-4deg); }
      .bk-muted { color: var(--bk-texto-2); }
      .bk-h2 { font-size: 48px; line-height: 1; }
      .bk-h2-xl { font-size: clamp(40px, 6vw, 64px); line-height: 1; }

      .bk-subrayado { position: relative; display: inline-block; }
      .bk-subrayado svg { position: absolute; left: -2%; bottom: -.12em; width: 104%; height: .35em; overflow: visible; }
      .bk-subrayado path { stroke-dasharray: 420; stroke-dashoffset: 420; animation: bk-trazo 1.2s .4s ease-out forwards; }
      @keyframes bk-trazo { to { stroke-dashoffset: 0; } }

      /* Buttons */
      .bk .bk-btn {
        display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        min-height: 48px; padding: 0 24px; cursor: pointer; text-decoration: none;
        font-family: var(--bk-body); font-weight: 500; font-size: 16px; line-height: 1.2;
        color: var(--bk-texto); background: transparent;
        border: 1px solid transparent; border-radius: 8px;
        transition: background 160ms ease;
      }
      .bk .bk-btn-primary { color: var(--bk-primario); border-color: var(--bk-primario); }
      .bk .bk-btn-primary:hover { color: var(--bk-primario-hover); background: color-mix(in srgb, var(--bk-primario) 12%, transparent); }
      .bk .bk-btn-secondary { border-color: color-mix(in srgb, var(--bk-texto) 16%, transparent); }
      .bk .bk-btn-secondary:hover { color: var(--bk-texto); background: color-mix(in srgb, var(--bk-texto) 7%, transparent); }
      .bk .bk-btn-sm { min-height: 40px; padding: 0 14px; font-size: 14px; }

      .bk-card { background: var(--bk-superficie); border-radius: 8px; }

      /* Nav */
      .bk-nav {
        position: sticky; top: 0; z-index: 5; height: 68px; padding: 0 24px;
        display: flex; justify-content: space-between; align-items: center; gap: 16px;
        background: var(--bk-fondo); border-bottom: 1px solid var(--bk-borde);
      }
      .bk-nav-links { display: flex; align-items: center; gap: 8px; }
      .bk .bk-nav-link { padding: 0 12px; font-size: 14px; color: var(--bk-texto-2); text-decoration: none; }
      .bk .bk-nav-link:hover { color: var(--bk-texto); }
      @media (max-width: 640px) {
        .bk-nav { padding: 0 16px; }
        .bk-nav-link { display: none; }
      }

      .bk-main { max-width: 1120px; margin: 0 auto; padding: 0 24px; display: flex; flex-direction: column; gap: 96px; }
      @media (max-width: 640px) { .bk-main { padding: 0 16px; gap: 72px; } }

      /* Hero */
      .bk-hero { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px; align-items: center; padding-top: 64px; }
      .bk-hero-photo { position: relative; aspect-ratio: 4/5; max-height: 560px; border-radius: 8px; overflow: hidden; transform: rotate(1.5deg); mix-blend-mode: lighten; }
      .bk-sticker { position: absolute; top: -28px; left: -28px; width: 120px; height: 120px; z-index: 2; animation: bk-gira 18s linear infinite; }
      @keyframes bk-gira { to { transform: rotate(360deg); } }
      @media (max-width: 640px) { .bk-sticker { width: 96px; height: 96px; top: -20px; left: -8px; } }

      /* Ribbon */
      .bk-cinta { overflow: hidden; border-block: 1px solid var(--bk-borde); background: var(--bk-superficie); transform: rotate(-1.5deg); margin-inline: -40px; }
      .bk-cinta-track { display: flex; width: max-content; gap: 32px; padding: 12px 0; animation: bk-corre 28s linear infinite; font-family: var(--bk-marker); font-size: 22px; white-space: nowrap; }
      .bk-cinta-track span { display: inline-flex; align-items: center; gap: 32px; }
      .bk-cinta-track i { color: var(--bk-acento); font-style: normal; font-size: .8em; }
      @keyframes bk-corre { to { transform: translateX(-50%); } }

      /* Section heads */
      .bk-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 16px; }
      .bk-head-center { justify-content: center; text-align: center; }

      /* Polaroids */
      .bk-polaroids { display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }
      .bk-polaroid { margin: 0; padding: 8px 8px 0; background: #f4f1ea; border-radius: 4px; box-shadow: var(--bk-sombra); transition: transform .25s ease; position: relative; }
      .bk-polaroid:nth-child(odd)  { transform: rotate(-2deg); }
      .bk-polaroid:nth-child(even) { transform: rotate(1.5deg); }
      .bk-polaroid:nth-child(3n)   { transform: rotate(3deg); }
      .bk-polaroid:hover { transform: rotate(0) scale(1.04); z-index: 1; }
      .bk-polaroid figcaption { font-family: var(--bk-marker); color: #1a1a1a; text-align: center; padding: 8px 4px 10px; font-size: 15px; line-height: 1.2; }
      .bk-polaroid-img { position: relative; overflow: hidden; }
      .bk-polaroid--sm { flex: 0 1 230px; min-width: 150px; }
      .bk-polaroid--sm .bk-polaroid-img { aspect-ratio: 1; }
      .bk-polaroid--lg { flex: 0 1 300px; min-width: 220px; padding: 10px 10px 0; }
      .bk-polaroid--lg .bk-polaroid-img { aspect-ratio: 4/5; }
      .bk-polaroid--lg figcaption { font-size: 18px; padding: 10px 4px 14px; }

      /* Testimonials */
      .bk-testis { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 32px; }
      .bk-testi { margin: 0; display: flex; flex-direction: column; gap: 16px; padding-top: 24px; border-top: 1px solid var(--bk-primario); }
      .bk-testi blockquote { margin: 0; font-size: 18px; line-height: 1.5; text-wrap: pretty; }

      /* Artists */
      .bk-artists { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
      .bk-artist { display: flex; flex-direction: column; gap: 16px; padding: 16px; transition: transform .25s ease; }
      .bk-artist:hover { transform: translateY(-6px) rotate(-1deg); }
      .bk-artist-photo { position: relative; aspect-ratio: 1; border-radius: 4px; overflow: hidden; transform: rotate(-2deg); transition: transform .25s ease; }
      .bk-artist:hover .bk-artist-photo { transform: rotate(0); }

      /* Quote */
      .bk-cotizar { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px; padding: 48px 24px; border: 1px solid var(--bk-primario); transform: rotate(-.6deg); }
      .bk-pasos { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }
      .bk-pasos li { display: flex; align-items: center; gap: 8px; }

      /* Contact form */
      .bk-contacto { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px; align-items: start; }
      .bk-form { display: flex; flex-direction: column; gap: 16px; padding: 24px; }
      .bk-field label { display: block; font-size: 12px; margin-bottom: 5px; color: color-mix(in srgb, var(--bk-texto) 70%, transparent); }
      .bk-input {
        width: 100%; min-height: 44px; padding: 6px 10px; font: inherit; font-size: 16px;
        color: var(--bk-texto); caret-color: var(--bk-primario); background: var(--bk-fondo);
        border: 1px solid color-mix(in srgb, var(--bk-texto) 16%, transparent); border-radius: 8px;
      }
      .bk-input:hover { border-color: color-mix(in srgb, var(--bk-texto) 45%, transparent); }
      .bk-input:focus-visible { border-color: var(--bk-primario); outline-offset: 0; }
      textarea.bk-input { min-height: 90px; resize: vertical; }

      /* Footer */
      .bk-footer { margin-top: 96px; background: var(--bk-superficie); border-top: 1px solid var(--bk-borde); }
      .bk-footer-inner { max-width: 1120px; margin: 0 auto; padding: 48px 24px 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 32px; font-size: 14px; }
      .bk-footer-col { display: flex; flex-direction: column; gap: 8px; }
      .bk-icon-link { display: inline-flex; align-items: center; gap: 8px; }
      .bk-icon-link svg { width: 16px; height: 16px; }
      .bk-legal { grid-column: 1 / -1; font-size: 12px; color: var(--bk-texto-2); padding-top: 16px; border-top: 1px solid var(--bk-borde); }

      .bk .bk-fab {
        position: fixed; right: 16px; bottom: 16px; z-index: 10; width: 56px; height: 56px; border-radius: 999px;
        display: flex; align-items: center; justify-content: center;
        background: var(--bk-superficie); border: 1px solid var(--bk-primario); box-shadow: var(--bk-sombra); color: var(--bk-texto);
      }
      .bk-fab svg { width: 26px; height: 26px; }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        .bk-sticker, .bk-cinta-track, .bk-subrayado path { animation: none; }
        .bk-subrayado path { stroke-dashoffset: 0; }
        .bk-polaroid, .bk-artist, .bk-artist-photo { transition: none; }
      }
    `}</style>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const waLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** "BUNKER TATTOO" → "Bunker" */
const shortName = (name: string) => {
  const w = name.split(" ")[0].toLowerCase();
  return w.charAt(0).toUpperCase() + w.slice(1);
};

/** Splits "Tinta fina. Cero vueltas." into ["Tinta fina.", "Cero vueltas."] */
function splitTagline(tagline: string): [string, string] {
  const m = tagline.match(/^(.*?[.!?])\s+(.+)$/);
  return m ? [m[1], m[2]] : ["", tagline];
}

function Subrayado({ children }: { children: React.ReactNode }) {
  return (
    <span className="bk-subrayado">
      {children}
      <svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 14 C 80 4, 160 18, 240 9 S 360 6, 396 12" fill="none" stroke="var(--bk-acento)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Sticker() {
  return (
    <svg className="bk-sticker" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="58" fill="var(--bk-acento)" />
      <defs>
        <path id="bk-aro" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
      </defs>
      <text fontFamily="Permanent Marker, cursive" fontSize="13" fill="var(--bk-fondo)" letterSpacing="1.5">
        <textPath href="#bk-aro">¿PRIMERA VEZ? ✦ TRANQUI ✦ TE EXPLICAMOS ✦</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fontFamily="Permanent Marker, cursive" fontSize="22" fill="var(--bk-fondo)">☻</text>
    </svg>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Nav({ config }: { config: TenantConfig }) {
  return (
    <nav className="bk-nav" aria-label="Principal">
      <a href="#" style={{ display: "flex", alignItems: "center" }}>
        {config.logo ? (
          <Image src={config.logo} alt={config.name} width={160} height={52} style={{ height: 52, width: "auto" }} priority />
        ) : (
          <span className="bk-marca" style={{ fontSize: 22, color: "var(--bk-texto)" }}>{config.name}</span>
        )}
      </a>
      <div className="bk-nav-links">
        <a href="#trabajos" className="bk-nav-link">Trabajos</a>
        {config.sections.showArtists && <a href="#artistas" className="bk-nav-link">Artistas</a>}
        <a href="#cotizar" className="bk-nav-link">Cotizá</a>
        <a href="#contacto" className="bk-btn bk-btn-primary bk-btn-sm">Reservá</a>
      </div>
    </nav>
  );
}

function Hero({ config }: { config: TenantConfig }) {
  const [first, second] = splitTagline(config.tagline);
  return (
    <section className="bk-hero">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <span className="bk-muted" style={{ fontSize: 14, letterSpacing: ".14em", textTransform: "uppercase" }}>
          {config.categories.filter((c) => c !== "Todos").slice(0, 3).join(" · ")} — {config.location.split(",")[0]}
        </span>
        <h1 className="bk-elegante" style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 0.95 }}>
          {first && <>{first}<br /></>}
          <Subrayado>{second}</Subrayado>
        </h1>
        <p className="bk-muted" style={{ margin: 0, maxWidth: 440, fontSize: 18, lineHeight: 1.6 }}>{config.heroDescription}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="#contacto" className="bk-btn bk-btn-primary">Reservá tu turno</a>
          <a href="#trabajos" className="bk-btn bk-btn-secondary">Ver trabajos</a>
        </div>
      </div>
      {config.heroImage && (
        <div style={{ position: "relative" }}>
          <Sticker />
          <div className="bk-hero-photo">
            <Image src={config.heroImage} alt="" fill priority sizes="(max-width: 700px) 100vw, 540px" style={{ objectFit: "cover" }} />
          </div>
        </div>
      )}
    </section>
  );
}

function Cinta({ items }: { items: string[] }) {
  const run = (
    <span>
      {items.map((w) => (
        <span key={w}>{w} <i>✦</i></span>
      ))}
    </span>
  );
  return (
    <div className="bk-cinta" aria-hidden="true">
      <div className="bk-cinta-track">{run}{run}</div>
    </div>
  );
}

function Polaroid({ src, alt, caption, size }: { src: string; alt: string; caption: string; size: "sm" | "lg" }) {
  return (
    <figure className={`bk-polaroid bk-polaroid--${size}`}>
      <div className="bk-polaroid-img">
        <Image src={src} alt={alt} fill sizes={size === "sm" ? "230px" : "300px"} style={{ objectFit: "cover" }} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Trabajos({ gallery, instagram }: { gallery: GalleryItem[]; instagram?: string }) {
  return (
    <section id="trabajos" style={{ display: "flex", flexDirection: "column", gap: 24, scrollMarginTop: 96 }}>
      <div className="bk-head bk-head-center">
        <h2 className="bk-elegante bk-h2">Trabajos recientes</h2>
        <span className="bk-nota">recién salidos del búnker ↓</span>
      </div>
      <div className="bk-polaroids">
        {gallery.map((g) => (
          <Polaroid key={g.src} src={g.src} alt={g.alt} caption={g.caption ?? g.category} size="sm" />
        ))}
      </div>
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "center", marginTop: 8 }}>
          Más en Instagram →
        </a>
      )}
    </section>
  );
}

function Testimonios({ config }: { config: TenantConfig }) {
  const list = config.testimonials ?? [];
  if (!config.sections.showTestimonials || list.length === 0) return null;
  return (
    <section className="bk-testis">
      {list.map((t) => (
        <figure key={t.author} className="bk-testi">
          <blockquote>“{t.text}”</blockquote>
          <figcaption style={{ fontSize: 14, fontWeight: 500 }}>{t.author}</figcaption>
        </figure>
      ))}
    </section>
  );
}

function ElBunker({ photos }: { photos: StudioPhoto[] }) {
  if (photos.length === 0) return null;
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="bk-head bk-head-center">
        <h2 className="bk-elegante bk-h2">Así es el búnker</h2>
        <span className="bk-nota">pasá, ponete cómodo</span>
      </div>
      <div className="bk-polaroids" style={{ gap: 32, padding: "12px 0" }}>
        {photos.map((p) => (
          <Polaroid key={p.src} src={p.src} alt={p.alt} caption={p.caption} size="lg" />
        ))}
      </div>
    </section>
  );
}

function ArtistCard({ artist }: { artist: Artist }) {
  const isInstagram = artist.instagramUrl?.includes("instagram.com");
  return (
    <div className="bk-card bk-artist">
      <div className="bk-artist-photo">
        <Image src={artist.avatar} alt={`Foto de ${artist.name}`} fill sizes="(max-width: 640px) 100vw, 340px" style={{ objectFit: "cover" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span className="bk-marca" style={{ fontSize: 22, lineHeight: 1 }}>{artist.name}</span>
        <span className="bk-muted" style={{ fontSize: 14 }}>{artist.role}</span>
      </div>
      {artist.instagramUrl && (
        <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="bk-btn bk-btn-secondary bk-icon-link" style={{ minHeight: 44 }}>
          {isInstagram && <IconInstagram />}
          {artist.linkLabel ?? (isInstagram ? "Instagram" : "Ver portfolio")}
        </a>
      )}
    </div>
  );
}

function Artistas({ artists }: { artists: Artist[] }) {
  return (
    <section id="artistas" style={{ display: "flex", flexDirection: "column", gap: 24, scrollMarginTop: 96 }}>
      <div className="bk-head">
        <h2 className="bk-elegante bk-h2">Quién te tatúa</h2>
        <span className="bk-nota">elegí tu artista →</span>
      </div>
      <div className="bk-artists">
        {artists.map((a) => <ArtistCard key={a.name} artist={a} />)}
      </div>
    </section>
  );
}

function Cotizar({ config }: { config: TenantConfig }) {
  return (
    <section id="cotizar" className="bk-card bk-cotizar" style={{ scrollMarginTop: 96 }}>
      <span className="bk-nota" style={{ fontSize: 18 }}>la pregunta del millón…</span>
      <h2 className="bk-elegante bk-h2-xl">¿Cuánto sale mi tatuaje?</h2>
      <p className="bk-muted" style={{ margin: 0, maxWidth: 520, lineHeight: 1.6 }}>
        Cada diseño es único: el precio depende del tamaño, la zona y el detalle. Mandanos tu idea por WhatsApp
        (si tenés una foto de referencia, mejor) y te cotizamos sin compromiso.
      </p>
      <ol className="bk-pasos">
        {["Mandás tu idea", "Te pasamos precio", "Reservás tu turno"].map((paso, i) => (
          <li key={paso}>
            <span className="bk-marca" style={{ fontSize: 28, color: "var(--bk-acento)" }}>{i + 1}</span>
            {paso}
          </li>
        ))}
      </ol>
      <a href={config.contactCtaUrl} target="_blank" rel="noopener noreferrer" className="bk-btn bk-btn-primary bk-icon-link" style={{ minHeight: 56, padding: "0 32px", fontSize: 18 }}>
        <IconWhatsApp />
        {config.contactCta}
      </a>
    </section>
  );
}

function Contacto({ config }: { config: TenantConfig }) {
  const formRef = useRef<HTMLFormElement>(null);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const f = formRef.current;
    if (!f || !config.whatsapp) return;
    const data = new FormData(f);
    const nombre = String(data.get("nombre") ?? "").trim();
    const artista = String(data.get("artista") ?? "");
    const idea = String(data.get("idea") ?? "").trim();
    const msg =
      `¡Hola ${shortName(config.name)}! ` +
      (nombre ? `Soy ${nombre}. ` : "") +
      "Quiero consultar por un tatuaje" +
      (artista && artista !== "Me da igual" ? ` con ${artista}` : "") +
      "." +
      (idea ? `\nIdea: ${idea}` : "");
    window.open(waLink(config.whatsapp, msg), "_blank", "noopener");
  };

  return (
    <section id="contacto" className="bk-contacto" style={{ scrollMarginTop: 96 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 className="bk-elegante bk-h2-xl">Contanos tu idea</h2>
        <span className="bk-nota">dale, que no mordemos ✌</span>
        <p className="bk-muted" style={{ margin: 0, maxWidth: 380, lineHeight: 1.6 }}>
          Qué querés, dónde y de qué tamaño. Te respondemos con precio y fecha.
        </p>
      </div>
      <form ref={formRef} onSubmit={enviar} className="bk-card bk-form">
        <div className="bk-field">
          <label htmlFor="bk-nombre">Nombre</label>
          <input id="bk-nombre" name="nombre" className="bk-input" placeholder="Cómo te llamás" autoComplete="given-name" />
        </div>
        <div className="bk-field">
          <label htmlFor="bk-artista">Artista</label>
          <select id="bk-artista" name="artista" className="bk-input" defaultValue="Me da igual">
            <option>Me da igual</option>
            {config.artists.map((a) => <option key={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div className="bk-field">
          <label htmlFor="bk-idea">Idea</label>
          <textarea id="bk-idea" name="idea" className="bk-input" rows={3} placeholder="Ej: rama de olivo fine line en el antebrazo, 10 cm" />
        </div>
        <button type="submit" className="bk-btn bk-btn-primary bk-icon-link" style={{ width: "100%", marginTop: 8 }}>
          <IconWhatsApp />
          Mandar consulta por WhatsApp
        </button>
      </form>
    </section>
  );
}

function Footer({ config }: { config: TenantConfig }) {
  const footerLogo = config.logoAlt ?? config.logo;
  return (
    <footer className="bk-footer">
      <div className="bk-footer-inner">
        <div className="bk-footer-col" style={{ gap: 12 }}>
          {footerLogo && (
            <Image src={footerLogo} alt={config.name} width={150} height={150} style={{ width: 150, height: "auto", transform: "rotate(-6deg)" }} />
          )}
          <span className="bk-muted">Tatuajes en {config.location.split(",")[0]}</span>
        </div>
        {(config.address || config.hours) && (
          <div className="bk-footer-col">
            <span className="bk-muted">Dónde</span>
            {config.address && <span>{config.address}</span>}
            {config.hours && <span>{config.hours}</span>}
          </div>
        )}
        <div className="bk-footer-col">
          <span className="bk-muted">Seguinos</span>
          {config.socials.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="bk-icon-link">
              <SocialIcon icon={s.icon} />
              {s.label}
            </a>
          ))}
        </div>
        <div className="bk-legal">© {new Date().getFullYear()} {config.name}. Solo mayores de 18.</div>
      </div>
    </footer>
  );
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function TemplateBunker({ config }: { config: TenantConfig }) {
  const instagram = config.socials.find((s) => s.icon === "instagram")?.url;
  const whatsappUrl = config.whatsapp ? waLink(config.whatsapp) : config.socials.find((s) => s.icon === "whatsapp")?.url;
  const marquee = config.marqueeItems ?? config.categories.filter((c) => c !== "Todos");

  return (
    <div className="bk">
      <BunkerStyles config={config} />
      <Nav config={config} />

      <main className="bk-main">
        <Hero config={config} />
        {config.sections.showMarquee && marquee.length > 0 && <Cinta items={marquee} />}
        <Trabajos gallery={config.gallery} instagram={instagram} />
        <Testimonios config={config} />
        <ElBunker photos={config.studioPhotos ?? []} />
        {config.sections.showArtists && config.artists.length > 0 && <Artistas artists={config.artists} />}
        <Cotizar config={config} />
        {config.whatsapp && <Contacto config={config} />}
      </main>

      <Footer config={config} />

      {whatsappUrl && (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp" className="bk-fab">
          <IconWhatsApp />
        </a>
      )}
    </div>
  );
}
