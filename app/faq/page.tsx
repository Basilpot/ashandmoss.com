import SectionLabel from "@/components/SectionLabel";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata = {
  title: "FAQ | Ash & Moss",
  description:
    "Common questions about Ash & Moss pop-up retreats. One month. Six people. One group. No exceptions.",
};

const faqs = [
  {
    q: "Where exactly is the retreat located?",
    a: "We don't publish the location publicly. Once your inquiry is accepted and we've spoken properly, we share the details. It's part of how we keep the experience undisturbed.",
  },
  {
    q: "Can I come alone or do I need a group?",
    a: "Both work. You can come as part of a group of up to six, or join an existing group. Either way, the six guests form one group for the month — no strangers dropping in mid-stay.",
  },
  {
    q: "What if I need to work during the month?",
    a: "The house has fast, reliable WiFi and dedicated workspace. Many guests keep up with their work while they're here — the only difference is the view while you do it.",
  },
  {
    q: "Is the food included?",
    a: "Everything is included. Three meals a day, cooked fresh from local ingredients. No menus to overthink — just good food, eaten somewhere quiet.",
  },
  {
    q: "What should I pack?",
    a: "We'll send a detailed packing list once your inquiry is accepted. Generally: comfortable clothes for trekking and yoga, warm layers for high-altitude evenings, and whatever you need for your work.",
  },
  {
    q: "How do I get there?",
    a: "Transport is arranged once your booking is confirmed. We'll meet you at the nearest airport or station and handle the journey from there.",
  },
  {
    q: "Can I stay for less than a month?",
    a: "No. The retreat runs for exactly one month. Part of what makes this work is the rhythm of a full month — the slow settling in, the deepening of routine, the actual rest that takes time to arrive.",
  },
  {
    q: "What's the altitude like?",
    a: "The retreat sits at approximately 2,800 meters. If you have concerns about altitude, mention it in your inquiry — we'll talk through it properly.",
  },
];

export default function FAQPage() {
  return (
    <ScrollFadeIn>
      <section className="bg-deep px-12 py-32 min-h-screen">
        <SectionLabel>Common Questions</SectionLabel>
        <h1 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-semibold text-gray-900 leading-[1.2] mb-16">
          Things people
          <br />
          <em className="text-warm italic">usually ask.</em>
        </h1>

        <div className="max-w-4xl">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="fade-in border-b border-gray-200 py-8"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-playfair text-[1.5rem] font-semibold text-gray-900 mb-4">
                {faq.q}
              </h3>
              <p className="text-[16px] text-gray-700 leading-[2.2]">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 border border-gray-200 bg-white max-w-2xl">
          <h2 className="font-playfair text-[2rem] font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-[16px] text-gray-700 leading-[2.2] mb-6">
            We&apos;re happy to talk through anything that&apos;s not covered
            here. Write to us at inquire@ashandmoss.com or use the contact form.
          </p>
          <a
            href="/contact"
            className="inline-block text-[11px] tracking-[0.3em] uppercase text-moss border border-moss px-8 py-3 hover:bg-moss hover:text-white transition-all duration-400"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </ScrollFadeIn>
  );
}
