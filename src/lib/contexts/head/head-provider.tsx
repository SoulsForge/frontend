import { PropsWithChildren, useEffect, useState } from 'react';
import { HeadContext } from '@/lib/contexts/head/head-context';
import { useRouter } from 'next/router';

interface Props extends PropsWithChildren {
  baseTitle: string;
}

export default function HeadProvider({ children, baseTitle }: Props) {
  const [title, setTitle] = useState(baseTitle);
  // const router = useRouter();
  const setCustomTitle = (title?: string) => {
    setTitle(!title ? `${baseTitle}` : `${baseTitle} | ${title}`);
  };

  const clearTitle = () => {
    setTitle(baseTitle);
  };

  // useEffect(() => {
  //   clearTitle();
  // }, [clearTitle, router]);

  return (
    <HeadContext.Provider value={{ setCustomTitle, title }}>
      {children}
    </HeadContext.Provider>
  );
}