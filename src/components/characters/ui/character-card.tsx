import { Badge } from "@/components/ui/badge";
import { BaseCharacter } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui-custom/image";
import SummaryCharacter from "@/services/timeline/summary-character";
import { cn } from "@/lib/utils";

export default function CharacterCard({
  characterSummary: character,
  className,
}: { characterSummary: SummaryCharacter | BaseCharacter; className?: string }) {
  return (
    <Card
      className={cn(
        "relative aspect-video cursor-pointer overflow-hidden p-0 transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Image
        src={character.image_url}
        alt={character.name}
        className="h-full w-full rounded-lg object-cover"
        aspectRatio="video"
      />
      <h3 className="absolute right-0 bottom-0 left-0 line-clamp-1 p-2 font-semibold text-lg text-white">
        {character.name}
      </h3>
      <Badge className="absolute top-2 right-2 bg-black/70 text-white hover:bg-black/70">
        {character.game.name}
      </Badge>
    </Card>
  );
}
