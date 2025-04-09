import { query } from "astraql";

const GetProfileQuery = query`
getProfile($username: String!) {
  getProfile(username: $username) {
    id
    avatar
    user {
      id
      username
    }
  }
}
`;

export default GetProfileQuery;
