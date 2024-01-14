import Providers from '@/lib/components/providers/providers';
import { PropsWithChildren, Suspense } from 'react';
import Navbar from '@/lib/components/ui/flow/navbar';
import { Loader } from 'lucide-react';
import Head from 'next/head';
import Footer from '@/lib/components/ui/flow/footer';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>SoulsForge</title>
      </Head>
      <Navbar/>
      <main className='flex-grow flex flex-col w-full h-full'>
        {children}
      </main>
      <Footer/>
    </>
  );
}