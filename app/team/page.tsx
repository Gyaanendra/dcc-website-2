import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RouteVisual } from "@/componants/Home/RouteVisual";
import { TeamDirectory } from "@/componants/Teams/TeamDirectory";
import styles from "@/componants/Teams/Teams.module.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the people behind Dean Career Cloud.",
};

export default function TeamPage() {
  return (
    <main id="main">
      <section className={styles.hero}>
        <RouteVisual />
        <div className={styles.heroIndex}>DCC / PEOPLE / {site.year}</div>
        <div className={styles.heroContent}>
          <h1>
            THE PEOPLE
            <br />
            BEHIND THE
            <br />
            <em>TRAJECTORY.</em>
          </h1>
          <p>Different strengths. Shared direction.</p>
        </div>
        <div className={styles.heroBottom}>
          <span>THE TEAM / THE WORK / THE WAY FORWARD</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
      <TeamDirectory />
      <section className={styles.photoSection}>
        <div className={styles.photoHeading}>
          <span>02 / A MOMENT TOGETHER</span>
          <h2>
            THE WORK
            <br />
            IS <em>COLLECTIVE.</em>
          </h2>
        </div>
        <figure>
          <Image
            src="/media/dcc-badging.jpg"
            alt="Group photograph at the Dean Career Cloud badging ceremony"
            width={1170}
            height={1170}
            sizes="(max-width: 760px) 100vw, 70vw"
          />
          <figcaption>DCC / BADGING CEREMONY</figcaption>
        </figure>
      </section>
      <section className={styles.end}>
        <span>DCC / THE IDEA</span>
        <h2>
          WHAT CONNECTS
          <br />
          THE PEOPLE?
        </h2>
        <Link href="/about">
          EXPLORE THE MISSION <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
