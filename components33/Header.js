import { PlusCircleIcon, SearchIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import Image from 'next/image';

export default function Header() {
  return (
    <div className='border-b bg-white shadow-xl sticky z-30 top-0'>
      <div className='flex items-center justify-between mx-4 max-w-6xl xl:mx-auto'>
        <div>
          <div className='h-24 w-24 relative hidden lg:inline-flex cursor-pointer'>
            <Image
              src='http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png'
              layout='fill'
              className='object-contain'
              alt='lg-image'
              priority
            />
          </div>
          <div className='h-24 w-10 relative lg:hidden cursor-pointer'>
            <Image
              src='/Instagram_logo_2022.svg.png'
              layout='fill'
              className='object-contain'
              alt='sm-image'
            />
          </div>
        </div>

        <div className='relative mt-1'>
          <div className='absolute top-2 left-2'>
            <SearchIcon className='w-7 text-gray-500' />
          </div>
          <input
            type='text'
            placeholder='Search'
            className='pl-10 border-gray-500 rounded-md focus:ring-black focus:border-black'
          />
        </div>

        <div className='flex space-x-4 items-center'>
          <HomeIcon className='header-icons hidden md:inline-flex' />
          <PlusCircleIcon className='header-icons' />

          <img
            src='https://static.skillshare.com/uploads/users/350301760/user-image-large.jpg?753816048'
            className='h-10 rounded-full cursor-pointer border border-gray-200 p-[1.5px]'
            layout='fill'
            alt='user-image'
          />
        </div>
      </div>
    </div>
  );
}
