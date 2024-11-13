import Image from 'next/image';

export default function MiniProfile() {
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img
        className='h-16 rounded-full border p-[2px]'
        src='https://static.skillshare.com/uploads/users/350301760/user-image-large.jpg?753816048'
        alt='user-image'
      />
      <div className='ml-4 flex-1'>
        <h2 className='font-bold'> codewithpbliu</h2>
        <h3 className='text-ms text-gray-400'>Welcome to instagram</h3>
      </div>

      <p className='font-semibold text-blue-400 text-sm'>Sign out</p>
    </div>
  );
}
