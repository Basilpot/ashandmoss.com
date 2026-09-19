import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { SiteConfig } from "@/lib/types";
import { FurnitureHome } from "./furniture/home";

const furniture = {
  Home: FurnitureHome,
  Header: SiteHeader,
  Footer: SiteFooter,
  metadata(siteConfig: SiteConfig): Metadata {
    const name = siteConfig.name ?? "Ash & Moss";
    const description = siteConfig.description ?? siteConfig.tagline;
    return {
      title: `${name} — ${siteConfig.tagline ?? "Online Store"}`,
      description,
      alternates: { canonical: "/" },
      openGraph: { title: name, description, type: "website" },
    };
  },
};

export const templates = { furniture } as const;
export type TemplateKey = keyof typeof templates;
export function getTemplate(key: string) {
  return templates[key as TemplateKey] ?? furniture;
}
