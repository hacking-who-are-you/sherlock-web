import { createContext, useContext } from "react";

export const tokenContext = createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
} | null>(null);

export const useToken = () => {
  const value = useContext(tokenContext);
  if (value === null) throw new Error("TokenProvider not found");
  return value;
};
