import type { Meta, StoryObj } from "@storybook/react";
import { headings, body } from "./typography";
import type { TypographyStyle } from "./typography";

const meta: Meta = {
  title: "Tokens/Typography",
  parameters: { layout: "padded" },
};
export default meta;

const PREVIEW_TEXT = "The quick brown fox jumps over the lazy dog";

interface TypeRowProps {
  styleName: string;
  style: TypographyStyle;
}

function TypeRow({ styleName, style }: TypeRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 24,
        padding: "16px 0",
        borderBottom: "1px solid var(--color-chalk-200)",
      }}
    >
      <div style={{ width: 200, flexShrink: 0 }}>
        <p style={{ fontFamily: "var(--font-family)", fontWeight: 600, fontSize: 12, color: "var(--color-chalk-500)", margin: 0 }}>
          {styleName}
        </p>
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--color-chalk-400)", margin: "4px 0 0" }}>
          {style.fontWeight} / {style.fontSize}px / {style.lineHeight}
          {style.letterSpacing !== "0" ? ` / ${style.letterSpacing}` : ""}
          {style.fontStyle ? ` / ${style.fontStyle}` : ""}
        </p>
      </div>
      <p
        style={{
          fontFamily: style.fontFamily,
          fontWeight: style.fontWeight,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          fontStyle: style.fontStyle,
          color: "var(--color-chalk-900)",
          margin: 0,
          flex: 1,
        }}
      >
        {PREVIEW_TEXT}
      </p>
    </div>
  );
}

export const AllTypography: StoryObj = {
  name: "All Styles",
  render: () => (
    <div style={{ fontFamily: "var(--font-family)", maxWidth: 900 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--color-chalk-500)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>
        Headings
      </h2>
      {Object.entries(headings).map(([name, style]) => (
        <TypeRow key={name} styleName={name} style={style} />
      ))}

      <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--color-chalk-500)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "32px 0 4px" }}>
        Body
      </h2>
      {Object.entries(body).map(([name, style]) => (
        <TypeRow key={name} styleName={name} style={style} />
      ))}
    </div>
  ),
};
