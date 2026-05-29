import type { Meta, StoryObj } from "@storybook/react";
import { StatusTag } from "./StatusTag";
import type { StatusTagVariant } from "./StatusTag";

const meta: Meta<typeof StatusTag> = {
  title: "Components/StatusTag",
  component: StatusTag,
  parameters: { layout: "padded" },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "grey", "blue", "green", "yellow", "orange", "red"],
    },
    label: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof StatusTag>;

/* ─── Playground ─── */
export const Playground: Story = {
  args: {
    label: "Label",
    variant: "neutral",
  },
};

/* ─── All variants ─── */
export const Variants: Story = {
  render: () => {
    const VARIANTS: { variant: StatusTagVariant; label: string }[] = [
      { variant: "neutral", label: "Neutral" },
      { variant: "grey",    label: "Draft" },
      { variant: "blue",    label: "Submitted" },
      { variant: "green",   label: "Approved" },
      { variant: "yellow",  label: "Pending" },
      { variant: "orange",  label: "Review" },
      { variant: "red",     label: "Rejected" },
    ];
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {VARIANTS.map(({ variant, label }) => (
          <StatusTag key={variant} variant={variant} label={label} />
        ))}
      </div>
    );
  },
};

/* ─── In context: expense report list ─── */
export const InContext: Story = {
  render: () => {
    const rows = [
      { name: "Q1 Travel — Paris",       status: "approved" as const,  variant: "green"   as StatusTagVariant },
      { name: "Client dinner — London",  status: "submitted" as const, variant: "blue"    as StatusTagVariant },
      { name: "Team offsite — Berlin",   status: "pending" as const,   variant: "yellow"  as StatusTagVariant },
      { name: "Office supplies — June",  status: "draft" as const,     variant: "grey"    as StatusTagVariant },
      { name: "Hotel — Barcelona",       status: "rejected" as const,  variant: "red"     as StatusTagVariant },
      { name: "Car rental — Amsterdam",  status: "review" as const,    variant: "orange"  as StatusTagVariant },
    ];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          maxWidth: 420,
          fontFamily: "var(--font-family)",
          fontSize: "var(--type-body-default-size)",
          border: "1px solid var(--color-chalk-200)",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: i < rows.length - 1 ? "1px solid var(--color-chalk-100)" : "none",
              color: "var(--color-chalk-900)",
            }}
          >
            <span>{row.name}</span>
            <StatusTag variant={row.variant} label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />
          </div>
        ))}
      </div>
    );
  },
};
