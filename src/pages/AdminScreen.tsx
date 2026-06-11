import { useState } from "react";
import {
  NavBar,
  AdminPanel,
} from "@medius-expense/design-system";
import type {
  NavItemKey,
} from "@medius-expense/design-system";
import styles from "./AdminScreen.module.css";

interface AdminScreenProps {
  onNavigateAway?: () => void;
}

export default function AdminScreen({ onNavigateAway }: AdminScreenProps) {
  const [activeNav, setActiveNav] = useState<NavItemKey>("admin");
  const [activeSection, setActiveSection] = useState("users-access");
  const [activeItem, setActiveItem] = useState("users");

  function handleNavChange(key: NavItemKey) {
    setActiveNav(key);
    if (key !== "admin") onNavigateAway?.();
  }

  function handleNavigate(sectionKey: string, itemKey?: string) {
    setActiveSection(sectionKey);
    setActiveItem(itemKey ?? "");
  }

  return (
    <div className={styles.page}>
      <NavBar
        activeItem={activeNav}
        onNavigate={handleNavChange}
        userInitials="YA"
        showAdmin
      />

      <div className={styles.body}>
        <AdminPanel
          companyName="Medius AB"
          activeSection={activeSection}
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />

        <main className={styles.content}>
          {/* Pages will be added here one by one */}
        </main>
      </div>
    </div>
  );
}
