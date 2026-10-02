import styles from "./Home.module.css";

export function RouteVisual() {
  return (
    <div className={styles.routeVisual} aria-hidden="true">
      <svg
        role="presentation"
        viewBox="0 0 680 720"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <title>Career route motif</title>
        <path
          className={styles.routeGrid}
          d="M0 120H680M0 240H680M0 360H680M0 480H680M0 600H680M110 0V720M230 0V720M350 0V720M470 0V720M590 0V720"
        />
        <path className={styles.routeDim} d="M80 615H235V455H390V300H565V75" />
        <path className={styles.routePath} d="M80 615H235V455H390V300H565V75" />
        <circle cx="80" cy="615" r="5" className={styles.routeNode} />
        <circle cx="235" cy="455" r="5" className={styles.routeNode} />
        <circle cx="390" cy="300" r="5" className={styles.routeNode} />
        <circle cx="565" cy="75" r="7" className={styles.routeEnd} />
        <path d="M390 300H492V443H610" className={styles.routeBranch} />
        <circle cx="610" cy="443" r="4" className={styles.routeNode} />
      </svg>
      <div className={`${styles.routeLabel} ${styles.routeLabelOne}`}>
        START / 00
      </div>
      <div className={`${styles.routeLabel} ${styles.routeLabelTwo}`}>
        PREPARE / 01
      </div>
      <div className={`${styles.routeLabel} ${styles.routeLabelThree}`}>
        CONNECT / 02
      </div>
      <div className={`${styles.routeLabel} ${styles.routeLabelFour}`}>
        NEXT / ∞
      </div>
    </div>
  );
}
