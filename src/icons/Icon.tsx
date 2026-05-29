import type { ComponentType, SVGProps } from "react";
import { iconManifest } from "./manifest";
import * as AllIcons from "./components/index";

/** Supported icon render sizes. */
export type IconSize = "small" | "default" | "large";

const SIZE_MAP: Record<IconSize, number> = {
  small: 16,
  default: 20,
  large: 24,
};

export interface IconProps {
  /** Full icon name in the form `category--name` (e.g. "navigation--chevron-right"). */
  name: string;
  /** Render size. Defaults to "default" (20px). */
  size?: IconSize;
  /** CSS color value. Defaults to `currentColor`. */
  color?: string;
  /** Additional class names. */
  className?: string;
}

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;
const iconMap = AllIcons as Record<string, SvgComponent>;

function resolveIcon(name: string): SvgComponent | null {
  const [category, ...rest] = name.split("--");
  const namePart = rest.join("--");

  const entry = iconManifest.find(
    (e) => e.category === category && e.name === namePart
  );

  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[Icon] Unknown icon: "${name}". Check src/icons/svg/ for available icons.`
      );
    }
    return null;
  }

  return iconMap[entry.componentName] ?? null;
}

/**
 * Renders a design-system icon by name.
 *
 * @example
 * <Icon name="navigation--chevron-right" size="small" color="var(--color-olive-500)" />
 */
export function Icon({
  name,
  size = "default",
  color = "currentColor",
  className,
}: IconProps) {
  const px = SIZE_MAP[size];
  const ResolvedIcon = resolveIcon(name);

  if (!ResolvedIcon) {
    return (
      <svg
        width={px}
        height={px}
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={className}
        style={{ color }}
      />
    );
  }

  return (
    <ResolvedIcon
      width={px}
      height={px}
      style={{ color }}
      className={className}
    />
  );
}
