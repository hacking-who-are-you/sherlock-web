import { useToken } from "./use-token";

export const useUser = () => {
  const { token } = useToken();
  if (!token) return null;

  return {
    name: "admin",
  };
};
