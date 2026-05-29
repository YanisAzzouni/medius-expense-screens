import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "padded" },
  argTypes: {
    hierarchy: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    appearance: {
      control: "select",
      options: ["default", "danger", "ai"],
    },
    size: { control: "select", options: ["default", "small"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

/* ─── Playground ─── */
export const Playground: Story = {
  args: {
    hierarchy: "primary",
    appearance: "default",
    size: "default",
    children: "Button Label",
    loading: false,
    disabled: false,
  },
};

/* ─── All hierarchies / Default appearance ─── */
export const Hierarchies: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button hierarchy="primary">Primary</Button>
      <Button hierarchy="secondary">Secondary</Button>
      <Button hierarchy="tertiary">Tertiary</Button>
    </div>
  ),
};

/* ─── All appearances ─── */
export const Appearances: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["primary", "secondary", "tertiary"] as const).map((h) => (
        <div key={h} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ width: 80, fontSize: 12, color: "var(--color-chalk-500)", fontFamily: "var(--font-family)" }}>{h}</span>
          <Button hierarchy={h} appearance="default">Default</Button>
          <Button hierarchy={h} appearance="danger">Danger</Button>
          <Button hierarchy={h} appearance="ai">AI</Button>
        </div>
      ))}
    </div>
  ),
};

/* ─── Sizes ─── */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="default">Default (40px)</Button>
      <Button size="small">Small (24px)</Button>
    </div>
  ),
};

/* ─── With icon ─── */
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button icon={<Icon name="actions--add-card" size="small" />}>Add card</Button>
      <Button hierarchy="secondary" icon={<Icon name="actions--delete" size="small" />}>Delete</Button>
      <Button hierarchy="tertiary" icon={<Icon name="navigation--arrow-back" size="small" />}>Back</Button>
      <Button hierarchy="secondary" appearance="danger" icon={<Icon name="alert--error" size="small" />}>Remove</Button>
    </div>
  ),
};

/* ─── Icon only ─── */
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button hierarchy="primary" iconOnly aria-label="Close">
        <Icon name="navigation--close" size="small" />
      </Button>
      <Button hierarchy="secondary" iconOnly aria-label="Close">
        <Icon name="navigation--close" size="small" />
      </Button>
      <Button hierarchy="tertiary" iconOnly aria-label="Close">
        <Icon name="navigation--close" size="small" />
      </Button>
      <Button hierarchy="primary" size="small" iconOnly aria-label="Close">
        <Icon name="navigation--close" size="small" />
      </Button>
      <Button hierarchy="secondary" size="small" iconOnly aria-label="Close">
        <Icon name="navigation--close" size="small" />
      </Button>
    </div>
  ),
};

/* ─── States ─── */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button>Default</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button hierarchy="secondary" loading>Loading</Button>
      <Button hierarchy="secondary" disabled>Disabled</Button>
      <Button hierarchy="tertiary" loading>Loading</Button>
      <Button hierarchy="tertiary" disabled>Disabled</Button>
    </div>
  ),
};

/* ─── Danger ─── */
export const Danger: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button appearance="danger">Delete</Button>
      <Button hierarchy="secondary" appearance="danger">Remove</Button>
      <Button hierarchy="tertiary" appearance="danger">Cancel</Button>
      <Button appearance="danger" disabled>Disabled</Button>
    </div>
  ),
};

/* ─── AI ─── */
export const AI: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button appearance="ai">Ask AI</Button>
      <Button hierarchy="secondary" appearance="ai">Ask AI</Button>
      <Button hierarchy="tertiary" appearance="ai">Ask AI</Button>
      <Button appearance="ai" size="small">Ask AI</Button>
    </div>
  ),
};
