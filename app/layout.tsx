import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import { Footer } from "@/componants/Shared/Footer";
import { Header } from "@/componants/Shared/Header";
import { SiteLoader } from "@/componants/Shared/SiteLoader";
import { site } from "@/content/site";
import { getOfficialSiteUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...(getOfficialSiteUrl() ? { metadataBase: getOfficialSiteUrl() } : {}),
  title: {
    default: `${site.name} — ${site.institution}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Dean Career Cloud (DCC) is the student-led career preparation, placement readiness, and industry exposure collective at Bennett University (SCSET), led by President Saurabh Singh, Vice President Sneh Gupta, and General Secretary Akshat Rastogi, alongside 10 specialized teams including Technical, Placement Turnaround, Corporate & Alumni Relations, Training & Preparation, Operations, Media, Design, Research & Higher Studies, Strategic Intelligence, and PR & Outreach.",
  keywords: [
    "Dean Career Cloud",
    "DCC",
    "Bennett University",
    "SCSET",
    "Saurabh Singh",
    "Sneh Gupta",
    "Akshat Rastogi",
    "Gyanendra Prakash",
    "Sajal Yadav",
    "Shivam Rai",
    "Shrish Raghuwanshi",
    "Satveek Gupta",
    "Shubham Kulshreshtha",
    "Aditya Agrawal",
    "Technical Team",
    "Placement Turnaround",
    "Corporate & Alumni Relations",
    "Training & Preparation",
  ],
  openGraph: {
    title: `${site.name} — ${site.institution}`,
    description:
      "Student-led career preparation, placement readiness, and industry exposure collective at Bennett University (SCSET).",
    siteName: site.name,
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
