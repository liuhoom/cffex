import Image from 'next/image';
import { useRouter } from 'next/router';
import { SearchIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';

const Header = () => {
  const router = useRouter();
  return (
    <div className='bg-white shadow-sm border-b top-0 sticky z-30'>
      <div className='flex items-center justify-between mx-4 max-w-6xl xl:mx-auto'>
        {/* left */}
        <div className='flex'>
          <div className='cursor-pointer relative h-24 w-24 hidden lg:inline-grid'>
            <Image
              className='object-contain'
              src='http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png'
              layout='fill'
            />
          </div>

          <div className='cursor-pointer relative h-24 w-10 lg:hidden'>
            <Image
              className='object-contain'
              src='/Instagram_logo_2022.svg.png'
              layout='fill'
            />
          </div>
        </div>

        {/* middle */}
        <div className='relative mt-1'>
          <div className='absolute top-2 left-2'>
            <SearchIcon className='h-5 text-gray-400' />
          </div>
          <input
            className='pl-8 rounded-md text-sm focus:ring-black focus:border-black border-gray-500'
            placeholder='Search'
          />
        </div>

        {/* right */}
        <div className='flex space-x-4 items-center'>
          <HomeIcon className='h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out hidden md:inline-flex' />
          <PlusCircleIcon className='h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
          <img
            src='https://static.skillshare.com/uploads/users/350301760/user-image-large.jpg?753816048'
            alt='user-image'
            className='h-10 rounded-full cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
