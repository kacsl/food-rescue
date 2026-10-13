import { Ellipsis, Folder, Heart, Phone, Settings, User, type LucideIcon } from "lucide-react";

export const AREA_ICONS = {
  engineering: Settings,
  product: Folder,
  sales: Phone,
  marketing: User,
  design: Heart,
  other: Ellipsis,
} as const satisfies Record<string, LucideIcon>;

export type AreaIconName = keyof typeof AREA_ICONS;

export function AreaIcon({ name, filled = false }: { name: AreaIconName; filled?: boolean }) {
  const Icon = AREA_ICONS[name];
  return <Icon size="var(--size-icon-md)" strokeWidth={2} fill={filled ? "currentColor" : "none"} />;
}
