import { useState, useId } from "react";
import type { ReactNode } from "react";
import { Banner } from "../Banner/Banner";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { LabelTag } from "../LabelTag/LabelTag";
import { Select } from "../Select/Select";
import { StatusTag } from "../StatusTag/StatusTag";
import type { StatusTagVariant } from "../StatusTag/StatusTag";
import { Tab, Tabs } from "../Tabs/Tabs";
import { TextArea } from "../TextArea/TextArea";
import { TextInput } from "../TextInput/TextInput";
import { Icon } from "../../icons/Icon";
import styles from "./ExpenseModal.module.css";

/* ─── Local FieldRow helper ─────────────────────────────────────────────── */
/* Renders a 120px label + flex-1 control area, bypassing the built-in
   160px label columns on TextInput / Select / TextArea.                    */

interface FieldRowProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
}

function FieldRow({ label, required, htmlFor, children }: FieldRowProps) {
  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel} htmlFor={htmlFor}>
        {label}
        {required && (
          <span className={styles.fieldRequired} aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>
      <div className={styles.fieldControl}>{children}</div>
    </div>
  );
}

/* ─── Option lists ──────────────────────────────────────────────────────── */

const CATEGORY_OPTIONS = [
  {
    value: "meals",
    label: "Meals & entertainment",
    icon: <Icon name="maps--local-dining" size="small" />,
  },
  {
    value: "travel",
    label: "Travel",
    icon: <Icon name="maps--flight" size="small" />,
  },
  {
    value: "hotel",
    label: "Hotel",
    icon: <Icon name="maps--hotel" size="small" />,
  },
  {
    value: "taxi",
    label: "Taxi & transport",
    icon: <Icon name="maps--local-taxi" size="small" />,
  },
];

const PAYMENT_OPTIONS = [
  { value: "company-card", label: "Company card" },
  { value: "personal-card", label: "Personal card" },
  { value: "cash", label: "Cash" },
  { value: "bank-transfer", label: "Bank transfer" },
];

const COUNTRY_OPTIONS = [
  { value: "se", label: "Sweden (SEK)" },
  { value: "us", label: "United States (USD)" },
  { value: "de", label: "Germany (EUR)" },
  { value: "gb", label: "United Kingdom (GBP)" },
  { value: "fr", label: "France (EUR)" },
];

const CURRENCY_OPTIONS = [
  { value: "eur", label: "EUR" },
  { value: "sek", label: "SEK" },
  { value: "usd", label: "USD" },
  { value: "gbp", label: "GBP" },
  { value: "nok", label: "NOK" },
];

const REPORT_OPTIONS = [
  { value: "q1-2024", label: "Q1 2024 Business travel" },
  { value: "q2-2024", label: "Q2 2024 Business travel" },
  { value: "conferences", label: "Conferences 2024" },
  { value: "none", label: "No report" },
];

const MODAL_TABS = [
  { value: "general", label: "General" },
  { value: "merchant", label: "Merchant" },
  { value: "guest", label: "Guest" },
  { value: "transaction", label: "Transaction", badge: 0 as const },
  { value: "attached-files", label: "Attached files", badge: 0 as const },
];

/* ─── Public types ──────────────────────────────────────────────────────── */

export interface ExpenseTag {
  label: string;
}

export interface ExpenseModalProps {
  /** Expense title shown in the modal header. Defaults to "Expense". */
  title?: string;
  /** Small label tags rendered next to the title. */
  tags?: ExpenseTag[];
  /** Status badge label. Defaults to "Draft". */
  statusLabel?: string;
  /** Status badge variant. Defaults to "neutral". */
  statusVariant?: StatusTagVariant;
  /** Show the dismissible info banner above the form. */
  showBanner?: boolean;
  /** Info banner message body. */
  bannerMessage?: string;
  /** Called when the × close button is clicked. */
  onClose?: () => void;
  /** Called when Save is clicked. */
  onSave?: () => void;
  /** Called when the → navigate-next button is clicked. */
  onNext?: () => void;
  className?: string;
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export function ExpenseModal({
  title = "Expense",
  tags = [
    { label: "e-invoice" },
    { label: "Medius card" },
    { label: "Merge" },
  ],
  statusLabel = "Draft",
  statusVariant = "neutral",
  showBanner = false,
  bannerMessage = "This expense has been flagged for review. Please verify the details before submitting.",
  onClose,
  onSave,
  onNext,
  className,
}: ExpenseModalProps) {
  /* Tab state */
  const [activeTab, setActiveTab] = useState("general");

  /* Banner visibility — starts from prop, user can dismiss */
  const [bannerVisible, setBannerVisible] = useState(showBanner);

  /* Form state */
  const [expenseTitle, setExpenseTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentInstrument, setPaymentInstrument] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("eur");
  const [billable, setBillable] = useState(false);
  const [reimburse, setReimburse] = useState(false);
  const [credit, setCredit] = useState(false);
  const [vat, setVat] = useState("");
  const [vatPct, setVatPct] = useState("");
  const [report, setReport] = useState("");
  const [description, setDescription] = useState("");

  /* Stable IDs for FieldRow htmlFor linkage */
  const uid = useId();
  const id = (suffix: string) => `${uid}-${suffix}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={[styles.modal, className ?? ""].filter(Boolean).join(" ")}
    >
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.headerTitle}>{title}</h2>
          {tags.length > 0 && (
            <div className={styles.headerTags}>
              {tags.map((tag) => (
                <LabelTag
                  key={tag.label}
                  label={tag.label}
                  size="small"
                  color="neutral"
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.headerRight}>
          <StatusTag label={statusLabel} variant={statusVariant} />

          <Button hierarchy="secondary" size="small">
            <span className={styles.actionsLabel}>
              Actions
              <Icon name="navigation--expand-more" size="small" />
            </span>
          </Button>

          <Button
            hierarchy="secondary"
            size="small"
            iconOnly
            aria-label="Close expense"
            onClick={onClose}
          >
            <Icon name="navigation--close" size="small" />
          </Button>
        </div>
      </div>

      {/* ─── Tabs ────────────────────────────────────────────────────── */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        {MODAL_TABS.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            badge={tab.badge}
          />
        ))}
      </Tabs>

      {/* ─── Optional dismissible banner ─────────────────────────────── */}
      {bannerVisible && (
        <Banner
          type="information"
          dismissible
          onDismiss={() => setBannerVisible(false)}
        >
          {bannerMessage}
        </Banner>
      )}

      {/* ─── Body ────────────────────────────────────────────────────── */}
      <div className={styles.body}>
        {/* Left: form fields */}
        <div className={styles.formColumn}>
          <FieldRow label="Title" required htmlFor={id("title")}>
            <TextInput
              id={id("title")}
              placeholder="Enter expense title"
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
            />
          </FieldRow>

          <FieldRow label="Date" required htmlFor={id("date")}>
            <TextInput
              id={id("date")}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FieldRow>

          <FieldRow label="Category" required>
            <Select
              id={id("category")}
              placeholder="Select category"
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
            />
          </FieldRow>

          <FieldRow label="Payment instrument" required>
            <Select
              id={id("payment")}
              placeholder="Select payment method"
              value={paymentInstrument}
              onChange={setPaymentInstrument}
              options={PAYMENT_OPTIONS}
              leadingIcon={<Icon name="actions--credit-card" size="small" />}
            />
          </FieldRow>

          <FieldRow label="Country" required>
            <Select
              id={id("country")}
              placeholder="Select country"
              value={country}
              onChange={setCountry}
              options={COUNTRY_OPTIONS}
            />
          </FieldRow>

          <FieldRow label="Amount (tax incl.)" required>
            <div className={styles.splitRow}>
              <TextInput
                id={id("amount")}
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={styles.splitPrimary}
              />
              <Select
                id={id("currency")}
                value={currency}
                onChange={setCurrency}
                options={CURRENCY_OPTIONS}
                className={styles.splitSecondary}
              />
            </div>
          </FieldRow>

          <FieldRow label="Flags">
            <div className={styles.checkboxGroup}>
              <Checkbox
                checked={billable}
                onChange={setBillable}
                label="Billable to client"
              />
              <Checkbox
                checked={reimburse}
                onChange={setReimburse}
                label="To reimburse"
              />
              <Checkbox
                checked={credit}
                onChange={setCredit}
                label="Credit"
              />
            </div>
          </FieldRow>

          <FieldRow label="VAT">
            <div className={styles.splitRow}>
              <TextInput
                id={id("vat")}
                placeholder="0.00"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                className={styles.splitPrimary}
              />
              <TextInput
                id={id("vat-pct")}
                placeholder="0"
                value={vatPct}
                onChange={(e) => setVatPct(e.target.value)}
                unit="%"
                className={styles.vatPercent}
              />
            </div>
          </FieldRow>

          <div className={styles.addVatLine}>
            <Button
              hierarchy="secondary"
              size="small"
              icon={<Icon name="content--add" size="small" />}
            >
              Add extra VAT line
            </Button>
          </div>

          <FieldRow label="Report">
            <Select
              id={id("report")}
              placeholder="Assign to report"
              value={report}
              onChange={setReport}
              options={REPORT_OPTIONS}
            />
          </FieldRow>

          <FieldRow label="Description">
            <TextArea
              id={id("description")}
              placeholder="Enter a description…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </FieldRow>
        </div>

        {/* Right: receipt placeholder + save actions */}
        <div className={styles.previewColumn}>
          {/* Receipt placeholder — the real receipt viewer is not a component yet */}
          <div className={styles.receiptPlaceholder} aria-label="Receipt preview area">
            <span className={styles.receiptIcon} aria-hidden="true">
              <Icon name="editor--attach-file" size="large" />
            </span>
            <span className={styles.receiptLabel}>No receipt attached</span>
          </div>

          {/* Save row */}
          <div className={styles.saveRow}>
            <Button
              hierarchy="secondary"
              iconOnly
              aria-label="Next expense"
              onClick={onNext}
            >
              <Icon name="navigation--arrow-forward" size="small" />
            </Button>

            <Button hierarchy="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
