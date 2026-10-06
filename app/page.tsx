import Link from "next/link";
import { AlumniPreview } from "@/componants/Alumni/AlumniPreview";
import styles from "@/componants/Home/Home.module.css";
import { Impact } from "@/componants/Home/Impact";
import { LandingHero } from "@/componants/Home/LandingHero";
import { VerticalStack } from "@/componants/Home/VerticalStack";
import { PastEventsPreview } from "@/componants/PastEvents/PastEventsPreview";
import { initiatives, teamMembers } from "@/content/records";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main id="main">
      <LandingHero />
      <Impact />
      <AlumniPreview />
      <PastEventsPreview />
      <VerticalStack />

      {initiatives.length > 0 && (
        <section className={styles.initiatives}>
          <div className={styles.sectionIndex}>DCC / INITIATIVES</div>
          <h2>
            WORK IN
            <br />
            <em>MOTION.</em>
          </h2>
          <div className={styles.initiativeList}>
            {initiatives.map((item, index) => (
              <article key={item.id}>
                <span>
                  0{index + 1} / {item.category}
                </span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Explore ${item.title}`}
                  >
                    ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.teamPreview}>
        <div className={styles.sectionIndex}>05 / PEOPLE</div>
        <div className={styles.teamPreviewInner}>
          <h2>
            THE PEOPLE
            <br />
            BEHIND THE
            <br />
            <em>TRAJECTORY.</em>
          </h2>
          <div>
            <p>
              {teamMembers.length
                ? `${teamMembers.length} people, one shared direction.`
                : "An evolving team, working across the DCC verticals."}
            </p>
            <Link className={styles.textLink} href="/team">
              MEET THE TEAM <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className={styles.teamPreviewMark} aria-hidden="true">
          DCC / PEOPLE / {site.year}
        </div>
      </section>
    </main>
  );
}
