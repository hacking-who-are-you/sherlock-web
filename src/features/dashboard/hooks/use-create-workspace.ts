import z from "zod";
import { useWorkspaces, Workspace } from "./use-workspaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
  description: z.string().min(1),
});

export const useCreateWorkspace = ({ close }: { close: () => void }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { name: "", description: "", domain: "" },
    resolver: zodResolver(schema),
  });
  const { addWorkspace } = useWorkspaces();

  const handleCreateWorkspace = handleSubmit(async (data) => {
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: data.name,
      domain: data.domain,
      description: data.description,
      status: "active",
      created_at: new Date().toISOString().split("T")[0],
      member_count: 1,
      last_scan: new Date().toISOString(),
      security_score: 0,
    };

    addWorkspace(newWorkspace);
    close();
  });

  return {
    handleCreateWorkspace,
    register,
    error: formState.errors.root?.message,
  };
};
