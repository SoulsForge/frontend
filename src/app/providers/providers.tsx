'use client';

import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import AtuhProvider from '~/contexts/auth/auth-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <AtuhProvider>{children}</AtuhProvider>
    </NextUIProvider>
  );
}
