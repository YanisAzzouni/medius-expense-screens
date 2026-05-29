import { useState } from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { StatusTag } from "../StatusTag/StatusTag";
import type { StatusTagVariant } from "../StatusTag/StatusTag";
import { Icon } from "../../icons/Icon";
import styles from "./DataTable.module.css";

/* ─── Public types ──────────────────────────────────────────────────────── */

export type ColumnSize = "S" | "M" | "L";

export type CellType =
  | "alerts"
  | "thumbnail"
  | "status"
  | "amount"
  | "date"
  | "icon"
  | "actions"
  | "expense-title"
  | "check"
  | "text-link"
  | "text"
  | "text-long";

export type ColumnDef = {
  /** Unique key — also used to look up cell data in RowData. */
  key: string;
  /** Header label. Omit to render no label text. */
  title?: string;
  /** Cell type determines which renderer is used. */
  type: CellType;
  /**
   * Column width class:
   * S = 60px min-width, M = 120px min-width, L = 220px min-width.
   * Fixed-width types (alerts, thumbnail, check, expense-title) ignore this.
   */
  size?: ColumnSize;
  /** Shows sort chevrons in the header. Fires onSort when clicked. */
  sortable?: boolean;
};

/* ─── Per-type cell data ────────────────────────────────────────────────── */

export type AlertsCellData = {
  warning?: boolean;
  duplicate?: boolean;
  policyAlert?: boolean;
};

export type StatusCellData = {
  label: string;
  variant?: StatusTagVariant;
};

export type AmountCellData = {
  amount: string;
  currency: string;
  /** Optional second amount (e.g. reimbursement currency). */
  amount2?: string;
  currency2?: string;
};

export type ThumbnailCellData = {
  src: string;
  alt?: string;
};

export type ActionsCellData = {
  icon: string;
  label?: string;
  onClick: () => void;
  secondary?: {
    icon: string;
    label?: string;
    onClick: () => void;
  };
};

export type AttributeType =
  | "manual-addition"
  | "split"
  | "email"
  | "card-statement"
  | "file-attached"
  | "guest"
  | "merged"
  | "medius-card"
  | "e-invoice"
  | "e-invoice-expected"
  | "e-invoice-not-expected"
  | "transaction-expected";

export type TitleCellData = {
  title: string;
  attributes?: AttributeType[];
};

export type LinkCellData = {
  text: string;
  href?: string;
  onClick?: () => void;
};

export type CheckCellData = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

/** Union of all cell data shapes — use the right one per column type. */
export type CellData =
  | AlertsCellData
  | StatusCellData
  | AmountCellData
  | ThumbnailCellData
  | ActionsCellData
  | TitleCellData
  | LinkCellData
  | CheckCellData
  | string    // text, text-long, date, icon (icon name)
  | null
  | undefined;

/** A single table row. `id` is required; other keys map to column keys. */
export type RowData = {
  id: string;
} & Record<string, CellData>;

/* ─── Main component props ──────────────────────────────────────────────── */

export interface DataTableProps {
  columns: ColumnDef[];
  rows: RowData[];
  /**
   * Prepends a checkbox column for row selection.
   * Works in both controlled and uncontrolled modes.
   */
  selectable?: boolean;
  /** Controlled: IDs of currently selected rows. */
  selectedIds?: string[];
  /** Controlled: called when selection changes. */
  onSelectionChange?: (ids: string[]) => void;
  /** Key of the currently sorted column. */
  sortKey?: string;
  /** Direction of the current sort. */
  sortDirection?: "asc" | "desc";
  /**
   * Called when a sortable header is clicked.
   * Toggles asc → desc → asc (no unsorted state).
   */
  onSort?: (key: string, direction: "asc" | "desc") => void;
  /** Called when a data row is clicked (excluding interactive cells). */
  onRowClick?: (id: string) => void;
  /** Shown centred inside the table when rows.length === 0. */
  emptyMessage?: string;
  className?: string;
}

/* ─── Attribute icon map ────────────────────────────────────────────────── */

const ATTRIBUTE_ICON: Record<AttributeType, string> = {
  "manual-addition":        "hardware--keyboard",
  "split":                  "communication--call-split",
  "email":                  "communication--email",
  "card-statement":         "actions--credit-card",
  "file-attached":          "editor--attach-file",
  "guest":                  "social--person-add",
  "merged":                 "editor--merge-type",
  "medius-card":            "actions--expensya-card",
  "e-invoice":              "actions--e-invoice",
  "e-invoice-expected":     "actions--e-invoice",
  "e-invoice-not-expected": "actions--no e-invoice",
  "transaction-expected":   "actions--transaction",
};

const ATTRIBUTE_LABEL: Record<AttributeType, string> = {
  "manual-addition":        "Manual addition",
  "split":                  "Split",
  "email":                  "Email",
  "card-statement":         "Card statement",
  "file-attached":          "File attached",
  "guest":                  "Guest",
  "merged":                 "Merged",
  "medius-card":            "Medius card",
  "e-invoice":              "E-invoice",
  "e-invoice-expected":     "E-invoice expected",
  "e-invoice-not-expected": "E-invoice not expected",
  "transaction-expected":   "Transaction expected",
};

const ATTRIBUTE_COLOR: Record<AttributeType, "neutral" | "blue" | "teal" | "dark" | "orange"> = {
  "manual-addition":        "neutral",
  "split":                  "neutral",
  "email":                  "neutral",
  "card-statement":         "neutral",
  "file-attached":          "neutral",
  "guest":                  "neutral",
  "merged":                 "neutral",
  "medius-card":            "teal",
  "e-invoice":              "blue",
  "e-invoice-expected":     "orange",
  "e-invoice-not-expected": "dark",
  "transaction-expected":   "orange",
};

/* ─── Internal: Header cell ─────────────────────────────────────────────── */

interface HeaderCellProps {
  col: ColumnDef;
  isSorted: boolean;
  sortDirection?: "asc" | "desc";
  onSort?: () => void;
}

function HeaderCell({ col, isSorted, sortDirection, onSort }: HeaderCellProps) {
  return (
    <div
      className={[
        styles.headerCell,
        col.size === "S" ? styles.headerCell_S : "",
        col.size === "L" ? styles.headerCell_L : "",
        col.type === "expense-title" ? styles.headerCell_title : "",
        col.type === "alerts" || col.type === "thumbnail" || col.type === "icon" || col.type === "actions"
          ? styles.headerCell_S : "",
        col.type === "check" ? styles.headerCell_check : "",
        col.type === "status" ? styles.headerCell_status : "",
      ].filter(Boolean).join(" ")}
    >
      {col.title && (
        <span className={styles.headerCellTitle}>{col.title}</span>
      )}
      {col.sortable && (
        <button
          type="button"
          className={[styles.sortBtn, isSorted ? styles.sortBtn_active : ""].filter(Boolean).join(" ")}
          onClick={onSort}
          aria-label={`Sort by ${col.title ?? col.key}`}
        >
          <span
            className={[
              styles.sortIcon,
              isSorted && sortDirection === "asc" ? styles.sortIcon_active : "",
            ].filter(Boolean).join(" ")}
            aria-hidden="true"
          >
            <Icon name={"navigation--expand-less" as never} size="small" />
          </span>
          <span
            className={[
              styles.sortIcon,
              isSorted && sortDirection === "desc" ? styles.sortIcon_active : "",
            ].filter(Boolean).join(" ")}
            aria-hidden="true"
          >
            <Icon name={"navigation--expand-more" as never} size="small" />
          </span>
        </button>
      )}
    </div>
  );
}

/* ─── Internal: Cell renderers ──────────────────────────────────────────── */

function AlertsCell({ data }: { data: AlertsCellData }) {
  return (
    <div className={styles.alertsCell}>
      {data.warning && (
        <span className={styles.alertIcon_warning} aria-label="Warning" title="Warning">
          <Icon name={"alert--warning-filled" as never} size="small" />
        </span>
      )}
      {data.duplicate && (
        <span className={styles.alertIcon_duplicate} aria-label="Duplicate" title="Duplicate">
          <Icon name={"content--file-copy" as never} size="small" />
        </span>
      )}
      {data.policyAlert && (
        <span className={styles.alertIcon_policy} aria-label="Policy alert" title="Policy alert">
          <Icon name={"actions--gavel" as never} size="small" />
        </span>
      )}
    </div>
  );
}

function ThumbnailCell({ data }: { data: ThumbnailCellData }) {
  return (
    <div className={styles.thumbnailCell}>
      <img
        src={data.src}
        alt={data.alt ?? "Receipt"}
        className={styles.thumbnailImg}
      />
    </div>
  );
}

function AmountCell({ data }: { data: AmountCellData }) {
  return (
    <div className={styles.amountCell}>
      <span className={styles.amountRow}>
        <span className={styles.amountValue}>{data.amount}</span>
        <span className={styles.amountCurrency}>{data.currency}</span>
      </span>
      {data.amount2 && (
        <span className={styles.amountRow}>
          <span className={styles.amountValue2}>{data.amount2}</span>
          <span className={styles.amountCurrency}>{data.currency2}</span>
        </span>
      )}
    </div>
  );
}

function TitleCell({ data }: { data: TitleCellData }) {
  return (
    <div className={styles.titleCell}>
      <span className={styles.titleText}>{data.title}</span>
      {data.attributes && data.attributes.length > 0 && (
        <span className={styles.titleAttributes}>
          {data.attributes.map((attr) => (
            <span
              key={attr}
              className={[
                styles.attrIcon,
                ATTRIBUTE_COLOR[attr] === "blue"   ? styles.attrIcon_blue   : "",
                ATTRIBUTE_COLOR[attr] === "teal"   ? styles.attrIcon_teal   : "",
                ATTRIBUTE_COLOR[attr] === "dark"   ? styles.attrIcon_dark   : "",
                ATTRIBUTE_COLOR[attr] === "orange" ? styles.attrIcon_orange : "",
              ].filter(Boolean).join(" ")}
              title={ATTRIBUTE_LABEL[attr]}
              aria-label={ATTRIBUTE_LABEL[attr]}
            >
              <Icon name={ATTRIBUTE_ICON[attr] as never} size="small" />
            </span>
          ))}
        </span>
      )}
    </div>
  );
}

function ActionsCell({ data }: { data: ActionsCellData }) {
  return (
    <div className={styles.actionsCell}>
      <Button
        hierarchy="secondary"
        size="small"
        iconOnly
        onClick={data.onClick}
        aria-label={data.label ?? "Action"}
        title={data.label}
      >
        <Icon name={data.icon as never} size="small" />
      </Button>
      {data.secondary && (
        <Button
          hierarchy="secondary"
          size="small"
          iconOnly
          onClick={data.secondary.onClick}
          aria-label={data.secondary.label ?? "Action"}
          title={data.secondary.label}
        >
          <Icon name={data.secondary.icon as never} size="small" />
        </Button>
      )}
    </div>
  );
}

function LinkCell({ data }: { data: LinkCellData }) {
  if (data.href) {
    return (
      <a href={data.href} className={styles.linkCell} onClick={data.onClick}>
        {data.text}
      </a>
    );
  }
  return (
    <button type="button" className={styles.linkCell} onClick={data.onClick}>
      {data.text}
    </button>
  );
}

/* ─── Internal: DataCell dispatcher ────────────────────────────────────── */

interface DataCellProps {
  col: ColumnDef;
  value: CellData;
}

function DataCell({ col, value }: DataCellProps) {
  const base = [
    styles.cell,
    col.size === "S" || col.type === "alerts" || col.type === "thumbnail" || col.type === "icon" || col.type === "actions"
      ? styles.cell_S : "",
    col.size === "L" || col.type === "text-long" ? styles.cell_L : "",
    col.type === "expense-title" ? styles.cell_title : "",
    col.type === "check" ? styles.cell_check : "",
    col.type === "date" ? styles.cell_date : "",
    col.type === "status" ? styles.cell_status : "",
  ].filter(Boolean).join(" ");

  switch (col.type) {
    case "alerts":
      return (
        <div className={base}>
          <AlertsCell data={(value as AlertsCellData) ?? {}} />
        </div>
      );
    case "thumbnail":
      return (
        <div className={base}>
          {value && <ThumbnailCell data={value as ThumbnailCellData} />}
        </div>
      );
    case "status":
      return (
        <div className={base}>
          {value && <StatusTag label={(value as StatusCellData).label} variant={(value as StatusCellData).variant} />}
        </div>
      );
    case "amount":
      return (
        <div className={base}>
          {value && <AmountCell data={value as AmountCellData} />}
        </div>
      );
    case "date":
      return (
        <div className={base}>
          <span className={styles.textCell}>{value as string}</span>
        </div>
      );
    case "icon":
      return (
        <div className={base}>
          {value && <Icon name={(value as string) as never} size="default" />}
        </div>
      );
    case "actions":
      return (
        <div className={base}>
          {value && <ActionsCell data={value as ActionsCellData} />}
        </div>
      );
    case "expense-title":
      return (
        <div className={base}>
          {value && <TitleCell data={value as TitleCellData} />}
        </div>
      );
    case "check":
      return (
        <div className={base}>
          {value != null && (
            <Checkbox
              checked={(value as CheckCellData).checked}
              onChange={(checked) => (value as CheckCellData).onChange?.(checked)}
            />
          )}
        </div>
      );
    case "text-link":
      return (
        <div className={base}>
          {value && <LinkCell data={value as LinkCellData} />}
        </div>
      );
    case "text":
    case "text-long":
    default:
      return (
        <div className={base}>
          <span className={styles.textCell}>{value as string}</span>
        </div>
      );
  }
}

/* ─── Main component ────────────────────────────────────────────────────── */

export function DataTable({
  columns,
  rows,
  selectable = false,
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  sortKey,
  sortDirection,
  onSort,
  onRowClick,
  emptyMessage = "No results found.",
  className,
}: DataTableProps) {
  // Uncontrolled selection state (fallback when no controlled ids provided)
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);

  const isControlled = controlledSelectedIds !== undefined;
  const selectedIds = isControlled ? controlledSelectedIds : internalSelectedIds;

  function handleSelectionChange(ids: string[]) {
    if (!isControlled) setInternalSelectedIds(ids);
    onSelectionChange?.(ids);
  }

  function toggleRow(id: string) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    handleSelectionChange(next);
  }

  function toggleAll() {
    if (selectedIds.length === rows.length) {
      handleSelectionChange([]);
    } else {
      handleSelectionChange(rows.map((r) => r.id));
    }
  }

  function handleSortClick(key: string) {
    const nextDir: "asc" | "desc" =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort?.(key, nextDir);
  }

  const allSelected   = rows.length > 0 && selectedIds.length === rows.length;
  const someSelected  = selectedIds.length > 0 && selectedIds.length < rows.length;

  return (
    <div
      className={[styles.table, className ?? ""].filter(Boolean).join(" ")}
      role="table"
      aria-label="Data table"
    >
      {/* ─── Header ─── */}
      <div className={styles.header} role="row">
        {selectable && (
          <div className={styles.headerCheckCell} role="columnheader">
            <Checkbox
              checked={allSelected ? true : someSelected ? "indeterminate" : false}
              onChange={toggleAll}
            />
          </div>
        )}
        {columns.map((col) => (
          <div key={col.key} role="columnheader" style={{ display: "contents" }}>
            <HeaderCell
              col={col}
              isSorted={sortKey === col.key}
              sortDirection={sortDirection}
              onSort={col.sortable ? () => handleSortClick(col.key) : undefined}
            />
          </div>
        ))}
      </div>

      {/* ─── Body ─── */}
      <div role="rowgroup">
        {rows.length === 0 ? (
          <div className={styles.emptyState} role="row">
            <span className={styles.emptyMessage}>{emptyMessage}</span>
          </div>
        ) : (
          rows.map((row) => {
            const isSelected = selectedIds.includes(row.id);
            return (
              <div
                key={row.id}
                className={[
                  styles.row,
                  isSelected ? styles.row_selected : "",
                ].filter(Boolean).join(" ")}
                role="row"
                aria-selected={selectable ? isSelected : undefined}
                onClick={() => onRowClick?.(row.id)}
              >
                {selectable && (
                  <div
                    className={styles.rowCheckCell}
                    role="cell"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                    />
                  </div>
                )}
                {columns.map((col) => (
                  <div key={col.key} role="cell" style={{ display: "contents" }}>
                    <DataCell col={col} value={row[col.key]} />
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
