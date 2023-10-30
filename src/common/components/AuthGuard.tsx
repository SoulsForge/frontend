'use client';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isLogged, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLogged()) {
      router.push('/login');
    }
  }, [isLogged, router]);

  return <>{children}</>;
}
