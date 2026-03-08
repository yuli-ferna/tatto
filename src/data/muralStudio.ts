import { TenantConfig } from "@/types/tenant";

/**
 * Segundo tenant: estudio de murales.
 * Mismo <TenantLanding />, aspecto completamente distinto.
 *
 * Diferencias vs tattooShop:
 * - Tema claro (crema / naranja tierra) vs oscuro
 * - Hero "editorial" vs "cinematic"
 * - Galería "featured" vs "masonry"
 * - Botón "rounded" vs "angular"
 * - Navbar "solid" vs "overlay"
 * - Sin marquee, sin líneas diagonales
 * - Orden de secciones diferente
 */
export const muralStudioConfig: TenantConfig = {
  name: "CALLE VIVA",
  tagline: "Muros que hablan.",
  heroDescription:
    "Intervenimos espacios urbanos y privados con murales de gran formato. Arte que transforma lo cotidiano en algo extraordinario.",
  location: "Buenos Aires, Argentina",
  contactCta: "Cotizar proyecto",
  contactCtaUrl: "https://wa.me/5491100000000",

  socials: [
    { label: "Instagram", url: "https://instagram.com/", icon: "instagram" },
    { label: "WhatsApp", url: "https://wa.me/5491100000000", icon: "whatsapp" },
  ],

  categories: ["Todos", "Urbano", "Interior", "Comercial", "Comunitario"],

  gallery: [
    { src: "/IMG_5252.png", alt: "Mural urbano fachada", category: "Urbano" },
    { src: "/IMG_5252.png", alt: "Mural interior galería", category: "Interior" },
    { src: "/IMG_5252.png", alt: "Arte callejero", category: "Urbano" },
    { src: "/IMG_5252.png", alt: "Mural comercial", category: "Comercial" },
    { src: "/IMG_5252.png", alt: "Intervención comunitaria", category: "Comunitario" },
    { src: "/IMG_5252.png", alt: "Mural patio interior", category: "Interior" },
  ],

  artists: [
    { name: "Luna P.", role: "Directora Artística", bio: "Muralista con 8 años de trayectoria. Especialista en intervenciones comunitarias y arte urbano a gran escala.", avatar: "", specialties: ["Urbano", "Comunitario"] },
    { name: "Nico A.", role: "Artista & Asistente de Producción", bio: "Ilustrador y muralista. Sus diseños mezclan el folklore latinoamericano con la estética contemporánea.", avatar: "", specialties: ["Interior", "Comercial"] },
  ],

  testimonials: [
    { author: "Café El Origen", text: "Transformaron nuestro local por completo. Los clientes piden fotos con el mural todos los días.", rating: 5 },
    { author: "Municipalidad de X", text: "Un trabajo impecable en tiempo y forma. El barrio quedó irreconocible, en el mejor sentido.", rating: 5 },
  ],

  // ─── Tema claro: crema y naranja tierra ──────────────────────────────────
  tokens: {
    surface: "#f5f0e8",
    surfaceRaised: "#ede8dc",
    surfaceOverlay: "rgba(15,10,5,0.92)",
    textHeading: "#1a1611",
    textBody: "#3d3528",
    textSubtle: "#8a7d6a",
    textInverse: "#f5f0e8",
    interactive: "#c85a14",
    interactiveHover: "#a84810",
    interactiveFg: "#f5f0e8",
    decorative: "#c85a14",
    border: "#d9d0c0",
    borderStrong: "#b8aa96",
    fontDisplay: "Playfair+Display:wght@700;900",
    fontBody: "Lato:wght@300;400;500",
    fontDisplayFamily: "Playfair Display",
    fontBodyFamily: "Lato",
  },

  // ─── Botón pill redondeado, sin uppercase ─────────────────────────────────
  button: {
    variant: "rounded",
    uppercase: false,
    letterSpacing: "normal",
  },

  // ─── Navbar siempre sólida ────────────────────────────────────────────────
  navbar: {
    variant: "solid",
    logoSize: "lg",
  },

  // ─── Hero editorial, galería con destacado ───────────────────────────────
  variants: {
    hero: "editorial",
    gallery: "featured",
  },

  // ─── Sin marquee, con testimonios antes del contacto ─────────────────────
  sections: {
    showMarquee: false,
    showArtists: true,
    showTestimonials: true,
    order: ["gallery", "testimonials", "artists", "contact"],
  },

  // ─── Efectos suaves, sin grano agresivo ──────────────────────────────────
  effects: {
    grainOpacity: 0.015,
    heroAccentShape: "circle",
    heroShowDiagonalLines: false,
    heroShowVerticalText: false,
    separatorStyle: "dot",
  },

  seo: {
    title: "CALLE VIVA — Murales Buenos Aires",
    description: "Estudio de murales en Buenos Aires. Intervenciones urbanas, interiores comerciales y arte comunitario.",
  },
};
