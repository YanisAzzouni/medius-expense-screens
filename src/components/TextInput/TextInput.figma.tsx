import figma from "@figma/code-connect";
import { TextInput } from "./TextInput";

/**
 * Code Connect mapping for the Medius Expense TextInput component.
 *
 * Figma file: Medius Expense – Components (New)
 * File key:   ul424E6sV0pCsCIxzA7ZMC
 * Node:       Field/Text ComponentSet (4:10611)
 */
figma.connect(
  TextInput,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=4-10611",
  {
    props: {
      // "State" lives on the inner .Input/TextBox node, not on the Field/Text wrapper.
      // Only "Show label" is a property of the outer field component.
      label: figma.boolean("Show label", {
        true:  "Label",
        false: undefined,
      }),
    },

    example: ({ label }) => (
      <TextInput
        label={label}
        placeholder="Enter value…"
      />
    ),
  }
);
