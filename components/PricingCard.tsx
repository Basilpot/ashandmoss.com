export default function PricingCard() {
  return (
    <div className="pricing-card border border-gray-200 p-16 relative bg-white grid grid-cols-3 gap-12">
      <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-moss text-white text-[10px] tracking-[0.25em] px-6 py-[6px] whitespace-nowrap uppercase">
        One Group · One Month · One Experience
      </div>

      <div className="pricing-col">
        <h3 className="text-[12px] tracking-[0.2em] uppercase text-moss font-bold mb-6">
          Investment
        </h3>
        <div className="price-number font-playfair text-[3rem] font-bold text-gray-900 leading-none mb-2">
          $3,200
        </div>
        <p className="price-detail text-[15px] text-gray-700 leading-[2]">
          per person
          <br />
          for 30 days
          <br />
          <br />
          All-inclusive.
          <br />
          No surprises.
        </p>
      </div>

      <div className="pricing-col">
        <h3 className="text-[12px] tracking-[0.2em] uppercase text-moss font-bold mb-6">
          Everything included
        </h3>
        <ul className="includes-list list-none">
          {[
            "Full 30-day accommodation",
            "All meals & clean water",
            "Yoga & meditation sessions",
            "Ayurvedic treatments",
            "Guided treks",
            "Fast WiFi & reliable power",
            "Transport arranged on booking",
            "On-ground support throughout",
          ].map((item) => (
            <li
              key={item}
              className="text-[15px] text-gray-700 py-[10px] border-b border-gray-200 flex items-center gap-3"
            >
              <span className="text-moss text-[10px]">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pricing-col">
        <h3 className="text-[12px] tracking-[0.2em] uppercase text-moss font-bold mb-6">
          Upcoming pop-ups
        </h3>
        <div className="slot-status flex flex-col gap-4">
          {[
            { date: "Feb – Mar 2026", status: "booked", label: "Closed" },
            { date: "Apr – May 2026", status: "booked", label: "Closed" },
            { date: "Sep – Oct 2026", status: "booked", label: "Closed" },
            { date: "Nov – Dec 2026", status: "open", label: "Inquire" },
          ].map((slot) => (
            <div
              key={slot.date}
              className="slot-row flex justify-between items-center py-[16px] border-b border-gray-200 text-[14px]"
            >
              <span className="slot-date text-gray-500 tracking-[0.1em]">
                {slot.date}
              </span>
              <span
                className={`slot-tag text-[10px] tracking-[0.2em] uppercase px-3 py-1 ${
                  slot.status === "booked"
                    ? "bg-gray-100 text-gray-400"
                    : "bg-moss/10 text-moss border border-moss"
                }`}
              >
                {slot.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
