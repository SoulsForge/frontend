import { RouterProvider, createRouter } from "@tanstack/react-router";

import ErrorComponent from "./components/layout/error-component";
import { TopProgress } from "./components/ui-custom/top-loader";
import { routeTree } from "./routeTree.gen";
import useAuth from "./hooks/use-auth";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultErrorComponent: (e) => <ErrorComponent error={e} />,
  defaultPendingComponent: () => <TopProgress />,
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
