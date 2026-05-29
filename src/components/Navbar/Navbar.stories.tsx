import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./Navbar";
import type { NavItemKey } from "./Navbar";

const meta: Meta<typeof NavBar> = {
  title: "Components/NavBar",
  component: NavBar,
  parameters: { layout: "fullscreen" },
  argTypes: {
    activeItem: {
      control: "select",
      options: [
        "dashboard",
        "expenses",
        "reports",
        "requests",
        "manager",
        "medius-card",
        "admin",
        "accountant",
      ],
    },
    userInitials: { control: "text" },
    showRequests:   { control: "boolean" },
    showManager:    { control: "boolean" },
    showMediusCard: { control: "boolean" },
    showAdmin:      { control: "boolean" },
    showAccountant: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof NavBar>;

/* ─── Default — mirrors Figma exactly ─── */
export const Default: Story = {
  args: {
    activeItem:     "dashboard",
    userInitials:   "YA",
    showRequests:   false,
    showManager:    false,
    showMediusCard: false,
    showAdmin:      false,
    showAccountant: false,
  },
};

/* ─── Interactive — active tab updates on click ─── */
export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState<NavItemKey>("dashboard");
    return <NavBar {...args} activeItem={active} onNavigate={setActive} />;
  },
  args: {
    userInitials:   "YA",
    showRequests:   true,
    showManager:    true,
    showMediusCard: true,
    showAdmin:      false,
    showAccountant: false,
  },
};

/* ─── All tabs visible ─── */
export const AllTabs: Story = {
  render: (args) => {
    const [active, setActive] = useState<NavItemKey>("expenses");
    return <NavBar {...args} activeItem={active} onNavigate={setActive} />;
  },
  args: {
    userInitials:   "JD",
    showRequests:   true,
    showManager:    true,
    showMediusCard: true,
    showAdmin:      true,
    showAccountant: true,
  },
};

/* ─── Expenses active ─── */
export const ExpensesActive: Story = {
  args: {
    activeItem:     "expenses",
    userInitials:   "YA",
    showRequests:   true,
    showManager:    false,
    showMediusCard: true,
    showAdmin:      false,
    showAccountant: false,
  },
};

/* ─── Admin view ─── */
export const AdminView: Story = {
  args: {
    activeItem:     "admin",
    userInitials:   "AS",
    showRequests:   true,
    showManager:    true,
    showMediusCard: true,
    showAdmin:      true,
    showAccountant: true,
  },
};
