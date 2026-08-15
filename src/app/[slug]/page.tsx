import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInfoPage } from "@/lib/api";

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getInfoPage(slug).catch(() => null);
  if (!page || !page.published) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow text-fern">{page.title}</p>
      <h1 className="mt-3 text-4xl font-semibold">{page.title}</h1>
      <div
        className="mt-8 space-y-4 text-muted-foreground [&_a]:text-fern [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground"
        dangerouslySetInnerHTML={{ __html: page.content ?? "" }}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getInfoPage(slug).catch(() => null);
  if (!page) return { title: "Page not found" };
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}
