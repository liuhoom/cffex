import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import React from 'react';

export default function Post({ key, id, img, userImg, caption, username }) {
  return (
    <div>
      <div className='flex items-center p-5'>
        <img
          src={userImg}
          alt={username}
          className='h-12 rounded-full border object-cover p-1 mr-3'
        />
        <p className='font-bold flex-1'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>

      <img src={img} alt='' className='object-cover w-full' />

      <div className='flex items-center justify-between pt-4 px-4'>
        <div className='flex space-x-3'>
          <HeartIcon className='btn' />
          <ChatIcon className='btn' />
        </div>
        <BookmarkIcon className='btn' />
      </div>

      <p className='p-5 truncate'>
        <span className='font-bold mr-2'>{username}</span>
        {caption}
      </p>

      <div className='flex items-center p-4'>
        <EmojiHappyIcon className='h-7' />

        <input
          type='text'
          className='border-none focus:ring-0 flex-1'
          placeholder='Input your comment...'
        />
        <button className='text-blue-400 font-bold'>Post</button>
      </div>
    </div>
  );
}
