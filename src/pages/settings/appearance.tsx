import { Divider, Input } from '@nextui-org/react';
import useAuth from '@/lib/hooks/context/useAuth';
import SettingsLayout from '@/lib/components/layout/settings-layout';

export default function AppearancePage() {

  const { user } = useAuth();

  return (
    <SettingsLayout page='appearance' title='Appearance'>

      <Input placeholder='Enter Profile Image Url...' label='Profile Image' labelPlacement='outside'
             defaultValue={user?.imageUrl}/>
    </SettingsLayout>
  );
}