import { useUser } from "@/features/core/hooks/use-user";
import { PlatformSidebar } from "@/features/dashboard/components/platform-sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-required/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUser();
  return (
    <div className="min-h-screen bg-background flex">
      <PlatformSidebar
        // activeTool={activeTool}
        // onToolChange={handleToolChange}
        user={user}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
