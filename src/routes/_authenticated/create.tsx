import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/create")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { user } = context.authentication;

    if (!user?.emailVerified) {
      throw redirect({
        to: "/verify-email",
      });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/_authenticated/create"!</div>;
}
