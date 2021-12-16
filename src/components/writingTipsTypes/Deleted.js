import React from 'react';
import { DeleteIcon } from './../vectors/Vectors';

const DeletedTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Deleted message</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-red-500 text-sm italic'>Format</p>
          <p>
            <span className='font-semibold text-gray-900'>Stacey:</span>{' '}
            <span>I have always loved you. (deleted)</span>
          </p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div>
        <div className='py-3 px-5 rounded-xl bg-purple-50 relative rounded-br-none ml-2 text-left m-auto mt-3 inline-flex flex-col'>
          <p className='text-sm'>Stacey</p>
          <p className='text-gray-700 flex items-center italic line-through'>
            <DeleteIcon fill='#374151' />
            <span className='ml-2'>I have always loved you</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DeletedTips;
