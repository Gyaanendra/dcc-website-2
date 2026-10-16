import type { MetadataRoute } from "next";
import { type SeoPath, seoRoutes } from "@/content/seo";
import { getOfficialSiteUrl, isIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getOfficialSiteUrl();
  const isProduction =
    process.env.NODE_ENV === "production" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
  const hasPublishedRoute = (Object.keys(seoRoutes) as SeoPath[]).some(
    isIndexable,
  );

  return {
    // Crawlers must be allowed to read the per-page noindex directive.
    rules: { userAgent: "*", allow: "/" },
    ...(isProduction && siteUrl && hasPublishedRoute
      ? { sitemap: new URL("/sitemap.xml", siteUrl).toString() }
      : {}),
  };
}
