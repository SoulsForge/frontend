import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/logout")({
  beforeLoad: async ({ context }) => {
    const { logout } = context.authentication;

    logout();

    throw redirect({
      to: "/",
    });
  },
});
