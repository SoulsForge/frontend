import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CharacterCard from "./character-card";
import { Link } from "@tanstack/react-router";
import SummaryCharacter from "@/services/timeline/summary-character";

interface CharacterCarouselProps {
  characters: SummaryCharacter[];
}

export default function CharacterCarousel({
  characters,
}: CharacterCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {characters.map((character) => (
          <CarouselItem
            key={character.id}
            className="md:basis-1/2 lg:basis-1/3 basis-3/4"
          >
            <Link
              to={`/character/$id`}
              params={{
                id: character.id,
              }}
              className="flex h-full w-full flex-col items-center justify-center"
            >
              <CharacterCard
                characterSummary={character}
                className="h-full w-full"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
