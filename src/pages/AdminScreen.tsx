import { useParams, useNavigate } from "react-router-dom";
import { AdminPanel } from "@medius-expense/design-system";
import AppLayout from "../components/AppLayout";
import styles from "./AdminScreen.module.css";

export default function AdminScreen() {
  const { section = "users-access", item = "" } = useParams();
  const navigate = useNavigate();

  function handleNavigate(sectionKey: string, itemKey?: string) {
    navigate(`/admin/${sectionKey}${itemKey ? `/${itemKey}` : ""}`);
  }

  return (
    <AppLayout showAdmin showMediusCard>
      <div className={styles.body}>
        <AdminPanel
          companyName="Medius AB"
          activeSection={section}
          activeItem={item}
          onNavigate={handleNavigate}
        />
        <main className={styles.content}>
          {/* Pages will be added here one by one */}
        </main>
      </div>
    </AppLayout>
  );
}
