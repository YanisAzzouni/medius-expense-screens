import type { Meta, StoryObj } from "@storybook/react";
import { ExpenseModal } from "./ExpenseModal";

const meta: Meta<typeof ExpenseModal> = {
  title: "Components/ExpenseModal",
  component: ExpenseModal,
  parameters: { layout: "centered" },
  argTypes: {
    statusVariant: {
      control: "select",
      options: ["neutral", "grey", "blue", "green", "yellow", "red", "orange"],
    },
    showBanner: { control: "boolean" },
    title: { control: "text" },
    statusLabel: { control: "text" },
    bannerMessage: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof ExpenseModal>;

/* ─── Default — mirrors the Figma design closely ─── */
export const Default: Story = {
  args: {
    title: "Expense",
    statusLabel: "Draft",
    statusVariant: "neutral",
    showBanner: false,
    tags: [
      { label: "e-invoice" },
      { label: "Medius card" },
      { label: "Merge" },
    ],
  },
};

/* ─── With info banner ─── */
export const WithBanner: Story = {
  args: {
    title: "Expense",
    statusLabel: "Draft",
    statusVariant: "neutral",
    showBanner: true,
    bannerMessage:
      "This expense has been flagged for review. Please verify the details before submitting.",
    tags: [{ label: "e-invoice" }, { label: "Medius card" }],
  },
};

/* ─── Submitted state ─── */
export const Submitted: Story = {
  args: {
    title: "Expense",
    statusLabel: "Submitted",
    statusVariant: "blue",
    showBanner: false,
    tags: [{ label: "e-invoice" }],
  },
};

/* ─── Approved ─── */
export const Approved: Story = {
  args: {
    title: "Expense",
    statusLabel: "Approved",
    statusVariant: "green",
    showBanner: false,
    tags: [],
  },
};

/* ─── Rejected ─── */
export const Rejected: Story = {
  args: {
    title: "Expense",
    statusLabel: "Rejected",
    statusVariant: "red",
    showBanner: true,
    bannerMessage:
      "This expense was rejected. Please review the reason and resubmit.",
    tags: [{ label: "Medius card" }],
  },
};

/* ─── No tags ─── */
export const Minimal: Story = {
  name: "Minimal (no tags)",
  args: {
    title: "Business lunch",
    statusLabel: "Draft",
    statusVariant: "neutral",
    showBanner: false,
    tags: [],
  },
};
