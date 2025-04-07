import { GraphQLClient } from "astraql";
import { env } from "../config";

const client = new GraphQLClient({
  endpoint: env.BACKEND_SERVER + "/graphql",
});

export function setAuthorization(token: string) {
  client.addHeader("Authorization", `Bearer ${token}`);
}

export function removeAuthorization() {
  client.removeHeader("Authorization");
}

export default client;
