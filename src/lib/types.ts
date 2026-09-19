export type Brand = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  sortOrder: number;
  parentId: string | null;
  _count: { products: number };
  children: Category[];
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Attribute = {
  name: string;
  value: string;
};

export type Faq = {
  q: string;
  a: string;
};

export type Variant = {
  id: number;
  name: string;
  sku: string;
  price: string;
  compareAtPrice: string | null;
  stock: number;
  image: string | null;
  sortOrder: number;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  images: string[];
  price: number;
  maxPrice: number | null;
  compareAtPrice: number | null;
  isFeatured: boolean;
  status: string;
  views: number;
  popularityScore: number;
  categoryId: string;
  brandId: number;
  brand: Brand;
  category: Pick<Category, "id" | "name" | "slug">;
  tags: Tag[];
  variants: Variant[];
  attributes: Attribute[] | null;
  description?: string | null;
  faq?: Faq[] | null;
  sku?: string | null;
  priceCurrency?: string | null;
};

export type SiteConfig = {
  name?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  currency?: string;
  logo?: string;
  palette?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
};

export type StorefrontStore = {
  id: string;
  name: string;
  slug: string;
  templateKey: string;
};

export type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
  viewAllUrl?: string;
};

export type InfoPage = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  coverImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  published: boolean;
};

export type CartItem = {
  productId: number;
  slug: string;
  variantId: number | null;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
};

export type CreateOrderInput = {
  items: { productId: number; variantId?: number; quantity: number }[];
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  note?: string;
};

export type PaymentForm = {
  actionUrl: string;
  fields: { name: string; value: string }[];
};

export type OrderItem = {
  productName: string;
  variantName: string | null;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
};

export type Order = {
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  city: string | null;
  note: string | null;
  totalAmount: string;
  currency: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
  payment: {
    status: string;
    transactionId: string | null;
    amount: string;
  } | null;
};
