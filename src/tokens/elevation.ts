/** All elevation (shadow) token definitions. */
export interface ElevationTokens {
  /** Subtle shadow for floating elements like cards and dropdowns. */
  shadow16: string;
  /** Stronger shadow for modals and overlays. */
  shadow32: string;
  /** Inset bottom border used to separate adjacent regions. */
  bottomLine: string;
}

export const elevation: ElevationTokens = {
  shadow16:
    "0px 6.4px 14.4px rgba(0,0,0,0.13), 0px 1.2px 3.6px rgba(0,0,0,0.11)",
  shadow32:
    "0px 12.8px 28.8px rgba(0,0,0,0.16), 0px 2.4px 7.4px rgba(0,0,0,0.05)",
  bottomLine: "inset 0px -1px 0px #E6E9F1",
};

type CSSPropertyRecord = Record<string, string>;

/** Generates CSS custom properties for elevation tokens. */
export function generateElevationCSSVars(): CSSPropertyRecord {
  return {
    "--shadow-16": elevation.shadow16,
    "--shadow-32": elevation.shadow32,
    "--shadow-bottom-line": elevation.bottomLine,
  };
}
