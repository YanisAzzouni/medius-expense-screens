/**
 * Central data barrel — import everything from here.
 *
 * Usage in any page:
 *   import { USERS, EXPENSES, BUDGETS, TRANSACTIONS } from "../data";
 *
 * Cross-references:
 *   Expense.reportId     → Report.id         (expenses.ts)
 *   User.groupIds        → Group.id          (users.ts)
 *   Delegation.delegatorId / delegateId → User.id
 *   Absence.userId       → User.id           (users.ts)
 *   Transaction.userId   → User.id           (payment.ts)
 *   Transaction.expenseId→ Expense.id        (payment.ts ↔ expenses.ts)
 *   Advance.userId       → User.id           (payment.ts)
 *   PaymentInstrument.userId → User.id       (payment.ts)
 *   BankAccount.userId   → User.id           (payment.ts)
 *   Project.managerId    → User.id           (settings.ts)
 *   Budget.groupId       → Group.id          (settings.ts)
 *   Vehicle.userId       → User.id           (settings.ts)
 */

export * from "./expenses";
export * from "./users";
export * from "./payment";
export * from "./settings";
