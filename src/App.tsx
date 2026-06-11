import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExpenseList from "./pages/ExpenseList";
import AdminScreen from "./pages/AdminScreen";
import PlaceholderPage from "./pages/PlaceholderPage";

/** Shared nav props — keep all pages consistent. */
const NAV = { showAdmin: true, showMediusCard: true, showRequests: true, showManager: true };

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Default ── */}
        <Route path="/" element={<Navigate to="/expenses" replace />} />

        {/* ── Top-nav pages ── */}
        <Route path="/dashboard"   element={<PlaceholderPage title="Dashboard"    {...NAV} />} />
        <Route path="/expenses"    element={<ExpenseList />} />
        <Route path="/reports"     element={<PlaceholderPage title="Reports"      {...NAV} />} />
        <Route path="/requests"    element={<PlaceholderPage title="Requests"     {...NAV} />} />
        <Route path="/manager"     element={<PlaceholderPage title="Manager"      {...NAV} />} />
        <Route path="/medius-card" element={<PlaceholderPage title="Medius Card"  {...NAV} />} />
        <Route path="/accountant"  element={<PlaceholderPage title="Accountant"   {...NAV} showAccountant />} />

        {/* ── Admin ── */}
        <Route path="/admin" element={<Navigate to="/admin/users-access/users" replace />} />
        <Route path="/admin/:section/:item?" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
