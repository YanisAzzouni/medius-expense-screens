import figma from "@figma/code-connect";
import { Tabs, Tab } from "./Tabs";

/* ─── Tabs container ─── */
figma.connect(
  Tabs,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=28-3975",
  {
    example: () => (
      <Tabs value="tab1" onChange={() => {}}>
        <Tab value="tab1" label="Label" />
        <Tab value="tab2" label="Label" />
        <Tab value="tab3" label="Label" />
      </Tabs>
    ),
  }
);

/* ─── Individual Tab ─── */
figma.connect(
  Tab,
  "https://www.figma.com/design/ul424E6sV0pCsCIxzA7ZMC/Medius-Expense--Components--New-?node-id=28-3991",
  {
    props: {
      label:    figma.string("Label"),
      disabled: figma.enum("State", { Disabled: true }),
      badge:    figma.boolean("Show counter", { true: 9, false: undefined }),
      icon:     figma.boolean("Show icon",    { true: figma.instance("Icon"), false: undefined }),
    },
    example: ({ label, disabled, badge }) => (
      <Tab value="tab" label={label} disabled={disabled} badge={badge} />
    ),
  }
);
