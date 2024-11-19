import { signOut, useSession } from 'next-auth/react'

export default function MiniProfile() {
  const { data: session } = useSession()

  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img
        className='h-16 rounded-full border p-[2px]'
        src={session?.user.image}
        alt='user-image'
      />
      <div className='ml-4 flex-1'>
        <h2 className='font-bold'>{session?.user.name}</h2>
        <h3 className='text-ms text-gray-400'>Welcome to instagram</h3>
      </div>

      <button className='font-semibold text-blue-400 text-sm' onClick={signOut}>
        Sign out
      </button>
    </div>
  )
}
