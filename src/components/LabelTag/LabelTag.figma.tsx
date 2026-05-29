import figma from "@figma/code-connect";
import { LabelTag } from "./LabelTag";

figma.connect(
  LabelTag,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=25-3518",
  {
    props: {
      // "Label" is hardcoded text in Figma — not a component property.
      // "Show icon" controls whether the leading icon slot is visible.
      color: figma.enum("Color", {
        Neutral: "neutral",
        Grey:    "grey",
        Blue:    "blue",
        Green:   "green",
        Orange:  "orange",
        Red:     "red",
      }),
      size: figma.enum("Size", {
        Default: "default",
        Small:   "small",
      }),
      showIcon: figma.boolean("Show icon"),
    },
    example: ({ color, size }) => (
      <LabelTag label="Label tag" color={color} size={size} />
    ),
  }
);
