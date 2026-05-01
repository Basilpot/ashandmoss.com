import Image from "next/image";

export default function AboutVisual() {
  return (
    <div className="about-visual relative fade-in">
      <div className="about-box w-full aspect-[3/4] bg-white border border-gray-200 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(42,61,31,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(75,75,75,0.08) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0">
          <Image
            src="/popup-retreat.avif"
            alt="Ash & Moss retreat"
            fill
            className="object-cover opacity-65"
          />
        </div>
        <div className="about-coords absolute top-8 right-8 text-[12px] tracking-[0.1em] text-gray-400 text-right leading-[1.8]">
          Location shared
          <br />
          after your inquiry
          <br />
          is accepted
        </div>
        <div className="about-box-label absolute bottom-8 left-8 text-[12px] tracking-[0.2em] uppercase text-gray-500">
          Here for one month. Then gone.
        </div>
      </div>
      <div className="about-box-accent absolute top-[-1rem] right-[-1rem] w-[60%] h-[40%] border border-gray-200 -z-1" />
    </div>
  );
}
