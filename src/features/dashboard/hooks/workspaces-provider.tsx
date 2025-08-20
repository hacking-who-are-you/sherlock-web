import { useEffect, useState } from "react";
import { workspaceContext } from "./use-workspaces";

export interface Workspace {
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

const useWorkspacesProvider = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const loading = false;

  const addWorkspace = (workspace: Workspace) => {
    setWorkspaces([...workspaces, workspace]);
  };

  useEffect(() => {
    setWorkspaces(mockWorkspaces);
  }, []);

  return { workspaces, loading, addWorkspace };
};

export const WorkspacesProvider = ({ children }: React.PropsWithChildren) => {
  const value = useWorkspacesProvider();
  return <workspaceContext.Provider value={value} children={children} />;
};
