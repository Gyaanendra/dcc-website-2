import Image from "next/image";
import Link from "next/link";
import { Affiliation } from "@/componants/Shared/Separators";
import { navigation, site } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bgArtwork} aria-hidden="true">
        <Image
          src="/Firefly.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.bgImage}
          priority={false}
        />
        <div className={styles.bgScrim} />
      </div>

      <div className={styles.navigationRow}>
        <div className={styles.identity}>
          <strong>
            DEAN
            <br />
            CAREER CLOUD
          </strong>
          <span>
            <Affiliation institution={site.institution} school={site.school} />
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
        <span>BUILT FOR WHAT COMES NEXT, {site.year}</span>
        <a href="#main">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
