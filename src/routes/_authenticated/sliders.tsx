import { Link, createFileRoute } from "@tanstack/react-router";

import CharacterCard from "@/components/characters/ui/character-card";
import Loader from "@/components/ui-custom/loader";
import { getMySliders } from "@/services/profile";

export const Route = createFileRoute("/_authenticated/sliders")({
  component: RouteComponent,
  loader: async () => {
    const mySliders = await getMySliders();

    return {
      mySliders,
    };
  },
  pendingComponent: () => <Loader message="Loading sliders..." />,
});

function RouteComponent() {
  const { mySliders } = Route.useLoaderData();
  return (
    <section>
      <h1 className="font-bold text-2xl">My Sliders</h1>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {mySliders.map((slider) => (
          <Link
            key={slider.id}
            to={`/character/$id`}
            params={{ id: slider.id }}
          >
            <CharacterCard characterSummary={slider} />
          </Link>
        ))}
      </div>
    </section>
  );
}
