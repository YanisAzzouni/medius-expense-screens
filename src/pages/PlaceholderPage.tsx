import AppLayout from "../components/AppLayout";
import ComingSoon from "../components/ComingSoon";
import styles from "./PlaceholderPage.module.css";

interface PlaceholderPageProps {
  title: string;
  showMediusCard?: boolean;
  showAdmin?: boolean;
  showRequests?: boolean;
  showManager?: boolean;
  showAccountant?: boolean;
}

/**
 * Generic page used for nav destinations that haven't been built yet.
 * Keeps the full layout (NavBar + background) intact with a ComingSoon state.
 */
export default function PlaceholderPage({
  title,
  showMediusCard,
  showAdmin,
  showRequests,
  showManager,
  showAccountant,
}: PlaceholderPageProps) {
  return (
    <AppLayout
      showMediusCard={showMediusCard}
      showAdmin={showAdmin}
      showRequests={showRequests}
      showManager={showManager}
      showAccountant={showAccountant}
    >
      <div className={styles.content}>
        <ComingSoon title={title} />
      </div>
    </AppLayout>
  );
}
