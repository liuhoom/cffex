import { PlusCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className='bg-white sticky z-30 border-b top-0 shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-4 xl:mx-auto'>
        <div>
          <div className='h-24 w-24 relative cursor-pointer hidden lg:inline-grid'>
            <Image
              src='http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png'
              layout='fill'
              className='object-contain'
              onClick={() => router.push('/')}
            />
          </div>
          <div className='h-24 w-10 top-[28px] relative cursor-pointer lg:hidden'>
            <Image
              src='/Instagram_logo_2022.svg.png'
              width={200}
              height={200}
              className='object-fill'
              onClick={() => router.push('/')}
            />
          </div>
        </div>

        <div className='relative'>
          <div className='top-2 absolute left-2'>
            <SearchIcon className='h-7 text-gray-500' />
          </div>
          <input
            type='text'
            placeholder='Search'
            className='rounded-md bg-gray-50 border-gray-500 pl-10 focus:ring-black focus:border-black'
          />
        </div>

        <div className='flex space-x-4 items-center'>
          <HomeIcon
            onClick={() => router.push('/')}
            className='header-icons hidden md:inline-flex'
          />
          {session ? (
            <>
              <PlusCircleIcon className='header-icons' />
              <img
                src={session?.user.image}
                layout='fill'
                className='cursor-pointer h-10 rounded-full'
                alt='user-image'
                onClick={signOut}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  )
}
