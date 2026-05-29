import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  argTypes: {
    checked: {
      control: "select",
      options: [false, true, "indeterminate"],
    },
    state: {
      control: "select",
      options: ["default", "danger", "disabled"],
    },
    label: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

/* ─── Playground ─── */
export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(false);
    return (
      <Checkbox
        {...args}
        checked={args.checked !== undefined ? args.checked : checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    label: "Label",
    state: "default",
  },
};

/* ─── All selection states ─── */
export const SelectionStates: Story = {
  render: () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(true);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Checkbox checked={a} onChange={setA} label="Unchecked" />
        <Checkbox checked={b} onChange={setB} label="Checked" />
        <Checkbox checked="indeterminate" onChange={() => {}} label="Indeterminate" />
      </div>
    );
  },
};

/* ─── All visual states (field level) ─── */
export const FieldStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox checked={false} onChange={() => {}} label="Default" state="default" />
      <Checkbox checked={false} onChange={() => {}} label="Danger" state="danger" />
      <Checkbox checked={false} onChange={() => {}} label="Disabled" state="disabled" />
    </div>
  ),
};

/* ─── Full input matrix (selection × status) ─── */
export const InputMatrix: Story = {
  name: "Input matrix",
  render: () => {
    const row = (label: string, status: "default" | "danger") => (
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <span style={{
          fontFamily: "var(--font-family)",
          fontSize: 12,
          color: "var(--color-chalk-500)",
          width: 80,
          flexShrink: 0,
        }}>{label}</span>
        <Checkbox checked={false}           onChange={() => {}} state={status === "danger" ? "danger" : "default"} />
        <Checkbox checked={true}            onChange={() => {}} state={status === "danger" ? "danger" : "default"} />
        <Checkbox checked="indeterminate"   onChange={() => {}} state={status === "danger" ? "danger" : "default"} />
      </div>
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 24, marginLeft: 104 }}>
          {["Unchecked", "Checked", "Indet."].map((h) => (
            <span key={h} style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--color-chalk-400)", width: 24, textAlign: "center" }}>{h}</span>
          ))}
        </div>
        {row("Default", "default")}
        {row("Danger", "danger")}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-family)", fontSize: 12, color: "var(--color-chalk-500)", width: 80, flexShrink: 0 }}>Disabled</span>
          <Checkbox checked={false}         onChange={() => {}} state="disabled" />
          <Checkbox checked={true}          onChange={() => {}} state="disabled" />
          <Checkbox checked="indeterminate" onChange={() => {}} state="disabled" />
        </div>
      </div>
    );
  },
};

/* ─── With labels ─── */
export const WithLabels: Story = {
  render: () => {
    const [vals, setVals] = useState({ air: true, meals: false, hotel: false, car: true });
    const toggle = (k: keyof typeof vals) => setVals((v) => ({ ...v, [k]: !v[k] }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Checkbox checked={vals.air}   onChange={() => toggle("air")}   label="Air travel" />
        <Checkbox checked={vals.meals} onChange={() => toggle("meals")} label="Meals & subsistence" />
        <Checkbox checked={vals.hotel} onChange={() => toggle("hotel")} label="Hotel & accommodation" />
        <Checkbox checked={vals.car}   onChange={() => toggle("car")}   label="Car rental" />
      </div>
    );
  },
};

/* ─── Select all (indeterminate parent) ─── */
export const SelectAll: Story = {
  render: () => {
    const ITEMS = ["Air travel", "Meals", "Hotel", "Car rental", "Office supplies"];
    const [selected, setSelected] = useState<Set<string>>(new Set(["Air travel", "Hotel"]));

    const allChecked = selected.size === ITEMS.length;
    const someChecked = selected.size > 0 && !allChecked;

    const toggleAll = () => {
      setSelected(allChecked ? new Set() : new Set(ITEMS));
    };
    const toggle = (item: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(item) ? next.delete(item) : next.add(item);
        return next;
      });
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Checkbox
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onChange={toggleAll}
          label="Select all categories"
        />
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          paddingLeft: 20,
          borderLeft: "2px solid var(--color-chalk-200)",
          marginLeft: 7,
        }}>
          {ITEMS.map((item) => (
            <Checkbox
              key={item}
              checked={selected.has(item)}
              onChange={() => toggle(item)}
              label={item}
            />
          ))}
        </div>
      </div>
    );
  },
};

/* ─── In a form row ─── */
export const InForm: Story = {
  render: () => (
    <div style={{
      maxWidth: 400,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      padding: 16,
      border: "1px solid var(--color-chalk-200)",
      borderRadius: 6,
    }}>
      <p style={{ margin: 0, fontFamily: "var(--font-family)", fontWeight: 600, fontSize: 14, color: "var(--color-chalk-900)" }}>
        Policy exceptions
      </p>
      <Checkbox checked={true}  onChange={() => {}} label="Reimburse above daily limit" />
      <Checkbox checked={false} onChange={() => {}} label="Require additional receipts" state="danger" />
      <Checkbox checked={false} onChange={() => {}} label="International allowance" state="disabled" />
    </div>
  ),
};
