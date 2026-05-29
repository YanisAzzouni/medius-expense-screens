import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  parameters: { layout: "padded" },
  argTypes: {
    type: {
      control: "select",
      options: ["information", "warning", "error", "success"],
    },
    title: { control: "text" },
    children: { control: "text" },
    showIcon: { control: "boolean" },
    dismissible: { control: "boolean" },
    action1Label: { control: "text" },
    action2Label: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Banner>;

const containerStyle = { maxWidth: 480 };

/* ─── Playground ─── */
export const Playground: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <button onClick={() => setVisible(true)} style={{ fontFamily: "var(--font-family)" }}>
          Show banner
        </button>
      );
    }
    return (
      <div style={containerStyle}>
        <Banner {...args} onDismiss={() => setVisible(false)} />
      </div>
    );
  },
  args: {
    type: "information",
    title: "Heads up",
    children: "This expense report is pending manager approval.",
    showIcon: true,
    dismissible: true,
    action1Label: "View details",
    action2Label: "Dismiss",
  },
};

/* ─── All types ─── */
export const Types: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
      <Banner type="information" title="Information" showIcon>
        Your expense has been submitted and is awaiting approval.
      </Banner>
      <Banner type="warning" title="Warning" showIcon>
        Receipt is missing for the accommodation expense.
      </Banner>
      <Banner type="error" title="Error" showIcon>
        The total amount exceeds the policy limit for this category.
      </Banner>
      <Banner type="success" title="Success" showIcon>
        Expense report approved and payment has been initiated.
      </Banner>
    </div>
  ),
};

/* ─── With actions ─── */
export const WithActions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
      <Banner
        type="warning"
        title="Missing receipt"
        action1Label="Upload receipt"
        action2Label="Skip for now"
        onAction1={() => alert("Upload")}
        onAction2={() => alert("Skip")}
      >
        A receipt is required for expenses over €25.
      </Banner>
      <Banner
        type="error"
        title="Submission failed"
        action1Label="Retry"
        onAction1={() => alert("Retry")}
      >
        We couldn't submit your expense. Please try again.
      </Banner>
    </div>
  ),
};

/* ─── Dismissible ─── */
export const Dismissible: Story = {
  render: () => {
    const [shown, setShown] = useState<Record<string, boolean>>({
      info: true, warning: true, error: true, success: true,
    });
    const dismiss = (key: string) => setShown((s) => ({ ...s, [key]: false }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
        {shown.info && (
          <Banner type="information" title="Policy update" dismissible onDismiss={() => dismiss("info")}>
            The travel expense policy has been updated. Review the changes.
          </Banner>
        )}
        {shown.warning && (
          <Banner type="warning" dismissible onDismiss={() => dismiss("warning")}>
            Your session will expire in 5 minutes.
          </Banner>
        )}
        {shown.error && (
          <Banner type="error" title="Payment failed" dismissible onDismiss={() => dismiss("error")}>
            The bank rejected the transfer. Contact finance.
          </Banner>
        )}
        {shown.success && (
          <Banner type="success" dismissible onDismiss={() => dismiss("success")}>
            Your profile has been updated.
          </Banner>
        )}
        {Object.values(shown).every((v) => !v) && (
          <button
            style={{ fontFamily: "var(--font-family)" }}
            onClick={() => setShown({ info: true, warning: true, error: true, success: true })}
          >
            Reset banners
          </button>
        )}
      </div>
    );
  },
};

/* ─── Without icon ─── */
export const NoIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
      <Banner type="information" showIcon={false}>
        Expense category is inferred from the supplier name.
      </Banner>
      <Banner type="success" title="Saved" showIcon={false}>
        Your draft has been saved automatically.
      </Banner>
    </div>
  ),
};

/* ─── Title only / Message only ─── */
export const ContentVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
      <Banner type="information" title="Title only — no body text" />
      <Banner type="warning">
        Body text only — no title above it.
      </Banner>
      <Banner type="error" title="Title and body" >
        Both title and body are provided here.
      </Banner>
    </div>
  ),
};
