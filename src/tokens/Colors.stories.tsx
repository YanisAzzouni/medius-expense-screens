import type { Meta, StoryObj } from "@storybook/react";
import { colors } from "./colors";

const meta: Meta = {
  title: "Tokens/Colors",
  parameters: { layout: "padded" },
};
export default meta;

type ColorFamily = Record<number, string>;

interface SwatchRowProps {
  family: string;
  label: string;
  steps: ColorFamily;
}

function SwatchRow({ family, label, steps }: SwatchRowProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        style={{
          fontFamily: "var(--font-family)",
          fontWeight: 600,
          fontSize: 13,
          color: "var(--color-chalk-600)",
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {Object.entries(steps).map(([step, hex]) => (
          <div key={step} style={{ width: 72 }}>
            <div
              style={{
                width: 72,
                height: 48,
                borderRadius: 6,
                background: hex,
                border: "1px solid rgba(0,0,0,0.08)",
                marginBottom: 4,
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--color-chalk-700)",
                margin: 0,
              }}
            >
              {step}
            </p>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "var(--color-chalk-500)",
                margin: 0,
              }}
            >
              {hex}
            </p>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "var(--color-chalk-400)",
                margin: 0,
              }}
            >
              --color-{family}-{step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BaseSwatchProps {
  name: string;
  hex: string;
  cssVar: string;
}

function BaseSwatch({ name, hex, cssVar }: BaseSwatchProps) {
  return (
    <div style={{ width: 72, marginRight: 8 }}>
      <div
        style={{
          width: 72,
          height: 48,
          borderRadius: 6,
          background: hex,
          border: "1px solid rgba(0,0,0,0.08)",
          marginBottom: 4,
        }}
      />
      <p style={{ fontFamily: "var(--font-family)", fontSize: 11, fontWeight: 600, margin: 0 }}>
        {name}
      </p>
      <p style={{ fontFamily: "monospace", fontSize: 10, color: "var(--color-chalk-500)", margin: 0 }}>
        {hex}
      </p>
      <p style={{ fontFamily: "monospace", fontSize: 10, color: "var(--color-chalk-400)", margin: 0 }}>
        {cssVar}
      </p>
    </div>
  );
}

export const AllColors: StoryObj = {
  name: "All Colors",
  render: () => (
    <div style={{ fontFamily: "var(--font-family)", padding: 8 }}>
      <SwatchRow family="olive" label="Primary / Olive" steps={colors.olive as unknown as ColorFamily} />
      <SwatchRow family="chalk" label="Neutral / Chalk" steps={colors.chalk as unknown as ColorFamily} />

      <p style={{ fontWeight: 600, fontSize: 13, color: "var(--color-chalk-600)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Base
      </p>
      <div style={{ display: "flex", marginBottom: 32 }}>
        <BaseSwatch name="White" hex={colors.base.white} cssVar="--color-white" />
        <BaseSwatch name="Black" hex={colors.base.black} cssVar="--color-black" />
      </div>

      <SwatchRow family="blue"   label="Blue"   steps={colors.blue as unknown as ColorFamily} />
      <SwatchRow family="green"  label="Green"  steps={colors.green as unknown as ColorFamily} />
      <SwatchRow family="red"    label="Red"    steps={colors.red as unknown as ColorFamily} />
      <SwatchRow family="orange" label="Orange" steps={colors.orange as unknown as ColorFamily} />
      <SwatchRow family="yellow" label="Yellow" steps={colors.yellow as unknown as ColorFamily} />
      <SwatchRow family="teal"   label="Teal"   steps={colors.teal as unknown as ColorFamily} />
      <SwatchRow family="purple" label="Purple" steps={colors.purple as unknown as ColorFamily} />
      <SwatchRow family="pink"   label="Pink"   steps={colors.pink as unknown as ColorFamily} />
    </div>
  ),
};
