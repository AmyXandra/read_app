import React from 'react';

export default function Narration({ data, numberOfChatMessages, tapToRead = () => {} }) {
  return (
    <div>
      <p
        className='text-lg flex-grow-1 flex-shrink-0 mr-3 break-words max-w-full cursor-pointer text-white mt-7'
        onClick={() => tapToRead(numberOfChatMessages)}
      >
        {data.text}
      </p>
      {data.image && <img src={data.image} className='my-3' alt='image' />}
    </div>
  );
}
