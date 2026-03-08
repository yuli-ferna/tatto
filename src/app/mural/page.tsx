import type { Metadata } from "next";
import TenantLanding from "@/components/TenantLanding";
import { muralStudioConfig } from "@/data/muralStudio";

// ─── SSG: metadata se genera desde el config del tenant ──────────────────────
export const metadata: Metadata = {
  title: muralStudioConfig.seo.title,
  description: muralStudioConfig.seo.description,
  openGraph: {
    title: muralStudioConfig.seo.title,
    description: muralStudioConfig.seo.description,
    ...(muralStudioConfig.seo.ogImage && { images: [muralStudioConfig.seo.ogImage] }),
  },
};

export default function Home() {
  return <TenantLanding config={muralStudioConfig} />;
}
