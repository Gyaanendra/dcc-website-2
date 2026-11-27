import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="main" className={styles.page} data-not-found-page>
      <div className={styles.topbar}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Dean Career Cloud home"
        >
          <Image
            src="/media/dcc-black.png"
            alt="DCC Logo"
            width={220}
            height={84}
            style={{
              height: "clamp(54px, 5vw, 84px)",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>
        <div className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>STATUS 404</span>
          <span aria-hidden="true">•</span>
          <span>ROUTE SWEPT AWAY</span>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.copy} aria-labelledby="not-found-heading">
          <h1 id="not-found-heading">F*ck!</h1>
          <p className={styles.lead}>
            It looks like mom has been cleaning our website again
            <br className={styles.desktopBreak} /> so we can&apos;t find this
            page at the moment.
          </p>
          <p className={styles.note}>
            If you would be so kind as to go back until we find it. Thanks!
          </p>
          <Link
            className={styles.goBack}
            href="/"
            aria-label="Go back to the homepage"
          >
            <span aria-hidden="true">→</span>
            <span>Go back</span>
          </Link>
        </section>

        <div
          className={styles.scene}
          role="img"
          aria-label="404: a cheerful DCC character emerging from the zero"
        >
          <Image
            className={styles.cleaner}
            src="/images/404/vintage-cleaner.png"
            alt=""
            width={1024}
            height={1536}
            sizes="13vw"
            aria-hidden="true"
          />
          <div className={styles.digits} aria-hidden="true">
            <span className={styles.digit}>4</span>
            <span className={styles.zeroStage}>
              <span className={styles.zeroBack}>0</span>
              <span className={styles.portalShadow} />
              <span className={styles.characterRig}>
                <Image
                  className={styles.characterBody}
                  src="/images/404/dcc-character-cutout.png"
                  alt=""
                  width={1254}
                  height={1254}
                  priority
                  sizes="(max-width: 900px) 65vw, 35vw"
                />
                <Image
                  className={styles.characterHead}
                  src="/images/404/dcc-character-cutout.png"
                  alt=""
                  width={1254}
                  height={1254}
                  sizes="(max-width: 900px) 65vw, 35vw"
                />
              </span>
              <span className={styles.zeroFront}>0</span>
            </span>
            <span className={styles.digit}>4</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomRule} aria-hidden="true" />
    </main>
  );
}
