import type React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Activity,
  FileText,
  Settings,
  BarChart3,
  Network,
  Lock,
  AlertTriangle,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserIcon,
} from "lucide-react";
import { User } from "@/features/core/hooks/use-user";
import { useToken } from "@/features/core/hooks/use-token";
import logo from "@/assets/logo.svg";

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  status: "active" | "beta" | "coming-soon";
  category: "scanner" | "analysis" | "reporting" | "management";
}

const tools = [
  {
    id: "vulnerability-scanner",
    name: "Vulnerability Scanner",
    icon: Shield,
    description: "AI-powered web vulnerability detection",
    status: "active",
    category: "scanner",
  },
  {
    id: "traffic-analyzer",
    name: "Traffic Analyzer",
    icon: Activity,
    description: "Network traffic analysis and monitoring",
    status: "beta",
    category: "analysis",
  },
  {
    id: "penetration-testing",
    name: "Penetration Testing",
    icon: Search,
    description: "Automated penetration testing suite",
    status: "coming-soon",
    category: "scanner",
  },
  {
    id: "compliance-checker",
    name: "Compliance Checker",
    icon: Lock,
    description: "Security compliance validation",
    status: "coming-soon",
    category: "analysis",
  },
  {
    id: "threat-intelligence",
    name: "Threat Intelligence",
    icon: AlertTriangle,
    description: "Real-time threat monitoring",
    status: "coming-soon",
    category: "analysis",
  },
  {
    id: "network-mapper",
    name: "Network Mapper",
    icon: Network,
    description: "Network topology discovery",
    status: "coming-soon",
    category: "scanner",
  },
] as const satisfies Tool[];

type ToolId =
  | "dashboard"
  | "reporting-hub"
  | "tool-management"
  | (typeof tools)[number]["id"];

interface PlatformSidebarProps {
  activeTool: ToolId;
  onToolChange: (toolId: ToolId) => void;
  user?: User | null;
}

export function PlatformSidebar({
  activeTool,
  onToolChange,
  user,
}: PlatformSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const getStatusBadge = (status: Tool["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground"
          >
            Active
          </Badge>
        );
      case "beta":
        return (
          <Badge
            variant="secondary"
            className="bg-secondary text-secondary-foreground"
          >
            Beta
          </Badge>
        );
      case "coming-soon":
        return (
          <Badge
            variant="outline"
            className="border-muted-foreground text-muted-foreground"
          >
            Soon
          </Badge>
        );
    }
  };

  const categories = [
    { id: "scanner", name: "Security Scanners", icon: Shield },
    { id: "analysis", name: "Analysis Tools", icon: BarChart3 },
    { id: "reporting", name: "Reporting", icon: FileText },
    { id: "management", name: "Management", icon: Settings },
  ];

  const { setToken } = useToken();

  const handleLogout = async () => {
    setToken(null);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-80"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex gap-2 items-center">
            <img src={logo} alt="SHERLOCK" className="size-10" />
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">
                SHERLOCK
              </h1>
              <p className="text-sm text-sidebar-foreground/70">
                Multi-Tool Security Suite
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-sidebar-border">
          <div
            className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center"
            )}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.email}
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  Security Analyst
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dashboard Navigation */}
      <div className="p-4 border-b border-sidebar-border">
        <Button
          variant={activeTool === "dashboard" ? "default" : "ghost"}
          className={cn(
            "w-full justify-start gap-3 h-auto p-3",
            collapsed ? "px-3" : "px-3",
            activeTool === "dashboard"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
          onClick={() => onToolChange("dashboard")}
        >
          <BarChart3 className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <div className="flex-1 text-left">
              <span className="font-medium">Dashboard</span>
              <p className="text-xs opacity-70 mt-1">Platform overview</p>
            </div>
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {categories.map((category) => {
          const categoryTools = tools.filter(
            (tool) => tool.category === category.id
          );
          if (categoryTools.length === 0) return null;

          return (
            <div key={category.id}>
              {!collapsed && (
                <div className="flex items-center gap-2 mb-3">
                  <category.icon className="h-4 w-4 text-sidebar-foreground/70" />
                  <h3 className="text-sm font-medium text-sidebar-foreground/70 uppercase tracking-wide">
                    {category.name}
                  </h3>
                </div>
              )}

              <div className="space-y-1">
                {categoryTools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant={activeTool === tool.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-3",
                      collapsed ? "px-3" : "px-3",
                      activeTool === tool.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                    onClick={() => onToolChange(tool.id)}
                    disabled={tool.status === "coming-soon"}
                  >
                    <tool.icon className={cn("h-5 w-5 flex-shrink-0")} />
                    {!collapsed && (
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{tool.name}</span>
                          {getStatusBadge(tool.status)}
                        </div>
                        <p className="text-xs opacity-70 mt-1">
                          {tool.description}
                        </p>
                      </div>
                    )}
                  </Button>
                ))}

                {category.id === "reporting" && (
                  <Button
                    variant={
                      activeTool === "reporting-hub" ? "default" : "ghost"
                    }
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-3",
                      collapsed ? "px-3" : "px-3",
                      activeTool === "reporting-hub"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                    onClick={() => onToolChange("reporting-hub")}
                  >
                    <FileText className={cn("h-5 w-5 flex-shrink-0")} />
                    {!collapsed && (
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Reporting Hub</span>
                          <Badge
                            variant="default"
                            className="bg-primary text-primary-foreground"
                          >
                            Active
                          </Badge>
                        </div>
                        <p className="text-xs opacity-70 mt-1">
                          Integrated security reporting
                        </p>
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3",
            collapsed ? "px-3" : "px-3",
            "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
          onClick={() => onToolChange("tool-management")}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Platform Settings</span>}
        </Button>

        {user && (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3",
              collapsed ? "px-3" : "px-3",
              "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        )}
      </div>
    </div>
  );
}
