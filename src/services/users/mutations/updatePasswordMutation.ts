import { mutation } from "astraql";

const updatePasswordMutation = mutation`
updatePassword($passwordData: UpdatePasswordInput!) {
  updatePassword(data: $passwordData) {
    id
    username
    role
  }
}`;

export default updatePasswordMutation;
