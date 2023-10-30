import IUser from '../auth/user.interface';
import IGame from '../game.interface';

export default interface IBaseCharacter {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  game: IGame;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
