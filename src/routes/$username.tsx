import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import CharacterCard from "@/components/characters/ui/character-card";
import { User } from "lucide-react";
import { getCharactersByUserId } from "@/services/characters";
import { getProfile } from "@/services/profile";

export const Route = createFileRoute("/$username")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const { username } = params;
    const { user } = context.authentication;

    const profile = await getProfile(username);

    if (!profile) {
      throw notFound();
    }

    // check if username is valid
    const characters = await getCharactersByUserId(profile.user.id);

    return {
      profile,
      characters,
      isOwner: user?.id === profile.user.id,
    };
  },
});

function RouteComponent() {
  const { profile, characters, isOwner } = Route.useLoaderData();

  if (!profile) {
    return <div className="text-center">User not found</div>;
  }

  return (
    <section className="container mx-auto py-8 px-4">
      <div className="grid gap-8">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-4 w-full flex-wrap">
            <Avatar className="h-20 w-20 grid place-items-center bg-background rounded-full">
              <AvatarImage
                src={profile.avatar}
                alt="Profile"
                className="rounded-full"
              />
              <AvatarFallback className="text-2xl">
                {profile.user?.username
                  ? profile.user.username.charAt(0).toUpperCase()
                  : "JD"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow self-baseline">
              <CardTitle className="text-2xl">
                {profile.user.username}
              </CardTitle>
              <CardDescription>{characters.length} Characters</CardDescription>
            </div>
            <div className="self-end sm:w-fit w-full">
              {isOwner && (
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link to="/settings" search={{ tab: "profile" }}>
                    Edit Profile
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Characters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {characters.map((character) => (
              <Link
                to="/character/$id"
                params={{ id: character.id }}
                key={character.id}
              >
                <CharacterCard characterSummary={character} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
