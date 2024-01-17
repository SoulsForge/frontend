import { createContext } from 'react';
import IHeadHook from '@/lib/interfaces/contexts/head-hook.interface';
import Error from 'next/error';

export const HeadContext = createContext<IHeadHook>({
  title: '',
  setCustomTitle: (title?: string): void => {
    // @ts-ignore
    throw new Error('Not implemented.');
  },
});