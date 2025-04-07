import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SummaryCharacter from "@/services/timeline/summary-character";
import { Link } from "@tanstack/react-router";
import { Badge } from "../../ui/badge";
import CharacterCard from "./character-card";

interface CharacterCarouselProps {
  characters: SummaryCharacter[];
}

export default function CharacterCarousel({
  characters,
}: CharacterCarouselProps) {
  // const [api, setApi] = React.useState<CarouselApi>();

  return (
    <Carousel className="w-full">
      <CarouselPrevious className="cursor-pointer" />
      <CarouselContent className="flex gap-2">
        {characters.map((character) => (
          <CarouselItem
            key={character.id}
            className={cn("flex-shrink-0", `basis-1/3`)}
          >
            <Link to={`/character/$id`} params={{ id: character.id }}>
              <CharacterCard characterSummary={character} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
}
