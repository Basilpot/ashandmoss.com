export default function ExperienceCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="exp-item group bg-white p-12 border border-gray-200 relative overflow-hidden transition-colors duration-400 hover:bg-cream fade-in">
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-moss to-transparent scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
      <div className="exp-number font-playfair text-[4rem] font-light text-gray-300 leading-none mb-8 transition-colors duration-400 group-hover:text-moss">
        {number}
      </div>
      <div className="exp-title text-[13px] tracking-[0.2em] uppercase text-gray-900 font-bold mb-4">
        {title}
      </div>
      <p className="exp-desc text-[16px] text-gray-700 leading-[2]">{description}</p>
    </div>
  );
}
