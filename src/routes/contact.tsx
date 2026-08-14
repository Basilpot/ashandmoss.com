import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Commission a Piece — Ash & Moss";
const description =
  "Tell us about the room and we'll draw a custom furniture piece to fit it. Commissions open each season.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-20">
        <p className="eyebrow text-fern">Commission</p>
        <h1 className="mt-3 text-4xl font-semibold">Tell us about the room.</h1>
        <p className="mt-5 text-muted-foreground">
          Dimensions, timber preferences, a photo of the space — anything helps. We reply
          within two working days with a sketch and an estimate.
        </p>

        {sent ? (
          <p className="mt-10 border border-fern bg-dust-grey/50 px-6 py-5 text-sm">
            Thank you — your enquiry is with the workshop. We'll be in touch shortly.
          </p>
        ) : (
          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                Name
                <input
                  required
                  className="mt-2 w-full border border-input bg-card px-3 py-2.5 text-base outline-none focus:border-fern"
                />
              </label>
              <label className="block text-sm">
                Email
                <input
                  required
                  type="email"
                  className="mt-2 w-full border border-input bg-card px-3 py-2.5 text-base outline-none focus:border-fern"
                />
              </label>
            </div>
            <label className="block text-sm">
              What would you like made?
              <textarea
                required
                rows={5}
                className="mt-2 w-full border border-input bg-card px-3 py-2.5 text-base outline-none focus:border-fern"
              />
            </label>
            <button
              type="submit"
              className="bg-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal"
            >
              Send enquiry
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
