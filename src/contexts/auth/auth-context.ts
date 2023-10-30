import { createContext } from 'react';
import IAuthHook from '~/lib/interfaces/auth/auth-hook.interface';
import IUser from '~/lib/interfaces/auth/user.interface';

export const AuthContext = createContext<IAuthHook>({
  sessionId: null,
  user: null,
  token: null,
  setUser: (): void => {
    throw new Error('Not implemented.');
  },
  isLogged: (): boolean => false,
  login: (): IUser => {
    throw new Error('Not implemented.');
  },
  logout: async (): Promise<void> => {
    throw new Error('Not implemented.');
  }
});
