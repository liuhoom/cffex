import Image from 'next/image';
import { useRouter } from 'next/router';
import { SearchIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';

const Header = () => {
  const router = useRouter();
  return (
    <div className='flex items-center justify-between max-w-6xl mx-4 xl:mx-auto shadow-sm border-b sticky top-0 bg-white z-30'>
      <div className='h-24 w-24 hidden relative lg:inline-grid'>
        <Image
          src='http://www.jennexplores.com/wp-content/uploads/2015/09/Instagram_logo_black.png'
          layout='fill'
          className='object-contain'
          onClick={() => router.push('/')}
        />
      </div>
      <div className='h-24 w-12 relative lg:hidden'>
        <Image
          src='/Instagram_logo_2022.svg.png'
          layout='fill'
          className='object-contain'
          onClick={() => router.push('/')}
        />
      </div>

      <div className='flex relative'>
        <SearchIcon className='text-gray-400 h-4' />
        <input type='text' className='' placeholder='Search' />
      </div>

      <div className='flex'>
        <HomeIcon className='h-4' />
        <PlusCircleIcon className='h-4' />
      </div>
    </div>
  );
};

export default Header;
