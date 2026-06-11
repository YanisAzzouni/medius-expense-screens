# CLAUDE.md — Medius Expense Design System

> **Starting a new prototype?** Read `PROTOTYPE_BASE.md` first.
> It describes the ready-made Expense List screen and how to use it as a base.

## Golden Rules

1. **Always use existing components from this library first.** Never recreate a UI element that already exists here.
2. **If a needed component does not exist → stop.** Say explicitly:
   > "There's no `[X]` component in `@medius-expense/design-system` yet. Do you want me to build it in the design system first, or use a one-off?"
   Do not silently build a custom version.
3. **Never invent props.** Read the TypeScript interface before using a component.
4. **When a new component is added to this library, update this file immediately** — add it to the component list below.

---

## Design System — Rebuild Workflow

The design system is installed from a **local path** (`../medius-expense-design-system`). The screens project consumes the compiled `dist/` output — **not** the source files directly.

**Whenever the design system has changed** (new component, prop update, style fix), run this before building any new screen:

```bash
# 1. Rebuild the design system
cd /Users/yanisazzouni/Desktop/medius-expense-design-system
npm run build

# 2. Reinstall it in the screens project
cd /Users/yanisazzouni/Desktop/medius-expense-screens
npm install ../medius-expense-design-system
```

If you skip this step, the screens project will silently use stale compiled code and components will not reflect the latest changes.

**How to tell if a rebuild is needed:** if you're unsure whether the design system was recently changed, always rebuild — it takes ~3 seconds and is safe to run repeatedly.

---

## Package

```
import { ComponentName } from "@medius-expense/design-system";
```

Styles (app entry point):
```ts
import "@medius-expense/design-system/styles";
```

---

## Available Components

### Button

```ts
import { Button } from "@medius-expense/design-system";

hierarchy?: "primary" | "secondary" | "tertiary"   // default: "primary"
appearance?: "default" | "danger" | "ai"            // default: "default"
size?:       "default" | "small"                    // default: "default"
icon?:       ReactNode   // leading icon
iconOnly?:   boolean     // square icon-only variant — pass icon as children
loading?:    boolean
```

### TextInput

```ts
import { TextInput } from "@medius-expense/design-system";

label?:     string
required?:  boolean
helpIcon?:  boolean
state?:     "default" | "danger" | "success" | "read-only" | "highlighted" | "disabled"
unit?:      string   // trailing unit suffix, e.g. "%" or "kg"
hint?:      string
hintType?:  "neutral" | "danger" | "success"
// + all standard <input> HTML attributes (type, value, onChange, placeholder, …)
```

### TextArea

```ts
import { TextArea } from "@medius-expense/design-system";

label?:     string
required?:  boolean
helpIcon?:  boolean
state?:     "default" | "danger" | "success" | "read-only" | "highlighted" | "disabled"
hint?:      string
hintType?:  "neutral" | "danger" | "success"
// + all standard <textarea> HTML attributes (rows, value, onChange, …)
```

### Select

```ts
import { Select } from "@medius-expense/design-system";
import type { SelectOption } from "@medius-expense/design-system";

// SelectOption: { value: string; label: string; icon?: ReactNode }

label?:       string
required?:    boolean
helpIcon?:    boolean
placeholder?: string
value?:       string
onChange?:    (value: string) => void
options:      SelectOption[]
state?:       "default" | "read-only" | "highlighted" | "disabled"
leadingIcon?: ReactNode   // icon shown in the trigger when no option is selected
hint?:        string
hintType?:    "neutral" | "danger" | "success"
```

### Banner

```ts
import { Banner } from "@medius-expense/design-system";

type?:         "information" | "warning" | "error" | "success"  // default: "information"
title?:        string
children?:     ReactNode   // body text
showIcon?:     boolean     // default: true
dismissible?:  boolean
onDismiss?:    () => void
action1Label?: string
onAction1?:    () => void
action2Label?: string
onAction2?:    () => void
```

### StatusTag

```ts
import { StatusTag } from "@medius-expense/design-system";

label:     string
variant?:  "neutral" | "grey" | "blue" | "green" | "yellow" | "red" | "orange"
```

Renders a pill badge with a coloured dot. Use for workflow states (Draft, Submitted, Approved, …).

### LabelTag

```ts
import { LabelTag } from "@medius-expense/design-system";

label:   string
color?:  "neutral" | "grey" | "blue" | "green" | "orange" | "red" | "teal"  // default: "neutral"
size?:   "default" | "small"                                         // default: "default"
icon?:   ReactNode   // optional leading icon
```

Use for metadata labels (categories, flags, document types, …).

### Tooltip

```ts
import { Tooltip } from "@medius-expense/design-system";

content:     ReactNode
placement?:  "top" | "right" | "bottom" | "left"  // default: "top"
children:    ReactNode   // the trigger element
```

CSS-only show/hide (no JS). Wraps the trigger — no extra wrapper div needed.

### Tabs + Tab (compound component)

```ts
import { Tabs, Tab } from "@medius-expense/design-system";

// Tabs (container / tablist)
value:     string          // active tab value
onChange:  (v: string) => void
children:  ReactNode

// Tab (individual item)
value:     string
label:     string
icon?:     ReactNode
badge?:    string | number   // counter bubble
closable?: boolean
onClose?:  () => void
disabled?: boolean
```

Keyboard navigation (Arrow Left/Right/Home/End) and roving tabindex are built in.

### Checkbox

```ts
import { Checkbox } from "@medius-expense/design-system";

checked?:   boolean | "indeterminate"
onChange?:  (checked: boolean) => void
label?:     string
state?:     "default" | "danger" | "disabled"
disabled?:  boolean   // alias for state="disabled"
// + id, name, value, className
```

### NavBar

```ts
import { NavBar } from "@medius-expense/design-system";
import type { NavItemKey } from "@medius-expense/design-system";

// NavItemKey: "dashboard" | "expenses" | "reports" | "requests"
//           | "manager" | "medius-card" | "admin" | "accountant"

activeItem?:     NavItemKey   // default: "dashboard"
onNavigate?:     (key: NavItemKey) => void
userInitials?:   string       // default: "YA"
onUserClick?:    () => void
showRequests?:   boolean      // default: false
showManager?:    boolean      // default: false
showMediusCard?: boolean      // default: false
showAdmin?:      boolean      // default: false
showAccountant?: boolean      // default: false
```

72px horizontal bar with Medius Expense logo, nav tabs, and user avatar.
Always-visible tabs: Dashboard, Expenses, Reports. Optional tabs toggled via props.
Tab states: default (white/chalk-600), hover (chalk-200/chalk-900), active (olive-200/olive-700).

---

### ExpenseModal

```ts
import { ExpenseModal } from "@medius-expense/design-system";
import type { ExpenseTag } from "@medius-expense/design-system";

// ExpenseTag: { label: string }

title?:         string          // default: "Expense"
tags?:          ExpenseTag[]    // small label tags in the header
statusLabel?:   string          // default: "Draft"
statusVariant?: StatusTagVariant
showBanner?:    boolean         // shows a dismissible info banner
bannerMessage?: string
onClose?:       () => void
onSave?:        () => void
onNext?:        () => void
```

Full expense entry modal. Tabs: General, Merchant, Guest, Transaction, Attached files.
Receipt preview panel is a placeholder — not yet a component.

---

### AdminPanel

```ts
import { AdminPanel, DEFAULT_ADMIN_SECTIONS } from "@medius-expense/design-system";
import type { AdminSectionDef, AdminSectionItem } from "@medius-expense/design-system";

// AdminSectionItem: { key: string; label: string }
// AdminSectionDef:  { key: string; label: string; icon: string; items?: AdminSectionItem[] }
//   items present (even if []) → collapsible section with chevron
//   items absent               → leaf node (no chevron), click calls onNavigate directly

companyName?:   string               // default: "Company name"
sections?:      AdminSectionDef[]    // default: DEFAULT_ADMIN_SECTIONS (9 standard sections)
activeSection?: string               // section key to pre-expand and highlight
activeItem?:    string               // sub-item key to highlight (within activeSection)
onNavigate?:    (sectionKey: string, itemKey?: string) => void
```

320px left sidebar with right border. Default sections (from Figma):
Users and Access (Users, Groups, Delegations, Contacts, Absences) · Expenses and Requests · Payment · Advanced Settings · Rates and Vehicles · Global Settings · Integrations · Import/Export Histories · Insights and reporting.
Expanded section header: olive-600 text, semibold. Selected sub-item: olive-200 bg, olive-700 text.

---

### DataTable

```ts
import { DataTable } from "@medius-expense/design-system";
import type { ColumnDef, RowData, CellType, AttributeType } from "@medius-expense/design-system";

columns:             ColumnDef[]   // column definitions (order = render order)
rows:                RowData[]     // row data — each row must have an `id: string`
selectable?:         boolean       // prepend checkbox column (default: false)
selectedIds?:        string[]      // controlled row selection
onSelectionChange?:  (ids: string[]) => void
sortKey?:            string        // key of currently sorted column
sortDirection?:      "asc" | "desc"
onSort?:             (key: string, direction: "asc" | "desc") => void
onRowClick?:         (id: string) => void
emptyMessage?:       string        // shown when rows.length === 0
```

**ColumnDef shape:**
```ts
{ key: string; title?: string; type: CellType; size?: "S"|"M"|"L"; sortable?: boolean }
```

**12 cell types and their row data shape (key → value in RowData):**
| type | width behaviour | value shape |
|------|-----------------|-------------|
| `alerts` | 60px fixed | `{ warning?, duplicate?, policyAlert? }` |
| `thumbnail` | 60px fixed | `{ src: string; alt?: string }` |
| `status` | **hugs content** (fit-content) | `{ label: string; variant?: StatusTagVariant }` |
| `amount` | 120px min | `{ amount, currency, amount2?, currency2? }` |
| `date` | **120px fixed** (min + max) | `string` |
| `icon` | 60px fixed | `string` (icon name) |
| `actions` | 60px fixed | `{ icon, label?, onClick, secondary?: { icon, label?, onClick } }` |
| `expense-title` | **flex: 1 0 0**, min 220px | `{ title: string; attributes?: AttributeType[] }` |
| `check` | 24px fixed | `{ checked: boolean; onChange?: (v: boolean) => void }` |
| `text-link` | 120px min | `{ text, href?, onClick? }` |
| `text` | 120px min | `string` |
| `text-long` | 220px min | `string` |

**12 AttributeType values** (for `expense-title` cells):
`manual-addition` · `split` · `email` · `card-statement` · `file-attached` · `guest` · `merged` · `medius-card` · `e-invoice` · `e-invoice-expected` · `e-invoice-not-expected` · `transaction-expected`

Sorting is external-only: `onSort` fires, parent updates `sortKey`/`sortDirection`. Selection supports both controlled (`selectedIds` + `onSelectionChange`) and uncontrolled modes.

---

## Icon

```ts
import { Icon } from "@medius-expense/design-system";

name:   string   // "category--icon-name", e.g. "navigation--close"
size?:  "small" | "default" | "large"  // 16 / 20 / 24 px  — default: "default"
```

Icon names follow the pattern `category--kebab-name`. Key categories:
`actions` · `alert` · `alerts` · `communication` · `content` · `editor` · `maps` · `navigation` · `social`

To verify a name exists before using it:
```bash
grep '"name": "your-icon-name"' src/icons/manifest.ts
```

Never guess an icon name. If unsure, grep the manifest first.

---

## Design Tokens

CSS custom properties — use these instead of hardcoded values.

**Colors:** `--color-{family}-{step}` where step ∈ 100–1000  
Families: `chalk` · `olive` · `blue` · `green` · `red` · `orange` · `yellow` · `teal` · `purple` · `pink` · `space` · `white`

**Typography:**
`--type-body-default-{size|weight|line-height|letter-spacing}`
`--type-small-{size|weight|line-height|letter-spacing}`
`--type-small-semibold-{size|weight|line-height|letter-spacing}`

**Font family:** `--font-family`

---

## AppLayout — Shared Page Wrapper

**Every page must be wrapped in `<AppLayout>`** — never place `<NavBar>` directly inside a page component.

```tsx
import AppLayout from "../components/AppLayout";

export default function MyPage() {
  return (
    <AppLayout showAdmin showMediusCard>
      {/* page content */}
    </AppLayout>
  );
}
```

`AppLayout` handles:
- Rendering the `<NavBar>` once, in one place
- Keeping the active tab in sync with the URL automatically (reads `useLocation`)
- Navigating to the correct route when a tab is clicked

**Props:**
```ts
showMediusCard?:  boolean
showAdmin?:       boolean
showRequests?:    boolean
showManager?:     boolean
showAccountant?:  boolean
```

Pass only the tabs that should be visible on that screen. All pages in this project currently use `showAdmin` and `showMediusCard`.

**Never:**
- Import `NavBar` directly in a page component
- Manage `activeItem` state manually in a page
- Copy-paste NavBar props between pages

---

## Loading & Error States

Three tools work together to simulate realistic async data fetching.

### useMockFetch — simulates an API call

```ts
import { useMockFetch } from "../hooks/useMockFetch";
import { USERS } from "../data";

const { data, loading, error, refetch } = useMockFetch(() => USERS, []);
```

Parameters:
```ts
useMockFetch(
  fetcher,      // () => T  — returns mock data after the delay
  deps,         // unknown[] — re-fetches when these change (like useEffect)
  delay?,       // number — ms of simulated latency (default: 800)
  errorRate?,   // 0–1 — probability of random error, useful for testing (default: 0)
)
```

### LoadingState + ErrorState — drop-in UI components

```tsx
import LoadingState from "../components/LoadingState";
import ErrorState   from "../components/ErrorState";

const { data, loading, error, refetch } = useMockFetch(() => USERS, []);

if (loading) return <LoadingState />;
if (error)   return <ErrorState message={error} onRetry={refetch} />;
// render data...
```

Both components fill their container (use `flex: 1` or full-height parent).

### Spinner — from the design system

```tsx
import { Spinner } from "@medius-expense/design-system";

<Spinner />                            // default (24px)
<Spinner size="small" />               // 16px
<Spinner size="large" />               // 40px
<Spinner label="Loading users…" />     // custom accessible label
```

**Never** build a custom spinner — always use `<Spinner>` from the design system.

---

## Toast Notifications

Toasts are globally available on every page via `useToastContext`. Never instantiate `useToast` or `<ToastContainer>` directly in a page — they are already wired into `AppLayout`.

```tsx
import { useToastContext } from "../components/ToastProvider";

export default function MyPage() {
  const { success, error, warning, information } = useToastContext();

  return (
    <AppLayout>
      <button onClick={() => success("Saved", "Your changes have been saved.")}>
        Save
      </button>
    </AppLayout>
  );
}
```

**4 variants:**
```ts
success("Message", "Optional description")
error("Message", "Optional description")
warning("Message", "Optional description")
information("Message", "Optional description")
```

**Custom duration** (ms, default 4000 — use 0 for persistent):
```ts
const { toast } = useToastContext();
toast({ variant: "success", message: "Done", duration: 8000 });
toast({ variant: "error",   message: "Failed", duration: 0 }); // won't auto-dismiss
```

---

## Mock Data Library

All mock data lives in `src/data/`. Always import from the barrel file:

```ts
import { USERS, EXPENSES, BUDGETS, TRANSACTIONS } from "../data";
```

**Files and what they cover:**

| File | Domain | Key exports |
|------|--------|-------------|
| `expenses.ts` | Expenses, Reports | `EXPENSES`, `REPORTS`, `EXPENSE_STATUS_META`, `CATEGORY_ICON` |
| `users.ts` | Users & Access | `USERS`, `GROUPS`, `DELEGATIONS`, `CONTACTS`, `ABSENCES` |
| `payment.ts` | Payment | `TRANSACTIONS`, `ADVANCES`, `PAYMENT_INSTRUMENTS`, `BANK_ACCOUNTS`, `ROLE_DEFINITIONS` |
| `settings.ts` | Config & Policies | `CATEGORIES`, `PROJECTS`, `CUSTOM_FIELDS`, `MILEAGE_RATES`, `VEHICLES`, `SPENDING_POLICIES`, `BUDGETS`, `SUBSCRIPTION`, `BILLS` |
| `index.ts` | Barrel | re-exports all of the above |

**Cross-references (IDs are stable and consistent across files):**
- `Expense.reportId` → `Report.id`
- `User.groupIds` → `Group.id`
- `Delegation.delegatorId / delegateId` → `User.id`
- `Transaction.userId` → `User.id`, `Transaction.expenseId` → `Expense.id`
- `Project.managerId` → `User.id`
- `Budget.groupId` → `Group.id`

**Rules:**
- **Never** define mock data inline inside a page component
- **Never** create a new data file without adding it to `index.ts`
- When adding new entities, make sure IDs cross-reference correctly

---

## Rules for Consumer Projects

- Import only from `"@medius-expense/design-system"` — never from internal paths.
- For layout and custom styling that the design system doesn't cover, plain CSS/CSS Modules are fine — but prefer token CSS variables over hardcoded values.
- Do not recreate spacing, colours, or typography by hand if a token exists.
- **Before building any new screen**, always rebuild and reinstall the design system (see "Design System — Rebuild Workflow" above).
- **Wrap every page in `<AppLayout>`** — never place `<NavBar>` directly in a page (see "AppLayout" above).
- **Follow the existing page pattern** — use `src/pages/ExpenseList.tsx` and `src/pages/AdminScreen.tsx` as reference for page structure.
- **Routes live in `src/App.tsx`** — register every new page there. Admin sub-pages follow the pattern `/admin/:section/:item`.
- **Mock data goes in `src/data/`** — never inline large data arrays inside page components.
