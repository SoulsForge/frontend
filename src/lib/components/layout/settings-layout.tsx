import { PropsWithChildren, useEffect } from 'react';
import LinkButton from '@/lib/components/ui/custom variants/LinkButton';
import { Divider, Link } from '@nextui-org/react';
import { BrushIcon, User } from 'lucide-react';
import AuthGuard from '@/lib/guards/auth-guard';
import useHead from '@/lib/hooks/context/useHead';


interface Props extends PropsWithChildren {
  page: string;
  title: string;
}

export default function SettingsLayout({ children, page, title }: Props) {

  useHead('Settings');

  return (
    <AuthGuard>
      <section className='flex-grow flex flex-row gap-4 h-full justify-stretch px-4'>

        <aside className='justify-self-start flex flex-row md:flex-col gap-1 md:w-[300px] p-2'>
          <LinkButton selected={page === 'profile'} as={Link} variant='ghost' href='/settings/profile'
                      startContent={<User/>}>Profile</LinkButton>

          <LinkButton selected={page === 'appearance'} as={Link} variant='ghost' href='/settings/appearance'
                      startContent={<BrushIcon/>}>Appearance</LinkButton>
        </aside>

        <Divider orientation='vertical'/>
        <div className='w-full flex flex-col gap-4'>
          <h2 className='text-2xl'>{title}</h2>
          <Divider orientation='horizontal'/>
          {children}
        </div>
      </section>
    </AuthGuard>
  );
}