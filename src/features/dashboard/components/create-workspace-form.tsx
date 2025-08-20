import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkspace } from "../hooks/use-create-workspace";

export const CreateWorkspaceForm = ({ close }: { close: () => void }) => {
  const { handleCreateWorkspace, register } = useCreateWorkspace();

  return (
    <form onSubmit={handleCreateWorkspace} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-card-foreground">
          Workspace Name
        </Label>
        <Input
          id="name"
          {...register("name")}
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
          {...register("domain")}
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
          {...register("description")}
          placeholder="Brief description of this workspace"
          className="bg-input border-border text-foreground"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => close()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Create Workspace
        </Button>
      </div>
    </form>
  );
};
