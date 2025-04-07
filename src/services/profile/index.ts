import client from "@/lib/clients/graphql";
import getMySlidersQuery from "./queries/getMySlidersQuery";

export async function getMySliders() {
  const response = client.fetch(getMySlidersQuery);

  return response;
}
