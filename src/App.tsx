import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";
import ExpenseList from "./pages/ExpenseList";
import AdminScreen from "./pages/AdminScreen";
import AddCardFeed from "./pages/AddCardFeed";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <BrowserRouter>
    <ToastProvider>
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
        <Route path="/admin/payment/card-feeds/new" element={<AddCardFeed />} />
        <Route path="/admin/:section/:item?" element={<AdminScreen />} />
      </Routes>
    </ToastProvider>
    </BrowserRouter>
  );
}
