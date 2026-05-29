import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable } from "./DataTable";
import type { ColumnDef, RowData } from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

/* ─── Expense list columns (matches Figma node 55:27507) ─── */

const FULL_COLUMNS: ColumnDef[] = [
  { key: "alerts",   type: "alerts",        title: ""                                     },
  { key: "thumb",    type: "thumbnail",      title: ""                                     },
  { key: "title",    type: "expense-title",  title: "Expense",            sortable: true   },
  { key: "category", type: "icon",           title: ""                                     },
  { key: "link",     type: "text-link",      title: "Report",   size: "M"                  },
  { key: "date",     type: "date",           title: "Date",               sortable: true   },
  { key: "amount",   type: "amount",         title: "Amount",   size: "M", sortable: true  },
  { key: "actions",  type: "actions",        title: ""                                     },
  { key: "status",   type: "status",         title: "Status",   size: "M", sortable: true  },
];

/* ─── Sample rows ─── */

const SAMPLE_ROWS: RowData[] = [
  {
    id: "1",
    alerts:   { warning: true, duplicate: false, policyAlert: true },
    thumb:    { src: "https://placehold.co/40x56/e5e5e5/aaaaaa?text=📄", alt: "Receipt" },
    title:    { title: "Team lunch at Noma", attributes: ["manual-addition", "file-attached"] },
    category: "maps--restaurant",
    link:     { text: "Q4 Report", onClick: () => alert("Open report") },
    date:     "Dec 9, 2025",
    amount:   { amount: "1,250.00", currency: "SEK", amount2: "112.50", currency2: "EUR" },
    actions:  { icon: "content--edit", label: "Edit", onClick: () => alert("Edit"), secondary: { icon: "actions--delete", label: "Delete", onClick: () => alert("Delete") } },
    status:   { label: "Submitted", variant: "blue" },
  },
  {
    id: "2",
    alerts:   { warning: false, duplicate: true, policyAlert: false },
    thumb:    { src: "https://placehold.co/40x56/e5e5e5/aaaaaa?text=📄", alt: "Receipt" },
    title:    { title: "Flight STO → AMS", attributes: ["e-invoice", "medius-card"] },
    category: "maps--flight",
    link:     { text: "Q4 Report", onClick: () => alert("Open report") },
    date:     "Dec 5, 2025",
    amount:   { amount: "4,890.00", currency: "SEK" },
    actions:  { icon: "content--edit", label: "Edit", onClick: () => alert("Edit") },
    status:   { label: "Draft", variant: "neutral" },
  },
  {
    id: "3",
    alerts:   { warning: false, duplicate: false, policyAlert: false },
    thumb:    null,
    title:    { title: "Hotel Stockholm Marriott", attributes: ["card-statement"] },
    category: "maps--hotel",
    link:     { text: "Q3 Report", onClick: () => alert("Open report") },
    date:     "Nov 28, 2025",
    amount:   { amount: "2,100.00", currency: "SEK" },
    actions:  { icon: "content--edit", label: "Edit", onClick: () => alert("Edit") },
    status:   { label: "Approved", variant: "green" },
  },
  {
    id: "4",
    alerts:   { warning: true, duplicate: false, policyAlert: false },
    thumb:    { src: "https://placehold.co/40x56/e5e5e5/aaaaaa?text=📄", alt: "Receipt" },
    title:    { title: "Taxi to conference centre", attributes: ["split"] },
    category: "maps--local-taxi",
    link:     { text: "Q3 Report", onClick: () => alert("Open report") },
    date:     "Nov 15, 2025",
    amount:   { amount: "340.00", currency: "SEK" },
    actions:  { icon: "content--edit", label: "Edit", onClick: () => alert("Edit") },
    status:   { label: "Rejected", variant: "red" },
  },
  {
    id: "5",
    alerts:   { warning: false, duplicate: false, policyAlert: true },
    thumb:    null,
    title:    { title: "Office supplies — stationery", attributes: ["email", "guest"] },
    category: "content--inventory",
    link:     { text: "Q3 Report", onClick: () => alert("Open report") },
    date:     "Nov 10, 2025",
    amount:   { amount: "89.00", currency: "EUR", amount2: "992.00", currency2: "SEK" },
    actions:  { icon: "content--edit", label: "Edit", onClick: () => alert("Edit") },
    status:   { label: "Pending", variant: "yellow" },
  },
];

/* ─── 1. Default ─── */
export const Default: Story = {
  args: {
    columns: FULL_COLUMNS,
    rows: SAMPLE_ROWS,
  },
};

/* ─── 2. Selectable ─── */
export const Selectable: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>(["1", "3"]);
    return (
      <DataTable
        columns={FULL_COLUMNS}
        rows={SAMPLE_ROWS}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    );
  },
};

/* ─── 3. WithSorting ─── */
export const WithSorting: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string>("date");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    return (
      <DataTable
        columns={FULL_COLUMNS}
        rows={SAMPLE_ROWS}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
      />
    );
  },
};

/* ─── 4. EmptyState ─── */
export const EmptyState: Story = {
  args: {
    columns: FULL_COLUMNS,
    rows: [],
    emptyMessage: "No expenses found for this period.",
  },
};

/* ─── 5. CustomColumns ─── */
const SIMPLE_COLUMNS: ColumnDef[] = [
  { key: "name",   type: "text",      title: "Name",   size: "L", sortable: true },
  { key: "date",   type: "date",      title: "Date",              sortable: true },
  { key: "status", type: "status",    title: "Status", size: "M"                 },
  { key: "amount", type: "amount",    title: "Amount", size: "M", sortable: true },
  { key: "note",   type: "text-long", title: "Note",   size: "L"                 },
];

const SIMPLE_ROWS: RowData[] = [
  { id: "a", name: "Annual subscription", date: "Jan 1, 2026", status: { label: "Active",   variant: "green"   }, amount: { amount: "299.00", currency: "USD" }, note: "Renewed automatically"  },
  { id: "b", name: "Cloud hosting",       date: "Jan 5, 2026", status: { label: "Pending",  variant: "yellow"  }, amount: { amount: "149.00", currency: "USD" }, note: "Invoice pending review" },
  { id: "c", name: "Design tools",        date: "Jan 8, 2026", status: { label: "Draft",    variant: "neutral" }, amount: { amount: "59.00",  currency: "USD" }, note: ""                       },
];

export const CustomColumns: Story = {
  args: {
    columns: SIMPLE_COLUMNS,
    rows: SIMPLE_ROWS,
    selectable: true,
  },
};
