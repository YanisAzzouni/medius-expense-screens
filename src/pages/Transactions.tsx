import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DataTable,
  PageHeader,
  Button,
  Icon,
  TextInput,
  ExpenseModal,
} from "@medius-expense/design-system";
import type {
  ColumnDef,
  RowData,
  StatusCellData,
  AmountCellData,
  ActionsCellData,
  ExpenseModalInitialData,
  ExpenseTag,
} from "@medius-expense/design-system";
import {
  CARD_TRANSACTIONS,
  CARD_EXP_STATE_VARIANT,
  type CardTransaction,
} from "../data";
import { useMockFetch } from "../hooks/useMockFetch";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import styles from "./Transactions.module.css";

/* ─── Columns ───────────────────────────────────────────────────────────── */

const COLUMNS: ColumnDef[] = [
  { key: "typeIcon", type: "icon",    title: ""            },
  { key: "typeName", type: "text",    title: "Type"        },
  { key: "merchant", type: "text",    title: "Merchant name", size: "L" },
  { key: "source",   type: "text",    title: "Source",       sortable: true },
  { key: "employee", type: "text",    title: "Employee"    },
  { key: "txDate",   type: "date",    title: "tx. date",     sortable: true },
  { key: "amount",   type: "amount",  title: "Amount",       sortable: true },
  { key: "txState",  type: "status",  title: "Tx. state",    sortable: true },
  { key: "expState", type: "status",  title: "Exp. state",   sortable: true },
  { key: "actions",  type: "actions", title: ""            },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function getModalTags(source: string): ExpenseTag[] {
  if (source === "BNPP - France") {
    return [{ label: "Card statement", icon: <Icon name="actions--credit-card" size="small" />, color: "neutral" }];
  }
  if (source === "Medius card") {
    return [{ label: "Medius card", icon: <Icon name="actions--medius-card" size="small" />, color: "neutral", iconColor: "var(--color-olive-500)" }];
  }
  return [];
}

function makeInitialData(tx: CardTransaction): ExpenseModalInitialData {
  const isCompanyCard = tx.source === "Medius card" || tx.source.startsWith("BNPP");
  return {
    title:             tx.merchant,
    date:              tx.txDateIso,
    amount:            tx.amount,
    currency:          "eur",
    category:          tx.category,
    paymentInstrument: isCompanyCard ? "company-card" : "",
  };
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function Transactions() {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useMockFetch(() => CARD_TRANSACTIONS, []);

  const [sortKey, setSortKey]         = useState<string | undefined>(undefined);
  const [sortDir, setSortDir]         = useState<"asc" | "desc">("asc");
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch]           = useState("");

  const transactions = useMemo(() => data ?? [], [data]);
  const selectedTx = transactions.find((t) => t.id === selectedId) ?? null;

  function handleSort(key: string, dir: "asc" | "desc") {
    setSortKey(key);
    setSortDir(dir);
  }

  // Escape closes the modal
  useEffect(() => {
    if (!selectedTx) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedTx]);

  const rows: RowData[] = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = term
      ? transactions.filter(
          (tx) =>
            tx.merchant.toLowerCase().includes(term) ||
            tx.employee.toLowerCase().includes(term) ||
            tx.source.toLowerCase().includes(term),
        )
      : transactions;

    return filtered.map((tx) => ({
      id:       tx.id,
      typeIcon: tx.type === "payment" ? "actions--transaction" : "actions--transaction-fees",
      typeName: tx.type === "payment" ? "Payment" : "Fee",
      merchant: tx.merchant,
      source:   tx.source,
      employee: tx.employee,
      txDate:   tx.txDate,
      amount:   { amount: tx.amount, currency: "EUR" } satisfies AmountCellData,
      txState:  { label: "Validated", variant: "green" } satisfies StatusCellData,
      expState: tx.expState !== null
        ? { label: tx.expState, variant: CARD_EXP_STATE_VARIANT[tx.expState] } satisfies StatusCellData
        : { label: "No transaction" } satisfies StatusCellData,
      actions: tx.type === "payment"
        ? {
            icon:    "actions--see-invoice",
            label:   "See invoice",
            onClick: () => setSelectedId(tx.id),
          } satisfies ActionsCellData
        : {
            icon:     "actions--see-invoice",
            label:    "See invoice",
            onClick:  () => {},
            disabled: true,
          } satisfies ActionsCellData,
    }));
  }, [transactions, search]);

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: "Admin", onClick: () => navigate("/admin") },
          { label: "Transactions" },
        ]}
      />

      <div className={styles.body}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error ?? undefined} onRetry={refetch} />
        ) : (
          <>
            {/* ── Toolbar ── */}
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <TextInput
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
                />
                <Button hierarchy="secondary">
                  <span className={styles.filtersBtn}>
                    Filters
                    <Icon name="navigation--expand-more" size="small" />
                  </span>
                </Button>
              </div>
              <Button
                hierarchy="secondary"
                icon={<Icon name="content--save-alt" size="small" />}
              >
                Export
              </Button>
            </div>

            {/* ── Table ── */}
            <div className={styles.tableWrap}>
              <DataTable
                columns={COLUMNS}
                rows={rows}
                selectable
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                sortKey={sortKey}
                sortDirection={sortDir}
                onSort={handleSort}
              />
            </div>
          </>
        )}
      </div>

      {/* ── Expense modal overlay ── */}
      {selectedTx && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedId(null)}
        >
          <div
            className={styles.modalWrapper}
            role="dialog"
            aria-modal="true"
            aria-label={`Transaction details — ${selectedTx.merchant}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExpenseModal
              title={selectedTx.merchant}
              tags={getModalTags(selectedTx.source)}
              statusLabel={selectedTx.expState ?? undefined}
              statusVariant={selectedTx.expState ? CARD_EXP_STATE_VARIANT[selectedTx.expState] : undefined}
              initialData={makeInitialData(selectedTx)}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
