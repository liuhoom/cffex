import React from 'react';

export default function Story({ img, username, id }) {
  return (
    <div className='' key={id}>
      <img
        src={img}
        alt={username}
        className='h-14 rounded-full border-2 p-[1.5px] border-red-500 cursor-pointer hover:scale-125 transition-transform ease-out duration-200'
      />
      <p className='text-sm w-14 truncate'>{username}</p>
    </div>
  );
}
