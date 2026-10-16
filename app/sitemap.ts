import type { MetadataRoute } from "next";
import { type SeoPath, seoRoutes } from "@/content/seo";
import { getOfficialSiteUrl, isIndexable } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getOfficialSiteUrl();
  if (!siteUrl) return [];

  return (Object.keys(seoRoutes) as SeoPath[])
    .filter(isIndexable)
    .map((path) => {
      const route = seoRoutes[path];
      return {
        url: new URL(path, siteUrl).toString(),
        ...(route.lastModified ? { lastModified: route.lastModified } : {}),
      };
    });
}
