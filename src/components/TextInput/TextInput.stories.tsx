import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
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
    unit: { control: "text" },
    hint: { control: "text" },
    helpIcon: { control: "boolean" },
    required: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

const containerStyle = { maxWidth: 320 };

/* ─── Playground ─── */
export const Playground: Story = {
  args: {
    label: "Label",
    placeholder: "Enter value…",
    state: "default",
    required: false,
  },
  render: (args) => (
    <div style={containerStyle}>
      <TextInput {...args} />
    </div>
  ),
};

/* ─── All states ─── */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      {(["default", "danger", "success", "read-only", "highlighted", "disabled"] as const).map(
        (state) => (
          <TextInput
            key={state}
            label={state.charAt(0).toUpperCase() + state.slice(1)}
            placeholder="Enter value…"
            value={state !== "default" ? "Input value" : undefined}
            defaultValue={state === "default" ? "" : undefined}
            state={state}
          />
        )
      )}
    </div>
  ),
};

/* ─── With hint messages ─── */
export const WithHint: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <TextInput
        label="Neutral hint"
        placeholder="Enter value…"
        hint="This is a helper message."
        hintType="neutral"
      />
      <TextInput
        label="Error state"
        placeholder="Enter value…"
        state="danger"
        hint="This field is required."
        hintType="danger"
      />
      <TextInput
        label="Success state"
        placeholder="Enter value…"
        state="success"
        hint="Looks good!"
        hintType="success"
      />
    </div>
  ),
};

/* ─── With unit suffix ─── */
export const WithUnit: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <TextInput label="Amount" placeholder="0.00" unit="USD" type="number" />
      <TextInput label="Weight" placeholder="0" unit="kg" type="number" />
      <TextInput label="Percentage" placeholder="0" unit="%" type="number" />
    </div>
  ),
};

/* ─── With help icon ─── */
export const WithHelpIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      <TextInput label="VAT number" placeholder="Enter VAT number…" helpIcon />
      <TextInput label="Cost centre" placeholder="Enter cost centre…" helpIcon required />
    </div>
  ),
};

/* ─── Required field ─── */
export const Required: Story = {
  render: () => (
    <div style={containerStyle}>
      <TextInput
        label="Email address"
        placeholder="you@company.com"
        type="email"
        required
        hint="We'll never share your email."
        hintType="neutral"
      />
    </div>
  ),
};

/* ─── Without label ─── */
export const NoLabel: Story = {
  render: () => (
    <div style={containerStyle}>
      <TextInput placeholder="Search…" type="search" />
    </div>
  ),
};
