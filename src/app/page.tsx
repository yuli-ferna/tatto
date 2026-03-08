import type { Metadata } from "next";
import TenantLanding from "@/components/TenantLanding";
import { tattooShopConfig } from "@/data/tattooShop";

export const metadata: Metadata = {
  title: tattooShopConfig.seo.title,
  description: tattooShopConfig.seo.description,
  openGraph: {
    title: tattooShopConfig.seo.title,
    description: tattooShopConfig.seo.description,
    ...(tattooShopConfig.seo.ogImage && { images: [tattooShopConfig.seo.ogImage] }),
  },
};

export default function Home() {
  return <TenantLanding config={tattooShopConfig} />;
}
