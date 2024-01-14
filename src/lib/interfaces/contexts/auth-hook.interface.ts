import IUser from '@/lib/interfaces/user/user.interface';
import ISession from '@/lib/interfaces/user/session.interface';

export default interface IAuthHook {
  sessionId: string | null;
  token: string | null | undefined;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLogged: () => boolean;
  login: (session: ISession) => IUser;
  logout: () => Promise<void>;
}
