import { TrafficAnalyzerFrame } from "@/features/dashboard/frames/traffic-analyzer-frame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth-required/$workspace/traffic-analyzer"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TrafficAnalyzerFrame />;
}
