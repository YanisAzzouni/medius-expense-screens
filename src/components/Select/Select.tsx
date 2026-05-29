import {
  forwardRef,
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./Select.module.css";

export interface SelectOption {
  label: string;
  value: string;
  /** Optional icon displayed to the left of the label inside the option row. */
  icon?: ReactNode;
}

export type SelectState = "default" | "read-only" | "highlighted" | "disabled";
export type SelectHintType = "neutral" | "danger" | "success";

export interface SelectProps {
  /** Visible label rendered to the left of the trigger. */
  label?: string;
  /** Appends an asterisk to the label. */
  required?: boolean;
  /** Shows a help icon next to the label. */
  helpIcon?: boolean;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Currently selected value (controlled). */
  value?: string;
  /** Called when the user selects an option. */
  onChange?: (value: string) => void;
  /** List of selectable options. */
  options: SelectOption[];
  /** Behavioural state. Defaults to "default". */
  state?: SelectState;
  /** Icon displayed inside the leading edge of the trigger button. */
  leadingIcon?: ReactNode;
  /** Helper text rendered below the trigger. */
  hint?: string;
  /** Colour variant of the hint message. */
  hintType?: SelectHintType;
  className?: string;
  id?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    label,
    required = false,
    helpIcon = false,
    placeholder = "Select…",
    value,
    onChange,
    options,
    state = "default",
    leadingIcon,
    hint,
    hintType = "neutral",
    className,
    id: idProp,
  },
  ref
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const listId = `${id}-listbox`;
  const hintId = `${id}-hint`;

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isDisabled = state === "disabled";
  const isReadOnly = state === "read-only";
  const isInteractive = !isDisabled && !isReadOnly;

  const selectedOption = options.find((o) => o.value === value);
  // When the selected option carries its own icon, use that in the trigger.
  // Falls back to the static leadingIcon prop when no selection or the option has no icon.
  const triggerIcon = selectedOption?.icon ?? leadingIcon;
  const stateClass = styles[`state_${state.replace(/-/g, "_")}`] ?? "";

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const handleToggle = useCallback(() => {
    if (isInteractive) setOpen((o) => !o);
  }, [isInteractive]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange?.(optionValue);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onChange]
  );

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleToggle(); return; }
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) { e.preventDefault(); setOpen(true); }
  };

  const handleOptionKeyDown = (e: KeyboardEvent<HTMLLIElement>, optionValue: string) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelect(optionValue); }
    if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
  };

  return (
    <div ref={ref} className={`${styles.field} ${className ?? ""}`}>
      {label && (
        <div className={styles.labelColumn}>
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">{" *"}</span>
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
        <div ref={wrapperRef} className={styles.selectWrapper}>
          <button
            ref={triggerRef}
            id={id}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-disabled={isDisabled}
            aria-describedby={hint ? hintId : undefined}
            disabled={isDisabled}
            className={[
              styles.trigger,
              stateClass,
              open ? styles.triggerOpen : "",
            ].filter(Boolean).join(" ")}
            onClick={handleToggle}
            onKeyDown={handleTriggerKeyDown}
          >
            {triggerIcon && (
              <span className={styles.leadingIcon} aria-hidden="true">
                {triggerIcon}
              </span>
            )}

            <span className={selectedOption ? styles.triggerValue : styles.triggerPlaceholder}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>

            <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>

          {open && (
            <ul id={listId} role="listbox" aria-label={label} className={styles.dropdown}>
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    className={[styles.option, isSelected ? styles.optionSelected : ""].filter(Boolean).join(" ")}
                    onClick={() => handleSelect(option.value)}
                    onMouseDown={(e) => e.preventDefault()}
                    onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                  >
                    {option.icon && (
                      <span className={styles.optionIcon} aria-hidden="true">{option.icon}</span>
                    )}
                    <span className={styles.optionLabel}>{option.label}</span>
                    {isSelected && (
                      <span className={styles.checkmark} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {hint && (
          <p id={hintId} className={`${styles.hint} ${styles[`hint_${hintType}`] ?? ""}`}>
            {hint}
          </p>
        )}
      </div>
    </div>
  );
});
