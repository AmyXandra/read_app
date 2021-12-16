import React from 'react';
import { AltTextIcon } from '../vectors/Vectors';

const AltTextTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Non-English word</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p>
            <span className='font-semibold text-gray-900'>Sara:</span>{' '}
            <span> No dey follow me talk like that. (slang: Don’t talk to me that way)</span>
          </p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div className='w-max py-3 px-5 rounded-xl bg-green-50 relative rounded-br-none ml-2 text-left m-auto mt-3 inline-flex flex-col mb-4'>
        <p className='text-sm text-green-400'>Sara</p>
        <p className='text-base'>Don’t talk to me that way</p>
        <button className='absolute h-8 w-8 rounded-full flex items-center justify-center border-green-100 border-2 focus:outline-none right-1 -bottom-5 bg-green-50'>
          <AltTextIcon height='18' width='18' />
        </button>
      </div>
    </>
  );
};

export default AltTextTips;
