import ISessionWithToken from './session-with-token.interface';
import IUser from './user.interface';

export default interface ISessionAndUser {
  // session: ISessionWithToken;
  user: IUser;
  token: string;
}
