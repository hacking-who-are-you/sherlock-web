import WorkspacesFrame from "@/features/dashboard/frames/workspaces-frame";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-required/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <WorkspacesFrame
        onOpenDashboard={(workspace) =>
          navigate({
            to: "/$workspace/dashboard",
            params: { workspace: workspace.id },
          })
        }
      />
    </div>
  );
}
