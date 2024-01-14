import { PropsWithChildren } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import AuthProvider from '@/lib/contexts/auth/auth-provider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NextUIProvider>
  );
}