import React from 'react';

const DialogueTips = () => {
  return (
    <>
      <h4 className='text-gray-700 font-bold text-xl mb-1'>Dialogue</h4>
      <div className='bg-gray-100 p-4 rounded-md'>
        <div className='text-left'>
          <p className='text-orange-600 text-sm italic'>Format</p>
          <p>
            <span className='font-semibold text-gray-900'>Sara:</span>{' '}
            <span>Welcome home daddy</span>
          </p>
        </div>
      </div>
      <p className='italic text-gray-400 mt-4 mb-1'>Display</p>
      <div>
        <div className='w-max py-3 px-5 rounded-xl bg-orange-100 text-orange-600 relative rounded-br-none ml-2 text-left m-auto mt-3 inline-flex flex-col'>
          <p className='text-sm'>Sara</p>
          <p className='text-base text-gray-800 font-semibold'>Welcome home daddy</p>
        </div>
      </div>
    </>
  );
};

export default DialogueTips;
