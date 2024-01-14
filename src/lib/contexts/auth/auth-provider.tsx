import { PropsWithChildren, useEffect, useState } from 'react';
import IUser from '@/lib/interfaces/user/user.interface';
import { removeBearerToken, setBearerToken } from '@/services/fetch-client';
import ISession from '@/lib/interfaces/user/session.interface';
import { AuthContext } from '@/lib/contexts/auth/auth-context';
import Loader from '@/lib/components/conditionals/loader';
import { getCurrentUser } from '@/services/user-service';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);

  function isLogged() {
    return user != null && token != null;
  }

  async function logout() {
    localStorage.removeItem('token');


    if (user != null) {
      console.log('Removed user from Auth Context');

      setUser(null);
    }

    if (token != null) {
      console.log('Removed token from Auth Context');
      setToken(null);
    }

    if (sessionId != null) {
      console.log('Removed session id from Auth Context');
      setSessionId(null);
    }

    removeBearerToken();
  }

  function login({ token, user }: ISession) {
    setBearerToken(token);
    setToken(token);
    setUser(user);

    localStorage.setItem('token', token);

    return user;
  }

  async function loginWithPreviousToken(): Promise<IUser | null> {
    const token = localStorage.getItem('token');
    // const ssid = localStorage.getItem('ssid');

    // if (!token || !ssid) return null;
    if (!token) return null;

    setToken(token);
    setBearerToken(token);
    // setSessionId(ssid);

    // Verifytoken
    return await getCurrentUser();
  }

  useEffect(() => {
    setFetched(false);

    async function handle() {
      const user = await loginWithPreviousToken();

      if (user) {
        // setTheme(user.settings.darkMode ? 'dark' : 'light');
        setUser(user);
      }
    }

    handle()
      .catch((e) => {
        const error = e.message;

        if (error == 'Unauthorized') {
          logout();
        }
      })
      .finally(() => setFetched(true));
  }, []);

  return (
    <AuthContext.Provider
      value={{ sessionId, user, setUser, isLogged, login, logout, token }}
    >
      <Loader
        loaded={fetched}
        message='Loading...'
        className='h-screen w-screen'
      >
        {children}
      </Loader>
    </AuthContext.Provider>
  );
}
