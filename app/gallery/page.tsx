import type { Metadata } from "next";
import { GalleryPage } from "@/componants/Gallery/GalleryPage";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("/gallery");

export default function Page() {
  return <GalleryPage />;
}
