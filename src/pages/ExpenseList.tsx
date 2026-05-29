import { useState } from "react";
import {
  NavBar,
  DataTable,
  Button,
  TextInput,
  Banner,
  Icon,
  Select,
} from "@medius-expense/design-system";
import type {
  NavItemKey,
  ColumnDef,
  RowData,
  SelectOption,
} from "@medius-expense/design-system";
import styles from "./ExpenseList.module.css";

const RECEIPT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='64' viewBox='0 0 48 64'%3E%3Crect width='48' height='64' rx='3' fill='%23f0f0ee'/%3E%3Crect x='8' y='10' width='32' height='3' rx='1.5' fill='%23c8c8c4'/%3E%3Crect x='8' y='18' width='28' height='2' rx='1' fill='%23d8d8d4'/%3E%3Crect x='8' y='24' width='24' height='2' rx='1' fill='%23d8d8d4'/%3E%3Crect x='8' y='30' width='30' height='2' rx='1' fill='%23d8d8d4'/%3E%3Crect x='8' y='36' width='20' height='2' rx='1' fill='%23d8d8d4'/%3E%3Crect x='8' y='46' width='32' height='2' rx='1' fill='%23c0c0bc'/%3E%3Crect x='8' y='52' width='20' height='2' rx='1' fill='%23c0c0bc'/%3E%3C/svg%3E";

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

// ── Rows — mirrors Figma data exactly ────────────────────────────────────────

const ROWS: RowData[] = [
  {
    id: "1",
    alerts: {},
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Client Meeting - Coffee & Pastries", attributes: ["email"] },
    category: "maps--local-dining",
    report: { text: "Client meetings", onClick: noop },
    date: "Sep 1, 2026",
    amount: { amount: "35.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "To review", variant: "neutral" },
  },
  {
    id: "2",
    alerts: {},
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Team Lunch - Burgers & Fries", attributes: ["medius-card", "transaction-expected"] },
    category: "maps--local-dining",
    report: { text: "Team meetings", onClick: noop },
    date: "Aug 13, 2026",
    amount: { amount: "67.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "To review", variant: "neutral" },
  },
  {
    id: "3",
    alerts: { warning: true },
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Taxi Fare - Office to restaurant", attributes: ["medius-card"] },
    category: "maps--local-taxi",
    report: { text: "Client meetings", onClick: noop },
    date: "Aug 9, 2026",
    amount: { amount: "35.50", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "To submit", variant: "blue" },
  },
  {
    id: "4",
    alerts: {},
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Client Dinner - Osteria Francescana", attributes: ["manual-addition", "e-invoice"] },
    category: "maps--local-dining",
    report: { text: "Client meetings", onClick: noop },
    date: "Aug 9, 2026",
    amount: { amount: "94.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "To submit", variant: "blue" },
  },
  {
    id: "5",
    alerts: {},
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Parking Fee - Downtown Office", attributes: [] },
    category: "maps--directions-car",
    report: { text: "Parking", onClick: noop },
    date: "Aug 3, 2026",
    amount: { amount: "13.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "Submitted", variant: "yellow" },
  },
  {
    id: "6",
    alerts: { policyAlert: true },
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Training - Online Course", attributes: ["medius-card", "e-invoice"] },
    category: "maps--local-dining",
    report: { text: "Trainings", onClick: noop },
    date: "July 14, 2026",
    amount: { amount: "120.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "Submitted", variant: "yellow" },
  },
  {
    id: "7",
    alerts: { duplicate: true },
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Uber drive - Hotel to airport", attributes: ["file-attached"] },
    category: "maps--local-taxi",
    report: { text: "Trip to Sweden", onClick: noop },
    date: "July 7, 2026",
    amount: { amount: "85.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "Submitted", variant: "yellow" },
  },
  {
    id: "8",
    alerts: {},
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Hotel Stay - Sweden", attributes: ["medius-card", "e-invoice-not-expected"] },
    category: "maps--hotel",
    report: { text: "Trip to Sweden", onClick: noop },
    date: "July 7, 2026",
    amount: { amount: "345.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "Approved", variant: "green" },
  },
  {
    id: "9",
    alerts: {},
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Uber drive - airport to office", attributes: ["medius-card"] },
    category: "maps--local-taxi",
    report: { text: "Trip to Sweden", onClick: noop },
    date: "July 7, 2026",
    amount: { amount: "1,200.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "Exported", variant: "grey" },
  },
  {
    id: "10",
    alerts: {},
    thumbnail: { src: RECEIPT_PLACEHOLDER, alt: "Receipt" },
    expenseTitle: { title: "Flight to Sweden", attributes: [] },
    category: "maps--flight",
    report: { text: "Trip to Sweden", onClick: noop },
    date: "July 7, 2026",
    amount: { amount: "440.00", currency: "EUR" },
    actions: { icon: "content--create", label: "Edit", onClick: noop },
    status: { label: "Exported", variant: "grey" },
  },
];

const ROWS_PER_PAGE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
];

const TOTAL_RESULTS = 67;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ExpenseList() {
  const [activeNav, setActiveNav] = useState<NavItemKey>("expenses");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchValue, setSearchValue] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [activeView, setActiveView] = useState<"list" | "card">("list");

  const totalPages = Math.ceil(TOTAL_RESULTS / Number(rowsPerPage));

  const pages: (number | null)[] = (() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, null, totalPages];
    if (currentPage >= totalPages - 2) return [1, null, totalPages - 2, totalPages - 1, totalPages];
    return [1, null, currentPage, null, totalPages];
  })();

  return (
    <div className={styles.page}>
      <NavBar
        activeItem={activeNav}
        onNavigate={setActiveNav}
        userInitials="YA"
        showMediusCard
      />

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
          rows={ROWS}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={(key, dir) => { setSortKey(key); setSortDirection(dir); }}
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
                onChange={setRowsPerPage}
              />
            </div>
            <span className={styles.resultsCount}>{TOTAL_RESULTS} Results</span>
          </div>

        </div>
      </div>
    </div>
  );
}
