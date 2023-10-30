import { PropsWithChildren, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import Loading from '~/common/layout/Loading';
import IUser from '~/lib/interfaces/auth/user.interface';
import ISessionAndUser from '~/lib/interfaces/auth/session-and-user.interface';
import { getCurrentUser } from '~/lib/services/user-service';

export default function AtuhProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);

  function isLogged() {
    return user != null && token != null;
  }

  async function logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('ssid');

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

    // TODO: Remove bearer token
  }

  function login({ token, user }: ISessionAndUser) {
    // const token = session.token;

    // setBearerToken(token)
    setToken(token);
    setUser(user);
    // setSessionId(session.id);

    localStorage.setItem('token', token);
    // localStorage.setItem('ssid', session.id);

    return user;
  }

  async function loginWithPreviousToken(): Promise<IUser | null> {
    const token = localStorage.getItem('token');
    // const ssid = localStorage.getItem('ssid');

    // if (!token || !ssid) return null;
    if (!token) return null;

    setToken(token);
    // setBearerToken(token);
    // setSessionId(ssid);

    // Verifytoken
    const user = await getCurrentUser(token);
    return user;
  }

  useEffect(() => {
    setFetched(false);
    async function handle() {
      const user = await loginWithPreviousToken();

      if (user) setUser(user);
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
      <Loading loaded={fetched} message='Loggin In'>
        {children}
      </Loading>
    </AuthContext.Provider>
  );
}
