import type { Meta, StoryObj } from "@storybook/react";
import { LabelTag } from "./LabelTag";
import type { LabelTagColor } from "./LabelTag";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof LabelTag> = {
  title: "Components/LabelTag",
  component: LabelTag,
  parameters: { layout: "padded" },
  argTypes: {
    color: {
      control: "select",
      options: ["neutral", "grey", "blue", "green", "orange", "red"],
    },
    size: {
      control: "select",
      options: ["default", "small"],
    },
    label: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof LabelTag>;

const COLORS: LabelTagColor[] = ["neutral", "grey", "blue", "green", "orange", "red"];

/* ─── Playground ─── */
export const Playground: Story = {
  args: {
    label: "Label tag",
    color: "neutral",
    size: "default",
  },
};

/* ─── All colours — Default size ─── */
export const ColorsDefault: Story = {
  name: "Colours — Default",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {COLORS.map((color) => (
        <LabelTag key={color} color={color} size="default" label={color.charAt(0).toUpperCase() + color.slice(1)} />
      ))}
    </div>
  ),
};

/* ─── All colours — Small size ─── */
export const ColorsSmall: Story = {
  name: "Colours — Small",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {COLORS.map((color) => (
        <LabelTag key={color} color={color} size="small" label={color.charAt(0).toUpperCase() + color.slice(1)} />
      ))}
    </div>
  ),
};

/* ─── Both sizes side-by-side ─── */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LabelTag size="default" color="blue" label="Default" />
        <LabelTag size="small"   color="blue" label="Small" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <LabelTag size="default" color="green" label="Default" />
        <LabelTag size="small"   color="green" label="Small" />
      </div>
    </div>
  ),
};

/* ─── With icons ─── */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <LabelTag color="neutral" size="default" label="Attachment"
        icon={<Icon name="editor--attach-file" size="small" />} />
      <LabelTag color="blue" size="default" label="Info"
        icon={<Icon name="actions--info" size="small" />} />
      <LabelTag color="green" size="default" label="Approved"
        icon={<Icon name="alerts--check-circle" size="small" />} />
      <LabelTag color="orange" size="default" label="Review"
        icon={<Icon name="alert--warning-filled" size="small" />} />
      <LabelTag color="red" size="default" label="Error"
        icon={<Icon name="alert--error-filled" size="small" />} />
      <LabelTag color="grey" size="default" label="Archive"
        icon={<Icon name="content--archive" size="small" />} />
    </div>
  ),
};

/* ─── With icons — Small ─── */
export const WithIconsSmall: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <LabelTag color="neutral" size="small" label="Attachment"
        icon={<Icon name="editor--attach-file" size="small" />} />
      <LabelTag color="blue" size="small" label="Info"
        icon={<Icon name="actions--info" size="small" />} />
      <LabelTag color="green" size="small" label="Approved"
        icon={<Icon name="alerts--check-circle" size="small" />} />
      <LabelTag color="orange" size="small" label="Review"
        icon={<Icon name="alert--warning-filled" size="small" />} />
      <LabelTag color="red" size="small" label="Error"
        icon={<Icon name="alert--error-filled" size="small" />} />
    </div>
  ),
};

/* ─── In context: expense line items ─── */
export const InContext: Story = {
  render: () => {
    const items = [
      { name: "Flight to Berlin",     tags: [{ color: "blue"    as LabelTagColor, label: "Travel" },   { color: "green"  as LabelTagColor, label: "Reimbursed" }] },
      { name: "Team dinner",          tags: [{ color: "orange"  as LabelTagColor, label: "Meals" },    { color: "neutral"as LabelTagColor, label: "Q2 2025" }] },
      { name: "Laptop stand",         tags: [{ color: "grey"    as LabelTagColor, label: "Equipment" }] },
      { name: "Hotel — 3 nights",     tags: [{ color: "blue"    as LabelTagColor, label: "Travel" },   { color: "red"    as LabelTagColor, label: "Over limit" }] },
    ];
    return (
      <div style={{
        display: "flex", flexDirection: "column", gap: 0, maxWidth: 480,
        fontFamily: "var(--font-family)", fontSize: "var(--type-body-default-size)",
        border: "1px solid var(--color-chalk-200)", borderRadius: 6, overflow: "hidden",
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 16px", gap: 8,
            borderBottom: i < items.length - 1 ? "1px solid var(--color-chalk-100)" : "none",
            color: "var(--color-chalk-900)",
          }}>
            <span style={{ flex: 1 }}>{item.name}</span>
            <div style={{ display: "flex", gap: 4 }}>
              {item.tags.map((tag, j) => (
                <LabelTag key={j} color={tag.color} size="small" label={tag.label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
