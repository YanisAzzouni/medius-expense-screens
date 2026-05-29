import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AdminPanel, DEFAULT_ADMIN_SECTIONS } from "./AdminPanel";
import type { AdminSectionDef } from "./AdminPanel";

const meta: Meta<typeof AdminPanel> = {
  title: "Components/AdminPanel",
  component: AdminPanel,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh", background: "#f5f5f7" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminPanel>;

/* ─── Default — matches Figma (Users expanded, Users sub-item selected) ─── */
export const Default: Story = {
  args: {
    companyName: "Company name",
    activeSection: "users-access",
    activeItem: "users",
  },
};

/* ─── Interactive ─── */
export const Interactive: Story = {
  render: () => {
    const [activeSection, setActiveSection] = useState("users-access");
    const [activeItem, setActiveItem]       = useState("users");

    return (
      <AdminPanel
        companyName="Acme Corporation"
        activeSection={activeSection}
        activeItem={activeItem}
        onNavigate={(section, item) => {
          setActiveSection(section);
          setActiveItem(item ?? "");
        }}
      />
    );
  },
};

/* ─── All collapsed ─── */
export const AllCollapsed: Story = {
  args: {
    companyName: "Company name",
  },
};

/* ─── Custom sections ─── */
const customSections: AdminSectionDef[] = [
  {
    key: "team",
    label: "Team",
    icon: "social--people",
    items: [
      { key: "members",  label: "Members"  },
      { key: "roles",    label: "Roles"    },
    ],
  },
  {
    key: "billing",
    label: "Billing",
    icon: "editor--monetization-on",
    items: [],
  },
  {
    key: "logs",
    label: "Audit Logs",
    icon: "actions--history",
  },
];

export const CustomSections: Story = {
  args: {
    companyName: "Custom Corp",
    sections: customSections,
    activeSection: "team",
    activeItem: "members",
  },
};

/* ─── Long company name ─── */
export const LongCompanyName: Story = {
  args: {
    companyName: "Internationale GmbH & Co. KG",
    activeSection: "users-access",
    activeItem: "groups",
  },
};

/* ─── All sections ─── */
export const FullView: Story = {
  args: {
    companyName: "Medius AB",
    sections: DEFAULT_ADMIN_SECTIONS,
    activeSection: "payment",
    activeItem: undefined,
  },
};
