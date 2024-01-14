import IUser from './user.interface';

export default interface ISession {
  user: IUser;
  token: string;
}
