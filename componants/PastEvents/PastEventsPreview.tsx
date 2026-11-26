import Image from "next/image";
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
          <Image
            className={styles.previewBackdrop}
            src="/media/dcc-event-reel-poster.png"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 70vw"
            loading="lazy"
          />
          {pastEvents.slice(0, 4).map((event, index) => (
            <Link
              className={styles.previewCard}
              href="/past-events"
              key={event.id}
            >
              <span>0{index + 1} / 04 &nbsp;—&nbsp; SAMPLE EVENT</span>
              <strong>{event.title}</strong>
              <span className={styles.previewCardFooter}>
                {event.category} /{" "}
                {new Date(`${event.date}T12:00:00Z`).getUTCFullYear()}
                <span aria-hidden="true">↗</span>
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
        Background is a still from the DCC video, not an image of these sample
        events.
      </span>
    </section>
  );
}
