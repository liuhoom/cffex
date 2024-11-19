import Header from '@/components/Header'
import { getProviders, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function signin({ providers }) {
  return (
    <>
      <Header />

      <div className='flex mt-40 justify-center space-x-7'>
        <img
          src='/fj.jpg'
          className='object-contain rotate-6 rounded-md hidden md:inline-flex md:w-48'
        />
        <div className='flex flex-col items-center'>
          <img
            src='https://socodigital.com/wp-content/uploads/2021/03/Instagram.png'
            alt='logo-image'
            className='w-32 object-cover'
          />
          <p className='italic text-sm my-10 text-center'>
            This app is built for learning.
          </p>

          {Object.values(providers).map((p) => (
            <button
              key={p.id}
              className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-600 my-1'
              onClick={() => signIn(p.id, { callbackUrl: '/' })}
            >
              Sign In with {p.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
