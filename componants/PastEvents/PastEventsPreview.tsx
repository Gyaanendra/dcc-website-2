import Link from "next/link";
import { pastEvents } from "@/content/records";
import styles from "./PastEvents.module.css";

export function PastEventsPreview() {
  return (
    <section className={styles.preview} aria-labelledby="events-preview-title">
      <div className={styles.previewTop}>
        <span>03 / PAST EVENTS</span>
        <span>DCC / ARCHIVE</span>
      </div>
      <h2 id="events-preview-title">
        MOMENTS
        <br />
        THAT <em>MOVE.</em>
      </h2>
      <div className={styles.previewBottom}>
        <div className={styles.previewCards}>
          {pastEvents.slice(0, 2).map((event) => (
            <Link
              className={styles.previewCard}
              href="/past-events"
              key={event.id}
            >
              <span>SAMPLE EVENT / {event.category}</span>
              <strong>{event.title}</strong>
              <span>
                {new Date(`${event.date}T12:00:00Z`).getUTCFullYear()}
              </span>
            </Link>
          ))}
        </div>
        <div className={styles.previewAside}>
          <p>
            Workshops, conversations, and shared moments can turn a possibility
            into a plan.
          </p>
          <Link href="/past-events" className={styles.previewLink}>
            Explore the archive <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <span className={styles.previewNotice}>
        Demonstration content only — these are not records of actual DCC events.
      </span>
    </section>
  );
}
