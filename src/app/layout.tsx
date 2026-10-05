import type { Metadata } from "next";
import { Livvic } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { getFooter, getMenu, getStorefrontContext } from "@/lib/api";
import type { MenuItem, SiteConfig } from "@/lib/types";
import { getSiteOrigin } from "@/lib/site-origin";
import { getTemplate } from "@/templates";

const livvic = Livvic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-livvic",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteOrigin = await getSiteOrigin();
  const { siteConfig } = await getStorefrontContext();
  const name = siteConfig.name ?? "Online Store";
  return {
    metadataBase: new URL(siteOrigin),
    title: { default: name, template: `%s — ${name}` },
    description: siteConfig.description ?? siteConfig.tagline,
    robots: { index: true, follow: true },
    openGraph: { siteName: name, type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let menu: MenuItem[] = [];
  let footer: MenuItem[] = [];
  let siteConfig: SiteConfig = {};
  let templateKey = "furniture";
  const siteOrigin = await getSiteOrigin();
  try {
    const [nextMenu, nextFooter, context] = await Promise.all([
      getMenu(),
      getFooter(),
      getStorefrontContext(),
    ]);
    menu = nextMenu;
    footer = nextFooter;
    siteConfig = context.siteConfig;
    templateKey = context.store.templateKey;
  } catch {
    // backend offline → bare nav/footer
  }

  const Template = getTemplate(templateKey);
  return (
    <html lang="en">
      <body className={`${livvic.variable} font-sans min-h-screen`}>
        <CartProvider>
          <Template.Header menu={menu} siteConfig={siteConfig} />
          {children}
          <Template.Footer footer={footer} />
        </CartProvider>
      </body>
    </html>
  );
}
