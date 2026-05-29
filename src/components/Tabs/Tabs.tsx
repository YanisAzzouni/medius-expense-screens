import { createContext, useContext, useRef, useId } from "react";
import type { ReactNode, KeyboardEvent } from "react";
import { Icon } from "../../icons/Icon";
import styles from "./Tabs.module.css";

/* ─── Context ─── */
interface TabsContextValue {
  value: string;
  onChange: (v: string) => void;
}

const TabsContext = createContext<TabsContextValue>({
  value: "",
  onChange: () => {},
});

/* ───────────────────────────────────────────
   Tabs — container / tablist
─────────────────────────────────────────── */
export interface TabsProps {
  /** The value of the currently active tab. */
  value: string;
  /** Called when the user selects a different tab. */
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, onChange, children, className }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  /* Arrow-key navigation — moves focus AND activates the tab */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])'
      ) ?? []
    );
    const idx = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = tabs[(idx + 1) % tabs.length];
      next.focus();
      onChange(next.dataset.value ?? "");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
      prev.focus();
      onChange(prev.dataset.value ?? "");
    } else if (e.key === "Home") {
      e.preventDefault();
      tabs[0].focus();
      onChange(tabs[0].dataset.value ?? "");
    } else if (e.key === "End") {
      e.preventDefault();
      tabs[tabs.length - 1].focus();
      onChange(tabs[tabs.length - 1].dataset.value ?? "");
    }
  };

  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div
        ref={listRef}
        role="tablist"
        className={[styles.tablist, className ?? ""].filter(Boolean).join(" ")}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* ───────────────────────────────────────────
   Tab — individual item
─────────────────────────────────────────── */
export interface TabProps {
  /** Unique value that identifies this tab. */
  value: string;
  /** Visible text label. */
  label: string;
  /** Optional leading icon. */
  icon?: ReactNode;
  /**
   * Optional counter badge shown to the right of the label.
   * Pass a number or short string.
   */
  badge?: string | number;
  /**
   * When true a close (×) button is rendered alongside the tab.
   * The close button is a sibling element (not nested) to keep HTML valid.
   */
  closable?: boolean;
  /** Called when the close button is clicked. */
  onClose?: () => void;
  disabled?: boolean;
}

export function Tab({
  value,
  label,
  icon,
  badge,
  closable,
  onClose,
  disabled,
}: TabProps) {
  const { value: activeValue, onChange } = useContext(TabsContext);
  const isActive = activeValue === value;
  const id = useId();

  return (
    /*
     * role="presentation" wrapper lets us place the close button as a
     * sibling of role="tab" without nesting interactive elements.
     */
    <div className={styles.tabItem} role="presentation">
      <button
        id={id}
        role="tab"
        aria-selected={isActive}
        disabled={disabled}
        /* Roving tabindex: only active tab is in the natural tab order */
        tabIndex={isActive ? 0 : -1}
        /* data-value is read by the arrow-key handler in Tabs */
        data-value={value}
        className={[
          styles.tab,
          isActive ? styles.tab_active : "",
          disabled ? styles.tab_disabled : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => !disabled && onChange(value)}
      >
        {icon && (
          <span className={styles.tabIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span className={styles.tabLabel}>{label}</span>
        {badge !== undefined && (
          <span className={styles.tabBadge}>{badge}</span>
        )}
      </button>

      {closable && (
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          aria-label={`Close ${label}`}
          className={[
            styles.tabClose,
            isActive ? styles.tabClose_active : "",
            disabled ? styles.tabClose_disabled : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={onClose}
        >
          <Icon name="navigation--close" size="small" />
        </button>
      )}
    </div>
  );
}
