import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  BarChart3,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
} from "lucide-react";

interface VulnerabilityResult {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  description?: string;
  url: string;
  evidence?: string;
  recommendation?: string;
  aiAnalysis?: string;
}

interface ScanReport {
  id: string;
  targetUrl: string;
  scanDate: Date;
  vulnerabilities: VulnerabilityResult[];
  scanDuration: number;
  status: "completed" | "failed";
}

interface ScanReportsProps {
  currentScan?: {
    targetUrl: string;
    vulnerabilities: VulnerabilityResult[];
    scanDate: Date;
  };
}

export const ScanReports = ({ currentScan }: ScanReportsProps) => {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);

  // Mock historical data - in real app this would come from database
  const historicalScans: ScanReport[] = [
    {
      id: "1",
      targetUrl: "https://example.com",
      scanDate: new Date(Date.now() - 86400000), // 1 day ago
      vulnerabilities: [
        {
          id: "1",
          type: "XSS",
          severity: "high",
          description: "Reflected XSS",
          url: "/search",
        },
        {
          id: "2",
          type: "CSRF",
          severity: "medium",
          description: "Missing CSRF token",
          url: "/login",
        },
      ],
      scanDuration: 45,
      status: "completed",
    },
    {
      id: "2",
      targetUrl: "https://test.com",
      scanDate: new Date(Date.now() - 172800000), // 2 days ago
      vulnerabilities: [
        {
          id: "3",
          type: "SQL Injection",
          severity: "critical",
          description: "SQL injection in login",
          url: "/auth",
        },
      ],
      scanDuration: 32,
      status: "completed",
    },
  ];

  const allScans = currentScan
    ? [
        {
          id: "current",
          targetUrl: currentScan.targetUrl,
          scanDate: currentScan.scanDate,
          vulnerabilities: currentScan.vulnerabilities,
          scanDuration: 0,
          status: "completed" as const,
        },
        ...historicalScans,
      ]
    : historicalScans;

  const generateExecutiveSummary = (vulnerabilities: VulnerabilityResult[]) => {
    const critical = vulnerabilities.filter(
      (v) => v.severity === "critical"
    ).length;
    const high = vulnerabilities.filter((v) => v.severity === "high").length;
    const medium = vulnerabilities.filter(
      (v) => v.severity === "medium"
    ).length;
    const low = vulnerabilities.filter((v) => v.severity === "low").length;
    const total = vulnerabilities.length;

    const riskScore =
      (critical * 10 + high * 7 + medium * 4 + low * 1) / Math.max(total, 1);
    const riskLevel =
      riskScore >= 8
        ? "Critical"
        : riskScore >= 6
          ? "High"
          : riskScore >= 4
            ? "Medium"
            : "Low";

    return {
      total,
      critical,
      high,
      medium,
      low,
      riskScore: Math.round(riskScore * 10) / 10,
      riskLevel,
    };
  };

  const handleExport = async (format: string, scan: ScanReport) => {
    setIsExporting(true);

    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const summary = generateExecutiveSummary(scan.vulnerabilities);
      const reportData = {
        scan,
        summary,
        generatedAt: new Date().toISOString(),
        format,
      };

      // In a real app, this would call an API to generate the report
      const blob = new Blob([JSON.stringify(reportData, null, 2)], {
        type: format === "json" ? "application/json" : "text/plain",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vulnerability-report-${scan.id}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "text-red-600";
      case "High":
        return "text-orange-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Security Reports</h2>
            <p className="text-muted-foreground">
              Comprehensive vulnerability analysis and reporting
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Scan</TabsTrigger>
          <TabsTrigger value="history">Scan History</TabsTrigger>
          <TabsTrigger value="trends">Security Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {currentScan ? (
            <>
              {/* Executive Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Executive Summary
                  </CardTitle>
                  <CardDescription>
                    High-level security assessment overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const summary = generateExecutiveSummary(
                      currentScan.vulnerabilities
                    );
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Risk Assessment</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">
                              {summary.riskScore}/10
                            </span>
                            <Badge
                              className={getRiskLevelColor(summary.riskLevel)}
                            >
                              {summary.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">
                            Total Vulnerabilities
                          </h4>
                          <div className="text-2xl font-bold">
                            {summary.total}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Priority Actions</h4>
                          <div className="text-sm">
                            {summary.critical > 0 && (
                              <div className="text-red-600">
                                • {summary.critical} Critical issues require
                                immediate attention
                              </div>
                            )}
                            {summary.high > 0 && (
                              <div className="text-orange-500">
                                • {summary.high} High severity issues need
                                prompt resolution
                              </div>
                            )}
                            {summary.critical === 0 && summary.high === 0 && (
                              <div className="text-green-600">
                                • No critical or high severity issues found
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Report
                  </CardTitle>
                  <CardDescription>
                    Generate detailed security reports in various formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Select
                      value={selectedFormat}
                      onValueChange={setSelectedFormat}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                        <SelectItem value="csv">CSV Export</SelectItem>
                        <SelectItem value="html">HTML Report</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() =>
                        handleExport(selectedFormat, {
                          id: "current",
                          targetUrl: currentScan.targetUrl,
                          scanDate: currentScan.scanDate,
                          vulnerabilities: currentScan.vulnerabilities,
                          scanDuration: 0,
                          status: "completed",
                        })
                      }
                      disabled={isExporting}
                    >
                      {isExporting ? "Generating..." : "Export Report"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Findings */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Findings</CardTitle>
                  <CardDescription>
                    Complete vulnerability breakdown with remediation guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentScan.vulnerabilities.map((vuln, index) => (
                      <div
                        key={vuln.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                              #{index + 1}
                            </span>
                            <h4 className="font-semibold">{vuln.type}</h4>
                            <Badge className={getSeverityColor(vuln.severity)}>
                              {vuln.severity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {vuln.description}
                        </p>
                        <div className="text-xs font-mono bg-muted p-2 rounded">
                          {vuln.url}
                        </div>
                        {vuln.evidence && (
                          <div className="text-xs">
                            <strong>Evidence:</strong> {vuln.evidence}
                          </div>
                        )}
                        {vuln.recommendation && (
                          <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                            <strong>Recommendation:</strong>{" "}
                            {vuln.recommendation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Current Scan</h3>
                <p className="text-muted-foreground">
                  Run a vulnerability scan to generate reports
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Scan History
              </CardTitle>
              <CardDescription>
                Previous vulnerability assessments and their results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allScans.map((scan) => {
                  const summary = generateExecutiveSummary(
                    scan.vulnerabilities
                  );
                  return (
                    <div key={scan.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{scan.targetUrl}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {scan.scanDate.toLocaleDateString()} at{" "}
                            {scan.scanDate.toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getRiskLevelColor(summary.riskLevel)}
                          >
                            {summary.riskLevel} Risk
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExport("pdf", scan)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span>{summary.critical} Critical</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span>{summary.high} High</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>{summary.medium} Medium</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          <span>{summary.low} Low</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Security Trends
              </CardTitle>
              <CardDescription>
                Analysis of security posture over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Vulnerability Trends</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Critical Issues</span>
                      <span className="text-sm font-mono">↓ 2 (Improving)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">High Severity</span>
                      <span className="text-sm font-mono">→ 1 (Stable)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium Severity</span>
                      <span className="text-sm font-mono">
                        ↑ 3 (Needs Attention)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Common Vulnerabilities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">XSS</span>
                      <span className="text-sm font-mono">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CSRF</span>
                      <span className="text-sm font-mono">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SQL Injection</span>
                      <span className="text-sm font-mono">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-mono">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
