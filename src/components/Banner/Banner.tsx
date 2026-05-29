import { forwardRef } from "react";
import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./Banner.module.css";

export type BannerType = "information" | "warning" | "error" | "success";

export interface BannerProps {
  /** Visual style / severity of the banner. */
  type?: BannerType;
  /** Optional bold title line rendered above the body. */
  title?: string;
  /** Body text or any React content. */
  children?: ReactNode;
  /** Whether the leading type icon is shown. Defaults to true. */
  showIcon?: boolean;
  /** Whether a dismiss (×) button is rendered. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Label for the primary action button. If omitted the button is hidden. */
  action1Label?: string;
  /** Called when the primary action button is clicked. */
  onAction1?: () => void;
  /** Label for the secondary action button. If omitted the button is hidden. */
  action2Label?: string;
  /** Called when the secondary action button is clicked. */
  onAction2?: () => void;
  className?: string;
}

const TYPE_ICON: Record<BannerType, string> = {
  information: "actions--info",
  warning:     "alert--warning-filled",
  error:       "alert--error-filled",
  success:     "alerts--check-circle",
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    type = "information",
    title,
    children,
    showIcon = true,
    dismissible = false,
    onDismiss,
    action1Label,
    onAction1,
    action2Label,
    onAction2,
    className,
  },
  ref
) {
  const hasActions = !!(action1Label || action2Label);

  return (
    <div
      ref={ref}
      role="alert"
      className={[styles.banner, styles[`type_${type}`], className ?? ""].filter(Boolean).join(" ")}
    >
      {/* Left accent bar */}
      <div className={styles.dashWrapper}>
        <div className={styles.dash} />
      </div>

      {/* Main content row */}
      <div className={styles.content}>
        {/* Leading icon */}
        {showIcon && (
          <div className={styles.iconWrapper} aria-hidden="true">
            <Icon name={TYPE_ICON[type] as never} size="large" />
          </div>
        )}

        {/* Body */}
        <div className={styles.body}>
          {title && <p className={styles.title}>{title}</p>}
          {children && <p className={styles.message}>{children}</p>}

          {hasActions && (
            <div className={styles.actions}>
              {action1Label && (
                <button type="button" className={styles.actionBtn} onClick={onAction1}>
                  {action1Label}
                </button>
              )}
              {action2Label && (
                <button type="button" className={styles.actionBtn} onClick={onAction2}>
                  {action2Label}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dismiss */}
        {dismissible && (
          <button
            type="button"
            className={styles.dismissBtn}
            aria-label="Dismiss"
            onClick={onDismiss}
          >
            <Icon name="navigation--close" size="small" />
          </button>
        )}
      </div>
    </div>
  );
});
