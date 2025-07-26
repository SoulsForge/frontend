import { createContext, useEffect, useState } from "react";
import { removeAuthorization, setAuthorization } from "@/lib/clients/graphql";

import Loader from "@/components/ui-custom/loader";
import { TopProgress } from '@/components/ui-custom/top-loader';
import User from '@/services/users/user';
import { toast } from 'sonner';
import { verifyUser } from '@/services/users';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  verify: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function login(token: string, user: User) {
    setAuthorization(token);
    // setToken(token);
    setUser(user);
    setIsAuthenticated(true);

    if (!user.emailVerified) {
      toast.info('Please verify your email address to access all features.', {
        description: "Check your spam folder if you don't see the email.",
        duration: 5000
      });
    }

    localStorage.setItem('token', token);
  }

  async function logout() {
    // setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    removeAuthorization();
    localStorage.removeItem('token');
  }

  async function verify() {
    const localStorageToken = localStorage.getItem('token');

    if (!localStorageToken) {
      setIsLoading(false);
      return logout();
    }

    setAuthorization(localStorageToken);
    // setToken(localStorageToken);

    try {
      const user = await verifyUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch (_error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    verify();
  }, []);

  if (isLoading) {
    // return (
    //   <div className="flex-grow h-screen grid place-items-center">
    //     <Loader />
    //   </div>
    // );
    return (
      <div>
        <TopProgress />
        <span>loading......</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        verify
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
