import { Button, Icon } from "@medius-expense/design-system";
import styles from "./StateLayouts.module.css";

interface ErrorStateProps {
  message?: string;
  description?: string;
  onRetry?: () => void;
}

/**
 * ErrorState — centered error display with optional retry action.
 * Fills whatever container it's placed in.
 *
 * Usage:
 *   if (error) return <ErrorState />;
 *   if (error) return <ErrorState message="Failed to load users" onRetry={refetch} />;
 */
export default function ErrorState({
  message = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.container}>
      <span className={styles.errorIcon}>
        <Icon name="alert--error-outline" size="large" />
      </span>
      <p className={styles.label}>{message}</p>
      <p className={styles.description}>{description}</p>
      {onRetry && (
        <Button hierarchy="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
