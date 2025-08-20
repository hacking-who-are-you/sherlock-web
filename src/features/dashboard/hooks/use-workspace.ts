import { useWorkspaces } from "./use-workspaces";

export const useWorkspace = (id: string) => {
  const { workspaces } = useWorkspaces();

  return { workspace: workspaces.find((w) => w.id === id) };
};
