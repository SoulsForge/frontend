import { Link, createFileRoute } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
