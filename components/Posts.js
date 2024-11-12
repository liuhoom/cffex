import {
  DotsHorizontalIcon,
  HeartIcon,
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
} from '@heroicons/react/outline';

const Posts = () => {
  const dummyData = [
    {
      id: '1',
      username: 'codewithsahand',
      userImg:
        'https://static.skillshare.com/uploads/users/350301760/user-image-large.jpg?753816048',
      img: 'https://images.unsplash.com/photo-1643818507403-a3ed10760d16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      caption: 'Nice picture',
    },
    {
      id: '2',
      username: 'ghavidelsahand',
      userImg:
        'https://static.skillshare.com/uploads/users/350301760/user-image-large.jpg?753816048',
      img: 'https://images.unsplash.com/photo-1643806720662-f9bc01be4e83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      caption: 'New picture from my city',
    },
  ];

  return (
    <div className=''>
      {dummyData.map((post) => (
        <div className='p-8 mt-4 border-2 border-gray-100  rounded-md'>
          <div className='flex items-center'>
            <img
              src={post.userImg}
              alt={post.id}
              className='h-10 rounded-full cursor-pointer'
            />
            <p className='text-sm font-bold'>{post.username}</p>
            <DotsHorizontalIcon className='h-5' />
          </div>

          <div className=''>
            <img src={post.img} className='h-32' />
          </div>

          <div className='flex items-center justify-between mt-4'>
            <div className='flex space-x-4'>
              <HeartIcon className='btn' />
              <ChatIcon className='btn' />
            </div>
            <BookmarkIcon className='btn' />
          </div>

          <div className='relative max-w-xl mt-4'>
            <EmojiHappyIcon className='btn absolute top-2 left-2' />
            <input
              type='text'
              className='pl-10 w-full'
              placeholder='Enter your comment...'
            />
            <p className='text-blue-500 text-sm absolute top-2 right-2'>Post</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
