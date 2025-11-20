import type { NavigateOptions } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { HomeIcon, ListIcon, SettingsIcon } from "lucide-react";

export interface MenuItem {
  to: NavigateOptions["to"];
  Icon: LucideIcon;
  label: string;
}


export const menu: MenuItem[] = [
  {
    to: "/dashboard",
    Icon: HomeIcon,
    label: "Dashboard",
  },
  {
    to: "/dashboard/items",
    Icon: ListIcon,
    label: "Items",
  },
  // {
  //   to: "/settings",
  //   Icon: SettingsIcon,
  //   label: "Settings",
  // },
];
