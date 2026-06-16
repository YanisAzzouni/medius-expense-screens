/**
 * Mock data — Settings, Policies and Configuration domain
 * Covers: Categories, Projects, Custom Fields, Mileage Rates, Vehicles,
 *         Spending Policies, Budgets, E-invoices, Subscription & Bills
 */

import type { Currency, StatusTagVariant } from "./expenses";

/* ─── Category ───────────────────────────────────────────────────────────── */

export interface ExpenseCategoryConfig {
  id:           string;
  name:         string;
  icon:         string;   // Icon name from design system manifest
  accountCode:  string;
  taxable:      boolean;
  active:       boolean;
}

export const CATEGORIES: ExpenseCategoryConfig[] = [
  { id: "cat-001", name: "Meals & Entertainment", icon: "maps--local-dining",   accountCode: "6200", taxable: true,  active: true  },
  { id: "cat-002", name: "Travel",                icon: "maps--flight",          accountCode: "6210", taxable: false, active: true  },
  { id: "cat-003", name: "Hotel & Lodging",       icon: "maps--hotel",           accountCode: "6220", taxable: false, active: true  },
  { id: "cat-004", name: "Taxi & Transport",      icon: "maps--local-taxi",      accountCode: "6230", taxable: true,  active: true  },
  { id: "cat-005", name: "Parking",               icon: "maps--directions-car",  accountCode: "6240", taxable: true,  active: true  },
  { id: "cat-006", name: "Training & Courses",    icon: "maps--local-library",   accountCode: "6300", taxable: false, active: true  },
  { id: "cat-007", name: "Office Supplies",       icon: "content--archive",    accountCode: "6100", taxable: true,  active: true  },
  { id: "cat-008", name: "Telecom",               icon: "communication--phone",  accountCode: "6400", taxable: true,  active: true  },
  { id: "cat-009", name: "Subscriptions",         icon: "av--subscriptions",     accountCode: "6500", taxable: true,  active: true  },
  { id: "cat-010", name: "Other",                 icon: "navigation--more-horiz",    accountCode: "6900", taxable: true,  active: false },
];

/* ─── Project ────────────────────────────────────────────────────────────── */

export type ProjectStatus = "active" | "on-hold" | "closed";

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { label: string; variant: StatusTagVariant }
> = {
  active:    { label: "Active",    variant: "green"  },
  "on-hold": { label: "On hold",   variant: "yellow" },
  closed:    { label: "Closed",    variant: "grey"   },
};

export interface Project {
  id:        string;
  name:      string;
  code:      string;
  budget:    number;
  currency:  Currency;
  spent:     number;
  managerId: string;   // FK → User.id
  status:    ProjectStatus;
  endDate?:  string;
}

export const PROJECTS: Project[] = [
  { id: "proj-001", name: "Medius NorthStar Rebrand",   code: "NS-2026",    budget: 50000,  currency: "EUR", spent: 18420,  managerId: "u-001", status: "active",   endDate: "2026-12-31" },
  { id: "proj-002", name: "Paris Trade Show 2026",      code: "EVENTS-01",  budget: 12000,  currency: "EUR", spent: 11850,  managerId: "u-002", status: "active",   endDate: "2026-06-20" },
  { id: "proj-003", name: "Sales Enablement Q2",        code: "SALES-Q2",   budget: 8000,   currency: "EUR", spent: 4200,   managerId: "u-007", status: "on-hold"              },
  { id: "proj-004", name: "Office Stockholm Fit-out",   code: "OFFICE-STO", budget: 30000,  currency: "SEK", spent: 30000,  managerId: "u-007", status: "closed",   endDate: "2025-12-31" },
  { id: "proj-005", name: "Engineering Off-site",       code: "ENG-OS-Q3",  budget: 6000,   currency: "EUR", spent: 0,      managerId: "u-001", status: "active",   endDate: "2026-09-30" },
];

/* ─── Custom Field ───────────────────────────────────────────────────────── */

export type FieldType    = "text" | "number" | "date" | "dropdown" | "checkbox";
export type FieldApplies = "expense" | "report" | "both";

export interface CustomField {
  id:       string;
  name:     string;
  type:     FieldType;
  applies:  FieldApplies;
  required: boolean;
  active:   boolean;
  options?: string[];   // for dropdown type
}

export const CUSTOM_FIELDS: CustomField[] = [
  { id: "cf-001", name: "Project code",     type: "dropdown", applies: "expense", required: true,  active: true,  options: ["NS-2026", "EVENTS-01", "SALES-Q2", "ENG-OS-Q3"] },
  { id: "cf-002", name: "Billable",         type: "checkbox", applies: "expense", required: false, active: true  },
  { id: "cf-003", name: "Client name",      type: "text",     applies: "expense", required: false, active: true  },
  { id: "cf-004", name: "PO number",        type: "text",     applies: "report",  required: false, active: true  },
  { id: "cf-005", name: "Cost centre",      type: "dropdown", applies: "both",    required: true,  active: true,  options: ["CC-SALES", "CC-FINANCE", "CC-ENG", "CC-HR"] },
  { id: "cf-006", name: "Trip start date",  type: "date",     applies: "report",  required: false, active: false },
];

/* ─── Mileage Rate ───────────────────────────────────────────────────────── */

export type VehicleType = "car" | "motorcycle" | "bicycle" | "electric-car";

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  car:           "Car",
  motorcycle:    "Motorcycle",
  bicycle:       "Bicycle",
  "electric-car":"Electric car",
};

export interface MileageRate {
  id:            string;
  country:       string;
  vehicleType:   VehicleType;
  ratePerKm:     number;
  currency:      Currency;
  effectiveFrom: string;
  active:        boolean;
}

export const MILEAGE_RATES: MileageRate[] = [
  { id: "mr-001", country: "France",  vehicleType: "car",          ratePerKm: 0.575, currency: "EUR", effectiveFrom: "2026-01-01", active: true  },
  { id: "mr-002", country: "France",  vehicleType: "motorcycle",   ratePerKm: 0.391, currency: "EUR", effectiveFrom: "2026-01-01", active: true  },
  { id: "mr-003", country: "France",  vehicleType: "bicycle",      ratePerKm: 0.25,  currency: "EUR", effectiveFrom: "2026-01-01", active: true  },
  { id: "mr-004", country: "Sweden",  vehicleType: "car",          ratePerKm: 1.85,  currency: "SEK", effectiveFrom: "2026-01-01", active: true  },
  { id: "mr-005", country: "Sweden",  vehicleType: "electric-car", ratePerKm: 0.95,  currency: "SEK", effectiveFrom: "2026-01-01", active: true  },
  { id: "mr-006", country: "Germany", vehicleType: "car",          ratePerKm: 0.30,  currency: "EUR", effectiveFrom: "2026-01-01", active: true  },
  { id: "mr-007", country: "UK",      vehicleType: "car",          ratePerKm: 0.45,  currency: "GBP", effectiveFrom: "2026-01-01", active: true  },
  { id: "mr-008", country: "France",  vehicleType: "car",          ratePerKm: 0.556, currency: "EUR", effectiveFrom: "2025-01-01", active: false },
];

/* ─── Vehicle ────────────────────────────────────────────────────────────── */

export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";

export interface Vehicle {
  id:           string;
  registration: string;
  make:         string;
  model:        string;
  type:         VehicleType;
  fuelType:     FuelType;
  userId:       string;   // FK → User.id
  active:       boolean;
}

export const VEHICLES: Vehicle[] = [
  { id: "v-001", registration: "AB-123-CD", make: "Renault", model: "Clio",     type: "car",          fuelType: "petrol",   userId: "u-001", active: true  },
  { id: "v-002", registration: "EFG 456",   make: "Volvo",   model: "V60",      type: "car",          fuelType: "diesel",   userId: "u-002", active: true  },
  { id: "v-003", registration: "HJ78 KLM",  make: "Tesla",   model: "Model 3",  type: "electric-car", fuelType: "electric", userId: "u-004", active: true  },
  { id: "v-004", registration: "NP-901-QR", make: "Yamaha",  model: "MT-07",    type: "motorcycle",   fuelType: "petrol",   userId: "u-006", active: true  },
  { id: "v-005", registration: "ST-234-UV", make: "Peugeot", model: "308",      type: "car",          fuelType: "hybrid",   userId: "u-007", active: false },
];

/* ─── Spending Policy ────────────────────────────────────────────────────── */

export type PolicyStatus = "active" | "draft" | "archived";

export const POLICY_STATUS_META: Record<
  PolicyStatus,
  { label: string; variant: StatusTagVariant }
> = {
  active:   { label: "Active",   variant: "green"   },
  draft:    { label: "Draft",    variant: "neutral"  },
  archived: { label: "Archived", variant: "grey"    },
};

export interface SpendingPolicy {
  id:          string;
  name:        string;
  description: string;
  appliesTo:   string[];   // group IDs or "all"
  rules:       string[];   // human-readable rule summaries
  status:      PolicyStatus;
  updatedAt:   string;
}

export const SPENDING_POLICIES: SpendingPolicy[] = [
  {
    id: "sp-001", name: "Standard Employee Policy",
    description: "Default policy for all employees",
    appliesTo: ["all"],
    rules: [
      "Meals: max €50/person/day",
      "Hotel: max €200/night",
      "Receipts required above €25",
      "Pre-approval required above €500",
    ],
    status: "active", updatedAt: "2026-01-10",
  },
  {
    id: "sp-002", name: "Executive Travel Policy",
    description: "Enhanced limits for senior staff and managers",
    appliesTo: ["g-002"],
    rules: [
      "Meals: max €100/person/day",
      "Hotel: max €350/night",
      "Business class allowed for flights > 6h",
      "Pre-approval required above €2000",
    ],
    status: "active", updatedAt: "2026-02-14",
  },
  {
    id: "sp-003", name: "Event Budget Policy (Draft)",
    description: "Planned policy for trade show and event spending",
    appliesTo: [],
    rules: [
      "Catering: max €80/person",
      "Venue hire: pre-approval always required",
    ],
    status: "draft", updatedAt: "2026-05-30",
  },
];

/* ─── Budget ─────────────────────────────────────────────────────────────── */

export type BudgetPeriod = "monthly" | "quarterly" | "annual";
export type BudgetStatus = "on-track" | "at-risk" | "exceeded" | "closed";

export const BUDGET_STATUS_META: Record<
  BudgetStatus,
  { label: string; variant: StatusTagVariant }
> = {
  "on-track": { label: "On track", variant: "green"  },
  "at-risk":  { label: "At risk",  variant: "yellow" },
  exceeded:   { label: "Exceeded", variant: "red"    },
  closed:     { label: "Closed",   variant: "grey"   },
};

export interface Budget {
  id:        string;
  name:      string;
  amount:    number;
  currency:  Currency;
  spent:     number;
  period:    BudgetPeriod;
  startDate: string;
  endDate:   string;
  groupId?:  string;   // FK → Group.id (undefined = company-wide)
  status:    BudgetStatus;
}

export const BUDGETS: Budget[] = [
  { id: "bud-001", name: "Company Travel — Q2 2026",    amount: 40000, currency: "EUR", spent: 32450, period: "quarterly", startDate: "2026-04-01", endDate: "2026-06-30", status: "at-risk"  },
  { id: "bud-002", name: "Sales Team Expenses",          amount: 15000, currency: "EUR", spent: 7200,  period: "quarterly", startDate: "2026-04-01", endDate: "2026-06-30", groupId: "g-002", status: "on-track" },
  { id: "bud-003", name: "Office Supplies — Annual",     amount: 5000,  currency: "EUR", spent: 2100,  period: "annual",    startDate: "2026-01-01", endDate: "2026-12-31", status: "on-track" },
  { id: "bud-004", name: "Marketing Events Q1 2026",     amount: 20000, currency: "EUR", spent: 21400, period: "quarterly", startDate: "2026-01-01", endDate: "2026-03-31", status: "exceeded" },
  { id: "bud-005", name: "Training & Development 2026",  amount: 10000, currency: "EUR", spent: 1800,  period: "annual",    startDate: "2026-01-01", endDate: "2026-12-31", status: "on-track" },
];

/** Returns a 0–100 percentage for budget spend, capped at 100 for display. */
export function budgetSpentPct(b: Budget): number {
  return Math.min(100, Math.round((b.spent / b.amount) * 100));
}

/* ─── Subscription & Bills ───────────────────────────────────────────────── */

export type SubscriptionStatus = "active" | "cancelled" | "past-due";
export type BillStatus         = "paid" | "pending" | "overdue";

export const SUBSCRIPTION_STATUS_META: Record<
  SubscriptionStatus,
  { label: string; variant: StatusTagVariant }
> = {
  active:     { label: "Active",     variant: "green"  },
  cancelled:  { label: "Cancelled",  variant: "grey"   },
  "past-due": { label: "Past due",   variant: "red"    },
};

export const BILL_STATUS_META: Record<
  BillStatus,
  { label: string; variant: StatusTagVariant }
> = {
  paid:    { label: "Paid",    variant: "green"  },
  pending: { label: "Pending", variant: "yellow" },
  overdue: { label: "Overdue", variant: "red"    },
};

export interface Subscription {
  id:          string;
  plan:        string;
  seats:       number;
  pricePerSeat:number;
  currency:    Currency;
  billingCycle:"monthly" | "annual";
  renewalDate: string;
  status:      SubscriptionStatus;
}

export const SUBSCRIPTION: Subscription = {
  id:           "sub-001",
  plan:         "Medius Expense — Professional",
  seats:        10,
  pricePerSeat: 12,
  currency:     "EUR",
  billingCycle: "monthly",
  renewalDate:  "2026-07-01",
  status:       "active",
};

export interface Bill {
  id:          string;
  invoiceNo:   string;
  description: string;
  amount:      number;
  currency:    Currency;
  issueDate:   string;
  dueDate:     string;
  status:      BillStatus;
  pdfUrl?:     string;
}

export const BILLS: Bill[] = [
  { id: "bill-001", invoiceNo: "INV-2026-006", description: "Medius Expense — June 2026",     amount: 120, currency: "EUR", issueDate: "2026-06-01", dueDate: "2026-06-15", status: "pending" },
  { id: "bill-002", invoiceNo: "INV-2026-005", description: "Medius Expense — May 2026",      amount: 120, currency: "EUR", issueDate: "2026-05-01", dueDate: "2026-05-15", status: "paid"    },
  { id: "bill-003", invoiceNo: "INV-2026-004", description: "Medius Expense — April 2026",    amount: 120, currency: "EUR", issueDate: "2026-04-01", dueDate: "2026-04-15", status: "paid"    },
  { id: "bill-004", invoiceNo: "INV-2026-003", description: "Medius Expense — March 2026",    amount: 108, currency: "EUR", issueDate: "2026-03-01", dueDate: "2026-03-15", status: "paid"    },
  { id: "bill-005", invoiceNo: "INV-2026-002", description: "Medius Expense — February 2026", amount: 108, currency: "EUR", issueDate: "2026-02-01", dueDate: "2026-02-15", status: "paid"    },
];
