import SettingsLayout from '@/lib/components/layout/settings-layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useHead from '@/lib/hooks/context/useHead';

export default function SettingsPage() {

  const router = useRouter();



  useEffect(() => {
    router.push('settings/profile');
  }, [router]);

  return null;
}