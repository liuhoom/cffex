import { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import Story from '@/components/Story';

export default function Stories() {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const userStories = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: 'en' }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setUserStories(userStories);
  }, []);
  return (
    <div className='flex space-x-2 p-6 bg-white overflow-x-scroll scrollbar-none border-gray-200 border mt-8 rounded-md'>
      {userStories.map((user) => (
        <Story
          username={user.username}
          img={user.img}
          id={user.id}
          key={user.id}
        />
      ))}
    </div>
  );
}
