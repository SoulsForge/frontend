import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Providers from '@/lib/components/providers/providers';
import MainLayout from '@/lib/components/layout/main-layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MainLayout >
        <Component {...pageProps} />
      </MainLayout>
    </Providers>
  );
}
