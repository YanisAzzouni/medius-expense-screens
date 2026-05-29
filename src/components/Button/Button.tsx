import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

/** Visual weight of the button. */
export type ButtonHierarchy = "primary" | "secondary" | "tertiary";

/** Colour intent of the button. */
export type ButtonAppearance = "default" | "danger" | "ai";

/** Physical size of the button. */
export type ButtonSize = "default" | "small";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual hierarchy: filled (primary), outlined (secondary), or ghost (tertiary).
   * @default "primary"
   */
  hierarchy?: ButtonHierarchy;
  /**
   * Colour intent of the action.
   * @default "default"
   */
  appearance?: ButtonAppearance;
  /**
   * Physical size of the button.
   * @default "default"
   */
  size?: ButtonSize;
  /**
   * Optional leading icon. Pass any ReactNode — typically an `<Icon />` from the design system.
   * Ignored when `iconOnly` is true (pass the icon as `children` instead).
   */
  icon?: ReactNode;
  /**
   * Renders a square icon-only button. Pass the icon as `children`.
   * Label text is visually hidden.
   */
  iconOnly?: boolean;
  /**
   * Shows a spinner and blocks interaction. The button is not disabled in the DOM
   * so it remains focusable and keyboard-accessible.
   */
  loading?: boolean;
}

/** Spinner SVG used in the loading state. */
function Spinner({ light }: { light: boolean }) {
  const track = light ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.12)";
  const head = light ? "#ffffff" : "var(--color-chalk-700)";
  return (
    <span className={styles.spinner} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke={track} strokeWidth="2" />
        <path
          d="M8 2a6 6 0 0 1 6 6"
          stroke={head}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * Core action button for the Medius Expense design system.
 *
 * @example
 * // Primary action
 * <Button hierarchy="primary" appearance="default">Save</Button>
 *
 * @example
 * // Destructive secondary with icon
 * <Button hierarchy="secondary" appearance="danger" icon={<Icon name="actions--delete" />}>
 *   Delete
 * </Button>
 *
 * @example
 * // Icon-only ghost button
 * <Button hierarchy="tertiary" iconOnly>
 *   <Icon name="navigation--close" />
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      hierarchy = "primary",
      appearance = "default",
      size = "default",
      icon,
      iconOnly = false,
      loading = false,
      disabled,
      children,
      className,
      type = "button",
      ...rest
    },
    ref
  ) {
    const variantKey = `${hierarchy}_${appearance}` as const;
    const variantClass = styles[variantKey] ?? "";

    const lightSpinner =
      hierarchy === "primary" ||
      (hierarchy === "secondary" && appearance === "ai");

    const cls = [
      styles.button,
      variantClass,
      size === "small" ? styles.sizeSmall : styles.sizeDefault,
      iconOnly ? styles.iconOnly : "",
      loading ? styles.loading : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={cls}
        disabled={disabled}
        aria-busy={loading || undefined}
        aria-disabled={loading || disabled}
        {...rest}
      >
        {loading ? (
          <>
            <Spinner light={lightSpinner} />
            {!iconOnly && <span>{children}</span>}
          </>
        ) : (
          <>
            {icon && !iconOnly && (
              <span className={styles.icon} aria-hidden="true">
                {icon}
              </span>
            )}
            {iconOnly ? (
              <span className={styles.icon}>{children}</span>
            ) : (
              <span>{children}</span>
            )}
          </>
        )}
      </button>
    );
  }
);
