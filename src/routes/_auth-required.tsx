import { useUser } from "@/features/core/hooks/use-user";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

function RouteComponent() {
  const user = useUser();
  if (!user) return <Navigate to="/auth/login" />;
  return <Outlet />;
}

export const Route = createFileRoute("/_auth-required")({
  component: RouteComponent,
});
