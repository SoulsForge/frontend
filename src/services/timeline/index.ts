import client from "@/lib/clients/graphql";
import getLatestQuery from "./queries/getLatestsQuery";
import SummaryCharacter from "./summary-character";

export async function getLatestCharacters(
  limit: number = 5,
): Promise<SummaryCharacter[]> {
  const characters = await client.fetch(getLatestQuery, {
    metadata: { limit },
  });
  return characters as SummaryCharacter[];
}
