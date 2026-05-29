import { forwardRef } from "react";
import styles from "./StatusTag.module.css";

export type StatusTagVariant =
  | "neutral"
  | "grey"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "orange";

export interface StatusTagProps {
  /** Text label displayed inside the tag. */
  label: string;
  /** Colour variant. Defaults to "neutral". */
  variant?: StatusTagVariant;
  className?: string;
}

export const StatusTag = forwardRef<HTMLDivElement, StatusTagProps>(
  function StatusTag({ label, variant = "neutral", className }, ref) {
    return (
      <div
        ref={ref}
        className={[
          styles.tag,
          styles[`variant_${variant}`],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </div>
    );
  }
);
