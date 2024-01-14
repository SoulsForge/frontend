import { Spinner } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  loaded?: boolean;
  message?: string;
  className?: string;
}

export default function Loading({
                                  children,
                                  loaded = false,
                                  message,
                                  className = ''
                                }: Props) {
  if (loaded) return <>{children}</>;

  return (
    <div
      className={`flex flex-col justify-center gap-5 w-screen h-screen ${className}`}
    >
      <Spinner color='default' label={message}/>
    </div>
  );
}
