import figma from "@figma/code-connect";
import { Checkbox } from "./Checkbox";

/* ─── Field/Checkbox (26:4669) — label + input row ─── */
figma.connect(
  Checkbox,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=26-4669",
  {
    props: {
      label: figma.string("Label"),
      state: figma.enum("State", {
        Default:  "default",
        Danger:   "danger",
        Disabled: "disabled",
      }),
    },
    example: ({ label, state }) => (
      <Checkbox label={label} state={state} checked={false} onChange={() => {}} />
    ),
  }
);

/* ─── .Input/Checkbox (26:4679) — raw control ─── */
figma.connect(
  Checkbox,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=26-4679",
  {
    props: {
      checked: figma.enum("Selection", {
        False:         false,
        True:          true,
        Indeterminate: "indeterminate",
      }),
      state: figma.enum("State", {
        Default:  "default",
        Hover:    "default",  // hover is a CSS state, not a prop
        Focus:    "default",  // focus is a CSS state, not a prop
        Disabled: "disabled",
      }),
      // Status=Danger maps to state="danger" (overrides State when set)
    },
    example: ({ checked }) => (
      <Checkbox checked={checked} onChange={() => {}} />
    ),
  }
);
