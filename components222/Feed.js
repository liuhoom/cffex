import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';
import MiniProfile from './MiniProfile';

function Feed() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
      <div className='md:col-span-2'>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </div>
      <div className='hidden md:inline-grid md:col-span-1'>
        <div className='fixed w-[380px]'>
          {/* Mini Profile */}
          <MiniProfile />
          {/* Suggestions */}
          <Suggestions />
        </div>
      </div>
    </div>
  );
}

export default Feed;
