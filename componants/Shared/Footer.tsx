"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, site } from "@/content/site";
import styles from "./Shared.module.css";

export function Footer() {
  const pathname = usePathname();

  // The gallery is one tall immersive stage — swap the tall editorial
  // footer for a slim baseline so the runway keeps the room.
  if (pathname === "/gallery") {
    return (
      <footer className={styles.footerCompact}>
        <span>© {new Date().getFullYear()} DEAN CAREER CLOUD</span>
        <span className={styles.footerCompactContext}>
          {site.institution} <i>/</i> {site.school}
        </span>
        <a href="#main">BACK TO TOP ↑</a>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerKicker}>THE NEXT MOVE / STARTS HERE</div>
        <h2>
          MAKE
          <br />
          <em>IT COUNT.</em>
        </h2>
        <Link className={styles.footerCta} href="/about">
          Explore DCC <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className={styles.footerGrid}>
        <div className={styles.footerIdentity}>
          <Image
            src="/media/dcc-white.png"
            alt="Dean Career Cloud"
            width={128}
            height={89}
          />
          <span>
            {site.institution}
            <br />
            {site.school}
          </span>
        </div>
        <div>
          <span className={styles.footerLabel}>EXPLORE</span>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <span className={styles.footerLabel}>CONNECT</span>
          {site.email && <a href={`mailto:${site.email}`}>Email</a>}
          {site.social.linkedin && (
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          )}
          {site.social.instagram && (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          )}
          {!site.email && !site.social.linkedin && !site.social.instagram && (
            <span className={styles.footerPending}>
              Contact details pending
            </span>
          )}
        </div>
        <div>
          <span className={styles.footerLabel}>CONTEXT</span>
          <span>Academic year {site.year}</span>
          <span>Bennett University</span>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} DEAN CAREER CLOUD</span>
        <span>BENNETT UNIVERSITY</span>
        <a href="#main">BACK TO TOP ↑</a>
      </div>
      <div className={styles.footerWordmark} aria-hidden="true">
        DCC
      </div>
    </footer>
  );
}
