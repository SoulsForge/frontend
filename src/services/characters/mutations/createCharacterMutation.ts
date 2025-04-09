import { mutation } from "astraql";

const createCharacterMutation = mutation`
createEldenRingCharacter(
    $data: CreateCharacterInput!
  ) {
  createEldenRingCharacter(
    data: $data
  ) {
    id
    name
    sliders
    user {
      id
      username
    }
    createdAt
    updatedAt
  }
}
`;

export default createCharacterMutation;
