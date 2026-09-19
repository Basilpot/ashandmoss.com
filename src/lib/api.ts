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

const API = "/api/v1";

function apiUrl(path: string): string {
  if (typeof window !== "undefined") return `${API}${path}`;
  const base = process.env.API_BASE_URL ?? "http://localhost:3000/api/v1";
  return `${base}${path}`;
}

async function tenantFetch(path: string, init?: RequestInit, storeHost?: string) {
  const headers = new Headers(init?.headers);
  if (storeHost) headers.set("X-Store-Host", storeHost);
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

export async function getProducts(query: ProductQuery = {}, storeHost?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) v.forEach((x) => params.append(k, x));
    else params.append(k, String(v));
  }
  params.set("status", "published");
  const { products } = await j<{ products: Product[] }>(
    await tenantFetch(`/products?${params.toString()}`, undefined, storeHost),
  );
  return products;
}

export async function getProduct(slug: string, storeHost?: string): Promise<Product> {
  const { data } = await j<{ data: Product }>(
    await tenantFetch(`/products/${slug}`, undefined, storeHost),
  );
  return data;
}

export async function getCategories(storeHost?: string): Promise<Category[]> {
  const { categories } = await j<{ categories: Category[] }>(
    await tenantFetch("/categories", undefined, storeHost),
  );
  return categories;
}

export async function getBrands(storeHost?: string): Promise<Brand[]> {
  const { brands } = await j<{ brands: Brand[] }>(
    await tenantFetch("/brands", undefined, storeHost),
  );
  return brands;
}

export async function getMenu(storeHost?: string): Promise<MenuItem[]> {
  const { data } = await j<{
    data: { items?: MenuItem[]; autoItems?: MenuItem[]; auto?: boolean };
  }>(await tenantFetch("/menus", { cache: "no-store" }, storeHost));
  return data.autoItems ?? data.items ?? [];
}

export async function getFooter(storeHost?: string): Promise<MenuItem[]> {
  const { data } = await j<{
    data: { items?: MenuItem[]; autoItems?: MenuItem[]; auto?: boolean };
  }>(await tenantFetch("/footers", { cache: "no-store" }, storeHost));
  return data.autoItems ?? data.items ?? [];
}

export async function getInfoPage(slug: string, storeHost?: string): Promise<InfoPage> {
  const { infoPage } = await j<{ infoPage: InfoPage }>(
    await tenantFetch(`/info-page/slug/${slug}`, { cache: "no-store" }, storeHost),
  );
  return infoPage;
}

export async function getSiteConfig(storeHost?: string): Promise<SiteConfig> {
  return (await getStorefrontContext(storeHost)).siteConfig;
}

export async function getStorefrontContext(storeHost?: string): Promise<{ siteConfig: SiteConfig; store: StorefrontStore }> {
  const response = await j<{ data: SiteConfig; store: StorefrontStore }>(
    await tenantFetch("/site-config", undefined, storeHost),
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
