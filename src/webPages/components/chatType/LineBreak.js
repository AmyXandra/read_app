import React from 'react';

export default function LineBreak({ data, numberOfChatMessages, tapToRead = () => {} }) {
  return (
    <div>
      <div
        className='justify-between mt-7 mb-6 flex align-center'
        onClick={() => tapToRead(numberOfChatMessages)}
      >
        {data.text ? (
          <>
            <div
              className='mt-6 mx-0 mb-5 bg-gray-300 dark:bg-dark-60'
              style={{ padding: '1px 20%' }}
            />
            <span className='flex-initial w-max justify-center m-auto text-lg text-center flex-grow-1 flex-shrink-0 break-words max-w-full px-2 cursor-pointer text-white'>
              {data.text}
            </span>
            <div
              className='mt-6 mx-0 mb-5 bg-gray-300 dark:bg-dark-60'
              style={{ padding: '1px 20%' }}
            />
          </>
        ) : (
          <div className='mt-6 mx-0 mb-5 bg-gray-300 dark:bg-dark-60' style={{ padding: '1px' }} />
        )}
      </div>
    </div>
  );
}
