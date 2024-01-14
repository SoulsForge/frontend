import IGame from '../game.interface';
import IUser from '@/lib/interfaces/user/user.interface';

export default interface IBaseCharacter {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  game: IGame;
  user: IUser;
  specificCharacterId: number;
  createdAt: Date;
  updatedAt: Date;
}
