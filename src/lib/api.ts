import type {
  Brand,
  Category,
  CreateOrderInput,
  InfoPage,
  MenuItem,
  Order,
  PaymentForm,
  Product,
  SiteConfig,
  StorefrontStore,
} from "./types";
import { requireApiBaseUrl, requireApiKey } from "./env";

const API = "/api/v1";

/**
 * Two paths to the API, and both of them attach the key.
 *
 * Browser  -> same-origin /api/v1/*, handled by src/app/api/v1/[...path]/route.ts,
 *             which adds the bearer key server-side. A key cannot live in client
 *             code, so this is the only way a browser can reach the API.
 *
 * Server   -> straight to the API host, with the key attached here.
 *
 * The split exists because a server render has no origin to make a same-origin
 * request against, and it cannot route through the proxy without importing
 * next/headers — which is server-only, and this module is also imported by client
 * components.
 *
 * There is no tenant header and no siteOrigin argument. The key names the store.
 * That is also why this storefront works from any hostname, including a custom
 * domain with no store_domain row registered against it.
 */
function apiUrl(path: string): string {
  if (typeof window !== "undefined") return `${API}${path}`;
  return `${requireApiBaseUrl()}${path}`;
}

async function tenantFetch(path: string, init?: RequestInit) {
  if (typeof window !== "undefined") return fetch(apiUrl(path), init);

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${requireApiKey()}`);
  return fetch(apiUrl(path), { ...init, headers });
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message ?? `Request failed (${status})`);
    this.status = status;
  }
}

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message: string | undefined;
    try {
      message = (await res.json())?.message;
    } catch {
      // non-JSON error body
    }
    throw new ApiError(res.status, message);
  }
  return (await res.json()) as T;
}

export type ProductQuery = {
  category?: string;
  brand?: string;
  tag?: string;
  search?: string;
  sort?: string;
  order?: string;
  isFeatured?: string;
  page?: number;
  limit?: number;
  attribute?: string[];
};

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) v.forEach((x) => params.append(k, x));
    else params.append(k, String(v));
  }
  params.set("status", "published");
  const { products } = await j<{ products: Product[] }>(
    await tenantFetch(`/products?${params.toString()}`, undefined),
  );
  return products;
}

export async function getProduct(slug: string): Promise<Product> {
  const { data } = await j<{ data: Product }>(
    await tenantFetch(`/products/${slug}`, undefined),
  );
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { categories } = await j<{ categories: Category[] }>(
    await tenantFetch("/categories", undefined),
  );
  return categories;
}

export async function getBrands(): Promise<Brand[]> {
  const { brands } = await j<{ brands: Brand[] }>(
    await tenantFetch("/brands", undefined),
  );
  return brands;
}

export async function getMenu(): Promise<MenuItem[]> {
  const { data } = await j<{
    data: { items?: MenuItem[]; autoItems?: MenuItem[]; auto?: boolean };
  }>(await tenantFetch("/menus", { cache: "no-store" }));
  return data.autoItems ?? data.items ?? [];
}

export async function getFooter(): Promise<MenuItem[]> {
  const { data } = await j<{
    data: { items?: MenuItem[]; autoItems?: MenuItem[]; auto?: boolean };
  }>(await tenantFetch("/footers", { cache: "no-store" }));
  return data.autoItems ?? data.items ?? [];
}

export async function getInfoPage(slug: string): Promise<InfoPage> {
  const { infoPage } = await j<{ infoPage: InfoPage }>(
    await tenantFetch(`/info-page/slug/${slug}`, { cache: "no-store" }),
  );
  return infoPage;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return (await getStorefrontContext()).siteConfig;
}

export async function getStorefrontContext(): Promise<{ siteConfig: SiteConfig; store: StorefrontStore }> {
  const response = await j<{ data: SiteConfig; store: StorefrontStore }>(
    await tenantFetch("/site-config", undefined),
  );
  return { siteConfig: response.data ?? {}, store: response.store };
}

export function productImage(p: Product): string {
  return p.images[0] ?? p.variants.find((v) => v.image)?.image ?? "";
}

export function productPrice(p: Product): number {
  const v = p.variants?.[0];
  const base = v ? Number(v.price) : p.price;
  const max = p.maxPrice ?? p.price;
  return max > base ? base : p.price;
}

export async function createOrder(
  input: CreateOrderInput,
): Promise<{ order: Order; paymentForm: PaymentForm }> {
  const { data } = await j<{
    data: { order: Order; paymentForm: PaymentForm };
  }>(
    await tenantFetch("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
  return data;
}

export async function getOrderByNumber(orderNumber: string): Promise<Order> {
  const { data } = await j<{ data: { order: Order } }>(
    await tenantFetch(`/orders/by-number/${encodeURIComponent(orderNumber)}`, {
      cache: "no-store",
    }),
  );
  return data.order;
}
