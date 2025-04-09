import { RouterProvider, createRouter } from "@tanstack/react-router";

import ErrorComponent from "./components/ui/error-component";
import { Loader2Icon } from "lucide-react";
import { routeTree } from "./routeTree.gen";
import useAuth from "./hooks/use-auth";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultErrorComponent: (e) => <ErrorComponent error={e} />,
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
