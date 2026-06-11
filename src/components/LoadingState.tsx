import { Spinner } from "@medius-expense/design-system";
import styles from "./StateLayouts.module.css";

interface LoadingStateProps {
  message?: string;
}

/**
 * LoadingState — centered spinner for async data fetching.
 * Fills whatever container it's placed in.
 *
 * Usage:
 *   if (loading) return <LoadingState />;
 *   if (loading) return <LoadingState message="Loading users…" />;
 */
export default function LoadingState({ message = "Loading…" }: LoadingStateProps) {
  return (
    <div className={styles.container}>
      <Spinner size="large" label={message} />
      <p className={styles.label}>{message}</p>
    </div>
  );
}
