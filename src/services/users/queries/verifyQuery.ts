import { query } from "astraql";

const verifyQuery = query`
{
  verify {
    id
    username
    email
    emailVerified
    role
  }
}
`;

export default verifyQuery;
