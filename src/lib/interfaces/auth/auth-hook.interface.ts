import ISessionAndUser from './session-and-user.interface';
import IUser from './user.interface';

export default interface IAuthHook {
  sessionId: string | null;
  token: string | null | undefined;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLogged: () => boolean;
  login: (session: ISessionAndUser) => IUser;
  logout: () => Promise<void>;
}
