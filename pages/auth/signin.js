import Header from '@/components/Header';
import { objectElement } from 'minifaker';
import { getProviders, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function signin({ providers }) {
  console.log(Object.values(providers));
  console.log(providers);

  return (
    <>
      <Header />
      <div className=''>hehe</div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
