import { useUser } from "@/features/core/hooks/use-user";
import { PlatformSidebar } from "@/features/dashboard/components/platform-sidebar";
import { WorkspaceSelector } from "@/features/dashboard/components/workspace-selector";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-required/$workspace")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUser();
  const navigate = useNavigate({ from: "/$workspace" });
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      <PlatformSidebar
        activeTool={location.href.split("/").pop()}
        onToolChange={(tool) => {
          if (tool === "dashboard") {
            navigate({ to: "dashboard" });
          }
          if (tool === "vulnerability-scanner") {
            navigate({ to: "vulnerability-scanner" });
          }
        }}
        user={user}
      />

      <div className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card">
          <div className="p-4">
            <WorkspaceSelector
              // onWorkspaceChange={handleWorkspaceChange}
              onCreateWorkspace={() => navigate({ to: "/" })}
              onManageWorkspaces={() => navigate({ to: "/" })}
            />
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
