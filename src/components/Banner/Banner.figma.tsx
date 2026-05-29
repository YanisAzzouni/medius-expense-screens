import figma from "@figma/code-connect";
import { Banner } from "./Banner";

figma.connect(
  Banner,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=24-17615",
  {
    props: {
      type: figma.enum("Type", {
        Information: "information",
        Warning:     "warning",
        Error:       "error",
        Success:     "success",
      }),
      showIcon:    figma.boolean("Icon?"),
      dismissible: figma.boolean("Dismissable?"),
      // "Content Header" boolean maps to whether a title is shown
      // We pass a placeholder title when the Figma layer is on
      title: figma.boolean("Content Header", {
        true:  figma.string("Title"),
        false: undefined,
      }),
      action1Label: figma.boolean("Action 1", {
        true:  "Action 1",
        false: undefined,
      }),
      action2Label: figma.boolean("Action 2", {
        true:  "Action 2",
        false: undefined,
      }),
    },
    example: ({ type, title, showIcon, dismissible, action1Label, action2Label }) => (
      <Banner
        type={type}
        title={title}
        showIcon={showIcon}
        dismissible={dismissible}
        action1Label={action1Label}
        action2Label={action2Label}
      >
        Description text goes here.
      </Banner>
    ),
  }
);
