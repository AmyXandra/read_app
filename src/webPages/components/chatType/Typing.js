import React from 'react';

export default function Typing({ data, numberOfChatMessages, tapToRead = () => {} }) {
  return (
    <div
      className={
        data?.chatCharacter?.isMainXter
          ? 'w-full flex flex-col mt-7 mb-0 items-end'
          : 'w-full flex flex-col mt-7 mb-0 items-start'
      }
    >
      <div
        className='flex items-center'
        style={{ maxWidth: '320px' }}
        onClick={() => tapToRead(numberOfChatMessages)}
      >
        <div
          className={`w-12/12 py-3 px-5 rounded-3xl bg-purple-100 relative cursor-pointer ${
            data?.chatCharacter?.isMainXter ? 'rounded-br-none' : 'rounded-bl-none'
          }`}
          style={{
            backgroundColor: `${data?.chatCharacter?.msgColor}`,
            color: 'rgb(163, 20, 0)',
          }}
        >
          <p className='text-base mb-2 font-bold'>{data?.chatCharacter?.name}</p>
          <p className='text-lg text-gray-700 flex items-start'>
            <span className='ml-1'>{data.text}...</span>
          </p>
        </div>
      </div>
    </div>
  );
}
