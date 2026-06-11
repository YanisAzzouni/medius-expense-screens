import AppLayout from "../components/AppLayout";
import ComingSoon from "../components/ComingSoon";
import styles from "./PlaceholderPage.module.css";

/**
 * Generic page for nav destinations that haven't been built yet.
 * Keeps the full layout intact with a ComingSoon placeholder.
 * Replace this route in App.tsx with the real page when it's ready.
 */
export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <AppLayout>
      <div className={styles.content}>
        <ComingSoon title={title} />
      </div>
    </AppLayout>
  );
}
