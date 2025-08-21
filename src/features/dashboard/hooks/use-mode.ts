import { createContext, useContext } from "react";

export const modeContext = createContext<{
  setMode: (v: boolean) => void;
  mode: boolean;
} | null>(null);

export const useMode = () => {
  const value = useContext(modeContext);
  if (!value) throw new Error("ModeProvider not found");
  return value;
};
