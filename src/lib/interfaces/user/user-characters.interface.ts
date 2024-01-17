import IUser from '@/lib/interfaces/user/user.interface';
import IBaseCharacter from '@/lib/interfaces/characters/base-character.interface';

export default interface IUserWithCharacters extends IUser {
  BaseCharacter: IBaseCharacter[];
}