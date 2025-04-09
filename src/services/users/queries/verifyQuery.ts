import { query } from "astraql";

const verifyQuery = query`
{
  verify {
    id
    username
    email
    emailVerified
    profile {
      avatar
    }
    role
  }
}
`;

export default verifyQuery;
