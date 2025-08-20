import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronDown, Globe, Plus, Settings } from "lucide-react";
import { useMemo } from "react";
import { useWorkspaces, Workspace } from "../hooks/use-workspaces";

interface WorkspaceSelectorProps {
  onCreateWorkspace?: () => void;
  onManageWorkspaces?: () => void;
}

export function WorkspaceSelector({
  onCreateWorkspace,
  onManageWorkspaces,
}: WorkspaceSelectorProps) {
  const { workspace } = useParams({ from: "/_auth-required/$workspace" });
  const { workspaces, loading } = useWorkspaces();

  const selectedWorkspace = useMemo(
    () => workspaces.find((v) => v.id === workspace),
    [workspaces, workspace]
  );
  const navigate = useNavigate({ from: "/$workspace" });

  const handleWorkspaceSelect = (workspace: Workspace) => {
    navigate({ to: ".", params: { workspace: workspace.id } });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground";
      case "monitoring":
        return "bg-secondary text-secondary-foreground";
      case "maintenance":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return "text-primary";
    if (score >= 70) return "text-secondary";
    return "text-destructive";
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-card rounded-lg border border-border">
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading workspaces...
        </span>
      </div>
    );
  }

  if (!selectedWorkspace) {
    return (
      <Button
        onClick={onCreateWorkspace}
        className="w-full justify-start bg-card hover:bg-accent text-card-foreground border border-border h-14"
        variant="outline"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create First Workspace
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-card hover:bg-accent text-card-foreground border border-border h-14"
        >
          <div className="flex items-center space-x-2 min-w-0">
            <Globe className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="flex flex-col items-start min-w-0">
              <span className="text-sm font-medium truncate">
                {selectedWorkspace.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {selectedWorkspace.domain}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Badge
              className={`text-xs ${getStatusColor(selectedWorkspace.status)}`}
            >
              {selectedWorkspace.status}
            </Badge>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-popover border border-border"
        align="start"
      >
        <DropdownMenuLabel className="text-popover-foreground">
          Select Workspace
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />

        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => handleWorkspaceSelect(workspace)}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent text-popover-foreground"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <Globe className="h-4 w-4 text-primary flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">
                  {workspace.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {workspace.domain}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span
                className={`text-xs font-medium ${getSecurityScoreColor(workspace.security_score)}`}
              >
                {workspace.security_score}%
              </span>
              <Badge className={`text-xs ${getStatusColor(workspace.status)}`}>
                {workspace.status}
              </Badge>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={onCreateWorkspace}
          className="flex items-center space-x-2 p-3 cursor-pointer hover:bg-accent text-popover-foreground"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Create New Workspace</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onManageWorkspaces}
          className="flex items-center space-x-2 p-3 cursor-pointer hover:bg-accent text-popover-foreground"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm">Manage Workspaces</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
