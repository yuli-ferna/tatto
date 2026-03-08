// ─── Primitivos ───────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  url: string;
  icon: "instagram" | "tiktok" | "whatsapp" | "facebook" | "twitter" | "email";
}

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  artist?: string;
}

export interface Artist {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialties: string[];
}

export interface Testimonial {
  author: string;
  text: string;
  rating?: number;
}

// ─── Capa 1: Design tokens semánticos ────────────────────────────────────────

export interface DesignTokens {
  // Superficies
  surface: string;
  surfaceRaised: string;
  surfaceOverlay: string;

  // Texto
  textHeading: string;
  textBody: string;
  textSubtle: string;
  textInverse: string;

  // Interacción
  interactive: string;
  interactiveHover: string;
  interactiveFg: string;

  // Decoración
  decorative: string;
  border: string;
  borderStrong: string;

  // Tipografía (Google Fonts URL-encoded)
  fontDisplay: string;
  fontBody: string;
  fontDisplayFamily: string; // nombre CSS, e.g. "Bebas Neue"
  fontBodyFamily: string;    // nombre CSS, e.g. "DM Sans"
}

// ─── Capa 2: Estilos de componentes ──────────────────────────────────────────

export interface ButtonStyle {
  /**
   * "angular"   → clip-path diagonal
   * "rounded"   → border-radius full (pill)
   * "square"    → sin radius
   * "outline"   → sin fill, solo borde
   * "underline" → solo texto + línea animada
   */
  variant: "angular" | "rounded" | "square" | "outline" | "underline";
  uppercase: boolean;
  letterSpacing: "tight" | "normal" | "wide";
}

export interface NavbarStyle {
  /**
   * "overlay"  → transparente al inicio, oscurece al scroll
   * "solid"    → siempre con fondo
   * "minimal"  → siempre transparente
   */
  variant: "overlay" | "solid" | "minimal";
  logoSize: "sm" | "md" | "lg";
}

// ─── Capa 3: Variantes de secciones ──────────────────────────────────────────

export type HeroVariant =
  | "cinematic"  // texto abajo izquierda + bloque decorativo
  | "editorial"  // tipografía dominante centrada vertical
  | "split"      // mitad imagen, mitad texto
  | "minimal";   // solo texto, mucho espacio, sin decoraciones

export type GalleryVariant =
  | "masonry"           // grid con aspect ratios mixtos
  | "grid"              // grid uniforme cuadrado
  | "horizontal-scroll" // carrusel
  | "featured";         // una foto grande + grilla secundaria

// ─── Capa 4: Secciones y su orden ────────────────────────────────────────────

export type SectionId = "gallery" | "artists" | "testimonials" | "contact";

export interface SectionsConfig {
  showMarquee: boolean;
  showArtists: boolean;
  showTestimonials: boolean;
  order: SectionId[];
}

// ─── Capa 5: Efectos visuales ─────────────────────────────────────────────────

export interface VisualEffects {
  grainOpacity: number;
  heroAccentShape: "rect" | "diagonal" | "circle" | "none";
  heroShowDiagonalLines: boolean;
  heroShowVerticalText: boolean;
  separatorStyle: "line" | "dot" | "accent-bar" | "none";
}

// ─── TenantConfig completo ────────────────────────────────────────────────────

export interface TenantConfig {
  name: string;
  tagline: string;
  heroDescription: string;
  location: string;
  contactCta: string;
  contactCtaUrl: string;
  socials: SocialLink[];
  gallery: GalleryItem[];
  artists: Artist[];
  testimonials?: Testimonial[];
  categories: string[];

  tokens: DesignTokens;
  button: ButtonStyle;
  navbar: NavbarStyle;

  variants: {
    hero: HeroVariant;
    gallery: GalleryVariant;
  };

  sections: SectionsConfig;
  effects: VisualEffects;

  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}