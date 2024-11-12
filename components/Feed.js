import Stories from './Stories';
import Posts from './Posts';

export default function Feed() {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl m-auto'>
        <div className='md:col-span-2'>
          {/* Stories */}
          <Stories />

          {/* Posts */}
          <Posts />
        </div>
      </div>
      <div className='hidden md:inline-grid mdcol-span-1'>
        {/* Mini Profile */}

        {/* Suggestions */}
      </div>
    </div>
  );
}
