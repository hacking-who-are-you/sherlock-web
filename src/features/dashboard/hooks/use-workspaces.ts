import { createContext, useContext } from "react";
import { Workspace } from "./workspaces-provider";

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
