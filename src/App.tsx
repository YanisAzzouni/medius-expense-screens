import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExpenseList from "./pages/ExpenseList";
import AdminScreen from "./pages/AdminScreen";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Default ── */}
        <Route path="/" element={<Navigate to="/expenses" replace />} />

        {/* ── Top-nav pages ── */}
        <Route path="/dashboard"   element={<PlaceholderPage title="Dashboard"   />} />
        <Route path="/expenses"    element={<ExpenseList />} />
        <Route path="/reports"     element={<PlaceholderPage title="Reports"     />} />
        <Route path="/requests"    element={<PlaceholderPage title="Requests"    />} />
        <Route path="/manager"     element={<PlaceholderPage title="Manager"     />} />
        <Route path="/medius-card" element={<PlaceholderPage title="Medius Card" />} />
        <Route path="/accountant"  element={<PlaceholderPage title="Accountant"  />} />

        {/* ── Admin ── */}
        <Route path="/admin" element={<Navigate to="/admin/users-access/users" replace />} />
        <Route path="/admin/:section/:item?" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
