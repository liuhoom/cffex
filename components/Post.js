import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import React from 'react';

export default function Post({ username, id, caption, img, userImg }) {
  return (
    <div>
      {/* header */}
      <div className='flex items-center'>
        <img
          src={userImg}
          alt={username}
          className='h-10 rounded-full cursor-pointer mr-3'
        />
        <div className='text-sm flex-1'>{username}</div>
        <DotsHorizontalIcon className='h-5 cursor-pointer' />
      </div>

      {/* Post */}
      <img src={img} alt={id} className='w-full object-contain' />

      <div className='flex'>
        <div className='flex flex-1 space-x-2'>
          <HeartIcon className='header-icons' />
          <ChatIcon className='header-icons' />
        </div>
        <BookmarkIcon className='header-icons' />
      </div>

      {/* Comments */}
      <div className='flex items-center'>
        <h2 className='font-bold'>{username}</h2>
        <p className='text-sm ml-2'>{caption}</p>
      </div>

      {/* postcomments */}
      <form className='flex items-center'>
        <EmojiHappyIcon className='h-7' />
        <input type='text' placeholder='Enter your comment...' className='border-none rounded-sm' />
        <button className='font-bold text-blue-500'>Post</button>
      </form>
    </div>
  );
}
