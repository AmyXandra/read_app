import React from 'react';
import { ThinkingIcon } from './../vectors/Vectors';

const ThoughtTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Person thinking</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p>
            <span className='font-semibold text-gray-900'>Chidi:</span>{' '}
            <span>Should i tell her that i love her? (thought)</span>
          </p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div>
        <div className='py-3 px-5 rounded-xl bg-orange-50 relative rounded-br-none ml-2 text-left m-auto mt-3 inline-flex flex-col'>
          <p className='text-sm text-orange-600'>Chidi</p>
          <p className='text-gray-700 flex items-center italic'>
            <ThinkingIcon fill='#374151' />
            <span className='ml-1'>Should i tell her that i love her?</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ThoughtTips;
