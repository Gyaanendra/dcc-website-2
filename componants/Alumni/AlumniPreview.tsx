import Link from "next/link";
import { alumniProfiles } from "@/content/records";
import styles from "./Alumni.module.css";

export function AlumniPreview() {
  return (
    <section className={styles.preview} aria-labelledby="alumni-preview-title">
      <div className={styles.previewMeta}>
        <span>02 / ALUMNI</span>
        <span>THE NETWORK CONTINUES</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewStatement}>
          <span className={styles.previewAsterisk} aria-hidden="true">
            ✳
          </span>
          <h2 id="alumni-preview-title">
            WHERE
            <br />
            NEXT<span>?</span>
          </h2>
        </div>
        <div className={styles.previewSide}>
          <p>
            There is no single way forward. A living index of paths beyond
            campus.
          </p>
          <Link className={styles.previewLink} href="/alumni">
            EXPLORE ALUMNI <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className={styles.previewTicker}>
        {alumniProfiles.slice(0, 3).map((person, index) => (
          <div key={person.id}>
            <span>0{index + 1}</span>
            <strong>{person.direction}</strong>
            <span>{person.cohort}</span>
          </div>
        ))}
      </div>
      <p className={styles.sampleNotice}>
        DEMONSTRATION PROFILES ONLY / NOT ACTUAL DCC ALUMNI
      </p>
    </section>
  );
}
