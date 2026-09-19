import type { Metadata } from "next";
import { getStorefrontContext } from "@/lib/api";
import { getStoreHost } from "@/lib/store-host";
import { getTemplate } from "@/templates";

export default async function Home() {
  const storeHost = await getStoreHost();
  const { siteConfig, store } = await getStorefrontContext(storeHost);
  const Template = getTemplate(store.templateKey);
  return <Template.Home storeHost={storeHost} siteConfig={siteConfig} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const storeHost = await getStoreHost();
  const { siteConfig, store } = await getStorefrontContext(storeHost);
  return getTemplate(store.templateKey).metadata(siteConfig);
}
