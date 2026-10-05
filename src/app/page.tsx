import type { Metadata } from "next";
import { getStorefrontContext } from "@/lib/api";
import { getSiteOrigin } from "@/lib/site-origin";
import { getTemplate } from "@/templates";

export default async function Home() {
  const siteOrigin = await getSiteOrigin();
  const { siteConfig, store } = await getStorefrontContext();
  const Template = getTemplate(store.templateKey);
  return <Template.Home siteOrigin={siteOrigin} siteConfig={siteConfig} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const siteOrigin = await getSiteOrigin();
  const { siteConfig, store } = await getStorefrontContext();
  return getTemplate(store.templateKey).metadata(siteConfig);
}
