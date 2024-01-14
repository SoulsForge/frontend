import Image from 'next/image';
import { Inter } from 'next/font/google';
import MainLayout from '@/lib/components/layout/main-layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <h1 className='text-4xl'>Hello world</h1>
  );
}