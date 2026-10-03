"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteConfig } from "@/lib/types";

type Hero = NonNullable<SiteConfig["heroes"]>[number];

const INTERVAL = 6000;

export function HeroCarousel({ heroes }: { heroes: Hero[] }) {
  const [index, setIndex] = useState(0);
  // Paused by hover, by keyboard focus, or by the OS reduced-motion setting.
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  const count = heroes.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), INTERVAL);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  const hero = heroes[index];
  if (!hero) return null;

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Image
        src={hero.image}
        alt=""
        width={1920}
        height={1200}
        priority
        className="h-[68vh] min-h-[420px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-pine-teal/80 via-pine-teal/40 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div aria-live="polite">
            <h1 className="max-w-2xl text-4xl leading-tight font-semibold text-primary-foreground sm:text-6xl">
              {hero.title}
            </h1>
            {hero.text ? (
              <p className="mt-5 max-w-xl text-primary-foreground/85">{hero.text}</p>
            ) : null}
          </div>
          {hero.linkUrl && hero.linkLabel ? (
            <Link
              href={hero.linkUrl}
              className="mt-8 inline-flex bg-primary-foreground px-7 py-3 text-sm font-medium text-pine-teal uppercase"
            >
              {hero.linkLabel}
            </Link>
          ) : null}
        </div>
      </div>

      {count > 1 ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1">
          <CarouselControl label="Previous slide" onClick={() => go(index - 1)}>
            <ChevronLeft className="size-4" />
          </CarouselControl>

          {/* The dots stay 8px visually; the padding gives each a 24px target. */}
          <div className="flex items-center">
            {heroes.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show slide ${itemIndex + 1}`}
                aria-current={itemIndex === index}
                onClick={() => go(itemIndex)}
                className="flex size-6 items-center justify-center"
              >
                <span
                  className={`size-2 rounded-full ${
                    itemIndex === index ? "bg-primary-foreground" : "bg-primary-foreground/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <CarouselControl label="Next slide" onClick={() => go(index + 1)}>
            <ChevronRight className="size-4" />
          </CarouselControl>
        </div>
      ) : null}
    </section>
  );
}

function CarouselControl({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center text-primary-foreground/80 transition-colors hover:text-primary-foreground focus-visible:text-primary-foreground"
    >
      {children}
    </button>
  );
}