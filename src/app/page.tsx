import type { Metadata } from "next";
import TenantLanding from "@/components/TenantLanding";
import { bunkerTattooConfig } from "@/data/bunkerTattoo";

// ─── SSG: metadata se genera desde el config del tenant ──────────────────────
export const metadata: Metadata = {
  title: bunkerTattooConfig.seo.title,
  description: bunkerTattooConfig.seo.description,
  openGraph: {
    title: bunkerTattooConfig.seo.title,
    description: bunkerTattooConfig.seo.description,
    ...(bunkerTattooConfig.seo.ogImage && { images: [bunkerTattooConfig.seo.ogImage] }),
  },
};

export default function Home() {
  return <TenantLanding config={bunkerTattooConfig} />;
}
