import WorkspacesFrame from "@/features/dashboard/frames/workspaces-frame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-required/_dashboard/workspaces")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkspacesFrame />;
}
