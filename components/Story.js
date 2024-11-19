import { PlusIcon } from '@heroicons/react/outline'

export default function Story({ img, username, isUser }) {
  return (
    <div className='relative group cursor-pointer'>
      <img
        src={img}
        alt={username}
        className='h-14 rounded-full border-2 p-[1.5px] border-red-500 cursor-pointer group-hover:scale-125 transition-transform ease-out duration-200'
      />
      {isUser && <PlusIcon className='h-6 text-white absolute top-4 left-4' />}
      <p className='text-sm w-14 truncate'>{username}</p>
    </div>
  )
}
