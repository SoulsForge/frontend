import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$username")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { username } = params;

    // todo: get characters from username
    // const characters = await getCharactersByUsername(username);

    // check if username is valid

    console.log("username", username);

    return {
      username,
    };
  },
});

function RouteComponent() {
  const { username } = Route.useLoaderData();

  return (
    <section>
      <h1 className="font-bold text-2xl">User: {username}</h1>
    </section>
  );
}
