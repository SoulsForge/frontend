import { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import AuthProvider from '@/lib/contexts/auth/auth-provider';
import { useRouter } from 'next/router';
import HeadProvider from '@/lib/contexts/head/head-provider';

export default function Providers({ children }: PropsWithChildren) {

  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <AuthProvider>
        <HeadProvider baseTitle='SoulsForge'>
          {children}
        </HeadProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}