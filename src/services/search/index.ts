import SummaryCharacter from "../timeline/summary-character";
import client from "@/lib/clients/graphql";
import getSearchQuery from "./queries/getSearchQuery";

export async function getSearchResults(q: string): Promise<SummaryCharacter[]> {
  const characters = await client.fetch(getSearchQuery, { q });
  return characters as SummaryCharacter[];
}
