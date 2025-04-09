import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import CharacterCard from "./character-card";
import { Link } from "@tanstack/react-router";
import SummaryCharacter from "@/services/timeline/summary-character";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CharacterCarouselProps {
  characters: SummaryCharacter[];
}

export default function CharacterCarousel({
  characters,
}: CharacterCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + characters.length) % characters.length,
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative">
        {/* Navigation Buttons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background shadow-md"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>

        <div className="overflow-hidden py-8">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / characters.length)}%)`,
            }}
          >
            {characters.map((card, index) => (
              <Link
                to="/character/$id"
                params={{ id: card.id }}
                key={index}
                className={cn(
                  "min-w-[280px] md:min-w-[320px] lg:min-w-[384px] transition-opacity duration-300 overflow-hidden",
                )}
                style={{
                  flex: `0 0 ${100 / characters.length}%`, // Basado en el total de tarjetas
                }}
              >
                <CharacterCard characterSummary={card} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-1 mt-4">
        {characters.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-2 h-2 rounded-full p-0 ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  // return (
  //   <Carousel className="w-full">
  //     <CarouselPrevious className="cursor-pointer" />
  //     <CarouselContent className="flex gap-2">
  //       {characters.map((character) => (
  //         <CarouselItem
  //           key={character.id}
  //           className={cn("flex-shrink-0", `basis-1/3`)}
  //         >
  //           <Link to={`/character/$id`} params={{ id: character.id }}>
  //             <CharacterCard characterSummary={character} />
  //           </Link>
  //         </CarouselItem>
  //       ))}
  //     </CarouselContent>
  //     <CarouselNext className="cursor-pointer" />
  //   </Carousel>
  // );
}
