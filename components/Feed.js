import Posts from './Posts';
import Stories from './Stories';

export default function Feed() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
      <div className='md:col-span-2'>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </div>

      <div className='hidden md:col-span-1 md:inline-grid'>
        {/* Mini Profile */}

        {/* Suggestions */}
      </div>
    </div>
  );
}
