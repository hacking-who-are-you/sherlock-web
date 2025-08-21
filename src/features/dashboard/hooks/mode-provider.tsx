import { useState } from "react";
import { modeContext } from "./use-mode";

const useModeProvider = () => {
  const [mode, setMode] = useState(false);
  return { mode, setMode };
};

export const ModeProvider = ({ children }: React.PropsWithChildren) => {
  const value = useModeProvider();
  return <modeContext.Provider value={value} children={children} />;
};
