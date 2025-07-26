import { LoginForm } from "@/components/forms/login-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Search = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
  validateSearch: (search) => Search.parse(search),
});

function RouteComponent() {
  return (
    <section className="mx-auto my-auto w-full max-w-lg">
      <LoginForm Route={Route} />
    </section>
  );
}
