import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/componants/Alumni/Alumni.module.css";
import { AlumniDirectory } from "@/componants/Alumni/AlumniDirectory";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "An illustrative alumni directory layout for Dean Career Cloud. Profiles are fictional placeholders.",
};

export default function AlumniPage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="alumni-title">
        <div className={styles.heroTop}>
          <span>DCC / BEYOND CAMPUS</span>
          <span>FICTIONAL PROFILES / DEMO</span>
        </div>
        <div className={styles.heroMain}>
          <span className={styles.heroOverline}>A CONTINUING STORY OF</span>
          <h1 id="alumni-title">
            ALUMNI<span className={styles.heroPeriod}>.</span>
          </h1>
          <div className={styles.heroUnderline} aria-hidden="true">
            <span />
          </div>
        </div>
        <div className={styles.heroBottom}>
          <p>
            Paths leave campus.
            <br />
            Connections don’t.
          </p>
          <span>
            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
          </span>
        </div>
        <span className={styles.heroWatermark} aria-hidden="true">
          A
        </span>
      </section>
      <AlumniDirectory />
      <section
        className={styles.closing}
        aria-labelledby="alumni-closing-title"
      >
        <span className={styles.kicker}>A NETWORK, NOT A FINISH LINE</span>
        <h2 id="alumni-closing-title">
          THE STORY
          <br />
          KEEPS <em>MOVING.</em>
        </h2>
        <p>
          Real alumni stories will appear here once profiles and permissions are
          approved.
        </p>
        <Link href="/" className={styles.closingLink}>
          BACK TO DCC <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
