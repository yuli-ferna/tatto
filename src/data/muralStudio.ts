import { TenantConfig } from "@/types/tenant";

/**
 * Ejemplo de segundo tenant: estudio de murales.
 * Mismo componente <TenantLanding />, distinto config y tema.
 * Usar en: /app/murales/page.tsx → <TenantLanding config={muralStudioConfig} />
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
    {
      src: "window.svg",
      alt: "Mural urbano fachada",
      category: "Urbano",
    },
    {
      src: "window.svg",
      alt: "Mural interior restaurante",
      category: "Interior",
    },
  ],
  artists: [
    {
      name: "Luna P.",
      role: "Directora Artística",
      bio: "Muralista con 8 años de trayectoria. Especialista en murales comunitarios y arte urbano.",
      avatar: "window.svg",
      specialties: ["Urbano", "Comunitario"],
    },
  ],
  theme: {
    bgPrimary: "#f5f0e8",        // Crema cálido
    bgSecondary: "#ede8dc",
    accent: "#d4611a",           // Naranja tierra
    accentHover: "#bf5515",
    textPrimary: "#1a1611",
    textMuted: "#8a7d6a",
    border: "#d9d0c0",
    fontDisplay: "Playfair+Display:wght@700;900",
    fontBody: "Lato:wght@300;400",
  },
  seo: {
    title: "CALLE VIVA — Murales Buenos Aires",
    description:
      "Estudio de murales en Buenos Aires. Intervenciones urbanas, interiores comerciales y arte comunitario.",
  },
};
