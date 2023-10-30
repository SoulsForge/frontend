'use client';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import AuthGuard from '~/common/components/AuthGuard';
import useAuth from '~/hooks/useAuth';

export default function AuthProtectedLayout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
