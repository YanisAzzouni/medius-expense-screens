import figma from "@figma/code-connect";
import { StatusTag } from "./StatusTag";

figma.connect(
  StatusTag,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=24-17699",
  {
    props: {
      label: figma.string("Label"),
      variant: figma.enum("State", {
        Neutral: "neutral",
        Grey:    "grey",
        Blue:    "blue",
        Green:   "green",
        Yellow:  "yellow",
        Orange:  "orange",
        Red:     "red",
      }),
    },
    example: ({ label, variant }) => (
      <StatusTag label={label} variant={variant} />
    ),
  }
);
