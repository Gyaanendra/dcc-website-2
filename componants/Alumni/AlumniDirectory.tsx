"use client";

import { useState } from "react";
import { alumniProfiles } from "@/content/records";
import styles from "./Alumni.module.css";

export function AlumniDirectory() {
  const [selected, setSelected] = useState(0);
  const person = alumniProfiles[selected];

  return (
    <section
      className={styles.directory}
      aria-labelledby="alumni-directory-title"
    >
      <div className={styles.directoryHeader}>
        <div>
          <span className={styles.kicker}>DCC / ALUMNI INDEX</span>
          <h2 id="alumni-directory-title">
            DIFFERENT
            <br />
            <em>DIRECTIONS.</em>
          </h2>
        </div>
        <p>
          Every route has its own shape. Select a name to explore an
          illustrative profile.
        </p>
      </div>
      <div className={styles.directoryGrid}>
        <div className={styles.names}>
          {alumniProfiles.map((alumnus, index) => (
            <button
              aria-pressed={selected === index}
              className={`${styles.nameRow} ${selected === index ? styles.nameRowActive : ""}`}
              key={alumnus.id}
              onClick={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
              type="button"
            >
              <span className={styles.rowNumber}>0{index + 1}</span>
              <span className={styles.rowName}>{alumnus.name}</span>
              <span className={styles.rowYear}>{alumnus.cohort}</span>
              <span className={styles.rowArrow} aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        <div className={styles.profile} aria-live="polite" aria-atomic="true">
          <div className={styles.profileTop}>
            <span>PROFILE / 0{selected + 1}</span>
            <span>ILLUSTRATIVE</span>
          </div>
          <div className={styles.profileGlyph} aria-hidden="true">
            {person.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div className={styles.profileBottom}>
            <div>
              <span>PATH</span>
              <strong>{person.direction}</strong>
            </div>
            <div>
              <span>FIELD</span>
              <strong>{person.discipline}</strong>
            </div>
            <div>
              <span>BASE</span>
              <strong>{person.location}</strong>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.directoryNote}>
        All names and paths shown here are fictional demonstration content. No
        actual DCC alumni are represented.
      </p>
    </section>
  );
}
