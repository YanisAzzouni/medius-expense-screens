import { useParams, useNavigate } from "react-router-dom";
import { AdminPanel } from "@medius-expense/design-system";
import AppLayout from "../components/AppLayout";
import ComingSoon from "../components/ComingSoon";
import CardFeedsAdmin from "./CardFeedsAdmin";
import styles from "./AdminScreen.module.css";

export default function AdminScreen() {
  const { section = "users-access", item = "" } = useParams();
  const navigate = useNavigate();

  function handleNavigate(sectionKey: string, itemKey?: string) {
    navigate(`/admin/${sectionKey}${itemKey ? `/${itemKey}` : ""}`);
  }

  const isCardFeeds = section === "payment" && item === "card-feeds";

  return (
    <AppLayout>
      <div className={styles.body}>
        <AdminPanel
          companyName="Medius AB"
          activeSection={section}
          activeItem={item}
          onNavigate={handleNavigate}
        />
        <main className={isCardFeeds ? styles.content_flush : styles.content}>
          {isCardFeeds ? <CardFeedsAdmin /> : <ComingSoon />}
        </main>
      </div>
    </AppLayout>
  );
}
