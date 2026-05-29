import type { Meta, StoryObj } from "@storybook/react";
import { elevation } from "./elevation";

const meta: Meta = {
  title: "Tokens/Elevation",
  parameters: { layout: "padded" },
};
export default meta;

interface ShadowCardProps {
  tokenName: string;
  cssVar: string;
  value: string;
}

function ShadowCard({ tokenName, cssVar, value }: ShadowCardProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p
        style={{
          fontFamily: "var(--font-family)",
          fontWeight: 600,
          fontSize: 14,
          color: "var(--color-chalk-900)",
          margin: "0 0 4px",
        }}
      >
        {tokenName}
      </p>
      <p
        style={{
          fontFamily: "monospace",
          fontSize: 12,
          color: "var(--color-chalk-500)",
          margin: "0 0 16px",
        }}
      >
        {cssVar}
      </p>
      <div
        style={{
          width: 280,
          height: 80,
          borderRadius: 8,
          background: "#ffffff",
          boxShadow: value,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "var(--color-chalk-400)",
            margin: 0,
            padding: "0 16px",
            textAlign: "center",
            lineHeight: "16px",
            wordBreak: "break-all",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export const AllElevation: StoryObj = {
  name: "All Shadows",
  parameters: { backgrounds: { default: "chalk" } },
  render: () => (
    <div style={{ fontFamily: "var(--font-family)", padding: 24 }}>
      <ShadowCard
        tokenName="shadow16"
        cssVar="--shadow-16"
        value={elevation.shadow16}
      />
      <ShadowCard
        tokenName="shadow32"
        cssVar="--shadow-32"
        value={elevation.shadow32}
      />
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: "var(--font-family)", fontWeight: 600, fontSize: 14, color: "var(--color-chalk-900)", margin: "0 0 4px" }}>
          bottomLine
        </p>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: "var(--color-chalk-500)", margin: "0 0 16px" }}>
          --shadow-bottom-line
        </p>
        <div
          style={{
            width: 280,
            height: 48,
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: elevation.bottomLine,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--color-chalk-400)", margin: 0 }}>
            inset bottom border
          </p>
        </div>
      </div>
    </div>
  ),
};
