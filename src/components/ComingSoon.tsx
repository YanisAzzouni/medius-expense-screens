import { Icon } from "@medius-expense/design-system";
import styles from "./ComingSoon.module.css";

interface ComingSoonProps {
  /** The page/section label shown in the message. */
  title?: string;
}

/**
 * Placeholder rendered inside any admin content area that hasn't been
 * built yet. Keeps the layout intact so the NavBar and AdminPanel
 * remain fully functional during prototyping.
 */
export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <Icon name="content--inventory" size="large" />
      </span>
      <p className={styles.label}>
        {title ? `${title} — coming soon` : "This page hasn't been built yet"}
      </p>
    </div>
  );
}
