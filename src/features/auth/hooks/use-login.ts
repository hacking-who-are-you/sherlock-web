import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useLoading } from "@toss/use-loading";
import { useToken } from "@/features/core/hooks/use-token";

const schema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
});

export const useLogin = () => {
  const { register, handleSubmit, formState, setError } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });
  const [loading, startTransition] = useLoading();
  const { setToken } = useToken();

  const onSubmit = handleSubmit(async (data) => {
    console.log("test");
    await startTransition(new Promise((resolve) => setTimeout(resolve, 1000)));
    if (data.email !== "admin@admin.com" || data.password !== "password") {
      setError("root", { message: "Invalid credentials" });
      return;
    }
    setToken("token");
  });

  return { register, onSubmit, loading, error: formState.errors.root?.message };
};
