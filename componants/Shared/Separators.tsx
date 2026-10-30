import type React from "react";
import styles from "./Separators.module.css";

export const SEPARATORS = {
  COUNTER: " of ",
  AFFILIATION: ", ",
  TAG: ": ",
} as const;

export function Counter({
  current,
  total,
  className,
}: {
  current: React.ReactNode;
  total: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={className}>
      {current}
      {SEPARATORS.COUNTER}
      <span className={styles.muted}>{total}</span>
    </span>
  );
}

export function Affiliation({
  institution,
  school,
  className,
}: {
  institution: React.ReactNode;
  school: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={className}>
      {institution}
      {SEPARATORS.AFFILIATION}
      {school}
    </span>
  );
}

export function SectionLabel({
  index,
  name,
  className,
}: {
  index: React.ReactNode;
  name: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={className}>
      <span className={styles.muted}>{index}</span>
      <span className={styles.wideSpace}> </span>
      <span>{name}</span>
    </span>
  );
}

export function Tag({
  category,
  label,
  className,
}: {
  category: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
}) {
  if (label === undefined || label === null) {
    return <span className={className}>{category}</span>;
  }
  return (
    <span className={className}>
      {category}
      {SEPARATORS.TAG}
      {label}
    </span>
  );
}

export const CategoryTag = Tag;
