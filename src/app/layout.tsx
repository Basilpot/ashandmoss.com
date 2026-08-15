import type { Metadata } from "next";
import { Livvic } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/lib/cart";
import { getFooter, getMenu, getSiteConfig } from "@/lib/api";
import type { MenuItem, SiteConfig } from "@/lib/types";

const livvic = Livvic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-livvic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashandmoss.com"),
  title: {
    default: "Ash & Moss — Custom Furniture Made to Measure",
    template: "%s — Ash & Moss",
  },
  description:
    "Hand-built oak, ash and walnut furniture made to your measurements. Seating, tables, storage and beds from a small Oregon workshop.",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Ash & Moss",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let menu: MenuItem[] = [];
  let footer: MenuItem[] = [];
  let siteConfig: SiteConfig = {};
  try {
    [menu, footer, siteConfig] = await Promise.all([
      getMenu(),
      getFooter(),
      getSiteConfig(),
    ]);
  } catch {
    // backend offline → bare nav/footer
  }

  return (
    <html lang="en">
      <body className={`${livvic.variable} font-sans min-h-screen`}>
        <CartProvider>
          <SiteHeader menu={menu} siteConfig={siteConfig} />
          {children}
          <SiteFooter footer={footer} />
        </CartProvider>
      </body>
    </html>
  );
}
