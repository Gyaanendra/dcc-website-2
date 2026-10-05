import type { Metadata } from "next";
import { GalleryPage } from "@/componants/Gallery/GalleryPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Gallery — ${site.shortName} // ${site.name}`,
  description:
    "An immersive horizontal nature gallery and visual atlas exploring natural forms, geometry, and momentum at Dean Career Cloud.",
};

export default function Page() {
  return <GalleryPage />;
}
