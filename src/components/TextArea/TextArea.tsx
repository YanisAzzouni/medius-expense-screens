import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./TextArea.module.css";

export type TextAreaState =
  | "default"
  | "danger"
  | "success"
  | "read-only"
  | "highlighted"
  | "disabled";

export type TextAreaHintType = "neutral" | "danger" | "success";

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled" | "readOnly"> {
  /** Visible label rendered to the left of the textarea. */
  label?: string;
  /** Appends an asterisk to the label and sets aria-required. */
  required?: boolean;
  /** Shows a help icon next to the label. */
  helpIcon?: boolean;
  /** Validation / behavioural state. Defaults to "default". */
  state?: TextAreaState;
  /** Helper / error text rendered below the textarea. */
  hint?: string;
  /** Colour variant of the hint message. Defaults to "neutral". */
  hintType?: TextAreaHintType;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      required = false,
      helpIcon = false,
      state = "default",
      hint,
      hintType = "neutral",
      className,
      id: idProp,
      rows = 3,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const hintId = `${id}-hint`;

    const isDisabled = state === "disabled";
    const isReadOnly = state === "read-only";
    const stateClass = styles[`state_${state.replace(/-/g, "_")}`] ?? "";

    return (
      <div className={`${styles.field} ${className ?? ""}`}>
        {label && (
          <div className={styles.labelColumn}>
            <label htmlFor={id} className={styles.label}>
              {label}
              {required && (
                <span className={styles.required} aria-hidden="true">
                  {" *"}
                </span>
              )}
            </label>
            {helpIcon && (
              <button
                type="button"
                className={styles.helpButton}
                aria-label="Help"
                tabIndex={-1}
              >
                <Icon name="actions--help-outline" size="small" />
              </button>
            )}
          </div>
        )}

        <div className={styles.inputColumn}>
          <div className={`${styles.textareaWrapper} ${stateClass}`}>
            <textarea
              ref={ref}
              id={id}
              className={styles.textarea}
              disabled={isDisabled}
              readOnly={isReadOnly}
              required={required}
              rows={rows}
              aria-invalid={state === "danger" ? true : undefined}
              aria-describedby={hint ? hintId : undefined}
              {...rest}
            />
          </div>

          {hint && (
            <p
              id={hintId}
              className={`${styles.hint} ${styles[`hint_${hintType}`] ?? ""}`}
            >
              {hint}
            </p>
          )}
        </div>
      </div>
    );
  }
);
