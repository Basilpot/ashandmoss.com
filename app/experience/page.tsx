import SectionLabel from "@/components/SectionLabel";
import ExperienceCard from "@/components/ExperienceCard";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata = {
  title: "Experience | Ash & Moss",
  description:
    "One month of actual rest, healing, nature, food, work, and space. Six people. No performance required.",
};

const experiences = [
  {
    number: "01",
    title: "Actual Rest",
    description:
      "Morning yoga if you want it. Breathwork if you're curious. Nothing mandatory. You remember what it feels like to wake up without somewhere to be.",
  },
  {
    number: "02",
    title: "Actual Healing",
    description:
      "Ayurvedic treatments. Deep tissue work. Remedies drawn from the landscape. Your body has been carrying a lot. A month is enough to start putting some of it down.",
  },
  {
    number: "03",
    title: "Actual Nature",
    description:
      "High trails. Cold rivers. Air that hasn't passed through a city. Guided treks into terrain most people never reach, at a pace that belongs to you.",
  },
  {
    number: "04",
    title: "Actual Food",
    description:
      "Fresh, local, cooked with care every day. No menus to overthink. Just good food eaten somewhere so quiet you can hear yourself think again.",
  },
  {
    number: "05",
    title: "Actual Work",
    description:
      "Fast WiFi. Reliable power. Your calls, your deadlines, your inbox — all still there. The only difference is what surrounds you while you work through them.",
  },
  {
    number: "06",
    title: "Actual Space",
    description:
      "Six guests. One month. No performance required. The people around you came for the same reason — to be somewhere else for a while, properly.",
  },
];

export default function ExperiencePage() {
  return (
    <ScrollFadeIn>
      <section className="experience bg-cream px-12 py-32 min-h-screen">
        <SectionLabel>One Month. Everything Included.</SectionLabel>
        <h1 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-semibold text-gray-900 leading-[1.2] mb-16">
          What you&apos;ll
          <br />
          <em className="text-warm italic">actually do.</em>
        </h1>
        <div className="experience-grid grid grid-cols-3 gap-[2px]">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.number} {...exp} />
          ))}
        </div>

        <div className="mt-24 max-w-3xl">
          <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-semibold text-gray-900 mb-6">
            No Schedule Required
          </h2>
          <p className="text-gray-700 text-[16px] leading-[2.2] mb-6">
            Nothing here is mandatory. Sleep in. Skip the yoga. Work through
            lunch. The structure exists only if you want it. This is your month —
            however you need it to be.
          </p>
          <p className="text-gray-700 text-[16px] leading-[2.2]">
            We&apos;ve found that when people are given space without
            performance, they settle into a rhythm that&apos;s entirely their
            own. Some days are for trekking. Some are for the desk. Most are a bit
            of both.
          </p>
        </div>
      </section>
    </ScrollFadeIn>
  );
}
