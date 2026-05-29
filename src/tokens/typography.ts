/** A single typography style definition. */
export interface TypographyStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: string;
  letterSpacing: string;
  fontStyle?: string;
}

/** All heading-level type styles. */
export interface HeadingStyles {
  impact: TypographyStyle;
  impactSmall: TypographyStyle;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  title: TypographyStyle;
}

/** All body-level type styles. */
export interface BodyStyles {
  bodyDefault: TypographyStyle;
  bodySemibold: TypographyStyle;
  bodyBold: TypographyStyle;
  bodyItalic: TypographyStyle;
  small: TypographyStyle;
  smallSemibold: TypographyStyle;
  smallBold: TypographyStyle;
}

const fontFamily = '"Inter", sans-serif';

export const headings: HeadingStyles = {
  impact: {
    fontFamily,
    fontWeight: 700,
    fontSize: 40,
    lineHeight: "48px",
    letterSpacing: "-0.02em",
  },
  impactSmall: {
    fontFamily,
    fontWeight: 600,
    fontSize: 24,
    lineHeight: "auto",
    letterSpacing: "-0.02em",
  },
  h1: {
    fontFamily,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
  },
  h2: {
    fontFamily,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily,
    fontWeight: 700,
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
  },
  h4: {
    fontFamily,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "24px",
    letterSpacing: "-0.01em",
  },
  title: {
    fontFamily,
    fontWeight: 500,
    fontSize: 18,
    lineHeight: "24px",
    letterSpacing: "-0.02em",
  },
};

export const body: BodyStyles = {
  bodyDefault: {
    fontFamily,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "-0.01em",
  },
  bodySemibold: {
    fontFamily,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "-0.01em",
  },
  bodyBold: {
    fontFamily,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "-0.01em",
  },
  bodyItalic: {
    fontFamily,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "-0.01em",
    fontStyle: "italic",
  },
  small: {
    fontFamily,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "-0.01em",
  },
  smallSemibold: {
    fontFamily,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "-0.01em",
  },
  smallBold: {
    fontFamily,
    fontWeight: 700,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "-0.01em",
  },
};

/** All typography token definitions. */
export const typography = { headings, body };

type CSSPropertyRecord = Record<string, string>;

/** Generates CSS custom properties for typography tokens. */
export function generateTypographyCSSVars(): CSSPropertyRecord {
  const vars: CSSPropertyRecord = {
    "--font-family": fontFamily,
  };

  const allStyles: Record<string, TypographyStyle> = {
    ...headings,
    ...body,
  };

  for (const [name, style] of Object.entries(allStyles)) {
    const kebab = name.replace(/([A-Z])/g, "-$1").toLowerCase();
    vars[`--type-${kebab}-size`] = `${style.fontSize}px`;
    vars[`--type-${kebab}-weight`] = String(style.fontWeight);
    vars[`--type-${kebab}-line-height`] = style.lineHeight;
    vars[`--type-${kebab}-letter-spacing`] = style.letterSpacing;
    if (style.fontStyle) vars[`--type-${kebab}-style`] = style.fontStyle;
  }

  return vars;
}
