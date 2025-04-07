import { Game } from "@/lib/types";

export default interface SummaryCharacter {
  id: string;
  name: string;
  description: string;
  image_url: string;
  game: Game;
  createdAt: Date;
  updatedAt: Date;
}
