import { useState } from "react";
import { tokenContext } from "./use-token";

const useTokenProvider = () => {
  const [token, setToken] = useState<string | null>(null);
  return { token, setToken };
};

export const TokenProvider = ({ children }: React.PropsWithChildren) => {
  const value = useTokenProvider();
  return <tokenContext.Provider value={value} children={children} />;
};
