import type { Metadata } from "next";
import styles from "@/componants/PastEvents/PastEvents.module.css";
import { pastEvents } from "@/content/records";

export const metadata: Metadata = {
  title: "Past Events",
  description:
    "A demonstration archive layout for Dean Career Cloud events. Entries are sample content, not verified events.",
};

export default function PastEventsPage() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="events-title">
        <div className={styles.heroTop}>
          <span>DCC / THE ARCHIVE</span>
          <span>PEOPLE / IDEAS / MOMENTUM</span>
        </div>
        <h1 id="events-title">
          PAST
          <br />
          <em>EVENTS.</em>
        </h1>
        <div className={styles.heroBottom}>
          <p>
            A place for the conversations, workshops, and connections that shape
            what comes next.
          </p>
          <a href="#archive">EXPLORE THE ARCHIVE ↓</a>
        </div>
      </section>
      <section
        id="archive"
        className={styles.archive}
        aria-labelledby="archive-title"
      >
        <div className={styles.archiveTop}>
          <span>THE ARCHIVE / DEMONSTRATION</span>
          <span>{pastEvents.length} SAMPLE ENTRIES</span>
        </div>
        <div className={styles.archiveIntro}>
          <h2 id="archive-title">
            A LOOK
            <br />
            BACK.
          </h2>
          <p>
            Sample data only. These titles, dates, and descriptions do not
            represent verified DCC events.
          </p>
        </div>
        <div className={styles.eventList}>
          {pastEvents.map((event, index) => (
            <article className={styles.event} key={event.id}>
              <span className={styles.eventIndex}>0{index + 1}</span>
              <time className={styles.eventDate} dateTime={event.date}>
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(`${event.date}T12:00:00Z`))}
              </time>
              <div className={styles.eventBody}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <span className={styles.eventSample}>
                  SAMPLE EVENT — NOT A DCC RECORD
                </span>
              </div>
              <span className={styles.eventCategory}>{event.category}</span>
              <span className={styles.eventArrow} aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
