import figma from "@figma/code-connect";
import { Tooltip } from "./Tooltip";

figma.connect(
  Tooltip,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=24-16760",
  {
    // Figma exposes 4 separate boolean visibility props (Bottom beak / Top beak /
    // Left beak / Right beak). Code Connect can't collapse these into a single
    // placement enum, so we show a representative static example instead.
    example: () => (
      <Tooltip content="Tooltip text" placement="top">
        <button type="button">Trigger</button>
      </Tooltip>
    ),
  }
);
