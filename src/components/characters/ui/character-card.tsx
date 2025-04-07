import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SummaryCharacter from "@/services/timeline/summary-character";

export default function CharacterCard({
  characterSummary,
}: { characterSummary: SummaryCharacter }) {
  return (
    <Card className="relative aspect-video cursor-pointer overflow-hidden p-0 transition-opacity hover:opacity-90">
      <img
        src={characterSummary.image_url || "/placeholder.svg"}
        alt={characterSummary.name}
        className="h-full w-full rounded-lg object-cover"
      />
      <h3 className="absolute right-0 bottom-0 left-0 line-clamp-1 p-2 font-semibold text-lg text-white">
        {characterSummary.name}
      </h3>
      <Badge className="absolute top-2 right-2 bg-black/70 text-white hover:bg-black/70">
        {characterSummary.game.name}
      </Badge>
    </Card>
  );
}
