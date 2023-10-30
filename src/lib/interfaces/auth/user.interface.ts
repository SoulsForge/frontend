import IBaseCharacter from '../characters/base-character.interface';

export default interface IUser {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
