import { NavBar } from "@medius-expense/design-system";
import type { NavItemKey } from "@medius-expense/design-system";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AppLayout.module.css";

const NAV_ROUTES: Record<NavItemKey, string> = {
  dashboard:    "/dashboard",
  expenses:     "/expenses",
  reports:      "/reports",
  requests:     "/requests",
  manager:      "/manager",
  "medius-card":"/medius-card",
  admin:        "/admin",
  accountant:   "/accountant",
};

/** Derive the active NavBar tab from the current URL. */
function activeNavFromPath(pathname: string): NavItemKey {
  if (pathname.startsWith("/admin"))       return "admin";
  if (pathname.startsWith("/expenses"))    return "expenses";
  if (pathname.startsWith("/reports"))     return "reports";
  if (pathname.startsWith("/requests"))    return "requests";
  if (pathname.startsWith("/manager"))     return "manager";
  if (pathname.startsWith("/medius-card")) return "medius-card";
  if (pathname.startsWith("/accountant"))  return "accountant";
  return "dashboard";
}

interface AppLayoutProps {
  /** Page content. */
  children: React.ReactNode;
  /** Which optional NavBar tabs to show. */
  showMediusCard?: boolean;
  showAdmin?: boolean;
  showRequests?: boolean;
  showManager?: boolean;
  showAccountant?: boolean;
}

/**
 * AppLayout — single source of truth for the top NavBar.
 *
 * Wrap every page with this component instead of placing <NavBar> directly
 * inside the page. This ensures:
 *  - NavBar is never duplicated or copy-pasted between pages.
 *  - Active tab stays in sync with the URL automatically.
 *  - Adding/removing a nav tab is a one-line change in one file.
 *
 * Usage:
 *   <AppLayout showAdmin showMediusCard>
 *     <div>page content here</div>
 *   </AppLayout>
 */
export default function AppLayout({
  children,
  showMediusCard,
  showAdmin,
  showRequests,
  showManager,
  showAccountant,
}: AppLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleNavChange(key: NavItemKey) {
    navigate(NAV_ROUTES[key] ?? "/");
  }

  return (
    <div className={styles.shell}>
      <NavBar
        activeItem={activeNavFromPath(pathname)}
        onNavigate={handleNavChange}
        userInitials="YA"
        showMediusCard={showMediusCard}
        showAdmin={showAdmin}
        showRequests={showRequests}
        showManager={showManager}
        showAccountant={showAccountant}
      />
      <div className={styles.pageContent}>
        {children}
      </div>
    </div>
  );
}
