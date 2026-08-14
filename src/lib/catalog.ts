import chair from "@/assets/p-chair.jpg";
import table from "@/assets/p-table.jpg";
import sofa from "@/assets/p-sofa.jpg";
import shelf from "@/assets/p-shelf.jpg";
import bed from "@/assets/p-bed.jpg";
import sidetable from "@/assets/p-sidetable.jpg";
import desk from "@/assets/p-desk.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  blurb: string;
  leadTime: string;
  /** Dynamic attributes — the Explore filters are generated from these. */
  attributes: Record<string, string | string[]>;
};

export const products: Product[] = [
  {
    slug: "fernwood-lounge-chair",
    name: "Fernwood Lounge Chair",
    price: 1240,
    compareAt: 1420,
    image: chair,
    blurb:
      "A low, generous lounge chair with a hand-shaped white oak frame and a moss wool seat, built to be re-upholstered rather than replaced.",
    leadTime: "6–8 weeks",
    attributes: {
      Category: "Seating",
      Wood: "White Oak",
      Finish: "Hardwax Oil",
      Upholstery: "Moss Wool",
      Room: ["Living Room", "Study"],
      Size: "Single",
    },
  },
  {
    slug: "moss-linen-sofa",
    name: "Moss Three-Seat Sofa",
    price: 3180,
    image: sofa,
    blurb:
      "Deep seat, feather-wrapped cushions and a kiln-dried hardwood frame. Choose your linen weight at checkout.",
    leadTime: "10–12 weeks",
    attributes: {
      Category: "Seating",
      Wood: "Beech",
      Finish: "Natural",
      Upholstery: "Belgian Linen",
      Room: "Living Room",
      Size: "Three Seat",
    },
  },
  {
    slug: "ashfield-dining-table",
    name: "Ashfield Dining Table",
    price: 2460,
    image: table,
    blurb:
      "Solid walnut top with a splayed trestle base. Cut to your millimetre, up to 3.2 metres long.",
    leadTime: "8–10 weeks",
    attributes: {
      Category: "Tables",
      Wood: "Walnut",
      Finish: "Hardwax Oil",
      Room: "Dining Room",
      Size: "Seats 6–8",
    },
  },
  {
    slug: "pebble-side-table",
    name: "Pebble Side Table",
    price: 420,
    compareAt: 480,
    image: sidetable,
    blurb: "A turned walnut disc on three tapered legs. Small, quiet, endlessly useful.",
    leadTime: "3–4 weeks",
    attributes: {
      Category: "Tables",
      Wood: "Walnut",
      Finish: "Oiled",
      Room: ["Living Room", "Bedroom"],
      Size: "Small",
    },
  },
  {
    slug: "slatted-ash-shelving",
    name: "Slatted Ash Shelving",
    price: 1680,
    image: shelf,
    blurb:
      "Open slat-back shelving in solid ash, configured in modules so it grows with the room.",
    leadTime: "6–8 weeks",
    attributes: {
      Category: "Storage",
      Wood: "Ash",
      Finish: "Soap",
      Room: ["Living Room", "Study"],
      Size: "Tall",
    },
  },
  {
    slug: "cane-platform-bed",
    name: "Cane Platform Bed",
    price: 2240,
    image: bed,
    blurb:
      "A low oak platform with a hand-woven cane headboard and slats that never creak.",
    leadTime: "8–10 weeks",
    attributes: {
      Category: "Beds",
      Wood: "White Oak",
      Finish: "Natural",
      Room: "Bedroom",
      Size: "Queen",
    },
  },
  {
    slug: "keeper-writing-desk",
    name: "Keeper Writing Desk",
    price: 1390,
    image: desk,
    blurb:
      "Hand-cut dovetailed drawers, cable channel through the rail, and a top sized to your room.",
    leadTime: "6–8 weeks",
    attributes: {
      Category: "Tables",
      Wood: "Oak",
      Finish: "Hardwax Oil",
      Room: "Study",
      Size: "Medium",
    },
  },
  {
    slug: "fernwood-dining-chair",
    name: "Fernwood Dining Chair",
    price: 540,
    image: chair,
    blurb: "The lounge chair's upright sibling — stackable, steam-bent, sage wool seat.",
    leadTime: "5–6 weeks",
    attributes: {
      Category: "Seating",
      Wood: "Ash",
      Finish: "Soap",
      Upholstery: "Sage Wool",
      Room: "Dining Room",
      Size: "Single",
    },
  },
];

export const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/** Build the filter groups dynamically from whatever attributes products carry. */
export function buildFacets(items: Product[]) {
  const facets = new Map<string, Map<string, number>>();
  for (const p of items) {
    for (const [key, raw] of Object.entries(p.attributes)) {
      const values = Array.isArray(raw) ? raw : [raw];
      if (!facets.has(key)) facets.set(key, new Map());
      const bucket = facets.get(key)!;
      for (const v of values) bucket.set(v, (bucket.get(v) ?? 0) + 1);
    }
  }
  return [...facets.entries()]
    .map(([name, values]) => ({
      name,
      values: [...values.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => a.value.localeCompare(b.value)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function matchesFilters(p: Product, selected: Record<string, string[]>) {
  return Object.entries(selected).every(([key, values]) => {
    if (!values.length) return true;
    const raw = p.attributes[key];
    if (raw === undefined) return false;
    const owned = Array.isArray(raw) ? raw : [raw];
    return values.some((v) => owned.includes(v));
  });
}
