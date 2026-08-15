"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const boxRef = useRef<HTMLDivElement>(null);

  const src = images[active];

  if (!src) {
    return <div className="aspect-square w-full rounded-sm bg-muted" />;
  }

  const onMove = (e: React.MouseEvent) => {
    const box = boxRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    setOrigin(
      `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
    );
  };

  return (
    <div>
      <div
        ref={boxRef}
        className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-sm bg-muted"
        onMouseMove={onMove}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <Image
          src={src}
          alt={title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{
            transformOrigin: origin,
            transform: zoom ? "scale(1.8)" : "scale(1)",
            transition: "transform 150ms ease-out",
          }}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((thumb, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border transition-colors ${
                active === i ? "border-foreground" : "border-border hover:border-muted-foreground"
              }`}
            >
              <Image src={thumb} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
