import { query } from "astraql";

const getCharacterByIdQuery = query`
getEldenRingCharacter($id: String!) {
  getEldenRingCharacter(id: $id) {
    id
    name
    image_url
    description
    game {
      id
      name
    }
    user {
      id
      username
    }
    sliders
  }
}
`;

export default getCharacterByIdQuery;
