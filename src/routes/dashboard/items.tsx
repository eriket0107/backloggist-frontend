import { ItemsPage } from "@/pages/ItemsPage";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/dashboard/items")({
  component: ItemsPage,
  wrapInSuspense: true,
});
