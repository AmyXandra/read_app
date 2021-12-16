import React from 'react';

export default function LoadMoreButton({ totalStories, story_number, loadMore = () => {} }) {
  return (
    <div className='text-center pb-12'>
      <h5 className='mb-4'>
        You’ve viewed <span className='font-bold'>{story_number.length}</span> out of
        {'·'}
        {totalStories?.paginationData?.total} stories
      </h5>
      {story_number.length === totalStories?.paginationData?.total ? (
        <div className='text-primary font-semibold text-xl mb-6 mt-8'>The End!</div>
      ) : (
        <button
          className='px-8 py-2 rounded border border-solid border-primary'
          onClick={() => loadMore()}
        >
          Load More
        </button>
      )}
    </div>
  );
}
