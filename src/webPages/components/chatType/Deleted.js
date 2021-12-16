import React, { useState } from 'react';

export default function Deleted({ data, numberOfChatMessages, tapToRead = () => {} }) {
  var delayInMilliseconds = 1500; //1 second
  const [showData, setShowData] = useState(true);
  setTimeout(function () {
    //your code to be executed after 1 second
    setShowData(false);
  }, delayInMilliseconds);

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
          {showData ? (
            <div>
              <p className='text-base text-sm mb-1 font-bold'>{data?.chatCharacter?.name}</p>
              <p className='text-lg text-gray-700 flex items-start'>
                <span className='ml-1'>{data.text}</span>
              </p>
              {data.image && (
                <img src={data.image} className='my-3 h-52 w-52 object-cover' alt='image' />
              )}
            </div>
          ) : (
            <p className='text-gray-700 flex items-start items-center'>
              <span className='text-base font-bold'>{data?.chatCharacter?.name}</span>
              <span className='text-lg text-gray-700 ml-2'>deleted this message</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
