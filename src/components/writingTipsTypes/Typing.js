import React from 'react';
import { DotsHorizontalIcon } from '@heroicons/react/outline';

const TypingTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Typing in progress</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p>
            <span className='font-semibold text-gray-900'>Muhammed</span> <span>(typing)</span>
          </p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div>
        <div className='w-max py-3 px-5 rounded-xl bg-blue-200 relative rounded-br-none ml-2 text-left m-auto mt-3 inline-flex'>
          <DotsHorizontalIcon className='w-6' />
        </div>
      </div>
    </>
  );
};

export default TypingTips;
