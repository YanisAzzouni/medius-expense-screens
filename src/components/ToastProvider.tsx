import { createContext, useContext } from "react";
import { useToast, ToastContainer } from "@medius-expense/design-system";
import type { ToastItem } from "@medius-expense/design-system";

/* ─── Context ────────────────────────────────────────────────────────────── */

type ToastContextValue = {
  toast:       (item: Omit<ToastItem, "id">) => string;
  success:     (message: string, description?: string) => string;
  error:       (message: string, description?: string) => string;
  warning:     (message: string, description?: string) => string;
  information: (message: string, description?: string) => string;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * useToastContext — call this from any page or component to fire a toast.
 *
 * Example:
 *   const { success, error } = useToastContext();
 *   success("Saved", "Your changes have been saved.");
 *   error("Failed", "Something went wrong.");
 */
export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be used inside AppLayout");
  return ctx;
}

/* ─── Provider ───────────────────────────────────────────────────────────── */

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, dismiss, toast, success, error, warning, information } = useToast();

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, information }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
