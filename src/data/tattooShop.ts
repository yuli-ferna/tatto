import { TenantConfig } from "@/types/tenant";

export const tattooShopConfig: TenantConfig = {
  name: "OBSCURA INK",
  tagline: "Arte permanente. Sin concesiones.",
  heroDescription:
    "Estudio de tatuajes en Buenos Aires. Especialistas en blackwork, neo-tradicional y diseño a medida. Cada pieza es única, cada trazo es intencional.",
  location: "Buenos Aires, Argentina",
  contactCta: "Reservar turno",
  contactCtaUrl: "https://wa.me/5491100000000",

  socials: [
    { label: "Instagram", url: "https://instagram.com/", icon: "instagram" },
    { label: "TikTok", url: "https://tiktok.com/", icon: "tiktok" },
    { label: "WhatsApp", url: "https://wa.me/5491100000000", icon: "whatsapp" },
  ],

  categories: ["Todos", "Blackwork", "Neo-tradicional", "Geométrico", "Fine Line"],

  gallery: [
    { src: "/IMG_5252.png", alt: "Tatuaje blackwork brazo", category: "Blackwork", artist: "Mara V." },
    { src: "/IMG_5252.png", alt: "Tatuaje floral detallado", category: "Fine Line", artist: "Julián R." },
    { src: "/IMG_5252.png", alt: "Diseño geométrico pecho", category: "Geométrico", artist: "Mara V." },
    { src: "/IMG_5252.png", alt: "Neo-tradicional serpiente", category: "Neo-tradicional", artist: "Tomás E." },
    { src: "/IMG_5252.png", alt: "Blackwork manga completa", category: "Blackwork", artist: "Julián R." },
    { src: "/IMG_5252.png", alt: "Tatuaje minimalista muñeca", category: "Fine Line", artist: "Tomás E." },
    { src: "/IMG_5252.png", alt: "Geométrico espalda", category: "Geométrico", artist: "Mara V." },
    { src: "/IMG_5252.png", alt: "Neo-tradicional flores", category: "Neo-tradicional", artist: "Julián R." },
  ],

  artists: [
    { name: "Mara V.", role: "Fundadora & Artista Principal", bio: "10 años tatuando. Especialista en blackwork y composiciones geométricas complejas.", avatar: "/IMG_5252.png", specialties: ["Blackwork", "Geométrico"] },
    { name: "Julián R.", role: "Artista Senior", bio: "Formado en Barcelona. Su trabajo mezcla la escuela tradicional con líneas contemporáneas.", avatar: "/IMG_5252.png", specialties: ["Fine Line", "Blackwork"] },
    { name: "Tomás E.", role: "Artista", bio: "Ilustrador de formación. Trae el detalle del dibujo a la piel con precisión quirúrgica.", avatar: "/IMG_5252.png", specialties: ["Neo-tradicional", "Fine Line"] },
  ],

  testimonials: [
    { author: "Sol M.", text: "Mara entendió exactamente lo que quería. El resultado superó todas mis expectativas.", rating: 5 },
    { author: "Diego P.", text: "Profesionales de verdad. El estudio es increíble y el trabajo impecable.", rating: 5 },
    { author: "Caro L.", text: "Ya es mi tercer tatuaje con Julián. Siempre vuelvo.", rating: 5 },
  ],

  // ─── Design tokens ───────────────────────────────────────────────────────────
  tokens: {
    surface: "#0a0a0a",
    surfaceRaised: "#111111",
    surfaceOverlay: "rgba(0,0,0,0.95)",
    textHeading: "#f0ede8",
    textBody: "#c8c4be",
    textSubtle: "#7a7670",
    textInverse: "#f0ede8",
    interactive: "#c41c1c",
    interactiveHover: "#e02020",
    interactiveFg: "#f0ede8",
    decorative: "#c41c1c",
    border: "#1f1f1f",
    borderStrong: "#333333",
    fontDisplay: "Bebas+Neue",
    fontBody: "DM+Sans:ital,opsz,wght@0,9..40,300..500",
    fontDisplayFamily: "Bebas Neue",
    fontBodyFamily: "DM Sans",
  },

  // ─── Botón: angular + uppercase + espaciado amplio ────────────────────────
  button: {
    variant: "angular",
    uppercase: true,
    letterSpacing: "wide",
  },

  // ─── Navbar: se vuelve opaca al scroll ───────────────────────────────────
  navbar: {
    variant: "overlay",
    logoSize: "md",
  },

  // ─── Variantes de secciones ──────────────────────────────────────────────
  variants: {
    hero: "cinematic",
    gallery: "masonry",
  },

  // ─── Secciones activas y su orden ────────────────────────────────────────
  sections: {
    showMarquee: true,
    showArtists: true,
    showTestimonials: true,
    order: ["gallery", "artists", "testimonials", "contact"],
  },

  // ─── Efectos visuales ────────────────────────────────────────────────────
  effects: {
    grainOpacity: 0.035,
    heroAccentShape: "diagonal",
    heroShowDiagonalLines: true,
    heroShowVerticalText: true,
    separatorStyle: "accent-bar",
  },

  seo: {
    title: "OBSCURA INK — Estudio de Tatuajes Buenos Aires",
    description: "Estudio de tatuajes en Buenos Aires. Blackwork, neo-tradicional, geométrico y fine line.",
  },
};
