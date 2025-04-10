import { mutation } from "astraql";

const updateProfileMutation = mutation`
updateProfileMutation($data: UpdateProfileInput!) {
  updateProfile(data: $data) {
    avatar
    user {
      username
      email
      emailVerified
    }
  }
}
`;

export default updateProfileMutation;
