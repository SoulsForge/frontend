import { mutation } from "astraql";

const verifyEmailMutation = mutation`
verifyEmail($code: String!) {
  verifyEmail(code: $code) {
      id
      email
      emailVerified
      username
      role
    }
  }
`;

export default verifyEmailMutation;
