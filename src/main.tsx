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

const router = createRouter({ routeTree, history: createHashHistory() });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <WorkspacesProvider>
        <RouterProvider router={router} />
      </WorkspacesProvider>
    </TokenProvider>
  </React.StrictMode>
);
