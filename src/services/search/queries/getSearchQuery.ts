import { query } from "astraql";

const getSearchQuery = query`
searchCharacter($q: String!) {
  searchCharacter(query: $q) {
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

export default getSearchQuery;
