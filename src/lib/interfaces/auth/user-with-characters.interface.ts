import IBaseCharacter from '../characters/base-character.interface';
import IUser from './user.interface';

export default interface IUserWithCharacters extends IUser {
  BaseCharacter: IBaseCharacter[];
}
