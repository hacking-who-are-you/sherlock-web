import WorkspacesFrame from "@/features/dashboard/frames/workspaces-frame";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-required/_dashboard/workspaces")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return <WorkspacesFrame onOpenDashboard={() => navigate({ to: "/" })} />;
}
