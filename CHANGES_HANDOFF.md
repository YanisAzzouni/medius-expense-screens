# Handoff — Audit Fixes Across `medius-expense-design-system` + `medius-expense-screens`

This document explains a batch of changes made to two repos so another AI (or developer) can pick up the work with full context. It covers **what changed, why, where, and what still needs doing** (notably: committing/pushing the design-system repo).

## TL;DR

A full code audit produced findings across component API design, TypeScript correctness, CSS, the icon system, the DataTable, page/data hygiene, performance, and accessibility. **All findings were implemented** across both repos. The app builds (`vite`), type-checks clean (`tsc -b` exit 0), and renders correctly (verified in-browser).

There are **two repos**, sibling folders on disk:
- `~/Desktop/medius-expense-design-system` — the component library (`@medius-expense/design-system`). Built with Vite lib mode to `dist/`.
- `~/Desktop/medius-expense-screens` — the prototype app that consumes the library. **Work was done on a git worktree**: `~/Desktop/medius-expense-screens/.claude/worktrees/happy-jang-9e5850` (branch `claude/happy-jang-9e5850`).

> ⚠️ **Important dependency detail:** the screens app depends on the design system via the **GitHub URL** (`"@medius-expense/design-system": "github:YanisAzzouni/medius-expense-design-system"`), **not** a local `file:` path (CLAUDE.md's "install from `../`" instructions are out of date). The DS changes below were rebuilt locally and `dist/` was synced into `node_modules/@medius-expense/design-system` so the app works **locally now**. To make them permanent for CI / Vercel / teammates you must **commit + push the design-system repo** and repoint/reinstall the dependency (see "Remaining work").

---

## Design system changes (`medius-expense-design-system`)

### Breaking public-API renames (consistency)
Update any consumer code accordingly.
- **`LabelTag`**: prop `color` → **`variant`** (the union type is still named `LabelTagColor`; values unchanged incl. `yellow`).
- **`Banner`**: prop `type` → **`variant`**; exported type `BannerType` → **`BannerVariant`**.
- **`Checkbox`**: the `disabled?: boolean` prop was **removed** — disable via `state="disabled"`.
- **`Stepper`**: secondary-action props made symmetric with the primary `next*` group:
  - `onSecondaryAction` → **`onSecondary`**
  - `secondaryActionLabel` → **`secondaryLabel`**
  - `secondaryActionIcon` → **`secondaryIcon`**
  - `secondaryLoading` unchanged; **new** `secondaryDisabled?: boolean`.

### Additive API / consistency
- **`forwardRef`** added (ref → root element) to: `Spinner`, `FeedTile`, `Breadcrumb`, `PageHeader`, `Stepper`, `Tooltip`, `NavBar`, `AdminPanel`, `ExpenseModal`. (Button/TextInput/etc. already had it; Tabs/Tab intentionally don't.)
- **`Spinner`**: added `className` + `style`.
- **`Tab`**: added `className`. **`Tabs`** context now throws if a `<Tab>` is rendered outside `<Tabs>` (was a silent no-op).
- **`Select`**: added `name` (hidden input for form submission) and `onBlur`.
- **`Toast`**: `ToastProps` and `ToastContainerProps` are now exported (added to `src/index.ts`).

### DataTable (`src/components/DataTable/`)
- **Select-all bug fixed**: header checkbox / `toggleAll` now use **membership** (`rows.every(r => selected.has(r.id))`) instead of `selectedIds.length === rows.length`, which misbehaved when selection contained ids not in the current rows.
- **`fillWidth` overflow fixed**: the title/`fill` column was `flex: 1 0 0; min-width: 220px` (couldn't shrink → overflow). Now `flex: 1 1 0` with `min-width: 0` scoped in fill mode; inner text ellipsizes.
- **Type safety**: `CellData` dispatch no longer relies on unchecked `as` casts. Added runtime type guards; `text`/`text-long` split into explicit `case`s; `default` has a `never` exhaustiveness assertion. `check`/`alerts` cells guard that the value is actually an object before reading fields.
- **A11y**: `role="columnheader"`/`role="cell"` moved off `display:contents` wrapper divs onto the real cell elements.
- `status` cell remains **fixed 120px** (intentional; CLAUDE.md was corrected to match).

### CSS
- Removed `!important` cascade hacks (raised specificity instead) in `Button`, `Select`, `ExpenseModal` disabled/width rules.
- Tokenized hardcoded typography in `FeedTile` and `Stepper`; `ExpenseModal` shadow → `var(--shadow-32)`; removed redundant `var(--x, #hex)` fallbacks in `FeedTile`.

### Icons (`src/icons/`)
- **Normalized all 1065 source SVGs** to `fill="currentColor"` (were hardcoded `#2F455C`/`#25252A`), so the source SVGs are theme-safe, matching the generated components.
- Deleted 2 orphan components not in the manifest (`ActionCheck.tsx`, `AlertInfo.tsx`).
- Renamed `svg/actions--no e-invoice.svg` (had a literal space) → `actions--no-e-invoice.svg`.
- `Icon` unknown-icon fallback `viewBox` 20→24 (consistency).

### ⭐ Token/styles packaging fix (caused & fixed the visual regression)
**Root cause:** `@medius-expense/design-system/styles` → `dist/tokens/tokens.css` only ever contained the **component CSS** (rules using `var(--…)`). The actual **`:root` token definitions** in `src/tokens/tokens.css` were **never imported into the build**, so they never reached `dist`. Consumers were expected to define the `:root` variables themselves (the screens app did so via a local `design-tokens.css`).

**Fix:** `src/index.ts` now does `import "./tokens/tokens.css";` at the top, so the extracted `/styles` bundle ships **both** the `:root` variable definitions **and** the component CSS. After this, consumers need only `import "@medius-expense/design-system/styles"` — no separate token file. (Verified: `dist/tokens/tokens.css` now contains `:root { --color-chalk-600: #5d5d69; … }`.)

### Stories / Figma Code Connect
Updated `.stories.tsx` and `.figma.tsx` files for the renamed props (e.g. `Banner.figma.tsx` `type`→`variant`). These are dev-only and not in the lib build graph.

---

## Screens app changes (`medius-expense-screens`, worktree branch)

### Deletions (dead code)
- **Removed the entire shadow copy of the design system** that lived under `src/` and was imported by nothing: `src/index.ts`, `src/icons/`, `src/tokens/`, and the 14 `src/components/<DSName>/` folders (AdminPanel, Banner, Button, Checkbox, DataTable, ExpenseModal, LabelTag, Navbar, Select, StatusTag, Tabs, TextArea, TextInput, Tooltip). Real app components were kept: `AppLayout`, `AdminLayout` (new), `ToastProvider`, `ErrorState`, `LoadingState`, `ComingSoon`, `StateLayouts.module.css`.
- **Removed `src/design-tokens.css`** and its import in `main.tsx`. ⚠️ This is only correct **because** the DS `/styles` packaging fix above now ships the `:root` tokens. If you ever revert the DS token fix, you must restore `design-tokens.css` or the app loses all colors/typography.

### Correctness
- **Broken icon names fixed** (rendered blank at runtime): in `src/data/settings.ts` `content--inventory`→`content--archive`, `editor--more-horiz`→`navigation--more-horiz`; in `src/components/ComingSoon.tsx` `content--inventory`→`device--widgets`.
- **Renamed-prop call sites updated** (LabelTag `color`→`variant`, Banner `type`→`variant`, Stepper secondary props) in `AddCardFeed.tsx`, `CardFeedsAdmin.tsx`, `CardFeedDetail.tsx`, `ExpenseList.tsx`.
- **CardFeedDetail crash fixed**: it read `location.state.feed!` (non-null assertion) and crashed on direct navigation/refresh. Now renders a graceful "feed not found" state.
- Pre-existing type errors that the shadow tree had masked were fixed: a missing `"it"` `CountryCode`, an `ExpenseCategory` export name collision (settings interface renamed to `ExpenseCategoryConfig`), and an ambient module decl for the side-effect `@medius-expense/design-system/styles` import (in `src/vite-env.d.ts`).

### Data hygiene (mock data out of pages)
- Moved inline arrays into `src/data/payment.ts` (re-exported via `src/data/index.ts`): `CARD_TRANSACTIONS`/`CardTransaction` + `CARD_EXP_STATE_VARIANT` (Transactions; renamed to avoid colliding with the existing `TRANSACTIONS` export), `FEED_CARDHOLDERS`, `CARD_NETWORK_LOGOS` (CardFeedDetail).

### Performance / async
- `useMemo` on the expensive sort/filter/paginate derivations in `ExpenseList.tsx` and `Transactions.tsx`.
- Adopted the previously-dead `useMockFetch` + `LoadingState` + `ErrorState` in `ExpenseList` and `Transactions` (they now show loading/error states).

### UX / accessibility
- Wired the previously-inert **search inputs** (ExpenseList filters by title/merchant/report; Transactions filters by merchant/employee/source).
- Icon-only buttons got `aria-label` + `aria-pressed` (view toggles) and pagination got `<nav aria-label="Pagination">` + `aria-current="page"`.
- Modals (`ExpenseList`, `Transactions`) got `role="dialog"` + `aria-modal` + `aria-label` + Escape-to-close.

### Font loading (Inter)
Previously the app **never actually loaded Inter** — `--font-family` claimed `"Inter"` but nothing downloaded the webfont (no `@import`, no `<link>`), so everything silently rendered in the system font. The DS `/styles` packaging fix now brings in the Inter `@import` (from `tokens.css`), so Inter loads as intended. To make this consistent and fast:
- `src/index.css`: the base `--sans`/`--heading` stacks now start with `'Inter'` (were `system-ui`), so inherited/base text matches the component text.
- `index.html`: added `preconnect` hints for `fonts.googleapis.com` / `fonts.gstatic.com` to reduce the first-load font flash.

### Refactor / consistency
- Extracted **`src/components/AdminLayout.tsx`** (+ `.module.css`) — mirrors `AppLayout`, owns the `AdminPanel` + `handleNavigate` + content wrapper that was copy-pasted across `AdminScreen`, `AddCardFeed`, `CardFeedDetail`. Those pages now use it; the cross-page `AdminScreen.module.css` import was removed.
- `ToastProvider` error message corrected ("must be used inside `<ToastProvider>`"); a dead ternary in `Transactions` collapsed.
- **`CLAUDE.md` updated** to match reality: renamed props, `Checkbox` state-only disable, `LabelTag` `yellow`, DataTable `status` = fixed 120px, documented `ColumnDef.fill` + `DataTableProps.fillWidth`, and added the previously-undocumented components (Stepper, PageHeader, Breadcrumb, FeedTile, Toast).

---

## How the app resolves the design system (so changes are visible)

- The worktree has **no `node_modules`**; Node resolves up-tree to `~/Desktop/medius-expense-screens/node_modules`.
- The installed package there is a **copy** (from the GitHub dep). After changing DS source you must: `cd medius-expense-design-system && npm run build`, then sync `dist/` (and `package.json`) into `medius-expense-screens/node_modules/@medius-expense/design-system/`.
- Vite caches deps — after syncing, **clear `node_modules/.vite`** and restart the dev server, or the old CSS/JS is served.

```bash
# Rebuild DS and make it visible to the screens app locally:
cd ~/Desktop/medius-expense-design-system && npm run build
INST=~/Desktop/medius-expense-screens/node_modules/@medius-expense/design-system
rm -rf "$INST/dist" && cp -R dist "$INST/dist" && cp package.json "$INST/package.json"
rm -rf ~/Desktop/medius-expense-screens/node_modules/.vite
# then restart `npm run dev`
```

---

## Verification status
- `medius-expense-design-system`: `npm run build` ✔ (declaration files generated → entry graph type-checks).
- `medius-expense-screens` (worktree): `npx tsc -b --force` → **exit 0** ✔; `npm run build` ✔.
- In-browser: ExpenseList, Transactions (`/admin/payment/transactions`), Admin, ComingSoon all render with **no console errors**; tokens/colors/fonts confirmed applied; CardFeedDetail direct-nav shows the graceful not-found state instead of crashing.

## Remaining work (not done yet)
1. **Commit + push `medius-expense-design-system`** (its working tree has all the DS edits uncommitted), then update the screens dependency to the new commit (or publish) so CI/Vercel/teammates get the changes. The local `node_modules` sync is machine-local only.
2. **Commit the screens worktree branch** `claude/happy-jang-9e5850` and open a PR.
3. Optional: the screens JS bundle is ~1 MB (lots of inlined invoice PNGs) — consider code-splitting / moving large images out of the bundle. Pre-existing, not addressed here.
