"use client";

import { TenantConfig, TemplateName } from "@/types/tenant";

import TemplateInk      from "./templates/TemplateInk";
import TemplateBunker   from "./templates/TemplateBunker";
import TemplateEditorial from "./templates/TemplateEditorial";
import TemplateMinimal  from "./templates/TemplateMinimal";

const templateMap: Record<TemplateName, React.FC<{ config: TenantConfig }>> = {
  ink:       TemplateInk,
  editorial: TemplateEditorial,
  minimal:   TemplateMinimal,
  bunker:    TemplateBunker,
};

/**
 * Main entry point for all tenant pages.
 * Template is chosen via config.template — no other logic here.
 *
 * Example usage in app/page.tsx:
 *   import { bunkerTattooConfig } from "@/data/bunkerTattoo";
 *   export default function Page() { return <TenantLanding config={bunkerTattooConfig} />; }
 */
export default function TenantLanding({ config }: { config: TenantConfig }) {
  const Template = templateMap[config.template] ?? TemplateInk;
  return <Template config={config} />;
}