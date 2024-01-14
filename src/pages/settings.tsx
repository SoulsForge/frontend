import AuthGuard from '@/lib/guards/auth-guard';
import useAuth from '@/lib/hooks/useAuth';

export default function SettingsPage() {

  const { user } = useAuth();

  return (
    <AuthGuard>
      {user?.id}
      {user?.email}
      {user?.username}
    </AuthGuard>
  );
}