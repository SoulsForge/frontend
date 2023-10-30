import { Spinner } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  loaded: boolean;
  message?: string;
}

export default function Loading({ children, loaded, message }: Props) {
  if (loaded) return <>{children}</>;

  return (
    <div className='flex flex-col justify-center gap-5 w-full h-screen'>
      <Spinner color='default' label={message} />
    </div>
  );
}
