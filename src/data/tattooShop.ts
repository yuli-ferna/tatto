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
    {
      src: "/IMG_3260.jpeg",
      alt: "Tatuaje blackwork brazo",
      category: "Blackwork",
      artist: "Mara V.",
    },
    {
      src: "/IMG_3260.jpeg",
      alt: "Tatuaje floral detallado",
      category: "Fine Line",
      artist: "Julián R.",
    },
    {
      src: "/IMG_3260.jpeg",
      alt: "Diseño geométrico pecho",
      category: "Geométrico",
      artist: "Mara V.",
    },
    {
      src: "/IMG_3260.jpeg",
      alt: "Neo-tradicional serpiente",
      category: "Neo-tradicional",
      artist: "Tomás E.",
    },
    {
      src: "/IMG_3260.jpeg",
      alt: "Blackwork manga completa",
      category: "Blackwork",
      artist: "Julián R.",
    },
    {
      src: "/IMG_3260.jpeg",
      alt: "Tatuaje minimalista muñeca",
      category: "Fine Line",
      artist: "Tomás E.",
    },
    {
      src: "/IMG_3260.jpeg",
      alt: "Geométrico espalda",
      category: "Geométrico",
      artist: "Mara V.",
    },
    {
      src: "/IMG_3260.jpeg",
      alt: "Neo-tradicional flores",
      category: "Neo-tradicional",
      artist: "Julián R.",
    },
  ],
  artists: [
    {
      name: "Mara V.",
      role: "Fundadora & Artista Principal",
      bio: "10 años tatuando. Especialista en blackwork y composiciones geométricas complejas.",
      avatar: "/IMG_3260.jpeg",
      specialties: ["Blackwork", "Geométrico"],
    },
    {
      name: "Julián R.",
      role: "Artista Senior",
      bio: "Formado en Barcelona. Su trabajo mezcla la escuela tradicional con líneas contemporáneas.",
      avatar: "/IMG_3260.jpeg",
      specialties: ["Fine Line", "Blackwork"],
    },
    {
      name: "Tomás E.",
      role: "Artista",
      bio: "Ilustrador de formación. Trae el detalle del dibujo a la piel con precisión quirúrgica.",
      avatar: "/IMG_3260.jpeg",
      specialties: ["Neo-tradicional", "Fine Line"],
    },
  ],
  theme: {
    bgPrimary: "#0a0a0a",
    bgSecondary: "#111111",
    accent: "#c41c1c",
    accentHover: "#e02020",
    textPrimary: "#f0ede8",
    textMuted: "#7a7670",
    border: "#1f1f1f",
    fontDisplay: "Bebas+Neue",
    fontBody: "DM+Sans:ital,opsz,wght@0,9..40,300..500;1,9..40,300",
  },
  seo: {
    title: "OBSCURA INK — Estudio de Tatuajes Buenos Aires",
    description:
      "Estudio de tatuajes en Buenos Aires. Blackwork, neo-tradicional, geométrico y fine line. Turnos disponibles.",
  },
};
