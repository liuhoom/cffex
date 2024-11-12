import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

const Stories = () => {
  let [userStories, setUserStories] = useState([]);

  useEffect(() => {
    userStories = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: 'en' }).toLocaleLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));

    console.log(userStories);
    setUserStories(userStories);
  }, []);

  const router = useRouter();

  return (
    <div className='flex bg-white border border-gray-200 rounded-md p-6 mt-8 space-x-2 overflow-x-scroll scrollbar-none'>
      {userStories.map((user) => (
        <div className=''>
          <img
            src={user.img}
            alt={user.id}
            className='h-14 cursor-pointer rounded-full p-[1.5px] border-2 border-red-500 hover:scale-125 transition-transform duration-200 ease-out'
          />
          <p className='w-14 truncate text-sm'>{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
