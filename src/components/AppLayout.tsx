import { NavBar } from "@medius-expense/design-system";
import type { NavItemKey } from "@medius-expense/design-system";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastProvider } from "./ToastProvider";
import styles from "./AppLayout.module.css";

const NAV_ROUTES: Record<NavItemKey, string> = {
  dashboard:     "/dashboard",
  expenses:      "/expenses",
  reports:       "/reports",
  requests:      "/requests",
  manager:       "/manager",
  "medius-card": "/medius-card",
  admin:         "/admin",
  accountant:    "/accountant",
};

/** Derive the active NavBar tab from the current URL. */
function activeNavFromPath(pathname: string): NavItemKey {
  if (pathname.startsWith("/admin"))        return "admin";
  if (pathname.startsWith("/expenses"))     return "expenses";
  if (pathname.startsWith("/reports"))      return "reports";
  if (pathname.startsWith("/requests"))     return "requests";
  if (pathname.startsWith("/manager"))      return "manager";
  if (pathname.startsWith("/medius-card"))  return "medius-card";
  if (pathname.startsWith("/accountant"))   return "accountant";
  return "dashboard";
}

/**
 * AppLayout — single source of truth for the top NavBar.
 *
 * Wrap every page with this component instead of placing <NavBar> directly
 * inside the page. This ensures:
 *  - NavBar is identical on every page — no per-page props needed.
 *  - Active tab stays in sync with the URL automatically.
 *  - To add or remove a tab for the whole app, change ONE line here.
 *
 * Usage:
 *   <AppLayout>
 *     <div>page content here</div>
 *   </AppLayout>
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ToastProvider>
      <div className={styles.shell}>
        <NavBar
          activeItem={activeNavFromPath(pathname)}
          onNavigate={(key) => navigate(NAV_ROUTES[key] ?? "/")}
          userInitials="YA"
          showMediusCard
          showAdmin
          showRequests
          showManager
        />
        <div className={styles.pageContent}>
          {children}
        </div>
      </div>
    </ToastProvider>
  );
}
