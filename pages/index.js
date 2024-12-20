import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Instragram App</title>
        <meta name='Description' content='For learn use' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* header */}
      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}
    </div>
  );
}
