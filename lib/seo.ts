import type { Metadata } from "next";
import { type SeoPath, seoRoutes } from "@/content/seo";
import { site } from "@/content/site";

export function getOfficialSiteUrl(): URL | null {
  const raw = process.env.SITE_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.port ||
      url.hostname === "localhost" ||
      url.hostname === "vercel.app" ||
      url.hostname.endsWith(".vercel.app")
    )
      return null;
    return url;
  } catch {
    return null;
  }
}

export function isIndexable(path: SeoPath): boolean {
  const route = seoRoutes[path];
  const reviewComplete =
    route.status === "approved" &&
    Boolean(
      route.reviewedBy.trim() &&
        /^\d{4}-\d{2}-\d{2}$/.test(route.reviewedAt) &&
        /^\d{4}-\d{2}-\d{2}$/.test(route.lastModified),
    );
  return (
    process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") &&
    getOfficialSiteUrl() !== null &&
    reviewComplete
  );
}

export function metadataFor(path: SeoPath): Metadata {
  const route = seoRoutes[path];
  const indexable = isIndexable(path);
  const siteUrl = indexable ? getOfficialSiteUrl() : null;
  const pageUrl = siteUrl ? new URL(path, siteUrl).toString() : undefined;
  const title =
    path === "/" ? `${site.name} — ${site.institution}` : route.title;
  const description =
    !indexable && route.draftDescription
      ? route.draftDescription
      : route.description;

  return {
    title,
    description,
    robots: { index: indexable, follow: true },
    ...(pageUrl
      ? {
          alternates: { canonical: pageUrl },
          openGraph: {
            type: "website" as const,
            siteName: site.name,
            title,
            description,
            url: pageUrl,
            locale: "en_IN",
          },
          twitter: {
            card: "summary" as const,
            title,
            description,
          },
        }
      : {}),
  };
}
