import { mutation } from "astraql";

const loginMutation = mutation`
login($loginData: SignInInput!) {
  login(data: $loginData) {
    user {
      id
      email
      emailVerified
      username
      role
    }
    accessToken
    role
  }
}
`;

export default loginMutation;
