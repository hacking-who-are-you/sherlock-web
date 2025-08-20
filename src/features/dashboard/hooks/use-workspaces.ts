import { createContext, useContext } from "react";

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

export const workspaceContext = createContext<{
  workspaces: Workspace[];
  loading: boolean;
  addWorkspace: (workspace: Workspace) => void;
} | null>(null);

export const useWorkspaces = () => {
  const value = useContext(workspaceContext);
  if (!value) throw new Error("WorkspaceProvider not found");
  return value;
};
