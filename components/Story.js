export default function Story({ username, img, id }) {
  return (
    <div>
      <img
        src={img}
        alt={username}
        className='h-12 rounded-full border-2 border-red-400 p-[1.5px] cursor-pointer hover:scale-125 transition-transform duration-200 ease-out'
      />
      <p className='w-14 truncate'>{username}</p>
    </div>
  );
}
