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
    <div key={id} className='mt-7 bg-white border rounded-md'>
      {/* header */}
      <div className='flex items-center p-5'>
        <img
          src={userImg}
          alt={username}
          className='h-12 rounded-full border mr-3 p-1 object-cover'
        />
        <div className='font-bold flex-1 select-none'>{username}</div>
        <DotsHorizontalIcon className='h-5 cursor-pointer' />
      </div>

      {/* Post */}
      <img src={img} alt={id} className='w-full object-contain' />

      <div className='flex justify-between pt-4 px-4'>
        <div className='flex space-x-2'>
          <HeartIcon className='header-icons' />
          <ChatIcon className='header-icons' />
        </div>
        <BookmarkIcon className='header-icons' />
      </div>

      {/* Comments */}
      <div className='flex items-center px-5 pt-5 pb-4'>
        <h2 className='font-bold'>{username}</h2>
        <p className='text-sm ml-2'>{caption}</p>
      </div>

      {/* postcomments */}
      <form className='flex items-center px-4 pb-4'>
        <EmojiHappyIcon className='h-7' />
        <input
          type='text'
          placeholder='Enter your comment...'
          className='border-none flex-1 focus:ring-0'
        />
        <button className='font-bold text-blue-400'>Post</button>
      </form>
    </div>
  );
}
