import type { LucideIcon } from "lucide-react";
import { HomeIcon, ListIcon, SettingsIcon } from "lucide-react";

export interface MenuItem {
  to: string;
  Icon: LucideIcon;
  label: string;
}

export const menu: MenuItem[] = [
  {
    to: "/",
    Icon: HomeIcon,
    label: "Dashboard",
  },
  {
    to: "/items",
    Icon: ListIcon,
    label: "Items",
  },
  {
    to: "/settings",
    Icon: SettingsIcon,
    label: "Settings",
  },
];
