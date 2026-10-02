import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/componants/About/About.module.css";
import { RouteVisual } from "@/componants/Home/RouteVisual";
import { verticals } from "@/content/verticals";

export const metadata: Metadata = {
  title: "About",
  description: "Explore the idea and structure behind Dean Career Cloud.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <section className={styles.hero}>
        <RouteVisual />
        <div className={styles.heroIndex}>DCC / ABOUT / 01</div>
        <div className={styles.heroContent}>
          <h1>
            CAREERS ARE
            <br />
            BUILT <em>BEFORE</em>
            <br />
            THE DEADLINE.
          </h1>
          <p>
            Dean Career Cloud is a way to see more of the path ahead—and prepare
            to make something of it.
          </p>
        </div>
        <div className={styles.heroBottom}>
          <span>MISSION / SYSTEM / PEOPLE</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
      <section className={styles.mission}>
        <div className={styles.index}>01 / THE IDEA</div>
        <div>
          <h2>
            THE NEXT MOVE
            <br />
            SHOULDN&apos;T BE
            <br />
            <em>A GUESS.</em>
          </h2>
          <p>
            A career can take many routes. Preparation, guidance, exposure, and
            useful information make those choices clearer. DCC brings these
            ideas into one connected system.
          </p>
        </div>
      </section>
      <section className={styles.routeSection}>
        <div className={styles.index}>02 / HOW IT CONNECTS</div>
        <div className={styles.routeHeader}>
          <h2>
            ONE SYSTEM.
            <br />
            MANY ROUTES.
          </h2>
          <p>
            The process is not a straight line. Each step gives the next one
            more context.
          </p>
        </div>
        <div className={styles.routeSteps}>
          {[
            ["01", "LEARN", "See the possibilities."],
            ["02", "PREPARE", "Build the foundations."],
            ["03", "CONNECT", "Find new perspectives."],
            ["04", "MOVE", "Act with direction."],
          ].map(([number, title, copy]) => (
            <div key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <i aria-hidden="true">↗</i>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.verticalSection}>
        <div className={styles.index}>03 / THE VERTICALS</div>
        <h2>
          FOCUSED WORK.
          <br />
          <em>CONNECTED THINKING.</em>
        </h2>
        <div className={styles.verticalList}>
          {verticals.map((vertical, index) => (
            <div key={vertical.id}>
              <span>0{index + 1}</span>
              <h3>{vertical.title}</h3>
              <p>{vertical.description}</p>
              <span aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.endSection}>
        <span>DCC / THE PEOPLE</span>
        <h2>
          A SYSTEM IS ONLY
          <br />
          AS GOOD AS THE
          <br />
          <em>PEOPLE BEHIND IT.</em>
        </h2>
        <Link href="/team">
          MEET THE TEAM <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
