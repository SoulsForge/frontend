import { mutation } from "astraql";

const loginMutation = mutation`
login($loginData: SignInInput!) {
  login(data: $loginData) {
    user {
      id
      email
      username
      role
    }
    accessToken
    role
  }
}
`;

export default loginMutation;
