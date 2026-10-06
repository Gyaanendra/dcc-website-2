import { type CSSProperties, Fragment } from "react";

interface SplitTextHeaderProps {
  text: string;
  /** Continue the stagger count across multiple lines. */
  startIndex?: number;
  /** Render the final word in muted gray. */
  dimLastWord?: boolean;
  className?: string;
}

/**
 * Splits a headline into words wrapped in overflow-hidden masks; each word
 * slides up with a staggered CSS reveal (animation type 4). Pure CSS — no
 * client JS, no layout measurement.
 */
export default function SplitTextHeader({
  text,
  startIndex = 0,
  dimLastWord = false,
  className = "",
}: SplitTextHeaderProps) {
  const words = text.split(" ");
  const wordOccurrences = new Map<string, number>();

  return (
    <span className={className}>
      {words.map((word, index) => {
        const occurrence = wordOccurrences.get(word) ?? 0;
        wordOccurrences.set(word, occurrence + 1);
        return (
          <Fragment key={`${word}-${occurrence}`}>
            <span className="split-word">
              <span
                className={
                  dimLastWord && index === words.length - 1
                    ? "text-[#c7c7c7]"
                    : undefined
                }
                style={{ "--word-index": startIndex + index } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {/* Inter-word space must live outside the overflow-hidden mask,
                otherwise it collapses and the words fuse together. */}
            {index < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
