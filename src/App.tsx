import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExpenseList from "./pages/ExpenseList";
import AdminScreen from "./pages/AdminScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/expenses" replace />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/admin" element={<Navigate to="/admin/users-access/users" replace />} />
        <Route path="/admin/:section/:item?" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
