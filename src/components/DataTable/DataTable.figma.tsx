import figma from "@figma/code-connect";
import { DataTable } from "./DataTable";

/* ─── Generic table (55:8449) ─── */
figma.connect(
  DataTable,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=55-8449",
  {
    example: () => (
      <DataTable
        columns={[
          { key: "alerts",  type: "alerts",        title: ""                                    },
          { key: "status",  type: "status",         title: "Status",            sortable: true  },
          { key: "title",   type: "expense-title",  title: "Expense",           sortable: true  },
          { key: "amount",  type: "amount",         title: "Amount",  size: "M", sortable: true },
          { key: "date",    type: "date",           title: "Date",              sortable: true  },
          { key: "actions", type: "actions",        title: ""                                   },
        ]}
        rows={[]}
        selectable
        onSelectionChange={() => {}}
        onSort={() => {}}
      />
    ),
  }
);

/* Note: node 55:27507 (expense list view) is a plain frame, not a Figma component —
   Code Connect only supports component/component-set nodes. */
