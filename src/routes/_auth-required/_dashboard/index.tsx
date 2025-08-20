import { DashboardFrame } from "@/features/dashboard/frames/dashboard-frame";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <DashboardFrame />;
}

export const Route = createFileRoute("/_auth-required/_dashboard/")({
  component: RouteComponent,
});
