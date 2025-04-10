import GetProfileQuery from "./queries/getProfileQuery";
import client from "@/lib/clients/graphql";
import getMySlidersQuery from "./queries/getMySlidersQuery";
import updateProfileMutation from "./mutations/updateProfileMutation";

export async function getMySliders() {
  const response = client.fetch(getMySlidersQuery);

  return response;
}

export async function getProfile(username: string) {
  const response = client.fetch(GetProfileQuery, { username });

  return response;
}

export async function updateProfile(data: {
  username?: string;
  email?: string;
  avatar?: string;
}) {
  const response = client.fetch(updateProfileMutation, { data });

  return response;
}