import { query } from "astraql";

const getLatestQuery = query`
getLatestCharacters($metadata: Metadata!) {
  getLatestCharacters(metadata: $metadata) {
    id
    name
    game {
      name
    }
    image_url
    createdAt
  }
}
`;

export default getLatestQuery;
