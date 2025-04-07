import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">Settings</h1>
      <p className="text-lg">Settings page content goes here.</p>
    </div>
  );
}
