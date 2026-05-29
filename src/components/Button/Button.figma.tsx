import figma from "@figma/code-connect";
import { Button } from "./Button";
import { Icon } from "../../icons/Icon";

/**
 * Code Connect mapping for the Medius Expense Button component.
 *
 * Figma file: Medius Expense – Components (New)
 * File key:   ul424E6sV0pCsCIxzA7ZMC
 * Node:       Button ComponentSet (0:385)
 *
 * When a designer selects a Button in Figma Dev Mode or hands it off,
 * AI tools (Claude Code) will see the exact React usage below instead
 * of generated HTML/CSS.
 */
figma.connect(
  Button,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=0-385",
  {
    props: {
      hierarchy: figma.enum("Hierarchy", {
        Primary: "primary",
        Secondary: "secondary",
        Tertiary: "tertiary",
      }),
      appearance: figma.enum("Appearance", {
        Default: "default",
        Danger: "danger",
        AI: "ai",
      }),
      size: figma.enum("Size", {
        Default: "default",
        Small: "small",
      }),
      disabled: figma.enum("State", {
        Disabled: true,
        Default: undefined,
        Hover: undefined,
        Focus: undefined,
        Active: undefined,
        Loading: undefined,
      }),
      loading: figma.enum("State", {
        Loading: true,
        Default: undefined,
        Hover: undefined,
        Focus: undefined,
        Active: undefined,
        Disabled: undefined,
      }),
      iconOnly: figma.enum("Content", {
        "Icon only": true,
        "(Icon +) Text": undefined,
      }),
    },

    example: ({ hierarchy, appearance, size, disabled, loading, iconOnly }) =>
      iconOnly ? (
        <Button
          hierarchy={hierarchy}
          appearance={appearance}
          size={size}
          disabled={disabled}
          loading={loading}
          iconOnly
          aria-label="Action"
        >
          <Icon name="actions--done" size="small" />
        </Button>
      ) : (
        <Button
          hierarchy={hierarchy}
          appearance={appearance}
          size={size}
          disabled={disabled}
          loading={loading}
        >
          Button Label
        </Button>
      ),
  }
);
