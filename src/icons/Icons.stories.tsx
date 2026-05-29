import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { iconManifest } from "./manifest";
import type { IconManifestEntry } from "./manifest";
import { Icon } from "./Icon";
import type { IconSize } from "./Icon";

const meta: Meta = {
  title: "Tokens/Icons",
  parameters: { layout: "padded" },
};
export default meta;

function groupByCategory(entries: IconManifestEntry[]): Record<string, IconManifestEntry[]> {
  return entries.reduce<Record<string, IconManifestEntry[]>>((acc, entry) => {
    (acc[entry.category] ??= []).push(entry);
    return acc;
  }, {});
}

export const AllIcons: StoryObj = {
  name: "All Icons",
  render: () => {
    const [query, setQuery] = useState("");
    const [size, setSize] = useState<IconSize>("default");
    const [color, setColor] = useState("#17171a");

    const filtered = iconManifest.filter(
      (e) =>
        e.name.includes(query.toLowerCase()) ||
        e.category.includes(query.toLowerCase())
    );

    const grouped = groupByCategory(filtered);

    return (
      <div style={{ fontFamily: "var(--font-family)" }}>
        {/* Controls */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <input
            type="search"
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              height: 36,
              padding: "0 12px",
              borderRadius: 6,
              border: "1px solid var(--color-chalk-300)",
              fontFamily: "var(--font-family)",
              fontSize: 14,
              color: "var(--color-chalk-900)",
              outline: "none",
              width: 220,
            }}
          />

          <div style={{ display: "flex", gap: 4 }}>
            {(["small", "default", "large"] as IconSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  height: 36,
                  padding: "0 12px",
                  borderRadius: 6,
                  border: `1px solid ${size === s ? "var(--color-olive-500)" : "var(--color-chalk-300)"}`,
                  background: size === s ? "var(--color-olive-100)" : "#fff",
                  color: size === s ? "var(--color-olive-700)" : "var(--color-chalk-600)",
                  fontFamily: "var(--font-family)",
                  fontSize: 13,
                  fontWeight: size === s ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-chalk-600)" }}>
            Color
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: 32, height: 32, border: "none", cursor: "pointer", borderRadius: 4 }}
            />
          </label>
        </div>

        {/* Icon grid grouped by category */}
        {Object.keys(grouped).length === 0 && (
          <p style={{ color: "var(--color-chalk-400)", fontSize: 14 }}>No icons match "{query}".</p>
        )}

        {Object.entries(grouped).map(([category, entries]) => (
          <div key={category} style={{ marginBottom: 32 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-chalk-500)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 12,
              }}
            >
              {category}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {entries.map((entry) => (
                <div
                  key={entry.componentName}
                  title={`${entry.category}--${entry.name}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid var(--color-chalk-200)",
                    width: 80,
                    cursor: "default",
                  }}
                >
                  <Icon
                    name={`${entry.category}--${entry.name}`}
                    size={size}
                    color={color}
                  />
                  <p
                    style={{
                      fontSize: 10,
                      color: "var(--color-chalk-500)",
                      margin: 0,
                      textAlign: "center",
                      wordBreak: "break-word",
                      lineHeight: "14px",
                    }}
                  >
                    {entry.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
