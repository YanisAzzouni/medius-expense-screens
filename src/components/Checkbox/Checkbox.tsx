import { forwardRef, useEffect, useId, useRef } from "react";
import type { ChangeEvent } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxState = "default" | "danger" | "disabled";

export interface CheckboxProps {
  /** Checked, unchecked, or indeterminate (−). */
  checked?: boolean | "indeterminate";
  /** Called when the user toggles the checkbox. */
  onChange?: (checked: boolean) => void;
  /** Visible label rendered to the right. */
  label?: string;
  /** Visual / validation state. */
  state?: CheckboxState;
  /** Convenience alias for state="disabled". */
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      checked = false,
      onChange,
      label,
      state = "default",
      disabled: disabledProp,
      id: idProp,
      name,
      value,
      className,
    },
    ref
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const isDisabled = disabledProp || state === "disabled";
    const isDanger   = state === "danger";
    const isChecked  = checked === true;
    const isIndet    = checked === "indeterminate";
    const isFilled   = isChecked || isIndet;

    /* Sync .indeterminate DOM property — there's no HTML attribute for it */
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = isIndet;
      }
    }, [isIndet]);

    /* Forward the external ref AND our internal ref */
    const setRef = (el: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    /* Derive a single box-variant class */
    const boxVariant = isDisabled
      ? isFilled ? styles.box_checked_disabled : styles.box_unchecked_disabled
      : isDanger
      ? isFilled ? styles.box_checked_danger   : styles.box_unchecked_danger
      : isFilled ? styles.box_checked           : styles.box_unchecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        htmlFor={id}
        className={[
          styles.wrapper,
          isDisabled ? styles.wrapper_disabled : "",
          isDanger   ? styles.wrapper_danger   : "",
          className  ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Native input — visually hidden but wires up all a11y + form semantics */}
        <input
          ref={setRef}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          aria-checked={isIndet ? "mixed" : isChecked}
          onChange={handleChange}
          className={styles.input}
        />

        {/* Custom visual box */}
        <span className={`${styles.box} ${boxVariant}`} aria-hidden="true">
          {/* Check mark — white in normal states, chalk-400 when disabled */}
          {isChecked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Indeterminate dash — same colour logic */}
          {isIndet && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <rect width="10" height="2" rx="1" fill="currentColor" />
            </svg>
          )}
        </span>

        {/* Label text */}
        {label && (
          <span className={styles.labelText}>{label}</span>
        )}
      </label>
    );
  }
);
