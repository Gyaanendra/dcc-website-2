"use client";

import Image from "next/image";
import { useState } from "react";
import { teamMembers } from "@/content/records";
import { verticals } from "@/content/verticals";
import type { VerticalId } from "@/types/content";
import styles from "./Teams.module.css";

type Filter = "all" | VerticalId;

export function TeamDirectory() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sorted = [...teamMembers].sort((a, b) => a.order - b.order);
  const represented = new Set(sorted.map((member) => member.vertical));
  const filters = verticals.filter((vertical) => represented.has(vertical.id));
  const filtered =
    filter === "all"
      ? sorted
      : sorted.filter((member) => member.vertical === filter);
  const active =
    filtered.find((member) => member.id === activeId) ?? filtered[0];

  return (
    <section className={styles.directory} aria-label="DCC team directory">
      <div className={styles.directoryTop}>
        <span>01 / THE ROSTER</span>
        <span>
          {sorted.length
            ? `${sorted.length.toString().padStart(2, "0")} PEOPLE`
            : "ROSTER AWAITING APPROVAL"}
        </span>
      </div>
      {sorted.length ? (
        <>
          <fieldset className={styles.filters}>
            <legend className={styles.filterLegend}>
              Filter team by vertical
            </legend>
            <button
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => {
                setFilter("all");
                setActiveId(null);
                setExpandedId(null);
              }}
            >
              ALL <span>{sorted.length}</span>
            </button>
            {filters.map((vertical) => (
              <button
                key={vertical.id}
                type="button"
                aria-pressed={filter === vertical.id}
                onClick={() => {
                  setFilter(vertical.id);
                  setActiveId(null);
                  setExpandedId(null);
                }}
              >
                {vertical.shortTitle.toUpperCase()}{" "}
                <span>
                  {
                    sorted.filter((member) => member.vertical === vertical.id)
                      .length
                  }
                </span>
              </button>
            ))}
          </fieldset>
          <div className={styles.rosterLayout}>
            <div className={styles.roster}>
              {filtered.map((member, index) => (
                <article
                  key={member.id}
                  className={styles.member}
                  onMouseEnter={() => setActiveId(member.id)}
                  onFocus={() => setActiveId(member.id)}
                >
                  <button
                    type="button"
                    className={styles.memberButton}
                    aria-expanded={expandedId === member.id}
                    onClick={() =>
                      setExpandedId(expandedId === member.id ? null : member.id)
                    }
                  >
                    <span className={styles.memberIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.memberName}>{member.name}</span>
                    <span className={styles.memberRole}>
                      {member.role}
                      <small>
                        {
                          verticals.find((item) => item.id === member.vertical)
                            ?.title
                        }
                      </small>
                    </span>
                    <span className={styles.memberArrow} aria-hidden="true">
                      {expandedId === member.id ? "−" : "+"}
                    </span>
                  </button>
                  <div className={styles.mobilePortrait}>
                    <Image
                      src={member.portrait}
                      alt={member.portraitAlt}
                      width={300}
                      height={400}
                      sizes="(max-width: 680px) 55vw, 300px"
                    />
                  </div>
                  {expandedId === member.id && (
                    <div className={styles.memberDetails}>
                      <p>{member.bio || "Profile details pending approval."}</p>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LINKEDIN ↗
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
            {active && (
              <div className={styles.preview}>
                <div className={styles.previewFrame}>
                  <Image
                    src={active.portrait}
                    alt={active.portraitAlt}
                    fill
                    sizes="(max-width: 1000px) 30vw, 28vw"
                  />
                </div>
                <span>
                  {active.name.toUpperCase()} / {active.role.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyLine}>
            <span>00 / 00</span>
            <span>CONTENT INTAKE</span>
          </div>
          <h2>
            THE PEOPLE
            <br />
            ARE THE <em>POINT.</em>
          </h2>
          <p>
            The approved roster and portraits will appear here. The directory is
            ready for them.
          </p>
        </div>
      )}
    </section>
  );
}
