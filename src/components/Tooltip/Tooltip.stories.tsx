import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    content: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

const Btn = ({ label = "Hover me" }: { label?: string }) => (
  <button
    type="button"
    style={{
      fontFamily: "var(--font-family)",
      fontSize: "var(--type-body-default-size)",
      padding: "6px 12px",
      border: "1px solid var(--color-chalk-300)",
      borderRadius: 4,
      background: "var(--color-white)",
      cursor: "pointer",
      color: "var(--color-chalk-900)",
    }}
  >
    {label}
  </button>
);

/* ─── Playground ─── */
export const Playground: Story = {
  args: {
    content: "Tooltip text",
    placement: "top",
  },
  render: (args) => (
    <div style={{ padding: 60 }}>
      <Tooltip {...args}>
        <Btn />
      </Tooltip>
    </div>
  ),
};

/* ─── All placements ─── */
export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "auto auto auto",
        gap: 40,
        padding: 60,
        placeItems: "center",
      }}
    >
      {/* Row 1: top-center */}
      <div />
      <Tooltip content="Appears above the trigger" placement="top">
        <Btn label="Top" />
      </Tooltip>
      <div />

      {/* Row 2: left, (empty center), right */}
      <Tooltip content="Appears to the left" placement="left">
        <Btn label="Left" />
      </Tooltip>
      <div />
      <Tooltip content="Appears to the right" placement="right">
        <Btn label="Right" />
      </Tooltip>

      {/* Row 3: bottom-center */}
      <div />
      <Tooltip content="Appears below the trigger" placement="bottom">
        <Btn label="Bottom" />
      </Tooltip>
      <div />
    </div>
  ),
};

/* ─── On icon button (common pattern) ─── */
export const OnIconButton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 60 }}>
      <Tooltip content="Attach a file" placement="top">
        <button
          type="button"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-chalk-600)", display: "flex" }}
          aria-label="Attach file"
        >
          <Icon name="editor--attach-file" size="default" />
        </button>
      </Tooltip>

      <Tooltip content="More information about this field" placement="top">
        <button
          type="button"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-chalk-400)", display: "flex" }}
          aria-label="Help"
        >
          <Icon name="actions--help-outline" size="default" />
        </button>
      </Tooltip>

      <Tooltip content="Delete this expense line" placement="top">
        <button
          type="button"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-red-500)", display: "flex" }}
          aria-label="Delete"
        >
          <Icon name="actions--delete" size="default" />
        </button>
      </Tooltip>
    </div>
  ),
};

/* ─── Long content wraps at 220px ─── */
export const LongContent: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip
        content="Expenses over the policy limit require manager approval before reimbursement can be processed."
        placement="top"
      >
        <Btn label="Policy limit exceeded" />
      </Tooltip>
    </div>
  ),
};

/* ─── Keyboard accessible ─── */
export const KeyboardAccessible: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, padding: 80, alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-family)", fontSize: 13, color: "var(--color-chalk-600)" }}>
        Tab to each button to see tooltip:
      </span>
      <Tooltip content="Submit the expense report" placement="top">
        <Btn label="Submit" />
      </Tooltip>
      <Tooltip content="Save as draft for later" placement="top">
        <Btn label="Save draft" />
      </Tooltip>
      <Tooltip content="Discard all changes" placement="top">
        <Btn label="Cancel" />
      </Tooltip>
    </div>
  ),
};
