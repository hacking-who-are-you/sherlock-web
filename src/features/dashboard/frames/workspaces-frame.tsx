import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  AlertTriangle,
  Edit,
  Globe,
  MoreVertical,
  Plus,
  Settings,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useWorkspaces } from "../hooks/use-workspaces";
import { CreateWorkspaceForm } from "../components/create-workspace-form";

interface Workspace {
  id: string;
  name: string;
  domain: string;
  description: string;
  status: "active" | "monitoring" | "maintenance";
  created_at: string;
  member_count: number;
  last_scan: string;
  security_score: number;
}

const WorkspacesFrame = ({
  onOpenDashboard,
}: {
  onOpenDashboard: (workspace: Workspace) => void;
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { workspaces, loading } = useWorkspaces();

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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Workspace Management
          </h1>
          <p className="text-muted-foreground">
            Manage your security monitoring workspaces
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Workspace
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">
                Create New Workspace
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Set up a new workspace to monitor a website or domain
              </DialogDescription>
            </DialogHeader>
            <CreateWorkspaceForm close={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <Card
            key={workspace.id}
            className="bg-card border-border hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg text-card-foreground">
                    {workspace.name}
                  </CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-popover border-border"
                  >
                    <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                      <Users className="h-4 w-4 mr-2" />
                      Members
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-muted-foreground">
                {workspace.domain}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-card-foreground">
                {workspace.description}
              </p>

              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(workspace.status)}>
                  {workspace.status}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Shield
                    className={`h-4 w-4 ${getSecurityScoreColor(workspace.security_score)}`}
                  />
                  <span
                    className={`text-sm font-medium ${getSecurityScoreColor(workspace.security_score)}`}
                  >
                    {workspace.security_score}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Members</p>
                  <p className="font-medium text-card-foreground">
                    {workspace.member_count}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Scan</p>
                  <p className="font-medium text-card-foreground">
                    {new Date(workspace.last_scan).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    onOpenDashboard(workspace);
                  }}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Open Dashboard
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border text-card-foreground hover:bg-accent bg-transparent"
                >
                  <AlertTriangle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {workspaces.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Workspaces Yet
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first workspace to start monitoring website security
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Workspace
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkspacesFrame;
