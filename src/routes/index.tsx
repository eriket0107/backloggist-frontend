import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/pages/DashboardPage";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/")({
  pendingComponent: Loader,
  component: DashboardPage,
});
