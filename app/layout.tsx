import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Script from "next/script";

const playfair = Playfair_Display({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Bricolage_Grotesque({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ash & Moss | A Pop-Up Retreat",
    template: "%s | Ash & Moss",
  },
  description:
    "Ash & Moss appears once, for one month, then it's gone. Bring your work. Leave the city behind. Six people, one place, nothing like anything you've done before.",
  openGraph: {
    title: "Ash & Moss | A Pop-Up Retreat",
    description:
      "A pop-up retreat for six people. One month. One group. No strangers.",
    url: "https://ashandmoss.com",
    siteName: "Ash & Moss",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
  const hotjarVersion = process.env.NEXT_PUBLIC_HOTJAR_VERSION || "6";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/*{hotjarId && (
          <Script
            id="hotjar"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }}
          />
        )}*/}
        <Script
          id="hotjar"
          dangerouslySetInnerHTML={{
            __html: `https://t.contentsquare.net/uxa/ee4a03b9382b2.js`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col cursor-none">
        <CustomCursor />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
