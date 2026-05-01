import SectionLabel from "@/components/SectionLabel";
import AboutVisual from "@/components/AboutVisual";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata = {
  title: "About | Ash & Moss",
  description:
    "Not a hotel. Not a resort. A pop-up retreat that arrives for one month, then disappears back into the landscape.",
};

export default function AboutPage() {
  return (
    <ScrollFadeIn>
      <section className="about bg-deep px-12 py-32 grid grid-cols-2 gap-24 items-center min-h-screen">
        <div className="about-text">
          <SectionLabel>What This Is</SectionLabel>
          <h1 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-[1.2] text-gray-900 mb-8">
            Not a hotel.
            <br />
            Not a resort.
            <br />
            <em className="text-warm font-normal italic">A pop-up.</em>
          </h1>
          <p className="text-gray-700 text-[16px] leading-[2.2] mb-6">
            Ash & Moss doesn&apos;t have a permanent address. It arrives —
            fully set up, fully staffed, fully alive — for exactly one month. Then
            it folds back into the landscape it came from.
          </p>
          <p className="text-gray-700 text-[16px] leading-[2.2] mb-6">
            A remote village. High altitude. A small house made to feel like
            yours. WiFi that works, hot water that runs, food cooked fresh every
            day from what&apos;s grown nearby. Everything you need. None of what
            you don&apos;t.
          </p>
          <p className="text-gray-700 text-[16px] leading-[2.2] mb-6">
            Six guests per run. One group. No strangers dropping in, no one
            else&apos;s schedule to work around. When this month is yours, it is
            entirely yours. The location is shared once we&apos;ve spoken —
            that&apos;s part of how this works.
          </p>
          <p className="text-gray-700 text-[16px] leading-[2.2]">
            We choose places that haven&apos;t been over-run. Villages where the
            air is still clean, where the trails are quiet, where the pace of life
            hasn&apos;t been optimized. You won&apos;t find us on a map until
            you&apos;re meant to.
          </p>
        </div>
        <AboutVisual />
      </section>
    </ScrollFadeIn>
  );
}
