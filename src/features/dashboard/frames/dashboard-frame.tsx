import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Activity,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface DashboardStats {
  totalScans: number;
  activeThreats: number;
  resolvedIssues: number;
  systemHealth: number;
}

interface RecentActivity {
  id: string;
  tool: string;
  action: string;
  timestamp: string;
  status: "success" | "warning" | "error";
}

const getStatusIcon = (status: RecentActivity["status"]) => {
  switch (status) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-primary" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-secondary" />;
    case "error":
      return <XCircle className="h-4 w-4 text-destructive" />;
  }
};

export const DashboardFrame = () => {
  const [stats] = useState<DashboardStats>({
    totalScans: 1247,
    activeThreats: 23,
    resolvedIssues: 156,
    systemHealth: 98,
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      tool: "Vulnerability Scanner",
      action: "Completed scan of example.com",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: "2",
      tool: "Traffic Analyzer",
      action: "Detected suspicious traffic pattern",
      timestamp: "15 minutes ago",
      status: "warning",
    },
    {
      id: "3",
      tool: "Vulnerability Scanner",
      action: "Found 3 critical vulnerabilities",
      timestamp: "1 hour ago",
      status: "error",
    },
    {
      id: "4",
      tool: "Compliance Checker",
      action: "GDPR compliance check passed",
      timestamp: "2 hours ago",
      status: "success",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Security Operations Center
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive cybersecurity platform dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Scans
            </CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.totalScans.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Active Threats
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.activeThreats}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Resolved Issues
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.resolvedIssues}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              System Health
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.systemHealth}%
            </div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Quick Actions
            </CardTitle>
            <CardDescription>Start security operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Shield className="h-4 w-4" />
              Run Vulnerability Scan
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-border text-foreground hover:bg-accent bg-transparent"
            >
              <Activity className="h-4 w-4" />
              Analyze Network Traffic
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-border text-foreground hover:bg-accent bg-transparent"
            >
              <BarChart3 className="h-4 w-4" />
              Generate Security Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest security operations and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
                >
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="text-xs border-border"
                      >
                        {activity.tool}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Status Grid */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Tool Status</CardTitle>
          <CardDescription>
            Current status of all security tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Vulnerability Scanner",
                status: "active",
                lastRun: "2 min ago",
              },
              {
                name: "Traffic Analyzer",
                status: "active",
                lastRun: "15 min ago",
              },
              {
                name: "Penetration Testing",
                status: "maintenance",
                lastRun: "1 day ago",
              },
              {
                name: "Compliance Checker",
                status: "active",
                lastRun: "2 hours ago",
              },
              {
                name: "Threat Intelligence",
                status: "inactive",
                lastRun: "Never",
              },
              { name: "Network Mapper", status: "inactive", lastRun: "Never" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {tool.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last run: {tool.lastRun}
                  </p>
                </div>
                <Badge
                  variant={tool.status === "active" ? "default" : "outline"}
                  className={
                    tool.status === "active"
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }
                >
                  {tool.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
