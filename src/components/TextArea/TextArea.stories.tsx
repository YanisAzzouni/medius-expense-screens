import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  parameters: { layout: "padded" },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "danger", "success", "read-only", "highlighted", "disabled"],
    },
    hintType: {
      control: "select",
      options: ["neutral", "danger", "success"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    required: { control: "boolean" },
    rows: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

const containerStyle = { maxWidth: 400 };

/* ─── Playground ─── */
export const Playground: Story = {
  args: {
    label: "Label",
    placeholder: "Enter text…",
    state: "default",
    required: false,
    rows: 3,
  },
  render: (args) => (
    <div style={containerStyle}>
      <TextArea {...args} />
    </div>
  ),
};

/* ─── All states ─── */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      {(["default", "danger", "success", "read-only", "highlighted", "disabled"] as const).map(
        (state) => (
          <TextArea
            key={state}
            label={state.charAt(0).toUpperCase() + state.slice(1)}
            placeholder="Enter text…"
            defaultValue={state !== "default" ? "Some existing content in the text area." : undefined}
            state={state}
            rows={2}
          />
        )
      )}
    </div>
  ),
};

/* ─── With hint messages ─── */
export const WithHint: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <TextArea
        label="Description"
        placeholder="Enter a description…"
        hint="Maximum 500 characters."
        hintType="neutral"
        rows={3}
      />
      <TextArea
        label="Notes"
        placeholder="Enter notes…"
        state="danger"
        hint="This field cannot be empty."
        hintType="danger"
        rows={3}
      />
      <TextArea
        label="Comment"
        placeholder="Enter a comment…"
        state="success"
        hint="Comment saved."
        hintType="success"
        rows={3}
      />
    </div>
  ),
};

/* ─── Required ─── */
export const Required: Story = {
  render: () => (
    <div style={containerStyle}>
      <TextArea
        label="Rejection reason"
        placeholder="Explain why this expense is being rejected…"
        required
        rows={4}
      />
    </div>
  ),
};
