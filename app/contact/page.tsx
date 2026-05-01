import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export const metadata = {
  title: "Inquire | Ash & Moss",
  description:
    "Tell us a little about where you're at. We read every message ourselves and respond within 48 hours.",
};

export default function ContactPage() {
  return (
    <ScrollFadeIn>
      <section className="contact bg-cream px-12 py-32 grid grid-cols-[1fr_1.2fr] gap-24 items-start min-h-screen">
        <div className="contact-info">
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="font-playfair text-[clamp(2.5rem,4vw,3rem)] font-semibold text-gray-900 leading-[1.2] mb-8">
            Tell us
            <br />
            a little about
            <br />
            <em className="text-warm italic">where you&apos;re at.</em>
          </h1>
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

          <div className="mt-16 p-8 border border-gray-200 bg-white">
            <h3 className="font-playfair text-[1.8rem] font-semibold text-gray-900 mb-4">
              Before You Write
            </h3>
            <ul className="text-[15px] text-gray-700 leading-[2] space-y-2">
              <li>— Tell us where you&apos;re coming from</li>
              <li>— Mention if you&apos;re coming solo or with others</li>
              <li>— Share what you&apos;re hoping to get from the month</li>
              <li>— No need to be formal — just be yourself</li>
            </ul>
          </div>
        </div>
        <ContactForm />
      </section>
    </ScrollFadeIn>
  );
}
