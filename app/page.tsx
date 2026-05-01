import Hero from "@/components/Hero";
import SectionLabel from "@/components/SectionLabel";
import AboutVisual from "@/components/AboutVisual";
import ExperienceCard from "@/components/ExperienceCard";
import PricingCard from "@/components/PricingCard";
import ContactForm from "@/components/ContactForm";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Home() {
  return (
    <ScrollFadeIn>
      <Hero />

      <div className="divider" />

      {/* About Section */}
      <section id="about" className="about bg-deep px-12 py-32 grid grid-cols-2 gap-24 items-center">
        <div className="about-text">
          <SectionLabel>What This Is</SectionLabel>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-[1.2] text-gray-900 mb-8">
            Not a hotel.
            <br />
            Not a resort.
            <br />
            <em className="text-warm font-normal italic">A pop-up.</em>
          </h2>
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
          <p className="text-gray-700 text-[16px] leading-[2.2]">
            Six guests per run. One group. No strangers dropping in, no one
            else&apos;s schedule to work around. When this month is yours, it is
            entirely yours. The location is shared once we&apos;ve spoken —
            that&apos;s part of how this works.
          </p>
        </div>
        <AboutVisual />
      </section>

      <div className="divider" />

      {/* Experience Section */}
      <section id="experience" className="experience bg-cream px-12 py-32">
        <SectionLabel>One Month. Everything Included.</SectionLabel>
        <div className="experience-grid grid grid-cols-3 gap-[2px] mt-16">
          <ExperienceCard
            number="01"
            title="Actual Rest"
            description="Morning yoga if you want it. Breathwork if you're curious. Nothing mandatory. You remember what it feels like to wake up without somewhere to be."
          />
          <ExperienceCard
            number="02"
            title="Actual Healing"
            description="Ayurvedic treatments. Deep tissue work. Remedies drawn from the landscape. Your body has been carrying a lot. A month is enough to start putting some of it down."
          />
          <ExperienceCard
            number="03"
            title="Actual Nature"
            description="High trails. Cold rivers. Air that hasn't passed through a city. Guided treks into terrain most people never reach, at a pace that belongs to you."
          />
          <ExperienceCard
            number="04"
            title="Actual Food"
            description="Fresh, local, cooked with care every day. No menus to overthink. Just good food eaten somewhere so quiet you can hear yourself think again."
          />
          <ExperienceCard
            number="05"
            title="Actual Work"
            description="Fast WiFi. Reliable power. Your calls, your deadlines, your inbox — all still there. The only difference is what surrounds you while you work through them."
          />
          <ExperienceCard
            number="06"
            title="Actual Space"
            description="Six guests. One month. No performance required. The people around you came for the same reason — to be somewhere else for a while, properly."
          />
        </div>
      </section>

      <div className="divider" />

      {/* Stays Section */}
      <section id="stays" className="stays bg-deep px-12 py-32">
        <div className="stays-header grid grid-cols-2 gap-16 items-end mb-20">
          <div>
            <SectionLabel>Availability & Pricing</SectionLabel>
            <h2 className="font-playfair text-[clamp(2.5rem,4vw,3.5rem)] font-semibold text-gray-900 leading-[1.2]">
              It runs once.
              <br />
              <em className="text-warm italic">Then it&apos;s gone.</em>
              <br />
              Until next time.
            </h2>
          </div>
          <p className="text-gray-700 text-[16px] leading-[2.2] fade-in">
            Each pop-up is a single month, a single group. We don&apos;t run them
            back to back — there&apos;s time between each one to make sure the
            next is worth showing up for. Most slots fill before we announce them.
            If you&apos;re reading this, one is still open.
          </p>
        </div>
        <PricingCard />
      </section>

      <div className="divider" />

      {/* Contact Section */}
      <section id="contact" className="contact bg-cream px-12 py-32 grid grid-cols-[1fr_1.2fr] gap-24 items-start">
        <div className="contact-info">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="font-playfair text-[clamp(2.5rem,4vw,3rem)] font-semibold text-gray-900 leading-[1.2] mb-8">
            Tell us
            <br />
            a little about
            <br />
            <em className="text-warm italic">where you&apos;re at.</em>
          </h2>
          <p className="text-gray-700 text-[16px] leading-[2.2] mb-12">
            We read every message ourselves. No auto-replies, no booking engine.
            If it feels like a good fit — for you and for the group that month —
            we&apos;ll write back and we&apos;ll talk properly.
          </p>
          <p className="contact-detail text-[12px] tracking-[0.15em] text-gray-500 mb-2">
            Email <span className="text-warm">inquire@ashandmoss.com</span>
          </p>
          <p className="contact-detail text-[12px] tracking-[0.15em] text-gray-500 mt-2">
            We respond within <span className="text-warm">48 hours</span>
          </p>
        </div>
        <ContactForm />
      </section>
    </ScrollFadeIn>
  );
}
