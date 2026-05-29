/** All color steps for a single color family. */
export interface ColorFamily {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000: string;
}

/** Base (white / black) tokens. */
export interface BaseColors {
  white: string;
  black: string;
}

/** Full color token map. */
export interface Colors {
  olive: ColorFamily;
  chalk: ColorFamily;
  base: BaseColors;
  blue: ColorFamily;
  green: ColorFamily;
  red: ColorFamily;
  orange: ColorFamily;
  yellow: ColorFamily;
  teal: ColorFamily;
  purple: ColorFamily;
  pink: ColorFamily;
}

export const colors: Colors = {
  olive: {
    100: "#f8fafa",
    200: "#e3ecec",
    300: "#c5d7d8",
    400: "#6c9a9b",
    500: "#4f7e7f",
    600: "#3f6465",
    700: "#325051",
    800: "#283f40",
    900: "#192829",
    1000: "#10191a",
  },
  chalk: {
    100: "#fafafa",
    200: "#eaeaed",
    300: "#d3d3d9",
    400: "#91919f",
    500: "#757584",
    600: "#5d5d69",
    700: "#4a4a54",
    800: "#3a3a42",
    900: "#25252a",
    1000: "#17171a",
  },
  base: {
    white: "#ffffff",
    black: "#000000",
  },
  blue: {
    100: "#f6fafe",
    200: "#deedfa",
    300: "#b7d7f5",
    400: "#4296e5",
    500: "#2079cb",
    600: "#1a60a2",
    700: "#154d80",
    800: "#103c66",
    900: "#0b2742",
    1000: "#07192a",
  },
  green: {
    100: "#f6fbf8",
    200: "#e0eee5",
    300: "#bedbc8",
    400: "#56a171",
    500: "#388553",
    600: "#2c6942",
    700: "#235435",
    800: "#1c4229",
    900: "#122b1b",
    1000: "#0c1c11",
  },
  red: {
    100: "#fef9fa",
    200: "#fde6e7",
    300: "#fac7ca",
    400: "#f1636d",
    500: "#d63e49",
    600: "#ab313a",
    700: "#89282f",
    800: "#6d1f25",
    900: "#471518",
    1000: "#2e0d10",
  },
  orange: {
    100: "#fffaf2",
    200: "#ffe8be",
    300: "#ffcd70",
    400: "#ca8300",
    500: "#a46a00",
    600: "#825400",
    700: "#684300",
    800: "#523500",
    900: "#352200",
    1000: "#211600",
  },
  yellow: {
    100: "#fdfbdb",
    200: "#f8ef6e",
    300: "#e4d839",
    400: "#9c9527",
    500: "#7f7920",
    600: "#656019",
    700: "#504c14",
    800: "#403d10",
    900: "#28260a",
    1000: "#1a1806",
  },
  teal: {
    100: "#f6fafb",
    200: "#ddeeef",
    300: "#b4dbdd",
    400: "#3aa0a6",
    500: "#17838a",
    600: "#12696e",
    700: "#0e5358",
    800: "#0b4245",
    900: "#072a2d",
    1000: "#051b1d",
  },
  purple: {
    100: "#fbf9fc",
    200: "#f2e8f3",
    300: "#e2cde4",
    400: "#b67fba",
    500: "#9a639f",
    600: "#7b4e7e",
    700: "#623e65",
    800: "#4d3150",
    900: "#312033",
    1000: "#201420",
  },
  pink: {
    100: "#fef8fb",
    200: "#fae6f1",
    300: "#f4c7e1",
    400: "#e168ad",
    500: "#c6458f",
    600: "#9e3771",
    700: "#7e2c5b",
    800: "#642347",
    900: "#41172e",
    1000: "#290f1e",
  },
};

type CSSPropertyRecord = Record<string, string>;

/** Generates a flat CSS custom-property map for all color tokens. */
export function generateColorCSSVars(): CSSPropertyRecord {
  const vars: CSSPropertyRecord = {};

  const families: Array<[string, ColorFamily]> = [
    ["olive", colors.olive],
    ["chalk", colors.chalk],
    ["blue", colors.blue],
    ["green", colors.green],
    ["red", colors.red],
    ["orange", colors.orange],
    ["yellow", colors.yellow],
    ["teal", colors.teal],
    ["purple", colors.purple],
    ["pink", colors.pink],
  ];

  for (const [name, family] of families) {
    for (const [step, value] of Object.entries(family)) {
      vars[`--color-${name}-${step}`] = value;
    }
  }

  vars["--color-white"] = colors.base.white;
  vars["--color-black"] = colors.base.black;

  return vars;
}
