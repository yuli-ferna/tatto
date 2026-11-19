import { TenantConfig } from "@/types/tenant";

/**
 * Example third tenant using the "minimal" template.
 * Sidebar navigation, clean whitespace, no decorative effects.
 * Drop this in /app/fineline/page.tsx to use it.
 */
export const finelineStudioConfig: TenantConfig = {
  name: "TRAZO",
  tagline: "Fine line. Diseño intencional.",
  heroDescription:
    "Estudio especializado en fine line y tatuajes minimalistas en Buenos Aires. Cada línea tiene un propósito.",
  location: "Palermo, Buenos Aires",
  contactCta: "Consultar turno",
  contactCtaUrl: "https://wa.me/5491100000000",

  // logo: "/logo-trazo.svg",

  socials: [
    { label: "Instagram", url: "https://instagram.com/", icon: "instagram" },
    { label: "WhatsApp",  url: "https://wa.me/5491100000000", icon: "whatsapp" },
  ],

  categories: ["Todos", "Fine Line", "Minimalista", "Botanico", "Lettering"],

  gallery: [
    { src: "/IMG_5252.png", alt: "Fine line floral",    category: "Botanico",    artist: "Vale S." },
    { src: "/IMG_5252.png", alt: "Lettering cursiva",   category: "Lettering",   artist: "Vale S." },
    { src: "/IMG_5252.png", alt: "Minimalista luna",    category: "Minimalista", artist: "Vale S." },
    { src: "/IMG_5252.png", alt: "Fine line rama",      category: "Botanico",    artist: "Vale S." },
    { src: "/IMG_5252.png", alt: "Fine line abstracto", category: "Fine Line",   artist: "Vale S." },
    { src: "/IMG_5252.png", alt: "Minimalista punto",   category: "Minimalista", artist: "Vale S." },
  ],

  artists: [
    {
      name: "Vale S.",
      role: "Artista",
      bio: "Especialista en fine line con formación en ilustración botánica. Sus trazos son reconocibles por su delicadeza y precisión.",
      avatar: "/IMG_5252.png",
      specialties: ["Fine Line", "Botánico"],
    },
  ],

  testimonials: [
    { author: "Mía R.", text: "El detalle del trabajo es increíble. Exactamente lo que imaginé.", rating: 5 },
    { author: "Sofi G.", text: "La atención personalizada hace la diferencia. Un estudio único.", rating: 5 },
  ],

  // ─── Design tokens: warm cream + monochrome B&W ───────────────────────────
  tokens: {
    surface:           "#F5F0E6",
    surfaceRaised:     "#EDE9DB",
    surfaceOverlay:    "rgba(10,8,6,0.96)",
    textHeading:       "#0D0B08",
    textBody:          "#2A2520",
    textSubtle:        "#7A7268",
    textInverse:       "#F5F0E6",
    interactive:       "#0D0B08",
    interactiveHover:  "#2A2520",
    interactiveFg:     "#F5F0E6",
    decorative:        "#0D0B08",
    border:            "#D4CEBB",
    borderStrong:      "#0D0B08",
    fontDisplay:       "Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600",
    fontBody:          "Inter:wght@300;400;500",
    fontDisplayFamily: "Cormorant Garamond",
    fontBodyFamily:    "Inter",
  },

  button: {
    variant:       "square",
    uppercase:     true,
    letterSpacing: "wide",
  },

  navbar: {
    variant:  "solid",
    logoSize: "sm",
  },

  variants: {
    hero:    "editorial",
    gallery: "masonry",
  },

  sections: {
    showMarquee:      false,
    showArtists:      true,
    showTestimonials: true,
    order: ["gallery", "artists", "testimonials", "contact"],
  },

  effects: {
    grainOpacity:          0.012,
    heroAccentShape:       "none",
    heroShowDiagonalLines: false,
    heroShowVerticalText:  false,
    separatorStyle:        "line",
  },

  template: "editorial",

  seo: {
    title:       "TRAZO — Fine Line Tatuajes Buenos Aires",
    description: "Estudio de fine line y tatuajes minimalistas en Palermo, Buenos Aires.",
  },
};
