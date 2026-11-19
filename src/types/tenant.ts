// ─── Primitives ───────────────────────────────────────────────────────────────

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
  /** Short handwritten caption (bunker polaroids). Falls back to category. */
  caption?: string;
}

/** Studio / ambience photo with a handwritten caption (bunker template). */
export interface StudioPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface Artist {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialties: string[];
  /** Starting price shown in bunker artist card, e.g. "$150" */
  priceFrom?: string;
  /** Availability hint shown in bunker artist card, e.g. "Limited" */
  availability?: string;
  instagramUrl?: string;
  /** Text for the artist link button, e.g. "@jaret.rood" or "Ver portfolio". */
  linkLabel?: string;
}

export interface Testimonial {
  author: string;
  text: string;
  rating?: number;
}

// ─── Layer 1: Semantic design tokens ─────────────────────────────────────────
// Components never reference raw color names — only semantic token names.

export interface DesignTokens {
  surface: string;
  surfaceRaised: string;
  surfaceOverlay: string;
  textHeading: string;
  textBody: string;
  textSubtle: string;
  textInverse: string;
  interactive: string;
  interactiveHover: string;
  interactiveFg: string;
  decorative: string;
  border: string;
  borderStrong: string;
  fontDisplay: string;        // Google Fonts URL-encoded name
  fontBody: string;           // Google Fonts URL-encoded name
  fontDisplayFamily: string;  // CSS family name
  fontBodyFamily: string;     // CSS family name
}

// ─── Layer 2: Component style controls ───────────────────────────────────────

export interface ButtonStyle {
  /**
   * "angular"   — diagonal clip-path corners
   * "rounded"   — full pill border-radius
   * "square"    — no border-radius
   * "outline"   — transparent fill, colored border
   * "underline" — text only with animated underline
   */
  variant: "angular" | "rounded" | "square" | "outline" | "underline";
  uppercase: boolean;
  letterSpacing: "tight" | "normal" | "wide";
}

export interface NavbarStyle {
  /**
   * "overlay"  — transparent on load, darkens on scroll
   * "solid"    — always has background
   * "minimal"  — always transparent
   * "tabs"     — book-tab style (used by bunker template)
   */
  variant: "overlay" | "solid" | "minimal" | "tabs";
  logoSize: "sm" | "md" | "lg";
}

// ─── Layer 3: Section variants ────────────────────────────────────────────────

export type HeroVariant =
  | "cinematic"   // full-bleed image, large text overlay
  | "editorial"   // two-column, dominant typography
  | "split"       // half image, half text
  | "minimal";    // text only, generous whitespace

export type GalleryVariant =
  | "masonry"            // mixed aspect-ratio grid
  | "grid"               // uniform square grid
  | "horizontal-scroll"  // horizontal carousel
  | "featured";          // one large photo + secondary grid

// ─── Layer 4: Sections and their order ───────────────────────────────────────

export type SectionId = "gallery" | "artists" | "testimonials" | "contact";

export interface SectionsConfig {
  showMarquee: boolean;
  showArtists: boolean;
  showTestimonials: boolean;
  /** Render order. Only enabled sections appear. */
  order: SectionId[];
}

// ─── Layer 5: Visual effects ──────────────────────────────────────────────────

export interface VisualEffects {
  grainOpacity: number;
  heroAccentShape: "rect" | "diagonal" | "circle" | "none";
  heroShowDiagonalLines: boolean;
  heroShowVerticalText: boolean;
  separatorStyle: "line" | "dot" | "accent-bar" | "none";
}

// ─── Template selector ────────────────────────────────────────────────────────

export type TemplateName = "ink" | "editorial" | "minimal" | "bunker";

// ─── Full TenantConfig ────────────────────────────────────────────────────────

export interface TenantConfig {
  name: string;
  tagline: string;
  heroDescription: string;
  location: string;
  contactCta: string;
  contactCtaUrl: string;

  /** Logo path in /public. Falls back to name text. */
  logo?: string;

  /**
   * Full-bleed hero background image.
   * Required by the "bunker" template — set to a high-res photo in /public.
   */
  heroImage?: string;

  /** Alternate logo (e.g. circular badge) used in the footer. */
  logoAlt?: string;

  /** WhatsApp number in international format, digits only, e.g. "5491173654199". */
  whatsapp?: string;
  /** Opening hours line shown in the footer. */
  hours?: string;
  /** Street address shown in the footer. */
  address?: string;
  /** Words for the scrolling marquee ribbon. */
  marqueeItems?: string[];
  /** Ambience photos of the studio (bunker template). */
  studioPhotos?: StudioPhoto[];

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

  /** Controls the overall layout personality. */
  template: TemplateName;

  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}
