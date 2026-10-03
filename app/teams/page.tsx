import type { Metadata } from "next";
import TeamsPage from "@/componants/Teams/TeamsPage";

export const metadata: Metadata = {
  title: "DCC Club — Team // Dean Career Cloud",
  description:
    "Meet the people building ideas, exploring technology, and creating opportunities at DCC — Dean Career Cloud, Bennett University.",
};

export default function Page() {
  return <TeamsPage />;
}
