import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CharacterCard from "./character-card";
import { Link } from "@tanstack/react-router";
import SummaryCharacter from "@/services/timeline/summary-character";

interface CharacterCarouselProps {
  characters: SummaryCharacter[];
}

export default function CharacterCarousel({
  characters,
}: CharacterCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const CARDS_PER_VIEW = 3;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const totalCards = characters.length;
    const totalScrolls = Math.ceil(totalCards / CARDS_PER_VIEW);
    setScrollCount(totalScrolls);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
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
            className="md:basis-1/2 lg:basis-1/3"
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

      {/* <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: scrollCount }).map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`size-3 rounded-full p-0 ${
              index === current - 1 ? "bg-primary" : "bg-secondary"
            } border`}
            onClick={() => {
              setCurrent(index + 1);
              api?.scrollTo(index);
            }}
          >
            <span className="sr-only">Go to slide {index}</span>
          </Button>
        ))}
      </div> */}
    </Carousel>
  );
}
