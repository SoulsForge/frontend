import { Image, Link } from '@nextui-org/react';
import NextImage from 'next/image';
import MainLayout from '@/lib/components/layout/main-layout';


export default function Custom404() {
  return (
    <section className='flex-grow flex flex-col justify-center items-center gap-4'>
      <Image
        as={NextImage}
        src={'/404.png'}
        alt='404 image'
        width={500}
        height={500}
      />
      <div className='flex flex-col gap-2 text-center'>
        <h1 className='text-4xl font-semibold'>404 | Page Not Found</h1>
        <h3 className='text-2xl'>
          Back to{' '}
          <Link href={'/'} className='text-2xl'>
            Home
          </Link>
        </h3>
      </div>
    </section>
  );
}