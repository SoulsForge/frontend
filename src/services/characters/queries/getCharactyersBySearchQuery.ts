import { query } from 'astraql';

const getCharactersBySearchQuery = query`
searchCharacter(q$: String!){
  searchCharacter(query: q&){
      id
      name
      image_url
  }
}
`;

export default getCharactersBySearchQuery;
