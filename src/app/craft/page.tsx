import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The Craft",
  description:
    "How Ash & Moss builds furniture: milling our own boards, hand-cut joinery, hardwax oil finishes and a lifetime repair promise.",
  alternates: { canonical: "/craft" },
  openGraph: { title: "The Craft", type: "website" },
};

const steps = [
  {
    n: "01",
    t: "Timber selection",
    d: "Boards are sourced from regional mills and stacked in our loft for a year before they meet a blade.",
  },
  {
    n: "02",
    t: "Drawing to measure",
    d: "We draw each commission around your room — heights, spans and reveals adjusted to the millimetre.",
  },
  {
    n: "03",
    t: "Joinery by hand",
    d: "Mortise and tenon, dovetails, draw-bored pegs. Fastenings only where they genuinely belong.",
  },
  {
    n: "04",
    t: "Finish and repair",
    d: "Hardwax oil or soap finish, both of which can be refreshed at home. Send it back any time for a repair.",
  },
];

export default function Craft() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="eyebrow text-fern">The craft</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
          Slow furniture, made in daylight.
        </h1>
        <p className="mt-6 text-muted-foreground">
          Ash &amp; Moss is a three-person workshop. We take on a limited number of
          commissions each season so that every piece gets the same attention as the
          first one we ever sold.
        </p>
      </section>
      <Image
        src="/images/workshop.jpg"
        alt="Hands planing an oak board"
        width={1400}
        height={900}
        className="h-[46vh] min-h-[300px] w-full object-cover"
      />
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-border pt-6">
              <span className="text-sm tracking-[0.2em] text-fern">{s.n}</span>
              <h2 className="mt-3 text-xl font-semibold">{s.t}</h2>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
