import { useToken } from "./use-token";

export interface User {
  name: string;
  email: string;
}

export const useUser = () => {
  const { token } = useToken();
  if (!token) return null;

  return {
    name: "admin",
    email: "admin@admin.com",
  } satisfies User;
};
