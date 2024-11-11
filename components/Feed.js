import Posts from './Posts';
import Stories from './Stories';

const Feed = () => {
  return (
    <div>
      <div className=''>
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </div>

      <div className=''>
        {/* Miniprofile */}

        {/* Suggestion */}
      </div>
    </div>
  );
};

export default Feed;
