import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, Tab } from "./Tabs";
import { Icon } from "../../icons/Icon";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

/* ─── Playground ─── */
export const Playground: Story = {
  render: () => {
    const [active, setActive] = useState("general");
    return (
      <div style={{ maxWidth: 600 }}>
        <Tabs value={active} onChange={setActive}>
          <Tab value="general"    label="General" />
          <Tab value="expenses"   label="Expenses" />
          <Tab value="receipts"   label="Receipts" />
          <Tab value="approvals"  label="Approvals" />
          <Tab value="settings"   label="Settings" disabled />
        </Tabs>
        <div style={{
          padding: 16,
          fontFamily: "var(--font-family)",
          fontSize: "var(--type-body-default-size)",
          color: "var(--color-chalk-700)",
          borderLeft: "1px solid var(--color-chalk-200)",
          borderRight: "1px solid var(--color-chalk-200)",
          borderBottom: "1px solid var(--color-chalk-200)",
          borderRadius: "0 0 4px 4px",
        }}>
          Active tab: <strong>{active}</strong>
        </div>
      </div>
    );
  },
};

/* ─── All states (static) ─── */
export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Tabs value="active" onChange={() => {}}>
        <Tab value="default"  label="Default" />
        <Tab value="active"   label="Active" />
        <Tab value="disabled" label="Disabled" disabled />
      </Tabs>
    </div>
  ),
};

/* ─── With badges ─── */
export const WithBadges: Story = {
  render: () => {
    const [active, setActive] = useState("pending");
    return (
      <div style={{ maxWidth: 600 }}>
        <Tabs value={active} onChange={setActive}>
          <Tab value="all"       label="All"       badge={128} />
          <Tab value="pending"   label="Pending"   badge={12} />
          <Tab value="approved"  label="Approved"  badge={94} />
          <Tab value="rejected"  label="Rejected"  badge={3} />
        </Tabs>
      </div>
    );
  },
};

/* ─── With icons ─── */
export const WithIcons: Story = {
  render: () => {
    const [active, setActive] = useState("overview");
    return (
      <div style={{ maxWidth: 600 }}>
        <Tabs value={active} onChange={setActive}>
          <Tab value="overview"  label="Overview"
            icon={<Icon name="actions--info" size="small" />} />
          <Tab value="expenses"  label="Expenses"
            icon={<Icon name="maps--restaurant" size="small" />} />
          <Tab value="receipts"  label="Receipts"
            icon={<Icon name="editor--attach-file" size="small" />} />
          <Tab value="notes"     label="Notes"
            icon={<Icon name="image--edit" size="small" />} />
        </Tabs>
      </div>
    );
  },
};

/* ─── Closable tabs ─── */
export const Closable: Story = {
  render: () => {
    const initialTabs = [
      { value: "expense-1", label: "Paris trip" },
      { value: "expense-2", label: "Team dinner" },
      { value: "expense-3", label: "Hotel — Berlin" },
      { value: "expense-4", label: "Car rental" },
    ];
    const [tabs, setTabs] = useState(initialTabs);
    const [active, setActive] = useState("expense-1");

    const closeTab = (value: string) => {
      const next = tabs.filter((t) => t.value !== value);
      setTabs(next);
      if (active === value && next.length > 0) {
        setActive(next[0].value);
      }
    };

    if (tabs.length === 0) {
      return (
        <div style={{ fontFamily: "var(--font-family)", color: "var(--color-chalk-500)", padding: 16 }}>
          All tabs closed.{" "}
          <button
            style={{ fontFamily: "inherit", cursor: "pointer", color: "var(--color-olive-600)", background: "none", border: "none", padding: 0 }}
            onClick={() => { setTabs(initialTabs); setActive("expense-1"); }}
          >
            Reset
          </button>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: 600 }}>
        <Tabs value={active} onChange={setActive}>
          {tabs.map((t) => (
            <Tab
              key={t.value}
              value={t.value}
              label={t.label}
              closable
              onClose={() => closeTab(t.value)}
            />
          ))}
        </Tabs>
        <div style={{
          padding: 16,
          fontFamily: "var(--font-family)",
          fontSize: "var(--type-body-default-size)",
          color: "var(--color-chalk-700)",
          border: "1px solid var(--color-chalk-200)",
          borderTop: "none",
          borderRadius: "0 0 4px 4px",
        }}>
          Viewing: <strong>{tabs.find((t) => t.value === active)?.label}</strong>
        </div>
      </div>
    );
  },
};

/* ─── Expense modal — real-world composition ─── */
export const ExpenseModal: Story = {
  render: () => {
    const [active, setActive] = useState("details");
    return (
      <div style={{ maxWidth: 960, border: "1px solid var(--color-chalk-200)", borderRadius: 8, overflow: "hidden" }}>
        {/* Modal header */}
        <div style={{
          padding: "16px 24px 0",
          borderBottom: "none",
          fontFamily: "var(--font-family)",
        }}>
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: "var(--color-chalk-900)" }}>Paris — Q1 Travel</span>
          </div>
          <Tabs value={active} onChange={setActive}>
            <Tab value="details"    label="Details" />
            <Tab value="expenses"   label="Expenses"  badge={7} />
            <Tab value="receipts"   label="Receipts"  badge={3} />
            <Tab value="timeline"   label="Timeline" />
            <Tab value="comments"   label="Comments"  badge={2} />
          </Tabs>
        </div>
        {/* Panel */}
        <div style={{
          padding: 24,
          fontFamily: "var(--font-family)",
          fontSize: "var(--type-body-default-size)",
          color: "var(--color-chalk-600)",
          minHeight: 120,
        }}>
          Panel for: <strong style={{ color: "var(--color-chalk-900)" }}>{active}</strong>
        </div>
      </div>
    );
  },
};
