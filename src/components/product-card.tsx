import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAt && product.compareAt > product.price;
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-sm bg-muted">
        {onSale ? (
          <span className="absolute top-3 left-3 z-10 bg-hunter-green px-2.5 py-1 text-[10px] tracking-[0.16em] text-primary-foreground uppercase">
            Save {formatPrice(product.compareAt! - product.price)}
          </span>
        ) : null}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {String(product.attributes.Wood ?? "")}
        </p>
        <h3 className="mt-1 text-base font-medium">{product.name}</h3>
        <p className="mt-1 text-sm">
          <span className="font-medium text-hunter-green">{formatPrice(product.price)}</span>
          {onSale ? (
            <span className="ml-2 text-muted-foreground line-through">
              {formatPrice(product.compareAt!)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
