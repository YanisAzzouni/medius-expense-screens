import { useParams, useNavigate } from "react-router-dom";
import { AdminPanel } from "@medius-expense/design-system";
import AppLayout from "../components/AppLayout";
import ComingSoon from "../components/ComingSoon";
import styles from "./AdminScreen.module.css";

export default function AdminScreen() {
  const { section = "users-access", item = "" } = useParams();
  const navigate = useNavigate();

  function handleNavigate(sectionKey: string, itemKey?: string) {
    navigate(`/admin/${sectionKey}${itemKey ? `/${itemKey}` : ""}`);
  }

  return (
    <AppLayout>
      <div className={styles.body}>
        <AdminPanel
          companyName="Medius AB"
          activeSection={section}
          activeItem={item}
          onNavigate={handleNavigate}
        />
        <main className={styles.content}>
          <ComingSoon />
        </main>
      </div>
    </AppLayout>
  );
}
