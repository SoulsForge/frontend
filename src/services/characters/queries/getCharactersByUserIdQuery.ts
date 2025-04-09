import { query } from "astraql";

const getCharacterByUserIdQuery = query`
getEldenRingCharacters($userId: Float!) {
  getEldenRingCharacters(userId: $userId) {
    id
    name
    image_url
    game {
      name
    }
  }
}
`;

export default getCharacterByUserIdQuery;
