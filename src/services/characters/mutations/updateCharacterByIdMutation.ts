import { mutation } from "astraql";

const updateCharacterByIdMutation = mutation`
updateEldenRingCharacter(
    $id: String!
    $data: UpdateCharacterInput!
  ) {
  updateEldenRingCharacter(
    id: $id
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

export default updateCharacterByIdMutation;
