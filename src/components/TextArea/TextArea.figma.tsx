import figma from "@figma/code-connect";
import { TextArea } from "./TextArea";

/**
 * Code Connect mapping for the Medius Expense TextArea component.
 *
 * Figma file: Medius Expense – Components (New)
 * File key:   ul424E6sV0pCsCIxzA7ZMC
 * Node:       Field/Text Area ComponentSet (26:4981)
 */
figma.connect(
  TextArea,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=26-4981",
  {
    // The Field/Text Area outer component has no Figma variant properties.
    // Label visibility and state are controlled on inner sub-components.
    example: () => (
      <TextArea
        label="Label"
        placeholder="Enter text…"
      />
    ),
  }
);
