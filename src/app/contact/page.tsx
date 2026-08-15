import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Commission a Piece",
  description:
    "Tell us about the room and we'll draw a custom furniture piece to fit it. Commissions open each season.",
};

export default function Contact() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-20">
      <p className="eyebrow text-fern">Commission</p>
      <h1 className="mt-3 text-4xl font-semibold">Tell us about the room.</h1>
      <p className="mt-5 text-muted-foreground">
        Dimensions, timber preferences, a photo of the space — anything helps. We reply
        within two working days with a sketch and an estimate.
      </p>
      <ContactForm />
    </main>
  );
}
