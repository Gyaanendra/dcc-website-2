import Image from "next/image";
import Link from "next/link";
import styles from "@/componants/Home/Home.module.css";
import { Impact } from "@/componants/Home/Impact";
import { LandingHero } from "@/componants/Home/LandingHero";
import { Manifesto } from "@/componants/Home/Manifesto";
import { VerticalStack } from "@/componants/Home/VerticalStack";
import { gallery, initiatives, teamMembers } from "@/content/records";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main id="main">
      <LandingHero />

      <div id="thinking">
        <Manifesto />
      </div>

      <section className={styles.what}>
        <div className={styles.sectionIndex}>02 / WHAT DCC DOES</div>
        <div className={styles.whatContent}>
          <h2>
            FROM
            <br />
            QUESTION
            <br />
            <em>TO DIRECTION.</em>
          </h2>
          <div className={styles.whatSide}>
            <p>
              A career is shaped by more than one application. DCC brings the
              moving parts into view, helping students think earlier and move
              with purpose.
            </p>
            <Link href="/about" className={styles.textLink}>
              THE IDEA BEHIND DCC <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className={styles.outcomeGrid}>
          {[
            ["01", "PREPARE", "Build readiness before the deadline."],
            ["02", "CONNECT", "Meet people who expand the picture."],
            ["03", "EXPLORE", "See more than a single route."],
            ["04", "MOVE", "Turn information into action."],
          ].map(([index, title, copy]) => (
            <div key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <VerticalStack />
      <Impact />

      {initiatives.length > 0 && (
        <section className={styles.initiatives}>
          <div className={styles.sectionIndex}>05 / INITIATIVES</div>
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

      <section className={styles.mediaSection}>
        <div className={styles.mediaHeading}>
          <div className={styles.sectionIndex}>05 / LIFE IN MOTION</div>
          <h2>
            NOT JUST
            <br />
            <em>ON PAPER.</em>
          </h2>
          <p>A glimpse at the people and moments behind DCC.</p>
        </div>
        <div className={styles.mediaGrid}>
          {gallery.map((item) => (
            <figure key={item.id} className={styles.photoFrame}>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 760px) 100vw, 40vw"
              />
              <figcaption className={styles.mediaCaption}>
                <span>{item.category}</span>
                <span>{item.title.toUpperCase()}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.teamPreview}>
        <div className={styles.sectionIndex}>06 / PEOPLE</div>
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
