import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-required/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth-required/"!</div>;
}
