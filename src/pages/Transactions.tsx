import { useState } from "react";
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
import styles from "./Transactions.module.css";

/* ─── Mock data ─────────────────────────────────────────────────────────── */

type TxType   = "payment" | "fee";
type ExpState = "To review" | "To submit" | "Approved";

interface Transaction {
  id: string;
  type: TxType;
  merchant: string;
  source: string;
  employee: string;
  txDate: string;
  txDateIso: string;
  amount: string;
  expState: ExpState | null; // null = fee row (no linked expense)
  category: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: "1", type: "payment", merchant: "Pet Paradise",     source: "BNPP - France", employee: "Ava Thompson",    txDate: "Feb 22, 2026", txDateIso: "2026-02-22", amount: "450.75", expState: "To review", category: "misc"           },
  { id: "2", type: "payment", merchant: "Gourmet Bistro",   source: "BNPP - France", employee: "Michael Brown",   txDate: "Jan 15, 2026", txDateIso: "2026-01-15", amount: "675.20", expState: "To review", category: "meals"          },
  { id: "3", type: "payment", merchant: "Tech Haven",       source: "BNPP - France", employee: "Emily Johnson",   txDate: "Jun 18, 2026", txDateIso: "2026-06-18", amount: "720.30", expState: "To review", category: "equipment"      },
  { id: "4", type: "fee",     merchant: "Bookworm's Nook",  source: "Medius card",   employee: "Sophia Davis",    txDate: "May 12, 2026", txDateIso: "2026-05-12", amount: "560.45", expState: null,        category: "misc"           },
  { id: "5", type: "fee",     merchant: "Fashion Hub",      source: "Medius card",   employee: "Olivia Taylor",   txDate: "Mar 30, 2026", txDateIso: "2026-03-30", amount: "390.10", expState: null,        category: "misc"           },
  { id: "6", type: "fee",     merchant: "GreenGrocer",      source: "Medius card",   employee: "James Anderson",  txDate: "Jul 24, 2026", txDateIso: "2026-07-24", amount: "880.60", expState: null,        category: "meals"          },
  { id: "7", type: "payment", merchant: "Fitness World",    source: "Medius card",   employee: "Juliette Martin", txDate: "Sep 7, 2026",  txDateIso: "2026-09-07", amount: "820.50", expState: "Approved",  category: "misc"           },
  { id: "8", type: "payment", merchant: "Travel Explorers", source: "Import",        employee: "Liam Wilson",     txDate: "Apr 5, 2026",  txDateIso: "2026-04-05", amount: "540.90", expState: "Approved",  category: "transportation" },
  { id: "9", type: "payment", merchant: "Home Essentials",  source: "Import",        employee: "John Smith",      txDate: "Aug 31, 2026", txDateIso: "2026-08-31", amount: "610.15", expState: "Approved",  category: "misc"           },
];

const EXP_STATE_VARIANT: Record<ExpState, "grey" | "blue" | "green"> = {
  "To review": "grey",
  "To submit": "blue",
  "Approved":  "green",
};

/* ─── Columns ───────────────────────────────────────────────────────────── */

const COLUMNS: ColumnDef[] = [
  { key: "typeIcon", type: "icon",    title: ""            },
  { key: "typeName", type: "text",    title: "Type"        },
  { key: "merchant", type: "text",    title: "Merchant name" },
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

function makeInitialData(tx: Transaction): ExpenseModalInitialData {
  return {
    title:             tx.merchant,
    date:              tx.txDateIso,
    amount:            tx.amount,
    currency:          "eur",
    category:          tx.category,
    paymentInstrument: tx.source === "Medius card" ? "company-card" : tx.source.startsWith("BNPP") ? "company-card" : "",
  };
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function Transactions() {
  const navigate = useNavigate();

  const [sortKey, setSortKey]         = useState<string | undefined>(undefined);
  const [sortDir, setSortDir]         = useState<"asc" | "desc">("asc");
  const [selectedId, setSelectedId]   = useState<string | null>(null);

  const selectedTx = TRANSACTIONS.find((t) => t.id === selectedId) ?? null;

  function handleSort(key: string, dir: "asc" | "desc") {
    setSortKey(key);
    setSortDir(dir);
  }

  const rows: RowData[] = TRANSACTIONS.map((tx) => ({
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
      ? { label: tx.expState, variant: EXP_STATE_VARIANT[tx.expState] } satisfies StatusCellData
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

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: "Admin", onClick: () => navigate("/admin") },
          { label: "Transactions" },
        ]}
      />

      <div className={styles.body}>
        {/* ── Toolbar ── */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <TextInput
              placeholder="Search..."
              value=""
              onChange={() => {}}
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
            sortKey={sortKey}
            sortDirection={sortDir}
            onSort={handleSort}
          />
        </div>
      </div>

      {/* ── Expense modal overlay ── */}
      {selectedTx && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedId(null)}
        >
          <div
            className={styles.modalWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <ExpenseModal
              title={selectedTx.merchant}
              tags={getModalTags(selectedTx.source)}
              statusLabel={selectedTx.expState}
              statusVariant={EXP_STATE_VARIANT[selectedTx.expState]}
              initialData={makeInitialData(selectedTx)}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
