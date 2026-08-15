import Image from "next/image";
import Link from "next/link";
import { productImage, productPrice } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const img = productImage(product);
  const price = productPrice(product);
  const onSale = product.compareAtPrice && product.compareAtPrice > price;
  const attribute = product.attributes?.[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-muted">
        {onSale ? (
          <span className="absolute top-3 left-3 z-10 bg-hunter-green px-2.5 py-1 text-[10px] tracking-[0.16em] text-primary-foreground uppercase">
            Save {formatPrice(product.compareAtPrice! - price, product.priceCurrency)}
          </span>
        ) : null}
        {img ? (
          <Image
            src={img}
            alt={product.title}
            width={900}
            height={900}
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="aspect-square w-full bg-muted" />
        )}
      </div>
      <div className="mt-4">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          {attribute?.value ?? product.brand.name}
        </p>
        <h3 className="mt-1 text-base font-medium">{product.title}</h3>
        <p className="mt-1 text-sm">
          <span className="font-medium text-hunter-green">
            {formatPrice(price, product.priceCurrency)}
          </span>
          {onSale ? (
            <span className="ml-2 text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice!, product.priceCurrency)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
