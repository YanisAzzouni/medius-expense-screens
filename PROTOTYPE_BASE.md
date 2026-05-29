# Expense List — Prototype Base

> **For any AI working on this project:**
> Whenever Yanis asks for an expense list screen, a list of expenses, or anything that resembles a table of expense rows — **start from this file, not from scratch.**
> Modify `src/pages/ExpenseList.tsx` and its companion `src/pages/ExpenseList.module.css`.
> Do not recreate what already exists here.

---

## What's in the base

A fully working Expense List screen at `src/pages/ExpenseList.tsx` that matches the Figma reference (node `55-25756`). It includes:

- **NavBar** — "Expenses" tab active, Medius Card visible, user initials "YA"
- **Page header** — "My expenses" title + "Add" primary button
- **Dismissible info Banner**
- **Toolbar** — search input, Filters button, list/card view toggle
- **Bulk action bar** — appears when rows are selected (Submit, Edit multiple, Duplicate, Merge, Export, Create credit, Delete)
- **DataTable** — 10 sample rows with all columns:
  - Alerts (warning, duplicate, policy)
  - Thumbnail (receipt image)
  - Expense title + attribute badges
  - Category icon
  - Report (text-link)
  - Date (fixed 120px)
  - Amount (EUR)
  - Actions (edit button)
  - Status (StatusTag)
- **Pagination footer** — go-to-page input, page number buttons with ellipsis, rows-per-page select

### Row data (10 rows, matching Figma exactly)

| # | Title | Attributes | Status |
|---|-------|-----------|--------|
| 1 | Client Meeting - Coffee & Pastries | email | To review |
| 2 | Team Lunch - Burgers & Fries | medius-card · transaction-expected | To review |
| 3 | Taxi Fare - Office to restaurant | medius-card | To submit |
| 4 | Client Dinner - Osteria Francescana | manual-addition · e-invoice | To submit |
| 5 | Parking Fee - Downtown Office | — | Submitted |
| 6 | Training - Online Course | medius-card · e-invoice | Submitted |
| 7 | Uber drive - Hotel to airport | file-attached | Submitted |
| 8 | Hotel Stay - Sweden | medius-card · e-invoice-not-expected | Approved |
| 9 | Uber drive - airport to office | medius-card | Exported |
| 10 | Flight to Sweden | — | Exported |

---

## How to start it

```bash
# 1. If the design system has changed, rebuild it first
cd /Users/yanisazzouni/Desktop/medius-expense-design-system
npm run build

# 2. Start the dev server
cd /Users/yanisazzouni/Desktop/medius-expense-screens
npm run dev
# → http://localhost:5173
```

---

## How to use this as a base for a new prototype

**Modifying rows** — edit the `ROWS` array in `ExpenseList.tsx`. Each row shape is:
```ts
{
  id: string,
  alerts: { warning?, duplicate?, policyAlert? },
  thumbnail: { src: string, alt?: string },
  expenseTitle: { title: string, attributes?: AttributeType[] },
  category: string,           // icon name e.g. "maps--local-dining"
  report: { text, onClick },
  date: string,
  amount: { amount: string, currency: string },
  actions: { icon, label?, onClick },
  status: { label: string, variant?: StatusTagVariant },
}
```

**Modifying columns** — edit the `COLUMNS` array. Column types available: `alerts`, `thumbnail`, `expense-title`, `icon`, `text-link`, `date`, `amount`, `actions`, `status`, `text`, `text-long`, `check`.

**Adding a new page** — add a new file under `src/pages/`, import it in `src/App.tsx`, and route to it.

**Styling** — `src/pages/ExpenseList.module.css` contains all page-level layout. Use design token CSS variables (`--color-*`, `--font-family`, etc.) — never hardcode values.

---

## Design system dependency

All UI components come from `@medius-expense/design-system` (local `file:` link to `../medius-expense-design-system`).

Read `CLAUDE.md` for the full component catalogue and their props before using or modifying any component.

**Never recreate a component that already exists in the design system.**
