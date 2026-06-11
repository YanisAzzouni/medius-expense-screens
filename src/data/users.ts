/**
 * Mock data — Users and Access domain
 * Covers: Users, Groups, Roles, Delegations, Contacts, Absences
 *
 * IDs are stable strings so other domains can cross-reference them.
 */

import type { StatusTagVariant } from "./expenses";

/* ─── Role ──────────────────────────────────────────────────────────────── */

export type RoleKey =
  | "admin"
  | "manager"
  | "employee"
  | "accountant"
  | "auditor"
  | "read-only";

export const ROLE_LABELS: Record<RoleKey, string> = {
  admin:      "Admin",
  manager:    "Manager",
  employee:   "Employee",
  accountant: "Accountant",
  auditor:    "Auditor",
  "read-only":"Read-only",
};

/* ─── User ──────────────────────────────────────────────────────────────── */

export type UserStatus = "active" | "inactive" | "pending";

export const USER_STATUS_META: Record<
  UserStatus,
  { label: string; variant: StatusTagVariant }
> = {
  active:   { label: "Active",   variant: "green"   },
  inactive: { label: "Inactive", variant: "grey"    },
  pending:  { label: "Pending",  variant: "yellow"  },
};

export interface User {
  id:         string;
  firstName:  string;
  lastName:   string;
  email:      string;
  role:       RoleKey;
  status:     UserStatus;
  groupIds:   string[];   // FK → Group.id
  country:    string;
  department: string;
  lastLogin:  string;     // ISO date
  createdAt:  string;     // ISO date
}

export const USERS: User[] = [
  {
    id: "u-001", firstName: "Sophie",  lastName: "Martin",    email: "sophie.martin@acme.com",
    role: "admin",      status: "active",   groupIds: ["g-001", "g-002"], country: "France",
    department: "Finance",    lastLogin: "2026-06-10", createdAt: "2024-01-15",
  },
  {
    id: "u-002", firstName: "Erik",    lastName: "Lindqvist", email: "erik.lindqvist@acme.com",
    role: "manager",    status: "active",   groupIds: ["g-002"],          country: "Sweden",
    department: "Sales",      lastLogin: "2026-06-09", createdAt: "2024-02-20",
  },
  {
    id: "u-003", firstName: "Clara",   lastName: "Schmidt",   email: "clara.schmidt@acme.com",
    role: "employee",   status: "active",   groupIds: ["g-003"],          country: "Germany",
    department: "Marketing",  lastLogin: "2026-06-08", createdAt: "2024-03-05",
  },
  {
    id: "u-004", firstName: "James",   lastName: "Wilson",    email: "james.wilson@acme.com",
    role: "accountant", status: "active",   groupIds: ["g-001"],          country: "UK",
    department: "Finance",    lastLogin: "2026-06-10", createdAt: "2024-01-30",
  },
  {
    id: "u-005", firstName: "Léa",     lastName: "Dupont",    email: "lea.dupont@acme.com",
    role: "employee",   status: "pending",  groupIds: ["g-003"],          country: "France",
    department: "Engineering", lastLogin: "2026-05-28", createdAt: "2026-05-20",
  },
  {
    id: "u-006", firstName: "Marcus",  lastName: "Johansson", email: "marcus.johansson@acme.com",
    role: "employee",   status: "active",   groupIds: ["g-002", "g-003"], country: "Sweden",
    department: "Sales",      lastLogin: "2026-06-07", createdAt: "2024-06-12",
  },
  {
    id: "u-007", firstName: "Ingrid",  lastName: "Berg",      email: "ingrid.berg@acme.com",
    role: "manager",    status: "active",   groupIds: ["g-002"],          country: "Sweden",
    department: "Operations", lastLogin: "2026-06-06", createdAt: "2024-04-18",
  },
  {
    id: "u-008", firstName: "Thomas",  lastName: "Müller",    email: "thomas.muller@acme.com",
    role: "auditor",    status: "inactive", groupIds: [],                 country: "Germany",
    department: "Finance",    lastLogin: "2026-04-01", createdAt: "2023-11-08",
  },
  {
    id: "u-009", firstName: "Amelia",  lastName: "Clarke",    email: "amelia.clarke@acme.com",
    role: "employee",   status: "active",   groupIds: ["g-003"],          country: "UK",
    department: "HR",         lastLogin: "2026-06-09", createdAt: "2025-01-14",
  },
  {
    id: "u-010", firstName: "Hugo",    lastName: "Bernard",   email: "hugo.bernard@acme.com",
    role: "read-only",  status: "active",   groupIds: [],                 country: "France",
    department: "Legal",      lastLogin: "2026-06-05", createdAt: "2025-03-22",
  },
];

/** Full name helper */
export function fullName(u: User): string {
  return `${u.firstName} ${u.lastName}`;
}

/** Initials helper (used for avatars) */
export function initials(u: User): string {
  return `${u.firstName[0]}${u.lastName[0]}`.toUpperCase();
}

/* ─── Group ─────────────────────────────────────────────────────────────── */

export interface Group {
  id:          string;
  name:        string;
  description: string;
  memberIds:   string[];   // FK → User.id
  managerIds:  string[];   // FK → User.id
  createdAt:   string;
}

export const GROUPS: Group[] = [
  {
    id: "g-001", name: "Finance",
    description: "Finance and accounting team members",
    memberIds:  ["u-001", "u-004"], managerIds: ["u-001"],
    createdAt: "2024-01-10",
  },
  {
    id: "g-002", name: "Sales Europe",
    description: "Sales team covering the European region",
    memberIds:  ["u-002", "u-006", "u-007"], managerIds: ["u-002", "u-007"],
    createdAt: "2024-02-14",
  },
  {
    id: "g-003", name: "All employees",
    description: "Default group — every employee is a member",
    memberIds:  ["u-003", "u-005", "u-006", "u-009"], managerIds: ["u-001"],
    createdAt: "2024-01-01",
  },
];

/* ─── Delegation ─────────────────────────────────────────────────────────── */

export type DelegationStatus = "active" | "upcoming" | "expired";

export const DELEGATION_STATUS_META: Record<
  DelegationStatus,
  { label: string; variant: StatusTagVariant }
> = {
  active:   { label: "Active",   variant: "green"  },
  upcoming: { label: "Upcoming", variant: "blue"   },
  expired:  { label: "Expired",  variant: "grey"   },
};

export interface Delegation {
  id:          string;
  delegatorId: string;   // FK → User.id
  delegateId:  string;   // FK → User.id
  fromDate:    string;
  toDate:      string;
  status:      DelegationStatus;
  note?:       string;
}

export const DELEGATIONS: Delegation[] = [
  {
    id: "d-001", delegatorId: "u-002", delegateId: "u-007",
    fromDate: "2026-06-15", toDate: "2026-06-30",
    status: "upcoming", note: "Summer holiday coverage",
  },
  {
    id: "d-002", delegatorId: "u-007", delegateId: "u-006",
    fromDate: "2026-05-01", toDate: "2026-05-31",
    status: "expired",
  },
  {
    id: "d-003", delegatorId: "u-001", delegateId: "u-004",
    fromDate: "2026-06-01", toDate: "2026-06-14",
    status: "active", note: "Parental leave",
  },
];

/* ─── Contact ────────────────────────────────────────────────────────────── */

export type ContactType = "internal" | "external";

export interface Contact {
  id:       string;
  name:     string;
  email:    string;
  company:  string;
  type:     ContactType;
  phone?:   string;
}

export const CONTACTS: Contact[] = [
  { id: "c-001", name: "Acme Corp HQ",       email: "billing@acme.com",       company: "Acme Corp",      type: "internal" },
  { id: "c-002", name: "Stripe Inc.",         email: "invoices@stripe.com",    company: "Stripe",         type: "external" },
  { id: "c-003", name: "AWS Europe",          email: "aws-billing@amazon.com", company: "Amazon",         type: "external" },
  { id: "c-004", name: "Office 365 Licenses", email: "ms-billing@microsoft.com",company: "Microsoft",    type: "external" },
  { id: "c-005", name: "HR Department",       email: "hr@acme.com",            company: "Acme Corp",      type: "internal" },
];

/* ─── Absence ────────────────────────────────────────────────────────────── */

export type AbsenceType   = "holiday" | "sick-leave" | "parental-leave" | "other";
export type AbsenceStatus = "approved" | "pending" | "rejected";

export const ABSENCE_STATUS_META: Record<
  AbsenceStatus,
  { label: string; variant: StatusTagVariant }
> = {
  approved: { label: "Approved", variant: "green"  },
  pending:  { label: "Pending",  variant: "yellow" },
  rejected: { label: "Rejected", variant: "red"    },
};

export interface Absence {
  id:       string;
  userId:   string;   // FK → User.id
  type:     AbsenceType;
  fromDate: string;
  toDate:   string;
  days:     number;
  status:   AbsenceStatus;
  note?:    string;
}

export const ABSENCES: Absence[] = [
  { id: "a-001", userId: "u-002", type: "holiday",       fromDate: "2026-06-15", toDate: "2026-06-30", days: 11, status: "approved" },
  { id: "a-002", userId: "u-005", type: "parental-leave",fromDate: "2026-06-01", toDate: "2026-08-31", days: 65, status: "approved", note: "Maternity leave" },
  { id: "a-003", userId: "u-003", type: "sick-leave",    fromDate: "2026-06-09", toDate: "2026-06-11", days: 3,  status: "approved" },
  { id: "a-004", userId: "u-006", type: "holiday",       fromDate: "2026-07-01", toDate: "2026-07-14", days: 10, status: "pending"  },
  { id: "a-005", userId: "u-009", type: "other",         fromDate: "2026-06-20", toDate: "2026-06-20", days: 1,  status: "pending",  note: "Medical appointment" },
];
