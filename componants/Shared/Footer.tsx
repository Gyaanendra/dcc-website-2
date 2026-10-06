import Link from "next/link";
import { navigation, site } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topline}>
        <span>DCC / FROM HERE</span>
        <span>THE NEXT MOVE IS YOURS</span>
      </div>

      <div className={styles.mainStatement}>
        <div className={styles.statementCopy}>
          <span>THE PATH ISN&apos;T A STRAIGHT LINE.</span>
          <p>Keep exploring. Keep asking better questions. Keep moving.</p>
        </div>
        <h2>
          WHERE
          <br />
          TO <em>NEXT?</em>
        </h2>
        <Link
          className={styles.action}
          href="/about"
          aria-label="Explore Dean Career Cloud"
        >
          <span>EXPLORE DCC</span>
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path
              d="M8 39 39 8M15 8h24v24"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>

      <div className={styles.navigationRow}>
        <div className={styles.identity}>
          <strong>
            DEAN
            <br />
            CAREER CLOUD
          </strong>
          <span>
            {site.institution} / {site.school}
          </span>
        </div>
        <nav aria-label="Footer navigation" className={styles.navigation}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottomline}>
        <span>© {new Date().getFullYear()} DEAN CAREER CLOUD</span>
        <span>BUILT FOR WHAT COMES NEXT / {site.year}</span>
        <a href="#main">BACK TO TOP ↑</a>
      </div>
      <div className={styles.ghostMark} aria-hidden="true">
        DCC
      </div>
    </footer>
  );
}
