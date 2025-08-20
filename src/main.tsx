import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { TokenProvider } from "./features/core/hooks/token-provider";
import { WorkspacesProvider } from "./features/dashboard/hooks/workspaces-provider";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree, history: createHashHistory() });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <WorkspacesProvider>
          <RouterProvider router={router} />
        </WorkspacesProvider>
      </TokenProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
