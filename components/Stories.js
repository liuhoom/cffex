import minifaker from 'minifaker'
import 'minifaker/locales/en'
import { useEffect, useState } from 'react'
import Story from './Story'
import { useSession } from 'next-auth/react'

export default function Stories() {
  const [userStroies, setUserStories] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    const userStroies = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: 'en' }).toLocaleLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }))

    setUserStories(userStroies)
  }, [])

  return (
    <div className='flex space-x-2 border border-gray-200 mt-8 p-6 bg-white rounded-md overflow-x-scroll scrollbar-none'>
      {session && (
        <Story
          img={session?.user.image}
          username={session?.user.username}
          isUser='true'
        />
      )}
      {userStroies.map((user) => (
        <Story
          key={user.id}
          img={user.img}
          id={user.id}
          username={user.username}
        />
      ))}
    </div>
  )
}
