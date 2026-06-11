import { useState } from "react";
import {
  DataTable,
  Button,
  TextInput,
  Banner,
  Icon,
  Select,
} from "@medius-expense/design-system";
import type {
  ColumnDef,
  RowData,
  SelectOption,
} from "@medius-expense/design-system";
import AppLayout from "../components/AppLayout";
import styles from "./ExpenseList.module.css";
import {
  EXPENSES,
  EXPENSE_STATUS_META,
  CATEGORY_ICON,
  getReportLabel,
  formatAmount,
} from "../data/expenses";
import receiptPlaceholder from "../assets/receipt-placeholder.svg";
import type { Expense, ExpenseStatus } from "../data/expenses";

const noop = () => {};

// ── Columns ──────────────────────────────────────────────────────────────────

const COLUMNS: ColumnDef[] = [
  { key: "alerts",       title: "",        type: "alerts" },
  { key: "thumbnail",    title: "",        type: "thumbnail" },
  { key: "expenseTitle", title: "Title",   type: "expense-title", sortable: true },
  { key: "category",     title: "Cat.",    type: "icon",      sortable: true },
  { key: "report",       title: "Report",  type: "text-link", sortable: true },
  { key: "date",         title: "Date",    type: "date",      sortable: true },
  { key: "amount",       title: "Amount",  type: "amount",    sortable: true },
  { key: "actions",      title: "Actions", type: "actions" },
  { key: "status",       title: "Status",  type: "status",    sortable: true },
];

// ── Rows derived from the mock database ──────────────────────────────────────

/** Map an Expense record to the shape DataTable expects for each row. */
function expenseToRow(e: (typeof EXPENSES)[number]): RowData {
  const { label, variant } = EXPENSE_STATUS_META[e.status];
  const dateLabel = new Date(e.date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
  return {
    id: e.id,
    alerts:       e.alerts,
    thumbnail:    { src: e.receiptImage ?? receiptPlaceholder, alt: e.receiptImage ? `${e.title} receipt` : "No receipt" },
    expenseTitle: { title: e.title, attributes: e.attributes },
    category:     CATEGORY_ICON[e.category],
    report:       { text: getReportLabel(e.reportId), onClick: noop },
    date:         dateLabel,
    amount: {
      amount:    formatAmount(e.amount),
      currency:  e.currency,
      amount2:   e.reimbursementAmount  ? formatAmount(e.reimbursementAmount)  : undefined,
      currency2: e.reimbursementCurrency ?? undefined,
    },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label, variant },
  };
}

// ── Sorting ───────────────────────────────────────────────────────────────────

/** Defines a meaningful workflow order for status sorting. */
const STATUS_ORDER: Record<ExpenseStatus, number> = {
  "draft":     0,
  "to-review": 1,
  "to-submit": 2,
  "submitted": 3,
  "approved":  4,
  "exported":  5,
  "rejected":  6,
};

/** Returns a comparable primitive for a given column key. */
function sortValue(e: Expense, key: string): string | number {
  switch (key) {
    case "expenseTitle": return e.title.toLowerCase();
    case "category":     return e.category;
    case "report":       return getReportLabel(e.reportId).toLowerCase();
    case "date":         return e.date;           // ISO → lexicographic order is correct
    case "amount":       return e.amount;
    case "status":       return STATUS_ORDER[e.status];
    default:             return "";
  }
}

const ROWS_PER_PAGE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
];

const TOTAL_RESULTS = EXPENSES.length;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ExpenseList() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchValue, setSearchValue] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [activeView, setActiveView] = useState<"list" | "card">("list");

  const perPage = Number(rowsPerPage);
  const totalPages = Math.ceil(TOTAL_RESULTS / perPage);

  // Sort then paginate — all derived from the raw EXPENSES array
  const sortedRows: RowData[] = [...EXPENSES]
    .sort((a, b) => {
      const va = sortValue(a, sortKey);
      const vb = sortValue(b, sortKey);
      if (va < vb) return sortDirection === "asc" ? -1 : 1;
      if (va > vb) return sortDirection === "asc" ? 1 : -1;
      return 0;
    })
    .map(expenseToRow);

  const visibleRows = sortedRows.slice((currentPage - 1) * perPage, currentPage * perPage);

  const pages: (number | null)[] = (() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, null, totalPages];
    if (currentPage >= totalPages - 2) return [1, null, totalPages - 2, totalPages - 1, totalPages];
    return [1, null, currentPage, null, totalPages];
  })();

  return (
    <AppLayout>
      <div className={styles.content}>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>My expenses</h1>
          <Button icon={<Icon name="content--add" size="small" />} onClick={noop}>
            Add
          </Button>
        </div>

        {/* Banner */}
        {showBanner && (
          <Banner
            type="information"
            title="Detached title"
            dismissible
            onDismiss={() => setShowBanner(false)}
          >
            This banner is used to convey information or suggest an action to the user.
          </Banner>
        )}

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <div className={styles.searchWrapper}>
              <TextInput
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Button hierarchy="secondary" onClick={noop}
              icon={<Icon name="navigation--expand-more" size="small" />}>
              Filters
            </Button>
          </div>

          {/* View toggles — Button with iconOnly prop */}
          <div className={styles.viewToggle}>
            <Button
              hierarchy={activeView === "list" ? "secondary" : "tertiary"}
              iconOnly
              onClick={() => setActiveView("list")}
            >
              <Icon name="actions--view-list" size="small" />
            </Button>
            <Button
              hierarchy={activeView === "card" ? "secondary" : "tertiary"}
              iconOnly
              onClick={() => setActiveView("card")}
            >
              <Icon name="actions--calendar-today" size="small" />
            </Button>
          </div>
        </div>

        {/* Bulk action bar — only when rows selected */}
        {selectedIds.length > 0 && (
          <div className={styles.bulkBar}>
            <Button size="small" onClick={noop}>Submit</Button>
            <Button hierarchy="secondary" size="small" onClick={noop}>Edit multiple</Button>
            <Button hierarchy="secondary" size="small" onClick={noop}>Duplicate</Button>
            <Button hierarchy="secondary" size="small" onClick={noop}>Merge</Button>
            <Button hierarchy="secondary" size="small" onClick={noop}>Export</Button>
            <Button hierarchy="secondary" size="small" onClick={noop}>Create credit</Button>
            <Button hierarchy="secondary" appearance="danger" size="small" onClick={() => setSelectedIds([])}>Delete</Button>
          </div>
        )}

        {/* Table */}
        <DataTable
          columns={COLUMNS}
          rows={visibleRows}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={(key, dir) => { setSortKey(key); setSortDirection(dir); setCurrentPage(1); }}
          onRowClick={(id) => console.log("open", id)}
          emptyMessage="No expenses found."
        />

        {/* Pagination footer — one-off per CLAUDE.md, uses DS components inside */}
        <div className={styles.pagination}>

          <div className={styles.paginationLeft}>
            <span className={styles.paginationLabel}>Go to page</span>
            <div className={styles.goToWrapper}>
              <TextInput
                type="number"
                value={String(currentPage)}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v >= 1 && v <= totalPages) setCurrentPage(v);
                }}
                aria-label="Go to page"
              />
            </div>
          </div>

          <div className={styles.paginationControls}>
            <Button
              hierarchy="tertiary"
              iconOnly
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <Icon name="navigation--chevron-left" size="small" />
            </Button>

            {pages.map((p, i) =>
              p === null ? (
                <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
              ) : (
                <Button
                  key={p}
                  hierarchy={p === currentPage ? "primary" : "tertiary"}
                  onClick={() => setCurrentPage(p)}
                >
                  {String(p)}
                </Button>
              )
            )}

            <Button
              hierarchy="tertiary"
              iconOnly
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <Icon name="navigation--chevron-right" size="small" />
            </Button>
          </div>

          <div className={styles.paginationRight}>
            <span className={styles.paginationLabel}>Rows per page</span>
            <div className={styles.rowsPerPageWrapper}>
              <Select
                options={ROWS_PER_PAGE_OPTIONS}
                value={rowsPerPage}
                onChange={(v) => { setRowsPerPage(v); setCurrentPage(1); }}
              />
            </div>
            <span className={styles.resultsCount}>{TOTAL_RESULTS} Results</span>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
