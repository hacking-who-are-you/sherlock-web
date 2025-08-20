import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Settings,
  Users,
  Globe,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Activity,
  AlertTriangle,
} from "lucide-react";

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
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockWorkspaces: Workspace[] = [
      {
        id: "1",
        name: "Production Website",
        domain: "example.com",
        description: "Main production environment monitoring",
        status: "active",
        created_at: "2024-01-15",
        member_count: 8,
        last_scan: "2024-01-20T10:30:00Z",
        security_score: 92,
      },
      {
        id: "2",
        name: "E-commerce Platform",
        domain: "shop.example.com",
        description: "Online store security monitoring",
        status: "monitoring",
        created_at: "2024-01-10",
        member_count: 5,
        last_scan: "2024-01-20T08:15:00Z",
        security_score: 87,
      },
      {
        id: "3",
        name: "API Gateway",
        domain: "api.example.com",
        description: "Backend API security assessment",
        status: "maintenance",
        created_at: "2024-01-05",
        member_count: 3,
        last_scan: "2024-01-19T16:45:00Z",
        security_score: 78,
      },
    ];
    setWorkspaces(mockWorkspaces);
    setLoading(false);
  }, []);

  const handleCreateWorkspace = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const domain = formData.get("domain") as string;
    const description = formData.get("description") as string;

    // Mock creation - in real app, this would call Supabase
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name,
      domain,
      description,
      status: "active",
      created_at: new Date().toISOString().split("T")[0],
      member_count: 1,
      last_scan: new Date().toISOString(),
      security_score: 0,
    };

    setWorkspaces([...workspaces, newWorkspace]);
    setIsCreateDialogOpen(false);
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
            <form action={handleCreateWorkspace} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-card-foreground">
                  Workspace Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Production Website"
                  required
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain" className="text-card-foreground">
                  Domain
                </Label>
                <Input
                  id="domain"
                  name="domain"
                  placeholder="e.g., example.com"
                  required
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-card-foreground">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of this workspace"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Create Workspace
                </Button>
              </div>
            </form>
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
