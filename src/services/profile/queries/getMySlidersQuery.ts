import { query } from "astraql";

const getMySlidersQuery = query`
{
  getMySliders{
    id
    name
    image_url
    game{
      name
    }
  }
}
`;

export default getMySlidersQuery;
