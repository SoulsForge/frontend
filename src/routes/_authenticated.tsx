import { createFileRoute, redirect } from "@tanstack/react-router";

import { Loader2Icon } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const { isAuthenticated } = context.authentication;

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  pendingComponent: () => <Loader2Icon className="animate-spin" />,
});
