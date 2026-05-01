import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero relative h-screen flex items-end px-12 pb-20 overflow-hidden bg-cream">
      {/* Background with subtle gradients */}
      <div className="hero-bg absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(42,61,31,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(75,75,75,0.05) 0%, transparent 50%), linear-gradient(180deg, #ededea 0%, #f5f5f0 50%, #ededea 100%)",
          }}
        />
        <div className="hero-grain" />
      </div>

      {/* Vertical lines */}
      <div className="hero-lines absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent">
        <div className="absolute top-0 left-[80px] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-gray-200/60 to-transparent" />
      </div>

      <div className="hero-content relative z-[2] max-w-[680px] fade-in">
        <div className="hero-eyebrow flex items-center gap-4 text-[12px] tracking-[0.35em] uppercase text-moss font-semibold mb-6">
          <span className="block w-10 h-[1px] bg-moss" />A Pop-Up Retreat · One
          Month · Six People
        </div>
        <h1 className="hero-title font-playfair text-[clamp(3.5rem,7vw,5rem)] font-semibold leading-[1.05] text-gray-900 mb-8 tracking-[0.02em]">
          The world can wait.
          <br />
          <em className="text-warm font-normal italic">Or come with you.</em>
        </h1>
        <p className="hero-sub text-[17px] tracking-[0.1em] text-gray-700 leading-[2] max-w-[420px] mb-12">
          Ash & Moss appears once, for one month, then it&apos;s gone. Bring
          your work. Leave the city behind. Six people, one place, nothing like
          anything you&apos;ve done before.
        </p>
        <div className="hero-meta flex gap-12 text-[12px] tracking-[0.2em] uppercase text-gray-400">
          <span>
            Altitude <span className="text-gray-900 font-bold">~2,800m</span>
          </span>
          <span>
            Guests <span className="text-gray-900 font-bold">6 max</span>
          </span>
          <span>
            Duration <span className="text-gray-900 font-bold">30 days</span>
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute right-12 bottom-20 flex flex-col items-center gap-4 fade-in">
        <div className="scroll-line" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </section>
  );
}
