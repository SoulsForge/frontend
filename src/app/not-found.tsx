'use client';

import { Image } from '@nextui-org/react';
import NextImage from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <section className='flex flex-col justify-center items-center'>
      <Image
        as={NextImage}
        src={'/404.png'}
        alt='404 image'
        width={500}
        height={500}
      />
      <h1 className='text-4xl font-semibold'>404 | Page Not Found</h1>
      <h3 className='text-2xl'>
        Back to{' '}
        <Link href={'/'} color='primary'>
          Home
        </Link>
      </h3>
    </section>
  );
}
