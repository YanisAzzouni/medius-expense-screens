import { useNavigate } from "react-router-dom";
import { AdminPanel } from "@medius-expense/design-system";
import AppLayout from "./AppLayout";
import styles from "./AdminLayout.module.css";

/**
 * AdminLayout — shared admin shell.
 *
 * Owns the <AdminPanel> sidebar + the content wrapper that every admin page
 * repeats. Wrap admin pages in this instead of hand-rolling the AdminPanel +
 * handleNavigate + content <main> on each page.
 *
 * Usage:
 *   <AdminLayout activeSection="payment" activeItem="card-feeds" flush>
 *     <PageContent />
 *   </AdminLayout>
 */
export default function AdminLayout({
  activeSection,
  activeItem,
  flush = false,
  children,
}: {
  activeSection?: string;
  activeItem?: string;
  /** Remove the default content padding (page handles its own layout). */
  flush?: boolean;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  function handleNavigate(sectionKey: string, itemKey?: string) {
    navigate(`/admin/${sectionKey}${itemKey ? `/${itemKey}` : ""}`);
  }

  return (
    <AppLayout>
      <div className={styles.body}>
        <AdminPanel
          companyName="Medius AB"
          activeSection={activeSection}
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />
        <main className={flush ? styles.content_flush : styles.content}>
          {children}
        </main>
      </div>
    </AppLayout>
  );
}
