import { PropsWithChildren, useEffect } from 'react';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isLogged, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    if (!isLogged()) {
      // @ts-ignore
      router.push(`/auth/login?return_url=${new URLSearchParams(pathname).toString().split('=')[0]}`);
      return;
    }
  }, [isLogged, pathname, router]);

  return (
    <>
      {isLogged() ? children : null}
    </>
  );
}