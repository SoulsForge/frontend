import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import CharacterCarousel from "@/components/characters/ui/character-carousel";
import { getLatestCharacters } from "@/services/timeline";
import useAuth from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const latestsCharacters = await getLatestCharacters();

    return {
      latestsCharacters,
    };
  },
});

function RouteComponent() {
  const { latestsCharacters } = Route.useLoaderData();
  const { isAuthenticated } = useAuth();

  return (
    <article className="flex flex-col items-center justify-center px-2">
      {!isAuthenticated && (
        <section className="w-full max-w-7xl mx-auto py-20 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Welcome to SoulsForge
              </h1>
              <p className="text-xl text-muted-foreground">
                Share and discover character designs for{" "}
                <span className="text-primary">Elden Ring</span>
                <br />
                Create your own and get inspired by others.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="font-semibold">
                  <Link to="/register">Create Account</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-semibold"
                >
                  <Link to="/login">Sign in</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-sm">
              <figure className="relative">
                <img
                  src="/header.png"
                  alt="Fantasy character creation"
                  className="object-cover w-full h-[400px]"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                  <h3 className="text-xl font-bold">Slider Example</h3>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Why Create Characters with SoulsForge?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-bold mb-3">Intuitive Design</h3>
                <p>
                  Easily create and customize characters with our user-friendly
                  interface.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-bold mb-3">Community Sharing</h3>
                <p>
                  Share your creations and get inspired by others in our growing
                  community.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-bold mb-3">Third Party Import</h3>
                <p>
                  Import your characters from third party tools like Elden
                  Bling.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto py-12 px-4 md:px-8">
        <h1 className="font-bold text-2xl">Latest Characters</h1>
        <div className="mt-8 w-full max-w-4xl">
          <CharacterCarousel characters={latestsCharacters} />
        </div>
      </section>
    </article>
  );
}
