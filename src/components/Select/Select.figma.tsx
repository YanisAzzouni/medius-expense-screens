import figma from "@figma/code-connect";
import { Select } from "./Select";

/**
 * Code Connect mapping for the Medius Expense Select/Dropdown component.
 *
 * Figma file: Medius Expense – Components (New)
 * File key:   ul424E6sV0pCsCIxzA7ZMC
 * Node:       Field/Dropdown ComponentSet (23:15152)
 */
figma.connect(
  Select,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=23-15152",
  {
    props: {
      // "State" lives on the inner .Input/dropdown node, not on Field/Dropdown.
      // Only "Show Label" is a property at the outer field level.
      label: figma.boolean("Show Label", {
        true:  "Label",
        false: undefined,
      }),
    },

    example: ({ label }) => (
      <Select
        label={label}
        placeholder="Select an option…"
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
          { label: "Option 3", value: "option-3" },
        ]}
        onChange={(value) => console.log(value)}
      />
    ),
  }
);
