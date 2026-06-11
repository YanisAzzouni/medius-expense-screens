import { useState } from "react";
import ExpenseList from "./pages/ExpenseList";
import AdminScreen from "./pages/AdminScreen";

type Screen = "expenses" | "admin";

export default function App() {
  const [screen, setScreen] = useState<Screen>("admin");

  if (screen === "admin") return <AdminScreen onNavigateAway={() => setScreen("expenses")} />;
  return <ExpenseList onNavigateAway={() => setScreen("admin")} />;
}
