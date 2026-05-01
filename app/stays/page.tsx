import SectionLabel from "@/components/SectionLabel";
import PricingCard from "@/components/PricingCard";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata = {
  title: "Availability & Pricing | Ash & Moss",
  description:
    "$3,200 per person for 30 days. All-inclusive. One group. One month. No surprises.",
};

export default function StaysPage() {
  return (
    <ScrollFadeIn>
      <section className="stays bg-deep px-12 py-32 min-h-screen">
        <div className="stays-header grid grid-cols-2 gap-16 items-end mb-20">
          <div>
            <SectionLabel>Availability & Pricing</SectionLabel>
            <h1 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-semibold text-gray-900 leading-[1.2]">
              It runs once.
              <br />
              <em className="text-warm italic">Then it&apos;s gone.</em>
              <br />
              Until next time.
            </h1>
          </div>
          <p className="text-gray-700 text-[16px] leading-[2.2]">
            Each pop-up is a single month, a single group. We don&apos;t run them
            back to back — there&apos;s time between each one to make sure the
            next is worth showing up for. Most slots fill before we announce them.
            If you&apos;re reading this, one is still open.
          </p>
        </div>

        <PricingCard />

        <div className="mt-24 max-w-4xl grid grid-cols-2 gap-16">
          <div>
            <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-semibold text-gray-900 mb-6">
              What&apos;s Included
            </h2>
            <p className="text-gray-700 text-[16px] leading-[2.2] mb-4">
              Your $3,200 covers everything for 30 days. No hidden costs, no
              &quot;optional extras,&quot; no surprise bills at the end.
            </p>
            <p className="text-gray-700 text-[16px] leading-[2.2]">
              Transport to the location is arranged once your inquiry is
              accepted. We&apos;ll meet you at the nearest airport or station and
              handle the rest.
            </p>
          </div>
          <div>
            <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-semibold text-gray-900 mb-6">
              The Group
            </h2>
            <p className="text-gray-700 text-[16px] leading-[2.2] mb-4">
              Six people maximum. You can come as a group of six, or join an
              existing group. Either way — no strangers dropping in mid-month.
            </p>
            <p className="text-gray-700 text-[16px] leading-[2.2]">
              We curate each group carefully. When you inquire, tell us a bit
              about yourself. If it feels like the right fit, we&apos;ll get
              back to you within 48 hours.
            </p>
          </div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}
