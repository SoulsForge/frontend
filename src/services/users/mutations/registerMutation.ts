import { mutation } from "astraql";

const registerMutation = mutation`
register($registerData: CreateUserInput!) {
  register(data: $registerData) {
    id
    username
    role
  }
}
`;

export default registerMutation;
