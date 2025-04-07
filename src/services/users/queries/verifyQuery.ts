import { query } from "astraql";

const verifyQuery = query`
{
  verify {
    id
    username
    email
    role
  }
}
`;

export default verifyQuery;
