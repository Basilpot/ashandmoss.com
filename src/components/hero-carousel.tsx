"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteConfig } from "@/lib/types";

type Hero = NonNullable<SiteConfig["heroes"]>[number];

export function HeroCarousel({ heroes }: { heroes: Hero[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (heroes.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % heroes.length), 6000);
    return () => window.clearInterval(timer);
  }, [heroes.length]);
  const hero = heroes[index];
  if (!hero) return null;
  return <section className="relative"><Image src={hero.image} alt="" width={1920} height={1200} priority className="h-[68vh] min-h-[420px] w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-pine-teal/80 via-pine-teal/40 to-transparent" /><div className="absolute inset-0 flex items-center"><div className="mx-auto w-full max-w-6xl px-5"><h1 className="max-w-2xl text-4xl leading-tight font-semibold text-primary-foreground sm:text-6xl">{hero.title}</h1>{hero.text ? <p className="mt-5 max-w-xl text-primary-foreground/85">{hero.text}</p> : null}{hero.linkUrl && hero.linkLabel ? <Link href={hero.linkUrl} className="mt-8 inline-flex bg-primary-foreground px-7 py-3 text-sm font-medium text-pine-teal uppercase">{hero.linkLabel}</Link> : null}</div></div>{heroes.length > 1 ? <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">{heroes.map((item, itemIndex) => <button key={item.id} type="button" aria-label={`Show slide ${itemIndex + 1}`} onClick={() => setIndex(itemIndex)} className={`size-2 rounded-full ${itemIndex === index ? "bg-primary-foreground" : "bg-primary-foreground/50"}`} />)}</div> : null}</section>;
}
