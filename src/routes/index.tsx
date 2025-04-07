import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CharacterCarousel from "@/components/characters/ui/character-carousel";
import { cn } from "@/lib/utils";
import { getLatestCharacters } from "@/services/timeline";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">Latest Characters</h1>
      <div className="mt-8 w-full max-w-4xl">
        <CharacterCarousel characters={latestsCharacters} />
      </div>
    </div>
  );
}
