# Prototype Base — Medius Expense Screens

> Read this before building any new screen or user flow.

This project is a **prototyping and testing environment** for the Medius Expense product. It uses a real design system (`@medius-expense/design-system`) with real components, tokens, and patterns — so prototypes look and feel production-quality.

---

## Project Structure

```
src/
├── components/
│   └── AppLayout.tsx          ← NavBar wrapper — use this in EVERY page
├── data/
│   ├── index.ts               ← Barrel — always import mock data from here
│   ├── expenses.ts            ← Expenses, Reports, status metadata
│   ├── users.ts               ← Users, Groups, Delegations, Contacts, Absences
│   ├── payment.ts             ← Transactions, Advances, Payment Instruments, Bank Accounts
│   └── settings.ts            ← Categories, Projects, Policies, Budgets, Vehicles, Bills
├── pages/
│   ├── ExpenseList.tsx        ← Reference: full list page (table, filters, pagination)
│   └── AdminScreen.tsx        ← Reference: sidebar + content layout
└── App.tsx                    ← Route registry — add every new page here
```

---

## How to Build a New Screen

### Step 1 — Create the page files

```
src/pages/MyPage.tsx
src/pages/MyPage.module.css
```

### Step 2 — Wrap in AppLayout

**Always** use `AppLayout` — never place `<NavBar>` directly in a page.

```tsx
import AppLayout from "../components/AppLayout";
import styles from "./MyPage.module.css";

export default function MyPage() {
  return (
    <AppLayout showAdmin showMediusCard>
      <div className={styles.content}>
        {/* page content */}
      </div>
    </AppLayout>
  );
}
```

`AppLayout` handles the NavBar, active tab, and routing — the page never needs to think about navigation.

### Step 3 — Register the route in App.tsx

```tsx
import MyPage from "./pages/MyPage";

// Inside <Routes>:
<Route path="/my-path" element={<MyPage />} />
```

Admin sub-pages follow `/admin/:section/:item`:
```tsx
<Route path="/admin/users-access/users" element={<UsersPage />} />
```

### Step 4 — Pull mock data from the barrel

```ts
import { USERS, EXPENSES, BUDGETS, TRANSACTIONS } from "../data";
```

Never define mock data inline inside a page.

---

## Existing Reference Screens

### `ExpenseList` — `/expenses`
**File:** `src/pages/ExpenseList.tsx`

The most complete reference. Study this before building any list page. Demonstrates:
- Full `DataTable` with all 12 column types
- External sort state (page owns `sortKey` / `sortDirection`)
- Controlled row selection + bulk action bar
- Search + filter toolbar
- Pagination (go-to-page, rows-per-page, page buttons with ellipsis)
- Dismissible `Banner`
- Mapping a typed domain object to `RowData`

### `AdminScreen` — `/admin/:section/:item?`
**File:** `src/pages/AdminScreen.tsx`

Reference for any sidebar layout. Demonstrates:
- `AdminPanel` with URL-driven active section/item
- Two-column layout (fixed sidebar + scrollable content)
- Sidebar navigation writing to the URL

---

## URL Routing Map

| URL | Screen |
|---|---|
| `/` | Redirects → `/expenses` |
| `/expenses` | Expense list |
| `/admin` | Redirects → `/admin/users-access/users` |
| `/admin/:section/:item?` | Admin screen |

**Admin section/item keys:**

| URL | Sidebar |
|---|---|
| `/admin/users-access/users` | Users and Access → Users |
| `/admin/users-access/groups` | Users and Access → Groups |
| `/admin/users-access/delegations` | Users and Access → Delegations |
| `/admin/users-access/contacts` | Users and Access → Contacts |
| `/admin/users-access/absences` | Users and Access → Absences |
| `/admin/expenses-requests/reports` | Expenses and Requests → Reports |
| `/admin/expenses-requests/expenses-list` | Expenses and Requests → Expenses list |
| `/admin/expenses-requests/e-invoices-list` | Expenses and Requests → E-invoices list |
| `/admin/expenses-requests/budgets` | Expenses and Requests → Budgets |
| `/admin/expenses-requests/spending-policies` | Expenses and Requests → Spending policies |
| `/admin/payment/transactions` | Payment → Transactions |
| `/admin/payment/advances` | Payment → Advances |
| `/admin/payment/payment-instruments` | Payment → Payment instruments |
| `/admin/payment/role-management` | Payment → Role management |
| `/admin/payment/bank-accounts` | Payment → Bank accounts |
| `/admin/advanced-settings/categories` | Advanced Settings → Categories |
| `/admin/advanced-settings/projects` | Advanced Settings → Projects |
| `/admin/advanced-settings/custom-fields` | Advanced Settings → Custom fields |
| `/admin/rates-vehicles/mileage-rates` | Rates and Vehicles → Mileage rates |
| `/admin/rates-vehicles/vehicles` | Rates and Vehicles → Vehicles |
| `/admin/global-settings/expense` | Global Settings → Expense |
| `/admin/global-settings/approval` | Global Settings → Approval |
| `/admin/global-settings/accounting` | Global Settings → Accounting |
| `/admin/global-settings/employee-handbook` | Global Settings → Employee Handbook |
| `/admin/subscription-bills/subscription` | Subscription and Bills → Subscription |
| `/admin/subscription-bills/bills` | Subscription and Bills → Bills |

---

## Common Patterns

### List page with DataTable

```tsx
import { DataTable } from "@medius-expense/design-system";
import type { ColumnDef, RowData } from "@medius-expense/design-system";

const COLUMNS: ColumnDef[] = [
  { key: "name",   title: "Name",   type: "text",   sortable: true },
  { key: "status", title: "Status", type: "status"                 },
  { key: "actions",title: "",       type: "actions"                },
];

const rows: RowData[] = data.map((item) => ({
  id:      item.id,
  name:    item.name,
  status:  STATUS_META[item.status],           // { label, variant }
  actions: { icon: "content--create", onClick: () => {} },
}));

<DataTable columns={COLUMNS} rows={rows} />
```

See `CLAUDE.md` → DataTable for all 12 cell types and exact value shapes.

### Status badges

Every domain has a `*_STATUS_META` map ready to use:

```ts
import { USER_STATUS_META, BUDGET_STATUS_META, ADVANCE_STATUS_META } from "../data";

// In a row mapping:
status: USER_STATUS_META[user.status]   // → { label: "Active", variant: "green" }
```

### Sorting (external — page owns the state)

```tsx
const [sortKey, setSortKey]             = useState("name");
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

<DataTable
  sortKey={sortKey}
  sortDirection={sortDirection}
  onSort={(key, dir) => { setSortKey(key); setSortDirection(dir); }}
  rows={rows}
  columns={COLUMNS}
/>
```

### Navigating between admin sub-pages

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/admin/users-access/groups");
```

### Reading current section/item from the URL (inside AdminScreen children)

```tsx
import { useParams } from "react-router-dom";

const { section, item } = useParams();
// section = "users-access", item = "users"
```

---

## Mock Data Cross-References

IDs are stable across files — use them to join entities:

| Field | Points to |
|---|---|
| `Expense.reportId` | `Report.id` |
| `User.groupIds[]` | `Group.id` |
| `Delegation.delegatorId / delegateId` | `User.id` |
| `Absence.userId` | `User.id` |
| `Transaction.userId` | `User.id` |
| `Transaction.expenseId` | `Expense.id` |
| `Advance.userId` | `User.id` |
| `Project.managerId` | `User.id` |
| `Budget.groupId` | `Group.id` |
| `Vehicle.userId` | `User.id` |

---

## Design System Rebuild

The screens project consumes the compiled `dist/` of the design system. If the design system has changed since you last worked here, run this first:

```bash
cd /Users/yanisazzouni/Desktop/medius-expense-design-system && npm run build
cd /Users/yanisazzouni/Desktop/medius-expense-screens && npm install ../medius-expense-design-system
```

Then start the dev server:

```bash
cd /Users/yanisazzouni/Desktop/medius-expense-screens && npm run dev
# → http://localhost:5173
```

Full component API is in `CLAUDE.md`. **Never recreate a component that already exists in the design system.**
