/// <reference types="vite/client" />

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

// Side-effect CSS import from the design system (no type declarations shipped).
declare module "@medius-expense/design-system/styles";
