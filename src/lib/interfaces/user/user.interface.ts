import IUserSettings from '@/lib/interfaces/user/user-settings.interface';

export default interface IUser {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  settings: IUserSettings;
}