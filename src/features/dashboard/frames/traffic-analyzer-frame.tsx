import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Globe,
  Clock,
  MapPin,
  Shield,
  AlertTriangle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { useTrafficAnalysis } from "../services/use-traffic-analysis";

const getThreatLevelColor = (
  level: ReturnType<typeof useTrafficAnalysis>["logs"][number]["threatLevel"]
) => {
  switch (level) {
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
  }
};

const getResponseCodeColor = (code: number) => {
  if (code >= 200 && code < 300) return "text-green-600";
  if (code >= 300 && code < 400) return "text-blue-600";
  if (code >= 400 && code < 500) return "text-yellow-600";
  if (code >= 500) return "text-red-600";
  return "text-gray-600";
};

export const TrafficAnalyzerFrame = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);

  const { logs: trafficData } = useTrafficAnalysis(
    new Date().toISOString().split("T")[0]
  );

  const filteredData = trafficData.filter((item) => {
    const matchesSearch =
      item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestPath.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBlocked = !showBlockedOnly || item.isBlocked;

    return matchesSearch && matchesBlocked;
  });

  const stats = {
    totalRequests: trafficData.length,
    blockedRequests: trafficData.filter((item) => item.isBlocked).length,
    criticalThreats: trafficData.filter(
      (item) => item.threatLevel === "critical"
    ).length,
    averageResponseTime: Math.round(
      trafficData.reduce((sum, item) => sum + item.time, 0) / trafficData.length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          Traffic Analyzer
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time network traffic monitoring and threat detection
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Requests
            </CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.totalRequests}
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Blocked Requests
            </CardTitle>
            <Shield className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.blockedRequests}
            </div>
            <p className="text-xs text-muted-foreground">
              {((stats.blockedRequests / stats.totalRequests) * 100).toFixed(1)}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Critical Threats
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.criticalThreats}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires immediate action
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.averageResponseTime}ms
            </div>
            <p className="text-xs text-muted-foreground">
              Acceptable performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Traffic Controls
          </CardTitle>
          <CardDescription>
            Filter and search through traffic data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by IP, country, city, or path..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showBlockedOnly ? "default" : "outline"}
                onClick={() => setShowBlockedOnly(!showBlockedOnly)}
                className="flex items-center gap-2"
              >
                {showBlockedOnly ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {showBlockedOnly ? "Show All" : "Blocked Only"}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Live Traffic Data
          </CardTitle>
          <CardDescription>
            Real-time monitoring of incoming requests and threat analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Request</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>Threat Level</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((traffic) => (
                  <TableRow key={traffic.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">
                      {traffic.timestamp}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {traffic.ip}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {traffic.city}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {traffic.country}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {traffic.method}
                          </Badge>
                          <span className="text-sm font-mono">
                            {traffic.requestPath}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 truncate max-w-xs">
                          {traffic.userAgent}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div
                          className={`text-sm font-medium ${getResponseCodeColor(traffic.status)}`}
                        >
                          {traffic.status}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {traffic.time}ms
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs border ${getThreatLevelColor(traffic.threatLevel)}`}
                      >
                        {traffic.threatLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={traffic.isBlocked ? "destructive" : "default"}
                        className="text-xs"
                      >
                        {traffic.isBlocked ? "Blocked" : "Allowed"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No traffic data found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
