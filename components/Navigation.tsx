import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-12 py-8 flex justify-between items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-white/97 to-transparent z-[-1]" />
      <Link
        href="/"
        className="font-playfair text-[1.6rem] font-semibold tracking-[0.2em] text-gray-900 uppercase hover:text-gray-600 transition-colors"
      >
        Ash & Moss
      </Link>
      <ul className="nav-links flex gap-12 list-none">
        <li>
          <Link
            href="/about"
            className="text-[13px] tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors font-semibold"
          >
            The Place
          </Link>
        </li>
        <li>
          <Link
            href="/experience"
            className="text-[13px] tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors font-semibold"
          >
            Experience
          </Link>
        </li>
        <li>
          <Link
            href="/stays"
            className="text-[13px] tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors font-semibold"
          >
            Availability
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-[13px] tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors font-semibold"
          >
            Inquire
          </Link>
        </li>
        <li>
          <Link
            href="/faq"
            className="text-[13px] tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors font-semibold"
          >
            FAQ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
