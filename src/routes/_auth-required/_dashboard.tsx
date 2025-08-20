import { useUser } from "@/features/core/hooks/use-user";
import { PlatformSidebar } from "@/features/dashboard/components/platform-sidebar";
import { WorkspaceSelector } from "@/features/dashboard/components/workspace-selector";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-required/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUser();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex">
      <PlatformSidebar
        activeTool={"dashboard"}
        onToolChange={(tool) => console.log(tool)}
        user={user}
      />

      <div className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card">
          <div className="p-4">
            <WorkspaceSelector
              // onWorkspaceChange={handleWorkspaceChange}
              onCreateWorkspace={() => navigate({ to: "/workspaces" })}
              onManageWorkspaces={() => navigate({ to: "/workspaces" })}
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
