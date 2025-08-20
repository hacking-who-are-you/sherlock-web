import { useUser } from "@/features/core/hooks/use-user";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

function RouteComponent() {
  const user = useUser();
  if (user) return <Navigate to="/" />;
  return <Outlet />;
}

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});
