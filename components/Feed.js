import MiniProfile from '@/components/MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'

export default function Feed() {
  const { data: session } = useSession()
  return (
    // <div className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
    <div
      className={`grid grid-cols-1 mx-auto ${
        session
          ? 'md:grid-cols-3 md:max-w-6xl'
          : 'md:grid-cols-2 md:max-w-3xl'
      }`}
    >
      <div className='md:col-span-2'>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </div>

      <div className='hidden md:col-span-1 md:inline-grid'>
        <div className='fixed w-[380px]'>
          {/* Mini Profile */}
          <MiniProfile />

          {/* Suggestions */}
          <Suggestions />
        </div>
      </div>
    </div>
  )
}
