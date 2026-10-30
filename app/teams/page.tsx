import type { Metadata } from "next";
import TeamsPage from "@/componants/Teams/TeamsPage";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("/teams");

export default function Page() {
  return <TeamsPage />;
}
