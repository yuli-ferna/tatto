import { TenantConfig } from "@/types/tenant";

/**
 * Bunker Tattoo — Buenos Aires
 * Instagram: @bunkertattoo.ba · Facebook · WhatsApp +54 9 11 7365-4199
 *
 * Imágenes en /public/bunker (recortadas y optimizadas).
 */
const WHATSAPP_NUMBER = "5491173654199";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const WHATSAPP_COTIZAR = `${WHATSAPP}?text=${encodeURIComponent("¡Hola Bunker! Quiero cotizar un tatuaje.")}`;

export const bunkerTattooConfig: TenantConfig = {
  name: "BUNKER TATTOO",
  tagline: "Tinta fina. Cero vueltas.",
  heroDescription:
    "Tres artistas, un búnker y agujas descartables. ¿Primera vez? Tranqui, te explicamos todo antes de arrancar.",
  location: "Buenos Aires, Argentina",
  contactCta: "Cotizá por WhatsApp",
  contactCtaUrl: WHATSAPP_COTIZAR,

  heroImage: "/bunker/hero-el-sol.jpg",

  // Logo en blanco con fondo transparente; la versión con círculo va en el footer
  logo: "/bunker/logo-bunker.png",
  logoAlt: "/bunker/logo-bunker-circulo.png",

  whatsapp: WHATSAPP_NUMBER,
  hours: "Mar a sáb · 12 a 20 h", // TODO: confirmar horario real
  // address: "",                  // TODO: cargar dirección del estudio

  marqueeItems: ["Fine line", "Blackwork", "Dotwork", "Flash days", "Retoques", "Agujas descartables"],

  studioPhotos: [
    { src: "/bunker/bunker-gato.jpg",    alt: "El gato del estudio junto al arbolito",      caption: "el verdadero jefe 🐾" },
    { src: "/bunker/bunker-estudio.jpg", alt: "Dos personas sonriendo en el estudio",        caption: "buena onda garantizada" },
    { src: "/bunker/bunker-espejo.jpg",  alt: "Sacando la foto del tatuaje recién hecho",    caption: "la foto para el recuerdo 📸" },
  ],

  socials: [
    { label: "Instagram", url: "https://www.instagram.com/bunkertattoo.ba/", icon: "instagram" },
    { label: "Facebook",  url: "https://www.facebook.com/964397656755369",   icon: "facebook"  },
    { label: "WhatsApp",  url: WHATSAPP,                                     icon: "whatsapp"  },
  ],

  categories: ["Todos", "Fine Line", "Blackwork", "Realismo", "Color", "Ilustrativo"],

  gallery: [
    { src: "/bunker/g01-take-on-me.jpg",       alt: "Ilustrativo Take on Me en la pierna",      category: "Ilustrativo" },
    { src: "/bunker/g02-manga-blackwork.jpg",  alt: "Manga blackwork con humo y letras",        category: "Blackwork", caption: "Manga blackwork" },
    { src: "/bunker/g03-ojo-realismo.jpg",     alt: "Ojo con lágrima en el cuello, realismo",    category: "Realismo"    },
    { src: "/bunker/g04-circulo-comic.jpg",    alt: "Círculo estilo cómic en el antebrazo",      category: "Blackwork"   },
    { src: "/bunker/g05-cachorro-color.jpg",   alt: "Cachorro de león con rosas y mariposas",    category: "Color"       },
    { src: "/bunker/g06-flores-fineline.jpg",  alt: "Flores fine line en negro y rojo",          category: "Fine Line"   },
    { src: "/bunker/g07-corazon-alambre.jpg",  alt: "Corazón de alambre de púas",                category: "Fine Line", caption: "Fine line" },
    { src: "/bunker/g08-angel-realismo.jpg",   alt: "Ángel con el mundo y nombres, realismo",    category: "Realismo"    },
    { src: "/bunker/g09-rayo.jpg",             alt: "Rayo fine line sobre el hombro",            category: "Fine Line"   },
    { src: "/bunker/g10-mano-rosa.jpg",        alt: "Rosa roja y lettering en la mano",          category: "Color", caption: "Minimal en rojo" },
    { src: "/bunker/g11-runas.jpg",            alt: "Runas en los nudillos",                     category: "Blackwork", caption: "Runas" },
    { src: "/bunker/g12-corazones-amigos.jpg", alt: "Corazones a juego entre amigos",            category: "Fine Line", caption: "Con amigos" },
  ],

  artists: [
    {
      name: "Mary",
      role: "Dueña · Tatuadora",
      bio: "La que arma el búnker. Te recibe, te explica todo y te tatúa.",
      avatar: "/bunker/artista-mary.jpg",
      specialties: [],
      instagramUrl: "https://www.instagram.com/bunkertattoo.ba/",
      linkLabel: "@bunkertattoo.ba",
    },
    {
      name: "Jaret",
      role: "Tatuador",
      bio: "Mirá sus trabajos en Instagram.",
      avatar: "/bunker/artista-jaret.jpg",
      specialties: [],
      instagramUrl: "https://www.instagram.com/jaret.rood/",
      linkLabel: "@jaret.rood",
    },
    {
      name: "Carlix",
      role: "Tatuadora",
      bio: "Ilustradora. Mirá su portfolio completo.",
      avatar: "/bunker/artista-carlix.jpg",
      specialties: [],
      instagramUrl: "https://tattooar.com/carlixtattoo",
      linkLabel: "Ver portfolio",
    },
  ],

  // Sin reseñas inventadas: cargar acá testimonios reales de clientes cuando los haya
  testimonials: [],

  // ─── Design tokens: noche azulada + violeta (sistema de diseño Bunker) ──
  tokens: {
    surface:           "#161826",
    surfaceRaised:     "#232532",
    surfaceOverlay:    "rgba(22,24,38,0.96)",
    textHeading:       "#e9e9ed",   // 14.5:1 sobre fondo
    textBody:          "#9397ab",   // 6.1:1 sobre fondo
    textSubtle:        "#9397ab",
    textInverse:       "#161826",
    interactive:       "#9184d9",   // violeta, 5.5:1
    interactiveHover:  "#b5abfc",
    interactiveFg:     "#161826",
    decorative:        "#d2cefd",   // acento: notas, sticker, subrayado
    border:            "#3f424d",
    borderStrong:      "#595d6c",
    fontDisplay:       "Cormorant+Garamond:ital,wght@0,300;1,300",
    fontBody:          "Inter:wght@400;500;600",
    fontDisplayFamily: "Cormorant Garamond",
    fontBodyFamily:    "Inter",
  },

  // Gold filled button, uppercase, wide spacing
  button: {
    variant:       "square",
    uppercase:     true,
    letterSpacing: "wide",
  },

  navbar: {
    variant:  "tabs",   // book-tab style — handled by TemplateBunker
    logoSize: "md",
  },

  variants: {
    hero:    "cinematic",
    gallery: "masonry",
  },

  sections: {
    showMarquee:      true,
    showArtists:      true,
    showTestimonials: false,
    order: ["gallery", "artists", "contact"],
  },

  effects: {
    grainOpacity:          0.05,
    heroAccentShape:       "none",
    heroShowDiagonalLines: false,
    heroShowVerticalText:  false,
    separatorStyle:        "accent-bar",
  },

  template: "bunker",

  seo: {
    title:       "Bunker Tattoo — Estudio de tatuajes en Buenos Aires",
    description: "Tinta fina, cero vueltas. Fine line, blackwork, realismo y color en Buenos Aires. Cotizá tu tatuaje por WhatsApp.",
    ogImage:     "/bunker/hero-el-sol.jpg",
  },
};
