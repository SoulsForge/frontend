import { RouterProvider, createRouter } from "@tanstack/react-router";

import { Loader2Icon } from "lucide-react";
import useAuth from "./hooks/use-auth";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const authentication = useAuth();

  return <RouterProvider router={router} context={{ authentication }} />;
}
