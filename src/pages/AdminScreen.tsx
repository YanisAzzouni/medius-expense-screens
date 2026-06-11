import { useParams, useNavigate } from "react-router-dom";
import {
  NavBar,
  AdminPanel,
} from "@medius-expense/design-system";
import type { NavItemKey } from "@medius-expense/design-system";
import styles from "./AdminScreen.module.css";

export default function AdminScreen() {
  const { section = "users-access", item = "" } = useParams();
  const navigate = useNavigate();

  function handleNavChange(key: NavItemKey) {
    if (key === "expenses") navigate("/expenses");
    else if (key === "admin") navigate("/admin/users-access/users");
  }

  function handleNavigate(sectionKey: string, itemKey?: string) {
    navigate(`/admin/${sectionKey}${itemKey ? `/${itemKey}` : ""}`);
  }

  return (
    <div className={styles.page}>
      <NavBar
        activeItem="admin"
        onNavigate={handleNavChange}
        userInitials="YA"
        showMediusCard
        showAdmin
      />

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
    </div>
  );
}
