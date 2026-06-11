/**
 * Mock data — Payment domain
 * Covers: Transactions, Advances, Payment Instruments, Bank Accounts, Role Management
 */

import type { Currency, StatusTagVariant } from "./expenses";

/* ─── Transaction ────────────────────────────────────────────────────────── */

export type TransactionStatus = "matched" | "unmatched" | "ignored";

export const TRANSACTION_STATUS_META: Record<
  TransactionStatus,
  { label: string; variant: StatusTagVariant }
> = {
  matched:   { label: "Matched",   variant: "green"  },
  unmatched: { label: "Unmatched", variant: "yellow" },
  ignored:   { label: "Ignored",   variant: "grey"   },
};

export interface PaymentTransaction {
  id:            string;
  date:          string;
  description:   string;
  merchantName:  string;
  amount:        number;
  currency:      Currency;
  cardLastFour:  string;
  userId:        string;   // FK → User.id
  expenseId?:    string;   // FK → Expense.id (when matched)
  status:        TransactionStatus;
}

export const TRANSACTIONS: PaymentTransaction[] = [
  { id: "tx-001", date: "2026-06-08", description: "UBER TRIP",          merchantName: "Uber",            amount: 24.50,  currency: "EUR", cardLastFour: "4242", userId: "u-003", expenseId: "exp-003", status: "matched"   },
  { id: "tx-002", date: "2026-06-07", description: "MARRIOTT HOTELS",    merchantName: "Marriott",        amount: 320.00, currency: "EUR", cardLastFour: "4242", userId: "u-002", expenseId: "exp-002", status: "matched"   },
  { id: "tx-003", date: "2026-06-06", description: "LUFTHANSA AIRLINES", merchantName: "Lufthansa",       amount: 487.00, currency: "EUR", cardLastFour: "8910", userId: "u-002",                       status: "unmatched" },
  { id: "tx-004", date: "2026-06-05", description: "CAFE DE FLORE",      merchantName: "Café de Flore",   amount: 62.00,  currency: "EUR", cardLastFour: "4242", userId: "u-001",                       status: "unmatched" },
  { id: "tx-005", date: "2026-06-04", description: "AMAZON BUSINESS",    merchantName: "Amazon",          amount: 145.99, currency: "GBP", cardLastFour: "1234", userId: "u-009", expenseId: "exp-009", status: "matched"   },
  { id: "tx-006", date: "2026-06-03", description: "SHELL PETROL",       merchantName: "Shell",           amount: 88.40,  currency: "EUR", cardLastFour: "5678", userId: "u-006",                       status: "ignored"   },
  { id: "tx-007", date: "2026-06-02", description: "RESTAURANT LE DOME", merchantName: "Le Dôme",         amount: 210.00, currency: "EUR", cardLastFour: "4242", userId: "u-001",                       status: "unmatched" },
  { id: "tx-008", date: "2026-06-01", description: "IKEA BUSINESS",      merchantName: "IKEA",            amount: 530.00, currency: "SEK", cardLastFour: "9012", userId: "u-007", expenseId: "exp-007", status: "matched"   },
];

/* ─── Advance ────────────────────────────────────────────────────────────── */

export type AdvanceStatus = "requested" | "approved" | "paid" | "settled" | "rejected";

export const ADVANCE_STATUS_META: Record<
  AdvanceStatus,
  { label: string; variant: StatusTagVariant }
> = {
  requested: { label: "Requested", variant: "neutral" },
  approved:  { label: "Approved",  variant: "blue"    },
  paid:      { label: "Paid",      variant: "green"   },
  settled:   { label: "Settled",   variant: "grey"    },
  rejected:  { label: "Rejected",  variant: "red"     },
};

export interface Advance {
  id:          string;
  userId:      string;   // FK → User.id
  amount:      number;
  currency:    Currency;
  purpose:     string;
  requestDate: string;
  paymentDate?: string;
  status:      AdvanceStatus;
  note?:       string;
}

export const ADVANCES: Advance[] = [
  { id: "adv-001", userId: "u-002", amount: 1500, currency: "EUR", purpose: "Stockholm conference travel",       requestDate: "2026-05-20", paymentDate: "2026-05-22", status: "paid"      },
  { id: "adv-002", userId: "u-003", amount: 400,  currency: "EUR", purpose: "Team offsite supplies",            requestDate: "2026-06-01",                            status: "approved"  },
  { id: "adv-003", userId: "u-006", amount: 800,  currency: "SEK", purpose: "Client entertainment",             requestDate: "2026-06-05",                            status: "requested" },
  { id: "adv-004", userId: "u-007", amount: 2000, currency: "EUR", purpose: "Trade show Paris",                 requestDate: "2026-05-10", paymentDate: "2026-05-15", status: "settled"   },
  { id: "adv-005", userId: "u-009", amount: 250,  currency: "GBP", purpose: "Training materials",               requestDate: "2026-06-08",                            status: "rejected", note: "Out of budget period" },
];

/* ─── Payment Instrument ─────────────────────────────────────────────────── */

export type InstrumentType = "company-card" | "personal-card" | "bank-transfer" | "cash";

export const INSTRUMENT_TYPE_LABELS: Record<InstrumentType, string> = {
  "company-card":   "Company card",
  "personal-card":  "Personal card",
  "bank-transfer":  "Bank transfer",
  "cash":           "Cash",
};

export interface PaymentInstrumentRecord {
  id:         string;
  name:       string;
  type:       InstrumentType;
  lastFour?:  string;
  provider?:  string;
  currency:   Currency;
  userId?:    string;   // FK → User.id (undefined = shared/company)
  active:     boolean;
}

export const PAYMENT_INSTRUMENTS: PaymentInstrumentRecord[] = [
  { id: "pi-001", name: "Medius Corporate Visa",   type: "company-card",  lastFour: "4242", provider: "Visa",       currency: "EUR", active: true  },
  { id: "pi-002", name: "Medius Corporate Visa",   type: "company-card",  lastFour: "8910", provider: "Visa",       currency: "SEK", active: true  },
  { id: "pi-003", name: "Amelia's personal card",  type: "personal-card", lastFour: "1234", provider: "Mastercard", currency: "GBP", userId: "u-009", active: true  },
  { id: "pi-004", name: "James Wilson – BACS",     type: "bank-transfer",                                            currency: "GBP", userId: "u-004", active: true  },
  { id: "pi-005", name: "Petty cash – Paris",      type: "cash",                                                     currency: "EUR", active: true  },
  { id: "pi-006", name: "Old corporate Amex",      type: "company-card",  lastFour: "0099", provider: "Amex",       currency: "EUR", active: false },
];

/* ─── Bank Account ───────────────────────────────────────────────────────── */

export interface BankAccount {
  id:        string;
  name:      string;
  iban:      string;
  bic:       string;
  currency:  Currency;
  bank:      string;
  country:   string;
  userId?:   string;   // FK → User.id (undefined = company account)
  primary:   boolean;
}

export const BANK_ACCOUNTS: BankAccount[] = [
  { id: "ba-001", name: "Acme Corp — Main (EUR)", iban: "FR76 3000 6000 0112 3456 7890 189", bic: "BNPAFRPP", currency: "EUR", bank: "BNP Paribas",    country: "France", primary: true  },
  { id: "ba-002", name: "Acme Corp — SEK",        iban: "SE35 5000 0000 0549 1000 0003",     bic: "ESSESESS", currency: "SEK", bank: "SEB",            country: "Sweden", primary: false },
  { id: "ba-003", name: "James Wilson",            iban: "GB29 NWBK 6016 1331 9268 19",      bic: "NWBKGB2L", currency: "GBP", bank: "NatWest",        country: "UK",     userId: "u-004", primary: true  },
  { id: "ba-004", name: "Amelia Clarke",           iban: "GB82 WEST 1234 5698 7654 32",      bic: "WESTGB2L", currency: "GBP", bank: "Lloyds Bank",    country: "UK",     userId: "u-009", primary: true  },
  { id: "ba-005", name: "Sophie Martin",           iban: "FR76 1027 8060 0100 0020 0620 945", bic: "CMCIFRPP", currency: "EUR", bank: "Crédit Mutuel",  country: "France", userId: "u-001", primary: true  },
];

/* ─── Role Management ────────────────────────────────────────────────────── */

export interface RoleDefinition {
  id:          string;
  name:        string;
  description: string;
  userCount:   number;
  permissions: string[];
}

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    id: "role-001", name: "Admin",
    description: "Full access to all settings and data",
    userCount: 1,
    permissions: ["manage-users", "manage-settings", "approve-expenses", "export-data", "view-reports", "manage-roles"],
  },
  {
    id: "role-002", name: "Manager",
    description: "Can approve expenses for their team",
    userCount: 2,
    permissions: ["approve-expenses", "view-reports", "view-team-expenses"],
  },
  {
    id: "role-003", name: "Employee",
    description: "Can create and submit their own expenses",
    userCount: 5,
    permissions: ["create-expenses", "submit-expenses", "view-own-expenses"],
  },
  {
    id: "role-004", name: "Accountant",
    description: "Can export and reconcile expenses",
    userCount: 1,
    permissions: ["export-data", "view-reports", "view-all-expenses", "manage-payment"],
  },
  {
    id: "role-005", name: "Auditor",
    description: "Read-only access to all financial data",
    userCount: 1,
    permissions: ["view-all-expenses", "view-reports"],
  },
];
