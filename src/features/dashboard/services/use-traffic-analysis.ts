import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface Log {
  client_ip: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  request_body: unknown;
  status_code: number;
  process_time_ms: number;
  received_at: string;
}

interface TrafficData {
  id: string;
  timestamp: string;
  ip: string;
  country: string;
  city: string;
  userAgent: string;
  method: string;
  requestPath: string;
  status: number;
  time: number;
  threatLevel: "low" | "medium" | "high" | "critical";
  isBlocked: boolean;
}

export const useTrafficAnalysis = (date: string) => {
  const { data } = useQuery({
    queryKey: ["traffic-analysis", date],
    queryFn: () =>
      api
        .get<{ logs: Log[] }>("/trafficAnalysis/logs", { params: { date } })
        .then((res) =>
          res.data.logs.map(
            (v) =>
              ({
                id: crypto.randomUUID(),
                timestamp: new Date(v.received_at).toISOString(),
                ip: v.client_ip,
                method: v.method,
                status: v.status_code,
                time: v.process_time_ms,
                userAgent: v.headers["user-agent"],
                country: "N/A",
                city: "N/A",
                requestPath: v.url,
                isBlocked: v.status_code >= 400,
                threatLevel: "low",
              }) as TrafficData
          )
        ),
  });

  return { logs: data ?? [] };
};
