import { BaseCharacter } from "@/lib/types";
import client from "@/lib/clients/graphql";
import getCharacterByIdQuery from "./queries/getCharacterByIdQuery";
import updateCharacterByIdMutation from "./mutations/updateCharacterByIdMutation";

export async function getCharacterById(id: string): Promise<BaseCharacter> {
  const response = await client.fetch(getCharacterByIdQuery, { id });

  return response as BaseCharacter;
}

export async function updateCharacterById(
  id: string,
  data: Partial<BaseCharacter>,
): Promise<BaseCharacter> {
  delete data.game;
  delete data.user;
  delete data.id;

  const response = await client.fetch(updateCharacterByIdMutation, {
    id,
    data,
  });

  return response as BaseCharacter;
}
