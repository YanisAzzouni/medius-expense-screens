/**
 * Mock expense database for Medius Expense prototyping.
 *
 * Structure mirrors the ExpenseModal fields exactly so any screen can read from
 * and write to the same source of truth.
 *
 * Import pattern:
 *   import { EXPENSES, REPORTS, EXPENSE_STATUS_META, CATEGORY_ICON } from "../data/expenses";
 */

import invoice1  from "../assets/Invoice-list/invoice1.png";
import invoice2  from "../assets/Invoice-list/invoice2.png";
import invoice3  from "../assets/Invoice-list/invoice3.png";
import invoice4  from "../assets/Invoice-list/invoice4.png";
import invoice5  from "../assets/Invoice-list/invoice5.avif";
import invoice6  from "../assets/Invoice-list/invoice6.png";
import invoice7  from "../assets/Invoice-list/invoice7.avif";
import invoice8  from "../assets/Invoice-list/invoice8.png";
import invoice9  from "../assets/Invoice-list/invoice9.png";
import invoice10 from "../assets/Invoice-list/invoice10.png";

/* ─── Enums / union types ───────────────────────────────────────────────── */

export type ExpenseStatus =
  | "draft"
  | "to-review"
  | "to-submit"
  | "submitted"
  | "approved"
  | "exported"
  | "rejected";

export type ExpenseCategory =
  | "car"
  | "diesel"
  | "electricity"
  | "entertainment"
  | "equipment"
  | "flight"
  | "fuel"
  | "gas-utility"
  | "internet"
  | "lodging"
  | "meals"
  | "mileage"
  | "misc"
  | "parking"
  | "phone"
  | "postal-charges"
  | "rent"
  | "services"
  | "taxi"
  | "toll"
  | "transportation"
  | "water";

export type PaymentInstrument =
  | "company-card"
  | "personal-card"
  | "cash"
  | "bank-transfer";

export type CountryCode = "fr" | "se" | "us" | "de" | "gb";

export type Currency = "EUR" | "SEK" | "USD" | "GBP" | "NOK";

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

/* ─── Sub-object types ──────────────────────────────────────────────────── */

export interface Merchant {
  name: string;
  vatNumber?: string;
  organizationNumber?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

export interface Guest {
  name: string;
  email?: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: Currency;
  cardLastFour?: string;
  description?: string;
}

/* ─── Report ────────────────────────────────────────────────────────────── */

export interface Report {
  id: string;
  label: string;
}

export const REPORTS: Report[] = [
  { id: "client-meetings", label: "Client meetings" },
  { id: "team-meetings",   label: "Team meetings"   },
  { id: "trip-sweden",     label: "Trip to Sweden"  },
  { id: "parking",         label: "Parking"         },
  { id: "trainings",       label: "Trainings"       },
  { id: "q1-2026",         label: "Q1 2026"         },
  { id: "conferences",     label: "Conferences"     },
  { id: "none",            label: "No report"       },
];

/* ─── Status display metadata ───────────────────────────────────────────── */

export type StatusTagVariant =
  | "neutral" | "grey" | "blue" | "green" | "yellow" | "red" | "orange";

export const EXPENSE_STATUS_META: Record<
  ExpenseStatus,
  { label: string; variant: StatusTagVariant }
> = {
  "draft":      { label: "Draft",      variant: "neutral" },
  "to-review":  { label: "To review",  variant: "neutral" },
  "to-submit":  { label: "To submit",  variant: "blue"    },
  "submitted":  { label: "Submitted",  variant: "yellow"  },
  "approved":   { label: "Approved",   variant: "green"   },
  "exported":   { label: "Exported",   variant: "grey"    },
  "rejected":   { label: "Rejected",   variant: "red"     },
};

/* ─── Category → DataTable icon name ───────────────────────────────────── */

export const CATEGORY_ICON: Record<ExpenseCategory, string> = {
  "car":            "maps--directions-car",
  "diesel":         "maps--local-gas-station",
  "electricity":    "actions--offline-bolt",
  "entertainment":  "actions--theaters",
  "equipment":      "hardware--computer",
  "flight":         "maps--flight",
  "fuel":           "maps--local-gas-station",
  "gas-utility":    "maps--local-gas-station",
  "internet":       "device--network-wifi",
  "lodging":        "maps--hotel",
  "meals":          "maps--local-dining",
  "mileage":        "maps--directions-car",
  "misc":           "navigation--more-vert",
  "parking":        "maps--local-parking",
  "phone":          "maps--local-phone",
  "postal-charges": "maps--local-post-office",
  "rent":           "actions--home",
  "services":       "hardware--headset",
  "taxi":           "maps--local-taxi",
  "toll":           "actions--toll",
  "transportation": "maps--train",
  "water":          "maps--local-drink",
};

/* ─── Country display labels ────────────────────────────────────────────── */

export const COUNTRY_LABEL: Record<CountryCode, string> = {
  fr: "France (EUR)",
  se: "Sweden (SEK)",
  us: "United States (USD)",
  de: "Germany (EUR)",
  gb: "United Kingdom (GBP)",
};

/* ─── Main Expense type ─────────────────────────────────────────────────── */

export interface Expense {
  id: string;

  /* ── Header & list ── */
  title: string;
  status: ExpenseStatus;
  tags: string[];              // e.g. ["e-invoice", "Medius card"]
  attributes: AttributeType[]; // icon badges shown in the title cell
  receiptImage?: string;       // imported asset URL
  alerts: {
    warning?: boolean;
    duplicate?: boolean;
    policyAlert?: boolean;
  };

  /* ── General tab ── */
  date: string;                // ISO date string, e.g. "2026-09-01"
  category: ExpenseCategory;
  paymentInstrument: PaymentInstrument;
  country: CountryCode;
  amount: number;
  currency: Currency;
  reimbursementAmount?: number;   // amount in a second currency (e.g. SEK)
  reimbursementCurrency?: Currency;
  billable: boolean;
  reimburse: boolean;
  credit: boolean;
  vat: number;
  vatPct: number;              // e.g. 20 for 20%
  reportId: string;            // FK → Report.id
  description: string;

  /* ── Merchant tab ── */
  merchant?: Merchant;

  /* ── Guests tab ── */
  guests?: Guest[];

  /* ── Related transactions tab ── */
  transactions?: Transaction[];

  /* ── Optional warning banner ── */
  showBanner?: boolean;
  bannerMessage?: string;
}

/* ─── Mock data ─────────────────────────────────────────────────────────── */

export const EXPENSES: Expense[] = [
  /* 1 ── Client Meeting - Coffee & Pastries ──────────────────────────────── */
  {
    id: "1",
    title: "Client Meeting - Coffee & Pastries",
    status: "to-review",
    tags: ["email"],
    attributes: ["email"],
    receiptImage: invoice1,
    alerts: {},
    date: "2026-09-01",
    category: "meals",
    paymentInstrument: "personal-card",
    country: "fr",
    amount: 35.00,
    currency: "EUR",
    billable: true,
    reimburse: true,
    credit: false,
    vat: 5.83,
    vatPct: 20,
    reportId: "client-meetings",
    description: "Coffee and pastries for client kickoff meeting with Accenture.",
    merchant: {
      name: "Café de Flore",
      vatNumber: "FR76123456789",
      address: "172 Boulevard Saint-Germain",
      city: "Paris",
      zipCode: "75006",
    },
    guests: [
      { name: "Sophie Martin",    email: "sophie.martin@accenture.com"  },
      { name: "Thomas Legrand",   email: "thomas.legrand@accenture.com" },
    ],
  },

  /* 2 ── Team Lunch - Burgers & Fries ────────────────────────────────────── */
  {
    id: "2",
    title: "Team Lunch - Burgers & Fries",
    status: "to-review",
    tags: ["Medius card"],
    attributes: ["medius-card", "transaction-expected"],
    receiptImage: invoice2,
    alerts: {},
    date: "2026-08-13",
    category: "meals",
    paymentInstrument: "company-card",
    country: "fr",
    amount: 67.00,
    currency: "EUR",
    billable: false,
    reimburse: false,
    credit: false,
    vat: 11.17,
    vatPct: 20,
    reportId: "team-meetings",
    description: "Team lunch after the Q3 planning workshop.",
    merchant: {
      name: "Big Fernand",
      vatNumber: "FR52987654321",
      address: "55 Rue du Faubourg Saint-Denis",
      city: "Paris",
      zipCode: "75010",
    },
    transactions: [
      {
        id: "TXN-20260813-001",
        date: "2026-08-13",
        amount: 67.00,
        currency: "EUR",
        cardLastFour: "4821",
        description: "BIG FERNAND PARIS",
      },
    ],
  },

  /* 3 ── Taxi Fare - Office to Restaurant ────────────────────────────────── */
  {
    id: "3",
    title: "Taxi Fare - Office to Restaurant",
    status: "to-submit",
    tags: ["Medius card"],
    attributes: ["medius-card"],
    receiptImage: invoice3,
    alerts: { warning: true },
    showBanner: true,
    bannerMessage: "Amount exceeds the per-trip taxi policy limit of €30. Please add a justification.",
    date: "2026-08-09",
    category: "taxi",
    paymentInstrument: "company-card",
    country: "fr",
    amount: 35.50,
    currency: "EUR",
    billable: true,
    reimburse: false,
    credit: false,
    vat: 0,
    vatPct: 0,
    reportId: "client-meetings",
    description: "Taxi from office to client restaurant for the Accenture dinner.",
    merchant: {
      name: "Île-de-france Mobilités",
      address: "39 bis-41 rue de Châteaudun",
      city: "Paris",
      zipCode: "75009",
    },
    transactions: [
      {
        id: "TXN-20260809-001",
        date: "2026-08-09",
        amount: 35.50,
        currency: "EUR",
        cardLastFour: "4821",
        description: "TAXI PARISIEN",
      },
    ],
  },

  /* 4 ── Client Dinner - Osteria Francescana ──────────────────────────────── */
  {
    id: "4",
    title: "Client Dinner - Osteria Francescana",
    status: "to-submit",
    tags: ["e-invoice"],
    attributes: ["manual-addition", "e-invoice"],
    receiptImage: invoice4,
    alerts: {},
    date: "2026-08-09",
    category: "meals",
    paymentInstrument: "personal-card",
    country: "it",
    amount: 94.00,
    currency: "EUR",
    billable: true,
    reimburse: true,
    credit: false,
    vat: 9.40,
    vatPct: 10,
    reportId: "client-meetings",
    description: "Client dinner with leadership team. Discussed roadmap for 2027.",
    merchant: {
      name: "Osteria Francescana",
      vatNumber: "IT02345678901",
      organizationNumber: "02345678901",
      address: "Via Stella 22",
      city: "Modena",
      zipCode: "41121",
    },
    guests: [
      { name: "Luca Rossi",    email: "l.rossi@cliente.it"       },
      { name: "Giulia Bianchi" },
      { name: "Marco Ferrari",  email: "m.ferrari@cliente.it"    },
    ],
  },

  /* 5 ── Parking Fee - Downtown Office ───────────────────────────────────── */
  {
    id: "5",
    title: "Parking Fee - Downtown Office",
    status: "submitted",
    tags: [],
    attributes: [],
    receiptImage: invoice5,
    alerts: {},
    date: "2026-08-03",
    category: "parking",
    paymentInstrument: "cash",
    country: "fr",
    amount: 13.00,
    currency: "EUR",
    billable: false,
    reimburse: true,
    credit: false,
    vat: 0,
    vatPct: 0,
    reportId: "parking",
    description: "Parking at Parking Haussmann for client visit.",
    merchant: {
      name: "Indigo Park",
      address: "15 Rue de la Victoire",
      city: "Paris",
      zipCode: "75009",
    },
  },

  /* 6 ── Training - Online Course ────────────────────────────────────────── */
  {
    id: "6",
    title: "Training - Online Course",
    status: "submitted",
    tags: ["Medius card", "e-invoice"],
    attributes: ["medius-card", "e-invoice"],
    receiptImage: invoice6,
    alerts: { policyAlert: true },
    showBanner: true,
    bannerMessage: "This expense is flagged by policy: training expenses require manager pre-approval.",
    date: "2026-07-14",
    category: "services",
    paymentInstrument: "company-card",
    country: "us",
    amount: 120.00,
    currency: "EUR",
    billable: false,
    reimburse: false,
    credit: false,
    vat: 0,
    vatPct: 0,
    reportId: "trainings",
    description: "Udemy course: Advanced React patterns and design systems.",
    merchant: {
      name: "Udemy Inc.",
      vatNumber: "IE9825613N",
      organizationNumber: "US-7654321",
      address: "600 Harrison Street",
      city: "San Francisco",
      zipCode: "94107",
    },
    transactions: [
      {
        id: "TXN-20260714-001",
        date: "2026-07-14",
        amount: 120.00,
        currency: "EUR",
        cardLastFour: "4821",
        description: "UDEMY.COM",
      },
    ],
  },

  /* 7 ── Uber - Hotel to Airport ─────────────────────────────────────────── */
  {
    id: "7",
    title: "Uber - Hotel to Airport",
    status: "submitted",
    tags: ["file attached"],
    attributes: ["file-attached"],
    receiptImage: invoice7,
    alerts: { duplicate: true },
    showBanner: true,
    bannerMessage: "This expense may be a duplicate of expense #9 on the same date and amount range.",
    date: "2026-07-07",
    category: "taxi",
    paymentInstrument: "personal-card",
    country: "se",
    amount: 85.00,
    currency: "EUR",
    reimbursementAmount: 980.75,
    reimbursementCurrency: "SEK",
    billable: false,
    reimburse: true,
    credit: false,
    vat: 0,
    vatPct: 0,
    reportId: "trip-sweden",
    description: "Uber from Nobis Hotel to Stockholm Arlanda airport.",
    merchant: {
      name: "Uber Sweden AB",
      vatNumber: "SE556656688901",
      city: "Stockholm",
    },
    transactions: [
      {
        id: "TXN-20260707-001",
        date: "2026-07-07",
        amount: 980.75,
        currency: "SEK",
        cardLastFour: "3391",
        description: "UBER *TRIP",
      },
    ],
  },

  /* 8 ── Hotel Stay - Sweden ──────────────────────────────────────────────── */
  {
    id: "8",
    title: "Hotel Stay - Sweden",
    status: "approved",
    tags: ["Medius card"],
    attributes: ["medius-card", "e-invoice-not-expected"],
    receiptImage: invoice8,
    alerts: {},
    date: "2026-07-07",
    category: "lodging",
    paymentInstrument: "company-card",
    country: "se",
    amount: 345.00,
    currency: "EUR",
    reimbursementAmount: 3980.00,
    reimbursementCurrency: "SEK",
    billable: false,
    reimburse: false,
    credit: false,
    vat: 62.73,
    vatPct: 12,
    reportId: "trip-sweden",
    description: "2 nights at Nobis Hotel Stockholm for the Medius partner summit.",
    merchant: {
      name: "Nobis Hotel Stockholm",
      vatNumber: "SE556123789001",
      organizationNumber: "556123-7890",
      address: "Norrmalmstorg 2–4",
      city: "Stockholm",
      zipCode: "111 86",
    },
    transactions: [
      {
        id: "TXN-20260705-001",
        date: "2026-07-05",
        amount: 1990.00,
        currency: "SEK",
        cardLastFour: "4821",
        description: "NOBIS HOTEL STOCKHOLM - CHECK-IN",
      },
      {
        id: "TXN-20260707-002",
        date: "2026-07-07",
        amount: 1990.00,
        currency: "SEK",
        cardLastFour: "4821",
        description: "NOBIS HOTEL STOCKHOLM - CHECK-OUT",
      },
    ],
  },

  /* 9 ── Uber - Airport to Office ────────────────────────────────────────── */
  {
    id: "9",
    title: "Uber - Airport to Office",
    status: "exported",
    tags: ["Medius card"],
    attributes: ["medius-card"],
    receiptImage: invoice9,
    alerts: {},
    date: "2026-07-07",
    category: "taxi",
    paymentInstrument: "company-card",
    country: "fr",
    amount: 1200.00,
    currency: "EUR",
    billable: false,
    reimburse: false,
    credit: false,
    vat: 0,
    vatPct: 0,
    reportId: "trip-sweden",
    description: "Uber Black from CDG airport back to the office after Sweden trip.",
    merchant: {
      name: "Uber France SAS",
      vatNumber: "FR45529234794",
      city: "Paris",
      zipCode: "75008",
    },
    transactions: [
      {
        id: "TXN-20260707-003",
        date: "2026-07-07",
        amount: 1200.00,
        currency: "EUR",
        cardLastFour: "4821",
        description: "UBER *TRIP CDG",
      },
    ],
  },

  /* 10 ── Flight to Sweden ────────────────────────────────────────────────── */
  {
    id: "10",
    title: "Flight to Sweden",
    status: "exported",
    tags: [],
    attributes: [],
    receiptImage: invoice10,
    alerts: {},
    date: "2026-07-07",
    category: "flight",
    paymentInstrument: "company-card",
    country: "se",
    amount: 440.00,
    currency: "EUR",
    billable: false,
    reimburse: false,
    credit: false,
    vat: 0,
    vatPct: 0,
    reportId: "trip-sweden",
    description: "Round-trip economy flight CDG ↔ ARN for Medius partner summit.",
    merchant: {
      name: "Air France",
      vatNumber: "FR57552043002",
      organizationNumber: "552043-002",
      address: "45 rue de Paris",
      city: "Roissy-en-France",
      zipCode: "95747",
    },
    transactions: [
      {
        id: "TXN-20260620-001",
        date: "2026-06-20",
        amount: 440.00,
        currency: "EUR",
        cardLastFour: "4821",
        description: "AIR FRANCE CDG-ARN-CDG",
      },
    ],
  },

  /* 11 ── Team Dinner - Quarterly review ──────────────────────────────────── */
  {
    id: "11",
    title: "Team Dinner - Quarterly Review",
    status: "draft",
    tags: [],
    attributes: ["manual-addition"],
    receiptImage: undefined,
    alerts: {},
    date: "2026-10-02",
    category: "meals",
    paymentInstrument: "personal-card",
    country: "fr",
    amount: 198.50,
    currency: "EUR",
    billable: false,
    reimburse: true,
    credit: false,
    vat: 33.08,
    vatPct: 20,
    reportId: "team-meetings",
    description: "Team dinner after Q3 quarterly business review.",
    merchant: {
      name: "Le Grand Véfour",
      vatNumber: "FR88123001234",
      address: "17 Rue de Beaujolais",
      city: "Paris",
      zipCode: "75001",
    },
    guests: [
      { name: "Yanis Azzouni",   email: "yanis.azzouni@medius.com"   },
      { name: "Camille Dupont",  email: "camille.dupont@medius.com"  },
      { name: "Antoine Bernard", email: "antoine.bernard@medius.com" },
      { name: "Marie Leclerc",   email: "marie.leclerc@medius.com"   },
    ],
  },

  /* 12 ── Conference ticket - UX London ───────────────────────────────────── */
  {
    id: "12",
    title: "Conference Ticket - UX London",
    status: "to-submit",
    tags: ["e-invoice"],
    attributes: ["e-invoice-expected"],
    receiptImage: undefined,
    alerts: {},
    date: "2026-06-10",
    category: "services",
    paymentInstrument: "personal-card",
    country: "gb",
    amount: 649.00,
    currency: "GBP",
    reimbursementAmount: 762.18,
    reimbursementCurrency: "EUR",
    billable: false,
    reimburse: true,
    credit: false,
    vat: 108.17,
    vatPct: 20,
    reportId: "conferences",
    description: "Full access pass for UX London 2026 conference.",
    merchant: {
      name: "UX London Ltd",
      vatNumber: "GB123456789",
      address: "30 Euston Square",
      city: "London",
      zipCode: "NW1 2FB",
    },
  },

  /* 13 ── Software subscription - Figma ───────────────────────────────────── */
  {
    id: "13",
    title: "Software Subscription - Figma",
    status: "approved",
    tags: ["Medius card", "e-invoice"],
    attributes: ["medius-card", "e-invoice"],
    receiptImage: undefined,
    alerts: {},
    date: "2026-05-01",
    category: "services",
    paymentInstrument: "company-card",
    country: "us",
    amount: 45.00,
    currency: "USD",
    reimbursementAmount: 41.67,
    reimbursementCurrency: "EUR",
    billable: false,
    reimburse: false,
    credit: false,
    vat: 0,
    vatPct: 0,
    reportId: "q1-2026",
    description: "Monthly Figma Professional plan — design team seat.",
    merchant: {
      name: "Figma Inc.",
      vatNumber: "US-EIN-47-1940984",
      address: "760 Market Street, Floor 10",
      city: "San Francisco",
      zipCode: "94102",
    },
    transactions: [
      {
        id: "TXN-20260501-001",
        date: "2026-05-01",
        amount: 45.00,
        currency: "USD",
        cardLastFour: "4821",
        description: "FIGMA.COM SUBSCRIPTION",
      },
    ],
  },

  /* 14 ── Client breakfast - Accenture ────────────────────────────────────── */
  {
    id: "14",
    title: "Client Breakfast - Accenture",
    status: "rejected",
    tags: [],
    attributes: ["manual-addition"],
    receiptImage: undefined,
    alerts: { policyAlert: true },
    showBanner: true,
    bannerMessage: "Rejected: missing receipt. Please attach the original receipt and resubmit.",
    date: "2026-05-20",
    category: "meals",
    paymentInstrument: "personal-card",
    country: "fr",
    amount: 87.00,
    currency: "EUR",
    billable: true,
    reimburse: true,
    credit: false,
    vat: 14.50,
    vatPct: 20,
    reportId: "client-meetings",
    description: "Breakfast meeting at client site to align on deliverables.",
    guests: [
      { name: "Jean-Marc Petit", email: "jm.petit@accenture.com" },
    ],
  },

  /* 15 ── Rental car - Germany trip ───────────────────────────────────────── */
  {
    id: "15",
    title: "Rental Car - Germany Trip",
    status: "submitted",
    tags: [],
    attributes: ["split", "file-attached"],
    receiptImage: undefined,
    alerts: {},
    date: "2026-04-14",
    category: "flight",
    paymentInstrument: "personal-card",
    country: "de",
    amount: 210.00,
    currency: "EUR",
    reimbursementAmount: 105.00,
    reimbursementCurrency: "EUR",
    billable: false,
    reimburse: true,
    credit: false,
    vat: 33.53,
    vatPct: 19,
    reportId: "q1-2026",
    description: "3-day car rental for the Munich design sprint. Split equally with P. Dubois.",
    merchant: {
      name: "Europcar",
      vatNumber: "DE812501744",
      organizationNumber: "HRB 55493",
      address: "Flughafenstraße 64",
      city: "Munich",
      zipCode: "85356",
    },
  },
];

/* ─── Helper utilities ──────────────────────────────────────────────────── */

/** Look up a report label by its id. */
export function getReportLabel(reportId: string): string {
  return REPORTS.find((r) => r.id === reportId)?.label ?? reportId;
}

/** Get a single expense by id. */
export function getExpenseById(id: string): Expense | undefined {
  return EXPENSES.find((e) => e.id === id);
}

/** Format an amount for display, e.g. 1200 → "1,200.00". */
export function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
