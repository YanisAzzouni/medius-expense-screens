import { useId } from "react";
import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  /** Text or node shown inside the tooltip bubble. */
  content: ReactNode;
  /**
   * Which side of the trigger the bubble appears on.
   * The beak always points back toward the trigger.
   * Defaults to "top".
   */
  placement?: TooltipPlacement;
  /** The element that triggers the tooltip on hover / focus. */
  children: ReactNode;
  className?: string;
}

export function Tooltip({
  content,
  placement = "top",
  children,
  className,
}: TooltipProps) {
  const id = useId();

  return (
    <span className={`${styles.wrapper} ${className ?? ""}`}>
      {/*
       * The inner span picks up :focus-within from the wrapper so keyboard
       * users see the tooltip when they tab into the trigger.
       * aria-describedby wires the tooltip text to the trigger for screen readers.
       */}
      <span className={styles.trigger} aria-describedby={id}>
        {children}
      </span>

      <span
        id={id}
        role="tooltip"
        className={[styles.bubble, styles[`placement_${placement}`]]
          .filter(Boolean)
          .join(" ")}
      >
        {content}
      </span>
    </span>
  );
}
