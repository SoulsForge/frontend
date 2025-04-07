import { RegisterForm } from "@/components/forms/register-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="mx-auto mt-auto mb-auto w-full max-w-lg">
      <RegisterForm Route={Route} />
    </section>
  );
}
