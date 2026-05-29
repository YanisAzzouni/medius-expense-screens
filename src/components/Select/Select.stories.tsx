import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "padded" },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "read-only", "highlighted", "disabled"],
    },
    hintType: {
      control: "select",
      options: ["neutral", "danger", "success"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    required: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

const EXPENSE_CATEGORIES = [
  { label: "Accommodation", value: "accommodation" },
  { label: "Air travel", value: "air-travel" },
  { label: "Car rental", value: "car-rental" },
  { label: "Client entertainment", value: "client-entertainment" },
  { label: "Meals & subsistence", value: "meals" },
  { label: "Office supplies", value: "office-supplies" },
];

const containerStyle = { maxWidth: 320 };

/* ─── Playground ─── */
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={containerStyle}>
        <Select
          {...args}
          value={value}
          onChange={setValue}
          options={EXPENSE_CATEGORIES}
        />
      </div>
    );
  },
  args: {
    label: "Expense category",
    placeholder: "Select a category…",
    state: "default",
    required: false,
  },
};

/* ─── All states ─── */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <Select
        label="Default (no selection)"
        placeholder="Select a category…"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
      <Select
        label="Default (with selection)"
        placeholder="Select a category…"
        value="meals"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
      <Select
        label="Highlighted"
        placeholder="Select a category…"
        value="air-travel"
        state="highlighted"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
      <Select
        label="Read only"
        placeholder="Select a category…"
        value="accommodation"
        state="read-only"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
      <Select
        label="Disabled"
        placeholder="Select a category…"
        state="disabled"
        options={EXPENSE_CATEGORIES}
        onChange={() => {}}
      />
    </div>
  ),
};

/* ─── With hint ─── */
export const WithHint: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <Select
        label="Category"
        placeholder="Select…"
        options={EXPENSE_CATEGORIES}
        hint="Choose the expense type that best matches."
        hintType="neutral"
        onChange={() => {}}
      />
      <Select
        label="Category"
        placeholder="Select…"
        options={EXPENSE_CATEGORIES}
        hint="A category is required."
        hintType="danger"
        onChange={() => {}}
      />
    </div>
  ),
};

// Expense categories — each option carries its own icon.
// The trigger automatically mirrors whichever option is selected.
const CATEGORIES_WITH_ICONS = [
  { label: "Accommodation",       value: "accommodation", icon: <Icon name="maps--hotel"          size="small" /> },
  { label: "Air travel",          value: "air-travel",    icon: <Icon name="maps--flight"          size="small" /> },
  { label: "Car rental",          value: "car-rental",    icon: <Icon name="maps--directions-car"  size="small" /> },
  { label: "Meals & subsistence", value: "meals",         icon: <Icon name="maps--restaurant"      size="small" /> },
  { label: "Office supplies",     value: "office",        icon: <Icon name="actions--work"         size="small" /> },
  { label: "Other",               value: "other",         icon: <Icon name="actions--receipt"      size="small" /> },
];

// Flag helper: converts an ISO 3166-1 alpha-2 code to its emoji flag.
function flagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
}

const COUNTRIES = [
  { label: "France",         value: "fr", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>{flagEmoji("fr")}</span> },
  { label: "United States",  value: "us", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>{flagEmoji("us")}</span> },
  { label: "United Kingdom", value: "gb", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>{flagEmoji("gb")}</span> },
  { label: "Sweden",         value: "se", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>{flagEmoji("se")}</span> },
  { label: "Germany",        value: "de", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>{flagEmoji("de")}</span> },
  { label: "Spain",          value: "es", icon: <span style={{ fontSize: 16, lineHeight: 1 }}>{flagEmoji("es")}</span> },
];

/* ─── With leading icon (dynamic — mirrors selected option) ─── */
export const WithLeadingIcon: Story = {
  render: () => {
    const [category, setCategory] = useState<string | undefined>();
    const [country, setCountry]   = useState<string | undefined>();
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
        {/* Icon changes to match the selected category */}
        <Select
          label="Category"
          placeholder="Select a category…"
          value={category}
          onChange={setCategory}
          options={CATEGORIES_WITH_ICONS}
        />
        {/* Flag updates to the selected country's real flag */}
        <Select
          label="Country"
          placeholder="Select a country…"
          value={country}
          onChange={setCountry}
          options={COUNTRIES}
        />
      </div>
    );
  },
};

/* ─── Required ─── */
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div style={containerStyle}>
        <Select
          label="Expense category"
          placeholder="Select a category…"
          value={value}
          onChange={setValue}
          options={EXPENSE_CATEGORIES}
          required
          hint="Required to submit the expense."
          hintType="neutral"
        />
      </div>
    );
  },
};

/* ─── Controlled (interactive demo) ─── */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>("meals");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
        <Select
          label="Expense category"
          value={value}
          onChange={setValue}
          options={EXPENSE_CATEGORIES}
        />
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-family)",
            fontSize: "var(--type-small-size)",
            color: "var(--color-chalk-500)",
          }}
        >
          Selected: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};
