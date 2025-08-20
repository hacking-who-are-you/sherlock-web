import { LoginFrame } from "@/features/auth/frames/login-frame";
import { createFileRoute } from "@tanstack/react-router";

const LoginPage = () => {
  return <LoginFrame />;
};

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
