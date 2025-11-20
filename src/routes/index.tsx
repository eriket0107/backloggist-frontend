import { createFileRoute, redirect } from "@tanstack/react-router";

import { DashboardPage } from "@/pages/DashboardPage";

export const Route = createFileRoute("/")({
  pendingMs: 0,
  beforeLoad: async () => {
    throw redirect({
      to: "/dashboard" as "/",
    });
  },
  component: DashboardPage,
});
