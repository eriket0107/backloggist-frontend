import { DashboardPage } from "@/pages/DashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  pendingMs: 0,
  component: DashboardPage,
  preload: true,
});