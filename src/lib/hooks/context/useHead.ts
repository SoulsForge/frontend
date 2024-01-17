import { useContext } from 'react';
import { HeadContext } from '@/lib/contexts/head/head-context';


const useHead = (titlePage?: string) => {
  const { title, setCustomTitle } = useContext(HeadContext);

  if (titlePage) {
    setCustomTitle(titlePage);
  }else{
    setCustomTitle()
  }

  return { title, setCustomTitle };
};

export default useHead;